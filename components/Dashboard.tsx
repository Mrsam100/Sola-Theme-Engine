
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect } from 'react';
import { transformScreenshotToDark } from '../services/geminiService';
import { ConversionState } from '../types';

declare global {
  // Use interface for AIStudio to allow merging and match the expected global type name
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Add readonly modifier to match the global declaration provided by the environment
    readonly aistudio: AIStudio;
  }
}

const Dashboard: React.FC = () => {
  const [state, setState] = useState<ConversionState>({
    original: null,
    transformed: null,
    isProcessing: false,
    error: null
  });

  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Analyzing UI Hierarchy...",
    "Mapping Color Spaces...",
    "Optimizing Contrast Ratios...",
    "Reconstructing Text Rendering...",
    "Applying Rim Lighting..."
  ];

  useEffect(() => {
    const checkKey = async () => {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    };
    checkKey();
  }, []);

  useEffect(() => {
    let interval: number;
    if (state.isProcessing) {
      interval = window.setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [state.isProcessing]);

  const handleKeySetup = async () => {
    await window.aistudio.openSelectKey();
    setHasKey(true); // Proceed assuming success as per rules
  };

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
      } catch (err: any) {
        if (err.message === "API_KEY_EXPIRED") {
          setHasKey(false);
          setState(prev => ({ ...prev, isProcessing: false, error: "Authentication expired. Please re-connect your API key." }));
        } else {
          setState(prev => ({ ...prev, isProcessing: false, error: "Sola transformation failed. Check your network or project billing." }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Fixed missing handleInput function to process file input changes
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const reset = () => {
    setState({ original: null, transformed: null, isProcessing: false, error: null });
  };

  if (hasKey === false) {
    return (
      <div className="min-h-screen pt-48 flex flex-col items-center justify-center px-6 text-center animate-fade-in-up">
        <div className="clay-card p-12 max-w-lg bg-white">
          <div className="w-16 h-16 bg-[#6A4FBF]/10 rounded-2xl flex items-center justify-center text-[#6A4FBF] mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a3 3 0 01-3 3m-3-3a3 3 0 00-3 3m2.25 9a2.25 2.25 0 002.25-2.25V15M3 15V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v9" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-[#4A4A4A] mb-4">Enterprise Access Required</h2>
          <p className="text-gray-500 mb-8 font-medium">
            Sola Engine v2 requires a paid Google Cloud Project for high-fidelity transformations. Please select your API key to continue.
          </p>
          <button onClick={handleKeySetup} className="clay-button px-10 py-4 bg-[#6A4FBF] text-white w-full">
            Connect API Key
          </button>
          <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Requires billing enabled. See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline text-[#6A4FBF]">billing documentation</a>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-48 pb-32 px-6 max-w-[1200px] mx-auto animate-fade-in-up">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-black text-[#4A4A4A] tracking-tighter">Sola Workspace</h2>
        <p className="text-[#4A4A4A]/50 font-bold uppercase tracking-[0.2em] text-[11px] mt-4">Pro Tier Mapping Engine</p>
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
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">PNG or JPG • Max 10MB</p>
          
          <label className="clay-button px-12 py-5 bg-white text-[#4A4A4A] cursor-pointer shadow-lg hover:shadow-xl">
            Browse Files
            <input type="file" className="hidden" onChange={handleInput} accept="image/*" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#4A4A4A]/40">Input Signal</span>
              <button onClick={reset} className="text-[10px] font-black uppercase tracking-widest text-[#6A4FBF] hover:underline">Replace</button>
            </div>
            <div className="clay-card p-6 bg-white shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center border-white">
              <img src={state.original} className="w-full h-auto rounded-2xl shadow-sm" alt="Original" />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#4A4A4A]/40">Pro Mapping Result</span>
              {state.transformed && <span className="text-[10px] font-black uppercase tracking-widest text-[#2AB9A9]">Aura-Optimized</span>}
            </div>
            <div className="clay-card p-6 bg-[#09090B] shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center border-gray-800">
              {state.isProcessing ? (
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="w-16 h-16 border-4 border-[#6A4FBF]/20 border-t-[#6A4FBF] rounded-full animate-spin"></div>
                  <div>
                    <p className="text-[12px] font-black text-white uppercase tracking-[0.2em] mb-2">{loadingMessages[loadingStep]}</p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">Re-encoding Design Layers...</p>
                  </div>
                </div>
              ) : state.error ? (
                <div className="text-center p-8">
                  <p className="text-red-400 font-bold mb-6 text-sm">{state.error}</p>
                  <button onClick={state.error.includes('API') ? handleKeySetup : reset} className="clay-button px-8 py-3 bg-white/10 text-white text-[10px]">
                    {state.error.includes('API') ? 'Reconnect' : 'Try Again'}
                  </button>
                </div>
              ) : state.transformed ? (
                <div className="w-full flex flex-col gap-8">
                  <img src={state.transformed} className="w-full h-auto rounded-2xl shadow-lg shadow-black/50" alt="Transformed" />
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={reset} className="py-4 bg-white/5 border border-white/10 rounded-2xl text-white/50 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">Dismiss</button>
                    <a href={state.transformed} download="sola-dark-pro.png" className="py-4 bg-[#6A4FBF] rounded-2xl text-white font-black text-xs uppercase tracking-widest text-center shadow-lg hover:shadow-xl transition-all">Download PNG</a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {state.transformed && (
        <div className="mt-32 p-16 bg-white/40 rounded-[60px] shadow-[inset_10px_10px_30px_#d1c4bb,inset_-10px_-10px_30px_#ffffff] border border-white/50 text-center animate-fade-in-up">
          <h3 className="text-3xl font-black text-[#4A4A4A] mb-6 tracking-tighter">Gemini 3 Pro Intelligence</h3>
          <p className="text-lg text-[#4A4A4A]/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Unlike standard inversion, Sola Engine v2 leverages multimodal reasoning to understand UI semantics. 
            It preserves your brand's emotional resonance while ensuring a high-performance dark theme.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
