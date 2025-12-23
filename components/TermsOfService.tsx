/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const TermsOfService: React.FC = React.memo(() => {
  return (
    <div className="min-h-screen bg-[#F2E5D8] py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="clay-card p-12 bg-white">
          <h1 className="text-5xl font-black text-[#4A4A4A] mb-8 tracking-tight">
            Terms of Service
          </h1>

          <p className="text-sm text-gray-500 mb-8 font-medium">
            Last updated: December 23, 2025
          </p>

          <div className="space-y-8 text-[#4A4A4A]/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Sola Theme Engine ("the Service"), you accept and agree to be bound by these
                Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                2. Description of Service
              </h2>
              <p className="mb-4">
                Sola Theme Engine provides an AI-powered tool that transforms light-mode UI screenshots into
                professional dark-mode themes using Google Gemini AI. The Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Screenshot-to-dark-mode transformation</li>
                <li>AI-powered design assistant chat</li>
                <li>Image compression and optimization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                3. Usage Limitations
              </h2>
              <p className="mb-4">
                To ensure fair usage and prevent abuse, the following rate limits apply:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Image Transformations:</strong> 10 requests per hour per IP address</li>
                <li><strong>AI Chat:</strong> 50 requests per hour per IP address</li>
                <li><strong>File Size:</strong> Maximum 10MB per image upload</li>
                <li><strong>File Types:</strong> PNG, JPG, JPEG, and WebP formats only</li>
              </ul>
              <p className="mt-4">
                Exceeding these limits may result in temporary service restrictions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                4. Acceptable Use
              </h2>
              <p className="mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Attempt to bypass rate limiting or security measures</li>
                <li>Upload malicious content, malware, or illegal material</li>
                <li>Use the Service to process copyrighted images without permission</li>
                <li>Reverse engineer or attempt to extract the underlying AI models</li>
                <li>Use automated tools (bots, scrapers) without explicit permission</li>
                <li>Interfere with the Service's operation or other users' access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                5. Intellectual Property
              </h2>
              <p className="mb-4">
                <strong>Your Content:</strong> You retain all rights to the images you upload. By using the Service,
                you grant us a temporary license to process your images solely for providing the transformation service.
              </p>
              <p>
                <strong>Our Content:</strong> The Service's code, design, and branding are protected by copyright and
                licensed under Apache 2.0. You may use the transformed output for any purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                6. Third-Party Services
              </h2>
              <p>
                The Service utilizes Google Gemini AI for image processing. Your use of the transformation feature
                is also subject to{' '}
                <a
                  href="https://ai.google.dev/gemini-api/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6A4FBF] underline hover:no-underline"
                >
                  Google's Gemini API Terms of Service
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. We do not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Uninterrupted or error-free operation</li>
                <li>Perfect accuracy of AI-generated transformations</li>
                <li>Compatibility with all image types or formats</li>
                <li>That transformed images will meet your specific requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                9. Termination
              </h2>
              <p>
                We reserve the right to terminate or suspend access to the Service immediately, without prior notice,
                for conduct that we believe violates these Terms or is harmful to other users or the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                10. Changes to Terms
              </h2>
              <p>
                We may modify these Terms at any time. Continued use of the Service after changes constitutes
                acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                11. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable laws, without regard
                to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-[#4A4A4A] mb-4">
                12. Contact
              </h2>
              <p>
                For questions about these Terms, please open an issue on our{' '}
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

TermsOfService.displayName = 'TermsOfService';

export default TermsOfService;
