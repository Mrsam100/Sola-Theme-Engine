/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// API Base URL - use relative paths for same-origin requests
const API_BASE = '/api';

/**
 * Send a chat message to the Gemini AI assistant via backend proxy
 * @param history - Conversation history
 * @param message - User message
 * @returns AI response text
 */
export const sendMessageToGemini = async (
  history: { role: string; text: string }[],
  message: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        message,
      }),
    });

    const data = await response.json();

    // Handle error responses
    if (!response.ok) {
      throw new Error(data.error || 'CHAT_FAILED');
    }

    return data.response || "I'm sorry, I couldn't process your request at the moment.";
  } catch (error) {
    // Propagate errors with proper error codes
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('NETWORK_ERROR');
  }
};

/**
 * Transform a light-mode screenshot to dark-mode theme via backend proxy
 * @param base64Image - Base64 encoded image data (without data:image prefix)
 * @param mimeType - Image MIME type (e.g., 'image/png')
 * @returns Data URL of transformed dark-mode image
 */
export const transformScreenshotToDark = async (
  base64Image: string,
  mimeType: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE}/transform`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Image,
        mimeType,
      }),
    });

    const data = await response.json();

    // Handle error responses with specific error codes
    if (!response.ok) {
      // Map backend error codes to frontend error codes
      if (data.error === 'API_KEY_EXPIRED') {
        throw new Error('API_KEY_EXPIRED');
      }
      if (data.error === 'QUOTA_EXCEEDED') {
        throw new Error('QUOTA_EXCEEDED');
      }
      if (data.error === 'FILE_TOO_LARGE') {
        throw new Error('FILE_TOO_LARGE');
      }
      if (data.error === 'INVALID_FILE_TYPE') {
        throw new Error('INVALID_FILE_TYPE');
      }
      if (data.error === 'NETWORK_ERROR') {
        throw new Error('NETWORK_ERROR');
      }

      throw new Error('TRANSFORMATION_FAILED');
    }

    // Validate response
    if (!data.success || !data.result) {
      throw new Error('TRANSFORMATION_FAILED');
    }

    return data.result;
  } catch (error) {
    // Propagate errors with proper error codes
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('NETWORK_ERROR');
  }
};
