/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorCode } from '../types';

export interface ErrorMessageInfo {
  title: string;
  message: string;
  action?: string;
  icon?: 'warning' | 'error' | 'info';
}

/**
 * Maps error codes to user-friendly error messages
 * Technical errors are translated into helpful guidance
 */
export const getErrorMessage = (errorCode: ErrorCode): ErrorMessageInfo => {
  const errorMessages: Record<ErrorCode, ErrorMessageInfo> = {
    API_KEY_EXPIRED: {
      title: 'Authentication Error',
      message: 'The API authentication has expired. Please contact support to resolve this issue.',
      action: 'Contact Support',
      icon: 'error',
    },
    QUOTA_EXCEEDED: {
      title: 'Rate Limit Reached',
      message: 'You\'ve reached the hourly limit for transformations (10 per hour). Please wait a bit and try again.',
      action: 'Try Again Later',
      icon: 'warning',
    },
    FILE_TOO_LARGE: {
      title: 'File Too Large',
      message: 'Your image exceeds the 10MB size limit. Please compress your image or choose a smaller file.',
      action: 'Choose Different File',
      icon: 'warning',
    },
    INVALID_FILE_TYPE: {
      title: 'Invalid File Type',
      message: 'Only PNG, JPG, JPEG, and WebP image formats are supported. Please select a valid image file.',
      action: 'Choose Different File',
      icon: 'warning',
    },
    NETWORK_ERROR: {
      title: 'Connection Problem',
      message: 'Unable to reach the server. Please check your internet connection and try again.',
      action: 'Retry',
      icon: 'error',
    },
    TRANSFORMATION_FAILED: {
      title: 'Transformation Failed',
      message: 'We couldn\'t transform your image. This might be due to image complexity or temporary service issues. Please try again.',
      action: 'Try Again',
      icon: 'error',
    },
    CHAT_FAILED: {
      title: 'Chat Unavailable',
      message: 'The AI assistant is temporarily unavailable. Please try your question again in a moment.',
      action: 'Try Again',
      icon: 'error',
    },
    INVALID_INPUT: {
      title: 'Invalid Input',
      message: 'The provided input is invalid or contains unsupported characters. Please check your input and try again.',
      action: 'Fix Input',
      icon: 'warning',
    },
    GENERIC: {
      title: 'Something Went Wrong',
      message: 'An unexpected error occurred. Please try again, or contact support if the problem persists.',
      action: 'Try Again',
      icon: 'error',
    },
  };

  return errorMessages[errorCode] || errorMessages.GENERIC;
};

/**
 * Gets a simplified error message for inline display
 */
export const getSimpleErrorMessage = (errorCode: ErrorCode): string => {
  const info = getErrorMessage(errorCode);
  return info.message;
};

/**
 * Checks if an error is recoverable (user can retry)
 */
export const isRecoverableError = (errorCode: ErrorCode): boolean => {
  const recoverableErrors: ErrorCode[] = [
    'NETWORK_ERROR',
    'TRANSFORMATION_FAILED',
    'CHAT_FAILED',
    'QUOTA_EXCEEDED',
  ];
  return recoverableErrors.includes(errorCode);
};

/**
 * Checks if an error requires user action (file selection, input correction)
 */
export const requiresUserAction = (errorCode: ErrorCode): boolean => {
  const userActionErrors: ErrorCode[] = [
    'FILE_TOO_LARGE',
    'INVALID_FILE_TYPE',
    'INVALID_INPUT',
  ];
  return userActionErrors.includes(errorCode);
};
