/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate image file for upload
 * Checks file type, size, and basic security constraints
 */
export const validateImageFile = (file: File): ValidationResult => {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Invalid file type. Only PNG, JPG, and WebP images are supported.',
    };
  }

  // Check file size
  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 10MB.',
    };
  }

  // Check file size minimum (avoid empty files)
  if (file.size < 100) {
    return {
      valid: false,
      error: 'File is too small or corrupted.',
    };
  }

  // Check file name for suspicious patterns
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return {
      valid: false,
      error: 'Invalid file name.',
    };
  }

  return { valid: true };
};

/**
 * Sanitize text input to prevent XSS and injection attacks
 * Trims whitespace and limits length
 */
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Remove potential HTML tags
};

/**
 * Validate URL to prevent open redirects and javascript: URLs
 */
export const validateURL = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const parsed = new URL(url);

    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false;
    }

    // Block localhost and private IPs in production
    if (import.meta.env.PROD) {
      const hostname = parsed.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // RFC 5322 compliant regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  if (email.length > 320) {
    return false; // Max email length per RFC
  }

  const parts = email.split('@');
  if (parts[0].length > 64) {
    return false; // Max local part length
  }

  return true;
};

/**
 * Sanitize form data object
 * Applies sanitization to all string fields
 */
export const sanitizeFormData = <T extends Record<string, any>>(
  data: T,
  maxLengths: Partial<Record<keyof T, number>> = {}
): T => {
  const sanitized = { ...data };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      const maxLength = maxLengths[key] || 1000;
      sanitized[key] = sanitizeInput(sanitized[key], maxLength);
    }
  }

  return sanitized;
};

/**
 * Validate file extension matches MIME type
 * Basic check to prevent MIME type spoofing
 */
export const validateFileExtension = (fileName: string, mimeType: string): boolean => {
  const extensionMap: Record<string, string[]> = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/jpg': ['.jpg', '.jpeg'],
    'image/webp': ['.webp'],
  };

  const allowedExtensions = extensionMap[mimeType.toLowerCase()];
  if (!allowedExtensions) {
    return false;
  }

  const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return allowedExtensions.includes(fileExtension);
};
