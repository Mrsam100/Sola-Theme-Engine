/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Basic HTML sanitization without external dependencies
 * For production, consider using DOMPurify
 */
export const sanitizeHTML = (dirty: string): string => {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }

  // Basic HTML entity encoding
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return dirty.replace(/[&<>"'/]/g, (char) => htmlEntities[char] || char);
};

/**
 * Sanitize text for safe display
 * Removes or escapes potentially dangerous characters
 */
export const sanitizeText = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove null bytes
  let sanitized = text.replace(/\0/g, '');

  // Escape HTML special characters
  sanitized = sanitizeHTML(sanitized);

  return sanitized;
};

/**
 * Sanitize URL to prevent XSS via javascript: or data: protocols
 */
export const sanitizeURL = (url: string): string => {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim().toLowerCase();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      return '';
    }
  }

  // Allow only http, https, and relative URLs
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return url.trim();
  }

  // Default: return empty for safety
  return '';
};

/**
 * Escape special regex characters in a string
 */
export const escapeRegex = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Sanitize user input for search queries
 * Prevents regex injection and other search-based attacks
 */
export const sanitizeSearchQuery = (query: string): string => {
  if (!query || typeof query !== 'string') {
    return '';
  }

  // Remove special characters that could break search
  return query
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 200); // Limit length
};

/**
 * Strip all HTML tags from a string
 * Use carefully - this is aggressive sanitization
 */
export const stripHTMLTags = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  return html.replace(/<[^>]*>/g, '');
};

/**
 * Sanitize filename for safe storage/display
 */
export const sanitizeFilename = (filename: string): string => {
  if (!filename || typeof filename !== 'string') {
    return 'file';
  }

  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
    .replace(/\.{2,}/g, '.') // Prevent directory traversal
    .slice(0, 255); // Limit length
};
