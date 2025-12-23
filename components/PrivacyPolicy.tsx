/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const PrivacyPolicy: React.FC = React.memo(() => {
  return (
    <div className="min-h-screen bg-[#F2E5D8] py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="clay-card p-12 bg-white">
          <h1 className="text-5xl font-black text-[#4A4A4A] mb-8 tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm text-gray-500 mb-8 font-medium">
            Last updated: December 23, 2025
          </p>

          <div className="space-y-8 text-[#4A4A4A]/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                Sola Theme Engine is designed with privacy in mind. We collect minimal information necessary to provide our services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Image Data:</strong> Screenshots you upload are processed temporarily and are not stored on our servers after transformation.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect anonymous usage statistics (request counts, error rates) to improve the service.
                </li>
                <li>
                  <strong>IP Address:</strong> Your IP address is used for rate limiting and abuse prevention, but is not stored permanently.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use the collected information solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your screenshot transformations using Google Gemini AI</li>
                <li>Provide AI chat assistance for design questions</li>
                <li>Prevent abuse through rate limiting</li>
                <li>Improve service performance and reliability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                3. Data Retention
              </h2>
              <p>
                <strong>Images:</strong> Uploaded screenshots are processed in memory and immediately discarded after transformation.
                We do not store your images on our servers.
              </p>
              <p className="mt-4">
                <strong>Logs:</strong> Server logs containing IP addresses and request metadata are retained for 30 days for security purposes,
                then permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                4. Third-Party Services
              </h2>
              <p className="mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google Gemini AI:</strong> Your images are sent to Google's Gemini API for processing.
                  See <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-[#6A4FBF] underline hover:no-underline">Google's API Terms</a>.
                </li>
                <li>
                  <strong>Vercel:</strong> Our hosting provider. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#6A4FBF] underline hover:no-underline">Vercel's Privacy Policy</a>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                5. Security
              </h2>
              <p>
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>HTTPS encryption for all data transmission</li>
                <li>Server-side API key storage (never exposed to clients)</li>
                <li>Input validation and sanitization</li>
                <li>Rate limiting to prevent abuse</li>
                <li>Security headers (CSP, HSTS, X-Frame-Options)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                6. Your Rights
              </h2>
              <p>
                Since we do not store personal information or images, there is no data to access, modify, or delete.
                Each transformation is processed independently without creating a user profile.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                7. Children's Privacy
              </h2>
              <p>
                Sola Theme Engine is not directed at individuals under 13 years of age. We do not knowingly collect
                information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an
                updated "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                9. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please open an issue on our{' '}
                <a
                  href="https://github.com/schroedertech/sola-theme-engine/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6A4FBF] underline hover:no-underline"
                >
                  GitHub repository
                </a>.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Built by Schroeder Technologies | Apache 2.0 License
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

PrivacyPolicy.displayName = 'PrivacyPolicy';

export default PrivacyPolicy;
