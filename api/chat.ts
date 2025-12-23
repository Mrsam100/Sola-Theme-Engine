/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Rate limiting store (in-memory, will reset on cold starts)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 50; // requests per hour (more generous for chat)
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

// Sanitize input to prevent injection attacks
function sanitizeInput(text: string, maxLength: number = 2000): string {
  return text.trim().slice(0, maxLength);
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
  const { history, message } = req.body;

  // Input validation
  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Missing or invalid message'
    });
  }

  if (!Array.isArray(history)) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Invalid history format'
    });
  }

  // Validate history array
  if (history.length > 50) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'History too long. Maximum 50 messages.'
    });
  }

  // Sanitize message
  const sanitizedMessage = sanitizeInput(message, 2000);

  if (sanitizedMessage.length === 0) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'Message cannot be empty'
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

    // Build conversation history
    const contents = history.map((item: { role: string; text: string }) => ({
      role: item.role === 'model' ? 'model' : 'user',
      parts: [{ text: sanitizeInput(item.text, 2000) }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: sanitizedMessage }]
    });

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents,
      config: {
        systemInstruction: "You are an AI Design Consultant for Schroeder Technologies. You help explain UI/UX principles, dark mode accessibility (WCAG), and modern theme architectures. Be concise, helpful, and professional. Keep responses under 300 words."
      }
    });

    // Validate response
    if (!response?.text) {
      throw new Error('Invalid API response');
    }

    // Return response
    return res.status(200).json({
      success: true,
      response: response.text,
      remaining: rateLimitCheck.remaining
    });

  } catch (error: unknown) {
    // Log error server-side only
    console.error('[Chat Error]', error);

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

      if (error.message.includes('safety') || error.message.includes('blocked')) {
        return res.status(400).json({
          error: 'CONTENT_BLOCKED',
          message: 'Message blocked due to content policy. Please rephrase your question.'
        });
      }
    }

    // Generic error
    return res.status(500).json({
      error: 'CHAT_FAILED',
      message: 'Chat failed. Please try again or contact support if the issue persists.'
    });
  }
}
