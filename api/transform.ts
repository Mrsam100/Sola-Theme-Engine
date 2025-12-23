/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiting store (in-memory, will reset on cold starts)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 10; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (record.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - record.count };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIp = req.headers['x-forwarded-for'] as string || req.headers['x-real-ip'] as string || 'unknown';
  const rateLimitCheck = checkRateLimit(clientIp);

  if (!rateLimitCheck.allowed) {
    return res.status(429).json({
      error: 'QUOTA_EXCEEDED',
      message: 'Too many requests. Please try again later.',
      retryAfter: 3600 // seconds
    });
  }

  // Extract request body
  const { base64Image, mimeType } = req.body;

  // Input validation
  if (!base64Image || typeof base64Image !== 'string') {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Missing or invalid base64Image'
    });
  }

  if (!mimeType || typeof mimeType !== 'string') {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Missing or invalid mimeType'
    });
  }

  // Validate mime type
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(mimeType.toLowerCase())) {
    return res.status(400).json({
      error: 'INVALID_FILE_TYPE',
      message: 'Invalid file type. Only PNG, JPG, and WebP are supported.'
    });
  }

  // Validate base64 length (rough file size check - max ~10MB)
  const estimatedSize = (base64Image.length * 3) / 4; // Base64 to bytes
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (estimatedSize > MAX_SIZE) {
    return res.status(413).json({
      error: 'FILE_TOO_LARGE',
      message: 'File too large. Maximum size is 10MB.'
    });
  }

  // Validate API key exists
  if (!process.env.GEMINI_API_KEY) {
    console.error('[CRITICAL] GEMINI_API_KEY not configured');
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: 'Server configuration error. Please contact support.'
    });
  }

  try {
    // Create Gemini AI instance
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Call Gemini API for transformation
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Re-engineer this light-mode UI screenshot into a professional, high-fidelity dark-mode variant.

            DESIGN SYSTEM REQUIREMENTS:
            1. BASE SURFACE: Use a rich, deep grey palette (Zinc-950 #09090B). Use elevation-based lighting where components on top are slightly lighter grey.
            2. TYPOGRAPHY: Ensure high legibility. Map dark text to White-900 (#F8FAFC) for headings and Slate-400 (#94A3B8) for body text.
            3. COLOR VIBRANCY: Recalibrate brand colors (blues, purples, oranges) to look "vibrant" on dark backgrounds by adjusting their saturation and brightness to avoid 'visual buzzing'.
            4. SHADOWS & DEPTH: Eliminate harsh drop shadows. Use 1px subtle borders (#FFFFFF10) and rim lighting for depth.
            5. CONTEXTUAL SEARCH: Reference modern design trends for dashboards and SaaS applications to ensure the result looks cutting-edge.
            6. ACCESSIBILITY: Strictly adhere to WCAG AA standards (4.5:1 ratio).

            Return only the processed image. Result must look like an intentional dark theme design, not a simple inversion.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        },
        tools: [{ googleSearch: {} }]
      }
    });

    // Validate response structure
    if (!response?.candidates?.[0]?.content?.parts) {
      throw new Error('Invalid API response structure');
    }

    // Extract transformed image
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return res.status(200).json({
          success: true,
          result: `data:image/png;base64,${part.inlineData.data}`,
          remaining: rateLimitCheck.remaining
        });
      }
    }

    // No image data in response
    throw new Error('No image data in API response');

  } catch (error: unknown) {
    // Log error server-side only
    console.error('[Transform Error]', error);

    // Determine error type and return appropriate response
    if (error instanceof Error) {
      if (error.message.includes('not found') || error.message.includes('API key')) {
        return res.status(401).json({
          error: 'API_KEY_EXPIRED',
          message: 'Authentication failed. Please contact support.'
        });
      }

      if (error.message.includes('quota') || error.message.includes('limit')) {
        return res.status(429).json({
          error: 'QUOTA_EXCEEDED',
          message: 'API quota exceeded. Please try again later.'
        });
      }

      if (error.message.includes('network') || error.message.includes('timeout')) {
        return res.status(503).json({
          error: 'NETWORK_ERROR',
          message: 'Network error. Please check your connection and try again.'
        });
      }
    }

    // Generic error
    return res.status(500).json({
      error: 'TRANSFORMATION_FAILED',
      message: 'Transformation failed. Please try again or contact support if the issue persists.'
    });
  }
}
