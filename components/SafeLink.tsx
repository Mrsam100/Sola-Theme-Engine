/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { validateURL } from '../utils/validation';

interface SafeLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * SafeLink Component
 * Validates URLs before navigation to prevent open redirect vulnerabilities
 */
const SafeLink: React.FC<SafeLinkProps> = ({
  href,
  children,
  className = '',
  target = '_blank',
  rel = 'noopener noreferrer',
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Validate URL before navigation
    try {
      if (!validateURL(href)) {
        e.preventDefault();
        console.warn(`Blocked navigation to unsafe URL: ${href}`);
        alert('This link has been blocked for security reasons.');
        return;
      }
    } catch (error) {
      e.preventDefault();
      console.warn(`Invalid URL: ${href}`, error);
      alert('This link appears to be invalid.');
      return;
    }
  };

  // For external links, ensure proper security attributes
  const isExternal = href.startsWith('http://') || href.startsWith('https://');
  const safeRel = isExternal ? rel : undefined;
  const safeTarget = isExternal ? target : undefined;

  return (
    <a
      href={href}
      className={className}
      target={safeTarget}
      rel={safeRel}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default SafeLink;
