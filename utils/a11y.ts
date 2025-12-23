/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Accessibility Utilities
 * Provides screen reader announcements and keyboard navigation helpers
 */

/**
 * Creates a live region announcement for screen readers
 * @param message - The message to announce
 * @param priority - 'polite' (waits for pause) or 'assertive' (interrupts)
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return;

  // Create or get the announcement container
  let announcer = document.getElementById('sr-announcer');

  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  } else {
    // Update priority if needed
    announcer.setAttribute('aria-live', priority);
  }

  // Clear and set new message
  announcer.textContent = '';

  // Use timeout to ensure screen readers detect the change
  setTimeout(() => {
    announcer.textContent = message;
  }, 100);
};

/**
 * Announces loading state to screen readers
 */
export const announceLoading = (message: string = 'Loading'): void => {
  announceToScreenReader(`${message}. Please wait.`, 'polite');
};

/**
 * Announces success to screen readers
 */
export const announceSuccess = (message: string): void => {
  announceToScreenReader(`Success: ${message}`, 'polite');
};

/**
 * Announces error to screen readers
 */
export const announceError = (message: string): void => {
  announceToScreenReader(`Error: ${message}`, 'assertive');
};

/**
 * Handles keyboard navigation for interactive elements
 * Allows Enter and Space to activate elements (like buttons)
 */
export const handleKeyboardActivation = (
  event: React.KeyboardEvent,
  callback: () => void
): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

/**
 * Traps focus within a modal or dialog
 * @param element - The container element to trap focus within
 */
export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

/**
 * Sets focus to the first focusable element within a container
 */
export const focusFirstElement = (container: HTMLElement): void => {
  const focusableElement = container.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElement) {
    focusableElement.focus();
  }
};

/**
 * Generates a unique ID for accessibility attributes
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};
