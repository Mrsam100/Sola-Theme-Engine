
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { EXPLAINER_SECTIONS } from '../constants';

const Explainer: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#F8E9DD] relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-24">
          <span className="px-4 py-2 bg-white/60 rounded-full text-xs font-black uppercase tracking-widest text-[#6A4FBF] border border-white/60 shadow-sm">Detailed Methodology</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#4A4A4A] mt-8 tracking-tighter">Why Sola Matters.</h2>
          <p className="mt-6 text-xl text-[#4A4A4A]/60 max-w-2xl mx-auto font-medium">We've spent thousands of hours studying human perception and UI accessibility to build a better theme engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {EXPLAINER_SECTIONS.map((section, idx) => (
            <div key={idx} className="clay-card p-12 group hover:scale-[1.02] transition-transform duration-300">
              <div className="w-16 h-16 bg-[#6A4FBF] rounded-2xl flex items-center justify-center text-3xl shadow-lg mb-8 group-hover:rotate-12 transition-transform">
                {section.icon}
              </div>
              <h3 className="text-3xl font-black text-[#4A4A4A] mb-6 tracking-tight">{section.title}</h3>
              <p className="text-lg text-[#4A4A4A]/70 leading-relaxed font-semibold">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-40 p-12 md:p-24 bg-white rounded-[60px] shadow-[40px_40px_80px_#d1c4bb,-40px_-40px_80px_#ffffff] border border-white flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h3 className="text-4xl font-black text-[#4A4A4A] mb-8 tracking-tighter leading-[1.1]">
              "Manual theme work is the tax designers pay for not having better tools."
            </h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">— The Gregorious Creative Philosophy</p>
          </div>
          
          <div className="flex-1 grid grid-cols-1 gap-10">
            <FeaturePoint 
              num="01" 
              title="Perceptual Luminance" 
              desc="We don't just change values; we adjust the saturation so primary colors feel as balanced on black as they do on white."
            />
            <FeaturePoint 
              num="02" 
              title="Layer Awareness" 
              desc="Our engine identifies elevation—backgrounds get darkest, while components 'lift' into lighter grays for natural depth."
            />
            <FeaturePoint 
              num="03" 
              title="Type Integrity" 
              desc="Text is never just inverted. We adjust font-weight rendering for dark mode to ensure pixel-perfect legibility."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturePoint: React.FC<{ num: string, title: string, desc: string }> = ({ num, title, desc }) => (
  <div className="flex items-start gap-6">
    <div className="text-4xl font-black text-[#6A4FBF]/20 mt-1">{num}</div>
    <div>
      <h4 className="font-black text-xl text-[#4A4A4A] mb-2">{title}</h4>
      <p className="text-[#4A4A4A]/60 font-medium">{desc}</p>
    </div>
  </div>
);

export default Explainer;
