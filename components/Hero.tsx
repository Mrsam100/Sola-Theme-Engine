
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { TECH_NAME, STUDIO_NAME } from '../constants';

interface HeroProps {
  onBegin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBegin }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Visual Depth Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#6A4FBF]/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FFB673]/5 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-3 mb-8">
            <span className="px-4 py-1.5 bg-white/60 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-[#6A4FBF] border border-white/60 shadow-sm">by {TECH_NAME}</span>
            <span className="px-4 py-1.5 bg-white/60 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-[#6A4FBF] border border-white/60 shadow-sm">{STUDIO_NAME}</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black text-[#4A4A4A] leading-[0.85] mb-8 tracking-tighter">
            Sola <br/>
            Engine <span className="text-[#6A4FBF]">v2.</span>
          </h1>

          <p className="text-xl text-[#4A4A4A]/70 mb-12 max-w-lg leading-relaxed font-semibold mx-auto lg:mx-0">
            Intelligent theme conversion by Schroeder Technologies. Upload a light mode screenshot, get a professional dark theme variant. No inverted grays—just intentional design.
          </p>

          <button 
            onClick={onBegin}
            className="clay-button px-12 py-6 text-xl font-black bg-[#6A4FBF] text-white shadow-[0_20px_40px_rgba(106,79,191,0.2)]"
          >
            Launch Sola
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative w-[400px] h-[500px] perspective-[2000px]">
            {/* The Light Side Card */}
            <div className="absolute inset-0 bg-white rounded-[40px] shadow-[20px_20px_60px_rgba(0,0,0,0.05)] border border-white p-8 animate-float transform rotate-y-[-10deg] rotate-x-6">
              <div className="flex flex-col gap-6">
                <div className="h-4 w-1/2 bg-gray-100 rounded-full"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner"></div>
                  <div className="h-24 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner"></div>
                </div>
                <div className="h-40 bg-gray-50 rounded-3xl border border-gray-100 shadow-inner"></div>
                <div className="h-12 w-full bg-[#6A4FBF] rounded-2xl shadow-lg"></div>
              </div>
            </div>

            {/* The Dark Side Card - Overlapping */}
            <div className="absolute inset-0 bg-[#09090B] rounded-[40px] shadow-2xl border border-gray-800 p-8 transform translate-x-16 translate-z-24 rotate-y-[-10deg] rotate-x-6 animate-float-delayed">
              <div className="flex flex-col gap-6">
                <div className="h-4 w-1/2 bg-gray-800 rounded-full"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-gray-900 rounded-2xl border border-gray-800 shadow-inner"></div>
                  <div className="h-24 bg-gray-900 rounded-2xl border border-gray-800 shadow-inner"></div>
                </div>
                <div className="h-40 bg-black rounded-3xl border border-gray-800 shadow-inner"></div>
                <div className="h-12 w-full bg-[#6A4FBF] opacity-80 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
