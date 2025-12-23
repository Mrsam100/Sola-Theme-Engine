
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (history: { role: string; text: string }[], message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.map(item => ({
      role: item.role === 'model' ? 'model' : 'user',
      parts: [{ text: item.text }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents,
      config: {
        systemInstruction: "You are an AI Design Consultant for Schroeder Technologies. You help explain UI/UX principles, dark mode accessibility (WCAG), and modern theme architectures."
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
    // Create fresh instance right before call as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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
        tools: [{ googleSearch: {} }] // Utilize search for trend-accurate transformations
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Sola engine returned no visual data.");
  } catch (error) {
    console.error("Theme Transformation Error:", error);
    // Handle the specific error if API key needs re-selection
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      throw new Error("API_KEY_EXPIRED");
    }
    throw error;
  }
};
