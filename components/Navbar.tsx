
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface NavbarProps {
  onNavClick: (view: 'home' | 'dashboard') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  return (
    <div className="fixed top-8 left-0 right-0 z-[100] px-6">
      <nav className="max-w-[1200px] mx-auto bg-[#F2E5D8] h-20 rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white/60 flex items-center justify-between px-10 transition-all">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavClick('home')}
        >
          <div className="flex flex-col">
            <span className="text-2xl font-black text-[#4A4A4A] leading-none tracking-tighter group-hover:text-[#6A4FBF] transition-colors">Sola</span>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mt-1">by Schroeder Technologies</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavClick('home')} className="text-sm font-bold text-[#4A4A4A] hover:text-[#6A4FBF] transition-colors uppercase tracking-widest">Overview</button>
          <button onClick={() => onNavClick('home')} className="text-sm font-bold text-[#4A4A4A] hover:text-[#6A4FBF] transition-colors uppercase tracking-widest">Technology</button>
          <button 
            onClick={() => onNavClick('dashboard')}
            className="clay-button px-6 py-2.5 text-[11px] bg-[#6A4FBF] text-white border-none shadow-lg hover:shadow-[#6A4FBF]/20"
          >
            Launch Sola
          </button>
        </div>

        {/* Menu Icon matching the requested pixel-perfect style */}
        <button className="text-[#4A4A4A] flex flex-col gap-1.5 p-2 group">
          <div className="w-8 h-[3px] bg-[#4A4A4A] rounded-full group-hover:bg-[#6A4FBF] transition-colors"></div>
          <div className="w-5 h-[3px] bg-[#4A4A4A] rounded-full self-end group-hover:bg-[#6A4FBF] transition-colors"></div>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
