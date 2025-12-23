/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface NavbarProps {
  onNavClick: (view: 'home' | 'dashboard') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTechnologyClick = () => {
    onNavClick('home');
    setIsMobileMenuOpen(false);
    // Scroll to explainer section after navigation
    setTimeout(() => {
      const explainer = document.getElementById('explainer');
      if (explainer) {
        explainer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavClick = (view: 'home' | 'dashboard') => {
    onNavClick(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-8 left-0 right-0 z-[100] px-6">
      <nav className="max-w-[1200px] mx-auto bg-[#F2E5D8] h-20 rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white/60 flex items-center justify-between px-10 transition-all">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavClick('home');
            }
          }}
          aria-label="Sola home"
        >
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#4A4A4A] leading-none tracking-tighter group-hover:text-[#6A4FBF] transition-colors">Sola</span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">by Schroeder Technologies</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="text-sm font-bold text-[#4A4A4A] hover:text-[#6A4FBF] transition-colors uppercase tracking-widest"
          >
            Overview
          </button>
          <button
            onClick={handleTechnologyClick}
            className="text-sm font-bold text-[#4A4A4A] hover:text-[#6A4FBF] transition-colors uppercase tracking-widest"
          >
            Technology
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="clay-button px-6 py-2.5 text-[11px] bg-[#6A4FBF] text-white border-none shadow-lg hover:shadow-[#6A4FBF]/20"
          >
            Launch Sola
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-[#4A4A4A] flex flex-col gap-1.5 p-2 group relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <div className={`w-8 h-[3px] bg-[#4A4A4A] rounded-full group-hover:bg-[#6A4FBF] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-5 h-[3px] bg-[#4A4A4A] rounded-full self-end group-hover:bg-[#6A4FBF] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-8 h-[3px] bg-[#4A4A4A] rounded-full group-hover:bg-[#6A4FBF] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 w-8' : ''}`}></div>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div className="md:hidden mt-4 mx-6 bg-[#F2E5D8] rounded-[30px] shadow-xl border border-white/60 overflow-hidden animate-fade-in-up">
            <div className="flex flex-col p-6 gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left text-sm font-bold text-[#4A4A4A] hover:text-[#6A4FBF] transition-colors uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-white/50"
              >
                Overview
              </button>
              <button
                onClick={handleTechnologyClick}
                className="text-left text-sm font-bold text-[#4A4A4A] hover:text-[#6A4FBF] transition-colors uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-white/50"
              >
                Technology
              </button>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="clay-button px-6 py-3 text-[11px] bg-[#6A4FBF] text-white border-none shadow-lg text-center mt-2"
              >
                Launch Sola
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
