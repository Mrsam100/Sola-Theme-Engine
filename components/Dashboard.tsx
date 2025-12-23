
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { transformScreenshotToDark } from '../services/geminiService';
import { ConversionState } from '../types';

const Dashboard: React.FC = () => {
  const [state, setState] = useState<ConversionState>({
    original: null,
    transformed: null,
    isProcessing: false,
    error: null
  });

  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      const cleanBase64 = base64.split(',')[1];
      
      setState(prev => ({ 
        ...prev, 
        original: base64, 
        transformed: null, 
        isProcessing: true,
        error: null 
      }));
      
      try {
        const result = await transformScreenshotToDark(cleanBase64, file.type);
        setState(prev => ({ ...prev, transformed: result, isProcessing: false }));
      } catch (err) {
        setState(prev => ({ ...prev, isProcessing: false, error: "Sola transformation failed. Please check your network." }));
      }
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const reset = () => {
    setState({ original: null, transformed: null, isProcessing: false, error: null });
  };

  return (
    <div className="min-h-screen pt-48 pb-32 px-6 max-w-[1200px] mx-auto animate-fade-in-up">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-black text-[#4A4A4A] tracking-tighter">Sola Workspace</h2>
        <p className="text-[#4A4A4A]/50 font-bold uppercase tracking-[0.2em] text-[11px] mt-4">by Schroeder Technologies</p>
      </div>

      {!state.original ? (
        <div 
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`clay-card h-[500px] flex flex-col items-center justify-center border-4 border-dashed transition-all duration-300 ${dragActive ? 'border-[#6A4FBF] bg-[#6A4FBF]/5 scale-[0.98]' : 'border-white bg-white/40'}`}
        >
          <div className="w-24 h-24 bg-[#6A4FBF] rounded-[32px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-[#6A4FBF]/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <p className="text-2xl font-black text-[#4A4A4A] mb-4">Drop Light UI Screenshot</p>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Sola engine accepts PNG or JPG</p>
          
          <label className="clay-button px-12 py-5 bg-white text-[#4A4A4A] cursor-pointer shadow-lg hover:shadow-xl">
            Select File
            <input type="file" className="hidden" onChange={handleInput} accept="image/*" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Original */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#4A4A4A]/40">Source Capture</span>
              <button onClick={reset} className="text-[10px] font-black uppercase tracking-widest text-[#6A4FBF] hover:underline">Clear</button>
            </div>
            <div className="clay-card p-6 bg-white shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center border-white">
              <img src={state.original} className="w-full h-auto rounded-2xl shadow-sm" alt="Original" />
            </div>
          </div>

          {/* Right: Transformed */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#4A4A4A]/40">Sola Dark Mapping</span>
              {state.transformed && <span className="text-[10px] font-black uppercase tracking-widest text-[#2AB9A9]">Conversion Perfected</span>}
            </div>
            <div className="clay-card p-6 bg-[#09090B] shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center border-gray-800">
              {state.isProcessing ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="w-12 h-12 border-4 border-[#6A4FBF]/20 border-t-[#6A4FBF] rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] animate-pulse">Sola Engine Mapping...</p>
                </div>
              ) : state.error ? (
                <div className="text-center p-8">
                  <p className="text-red-400 font-bold mb-4">{state.error}</p>
                  <button onClick={reset} className="clay-button px-6 py-2 bg-white/10 text-white text-xs">Try Again</button>
                </div>
              ) : state.transformed ? (
                <div className="w-full flex flex-col gap-8">
                  <img src={state.transformed} className="w-full h-auto rounded-2xl shadow-lg shadow-black/50" alt="Transformed" />
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={reset} className="py-4 bg-white/5 border border-white/10 rounded-2xl text-white/50 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Start New</button>
                    <a href={state.transformed} download="sola-dark-mode.png" className="py-4 bg-[#6A4FBF] rounded-2xl text-white font-black text-xs uppercase tracking-widest text-center shadow-lg hover:shadow-xl transition-all">Export PNG</a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {state.transformed && (
        <div className="mt-32 p-16 bg-white/40 rounded-[60px] shadow-[inset_10px_10px_30px_#d1c4bb,inset_-10px_-10px_30px_#ffffff] border border-white/50 text-center animate-fade-in-up">
          <h3 className="text-3xl font-black text-[#4A4A4A] mb-6 tracking-tighter">The Sola Advantage</h3>
          <p className="text-lg text-[#4A4A4A]/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Note the depth of the Zinc backgrounds—they prevent visual buzzing. 
            Sola text mapping ensures peak legibility in low-light environments by Schroeder Technologies.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
