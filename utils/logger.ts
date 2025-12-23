/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Development-only logger
 * In production, errors are hidden from console to prevent information disclosure
 */

const isDev = import.meta.env.DEV;

export const logger = {
  /**
   * Log error messages (only in development)
   * In production, errors should be sent to error tracking service
   */
  error: (message: string, error?: unknown) => {
    if (isDev) {
      console.error(`[Error] ${message}`, error || '');
    }
    // In production, send to error tracking service (e.g., Sentry, LogRocket)
    // if (!isDev && typeof window !== 'undefined') {
    //   // Example: Sentry.captureException(error);
    // }
  },

  /**
   * Log warning messages (only in development)
   */
  warn: (message: string, data?: unknown) => {
    if (isDev) {
      console.warn(`[Warning] ${message}`, data || '');
    }
  },

  /**
   * Log info messages (only in development)
   */
  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`[Info] ${message}`, data || '');
    }
  },

  /**
   * Log debug messages (only in development)
   */
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.debug(`[Debug] ${message}`, data || '');
    }
  },
};

/**
 * Log performance metrics (only in development)
 */
export const logPerformance = (label: string, startTime: number) => {
  if (isDev && typeof performance !== 'undefined') {
    const duration = performance.now() - startTime;
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
  }
};

/**
 * Create a performance timer
 * Usage:
 *   const timer = createTimer('My Operation');
 *   // ... do work ...
 *   timer.end();
 */
export const createTimer = (label: string) => {
  const startTime = performance.now();

  return {
    end: () => logPerformance(label, startTime),
    lap: (lapLabel: string) => {
      if (isDev) {
        const duration = performance.now() - startTime;
        console.log(`[Performance] ${label} - ${lapLabel}: ${duration.toFixed(2)}ms`);
      }
    },
  };
};
