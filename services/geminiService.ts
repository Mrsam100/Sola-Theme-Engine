
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";

// Fix for sendMessageToGemini missing export
export const sendMessageToGemini = async (history: { role: string; text: string }[], message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert history to Content format
    const contents = history.map(item => ({
      role: item.role === 'model' ? 'model' : 'user',
      parts: [{ text: item.text }]
    }));
    
    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: "You are an AI Literacy Guide for Schroeder Technologies. You help explain digital safety, AI bias, and data privacy to students, parents, and teachers in a friendly and clear manner."
      }
    });

    return response.text || "I'm sorry, I couldn't process your request at the moment.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

export const transformScreenshotToDark = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key missing");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Convert this light-mode UI screenshot to a professional, intentional dark-mode version. 
            
            RULES FOR TRANSFORMATION:
            1. BACKGROUNDS: Use a dark gray palette (Zinc/Slate #09090B to #1F1F1F). DO NOT use pure black #000000.
            2. TEXT: Map black/dark text to accessible soft whites and light grays (#E5E5E5 to #FAFAFA).
            3. ACCENTS: Recalibrate button/brand colors. Keep them recognizable but adjust their luminosity and saturation to prevent 'vibrating' contrast against dark backgrounds.
            4. SHADOWS: Remove large dark drop shadows. Replace with subtle elevation tints (making higher layers slightly lighter gray) or soft rim lighting.
            5. HIERARCHY: Maintain the existing visual hierarchy. Headlines should be the brightest text, body text slightly dimmer.
            6. ACCESSIBILITY: Ensure a professional aesthetic that meets WCAG contrast standards.
            
            Return ONLY the generated image. DO NOT return inverted junk—create a properly designed dark theme.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1" // Defaulting to 1:1 for UI captures, but Gemini usually respects source.
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data returned from AI");
  } catch (error) {
    console.error("Theme Transformation Error:", error);
    throw error;
  }
};
