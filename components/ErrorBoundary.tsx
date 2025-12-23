/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../utils/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    logger.error('React Error Boundary caught an error', {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack,
    });

    // Store error info in state for display
    this.setState({
      errorInfo,
    });

    // In production, this would send to error tracking service
    // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#F2E5D8]">
          <div className="clay-card p-12 max-w-lg bg-white text-center shadow-2xl">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl font-black text-[#4A4A4A] mb-4 tracking-tight">
              Something Went Wrong
            </h2>

            <p className="text-gray-500 mb-8 font-medium text-sm leading-relaxed">
              We encountered an unexpected error. This has been logged and we'll look into it.
              Please try refreshing the page.
            </p>

            {/* Error Details (Development Only) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-8 text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                <summary className="cursor-pointer font-bold text-sm text-gray-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="text-xs text-gray-600 font-mono space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 overflow-auto max-h-40 text-xs">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="clay-button px-6 py-3 bg-white text-[#4A4A4A] border-2 border-gray-200 font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="clay-button px-6 py-3 bg-[#6A4FBF] text-white font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all"
              >
                Refresh Page
              </button>
            </div>

            {/* Support Link */}
            <p className="mt-8 text-xs text-gray-400 font-medium">
              If this problem persists, please{' '}
              <a
                href="https://github.com/schroedertech/sola-theme-engine/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6A4FBF] underline hover:no-underline"
              >
                report an issue
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
