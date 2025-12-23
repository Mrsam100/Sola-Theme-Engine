
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import SafeLink from './SafeLink';
import { ViewState } from '../types';

interface FooterProps {
  onNavClick: (view: ViewState['type']) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <div className="px-6 pb-12 mt-24">
      <footer className="max-w-[1400px] mx-auto bg-[#6A4FBF] rounded-[80px] p-16 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_rgba(106,79,191,0.4)] border border-white/10">
        {/* The Plate Lighting Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/20 blur-[100px] rounded-full -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
          <div className="space-y-6">
            <h4 className="text-2xl font-black">Sola Engine</h4>
            <ul className="space-y-4 text-white/70 font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Design Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transformation Logic</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Future Specs</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl font-black">Resources</h4>
            <ul className="space-y-4 text-white/70 font-bold">
              <li><a href="#" className="hover:text-white transition-colors">API Keys</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mapping Config</a></li>
              <li><a href="#" className="hover:text-white transition-colors">UI Templates</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl font-black">Attribution</h4>
            <ul className="space-y-4 text-white/70 font-bold">
              <li><a href="#" className="hover:text-white transition-colors">Schroeder Technologies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gregorious Creative</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brand Assets</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-2xl font-black">Legal</h4>
            <ul className="space-y-4 text-white/70 font-bold">
              <li>
                <button
                  onClick={() => onNavClick('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Usage Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('security')}
                  className="hover:text-white transition-colors text-left"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div className="flex flex-col gap-2">
            <p className="text-white font-black text-xl tracking-tighter">Sola <span className="text-white/40 text-sm font-bold ml-2">by Schroeder Technologies</span></p>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase">© 2025 Schroeder Technologies. All rights reserved.</p>
          </div>
          
          <div className="flex gap-6">
            <SocialIcon platform="twitter" url="https://twitter.com/schroedertech" />
            <SocialIcon platform="github" url="https://github.com/schroedertech/sola-theme-engine" />
            <SocialIcon platform="linkedin" url="https://linkedin.com/company/schroedertech" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const SocialIcon: React.FC<{ platform: string; url: string }> = ({ platform, url }) => {
  return (
    <SafeLink href={url} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-xl border border-white/5 active:scale-95">
      <span className="sr-only">{platform}</span>
      {platform === 'twitter' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>}
      {platform === 'github' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
      {platform === 'linkedin' && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
    </SafeLink>
  );
};

export default Footer;
