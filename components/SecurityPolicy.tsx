/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const SecurityPolicy: React.FC = React.memo(() => {
  return (
    <div className="min-h-screen bg-[#F2E5D8] py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="clay-card p-12 bg-white">
          <h1 className="text-5xl font-black text-[#4A4A4A] mb-8 tracking-tight">
            Security Policy
          </h1>

          <p className="text-sm text-gray-500 mb-8 font-medium">
            Last updated: December 23, 2025
          </p>

          <div className="space-y-8 text-[#4A4A4A]/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                Our Commitment to Security
              </h2>
              <p>
                Sola Theme Engine takes security seriously. We've implemented multiple layers of protection to ensure
                your data is safe and our service is resilient against attacks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                1. API Key Protection
              </h2>
              <p className="mb-4">
                <strong>Problem:</strong> Exposing API keys in client-side code is a critical vulnerability.
              </p>
              <p className="mb-4">
                <strong>Our Solution:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All API keys are stored server-side in Vercel environment variables</li>
                <li>Keys are NEVER included in the client bundle or source code</li>
                <li>Backend proxy architecture ensures keys never leave the server</li>
                <li>No window.aistudio or direct Gemini API calls from the browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                2. Input Validation
              </h2>
              <p className="mb-4">All user inputs are rigorously validated:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>File Types:</strong> Only PNG, JPG, JPEG, and WebP allowed</li>
                <li><strong>File Size:</strong> Maximum 10MB to prevent memory exhaustion</li>
                <li><strong>Magic Numbers:</strong> File headers verified (not just extensions)</li>
                <li><strong>URL Validation:</strong> Prevents javascript: and data: URIs</li>
                <li><strong>Input Sanitization:</strong> All text inputs trimmed and length-limited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                3. XSS Prevention
              </h2>
              <p className="mb-4">
                Cross-Site Scripting (XSS) attacks are prevented through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>HTML entity escaping for all dynamic content</li>
                <li>Content Security Policy (CSP) headers</li>
                <li>Sanitization utilities for user-generated content</li>
                <li>React's built-in XSS protection (no dangerouslySetInnerHTML)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                4. Rate Limiting
              </h2>
              <p className="mb-4">
                To prevent abuse and ensure fair usage:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Transformations:</strong> 10 requests per hour per IP</li>
                <li><strong>Chat:</strong> 50 requests per hour per IP</li>
                <li>Automatic cleanup of expired rate limit entries</li>
                <li>Clear error messages when limits are exceeded</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                5. Security Headers
              </h2>
              <p className="mb-4">
                We implement comprehensive HTTP security headers:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm space-y-2">
                <div><strong>X-Frame-Options:</strong> DENY (prevents clickjacking)</div>
                <div><strong>X-Content-Type-Options:</strong> nosniff</div>
                <div><strong>Strict-Transport-Security:</strong> max-age=31536000</div>
                <div><strong>Content-Security-Policy:</strong> Restricts resource loading</div>
                <div><strong>Referrer-Policy:</strong> strict-origin-when-cross-origin</div>
                <div><strong>Permissions-Policy:</strong> Disables unnecessary features</div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                6. Data Protection
              </h2>
              <p className="mb-4">
                Your privacy is paramount:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Storage:</strong> Images are processed in memory and immediately discarded</li>
                <li><strong>HTTPS Only:</strong> All data transmission is encrypted</li>
                <li><strong>Minimal Logging:</strong> Only essential error logs (dev mode only)</li>
                <li><strong>No Tracking:</strong> No analytics, cookies, or user profiling</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                7. Error Handling
              </h2>
              <p className="mb-4">
                Secure error handling prevents information disclosure:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generic error messages in production</li>
                <li>Detailed stack traces only in development mode</li>
                <li>Error boundary catches React errors gracefully</li>
                <li>Proper TypeScript error types (no `any` types)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                8. Dependency Security
              </h2>
              <p>
                We maintain secure dependencies:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Regular updates to patch known vulnerabilities</li>
                <li>Minimal dependency footprint</li>
                <li>Official packages only (React, TypeScript, Vite, Google Genai)</li>
                <li>No deprecated or unmaintained packages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                9. Reporting Vulnerabilities
              </h2>
              <p className="mb-4">
                We welcome security researchers and responsible disclosure:
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <p className="font-bold text-[#4A4A4A] mb-2">
                  🔒 How to Report a Security Issue
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>DO NOT</strong> open a public GitHub issue for security vulnerabilities
                  </li>
                  <li>
                    Open a private security advisory on our{' '}
                    <a
                      href="https://github.com/schroedertech/sola-theme-engine/security/advisories/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6A4FBF] underline hover:no-underline"
                    >
                      GitHub repository
                    </a>
                  </li>
                  <li>Include steps to reproduce, impact assessment, and suggested fix (if any)</li>
                  <li>We'll respond within 48 hours and work with you on a fix</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                10. Security Checklist
              </h2>
              <p className="mb-4">
                Our production deployment checklist:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>API keys in Vercel environment variables</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>All inputs validated and sanitized</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Security headers configured</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Rate limiting active</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>HTTPS enforced</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>Error messages sanitized</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>No console.error in production</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✅</span>
                  <span>TypeScript strict mode enabled</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                11. Compliance
              </h2>
              <p>
                Sola Theme Engine follows security best practices:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>OWASP Top 10 vulnerability prevention</li>
                <li>WCAG AA accessibility standards</li>
                <li>Google Gemini API Terms compliance</li>
                <li>Apache 2.0 open-source license</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Built by Schroeder Technologies | Apache 2.0 License
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Security is a continuous process. We regularly audit and improve our security measures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

SecurityPolicy.displayName = 'SecurityPolicy';

export default SecurityPolicy;
