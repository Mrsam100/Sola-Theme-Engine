/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { transformScreenshotToDark } from '../services/geminiService';
import { ConversionState, ErrorCode } from '../types';
import { validateImageFile } from '../utils/validation';
import { getErrorMessage, isRecoverableError } from '../utils/errorMessages';
import { announceToScreenReader, announceLoading, announceSuccess, announceError } from '../utils/a11y';

const Dashboard: React.FC = () => {
  const [state, setState] = useState<ConversionState>({
    original: null,
    transformed: null,
    isProcessing: false,
    error: null,
    errorCode: undefined,
  });

  const [dragActive, setDragActive] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const loadingMessages = [
    "Analyzing UI Hierarchy...",
    "Mapping Color Spaces...",
    "Optimizing Contrast Ratios...",
    "Reconstructing Text Rendering...",
    "Applying Rim Lighting..."
  ];

  // Cycle through loading messages while processing
  useEffect(() => {
    let interval: number;
    if (state.isProcessing) {
      interval = window.setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [state.isProcessing, loadingMessages.length]);

  // Show success modal when transformation completes
  useEffect(() => {
    if (state.transformed && !state.isProcessing && !state.error) {
      setShowSuccessModal(true);
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.transformed, state.isProcessing, state.error]);

  // Compress image to reduce memory usage and improve performance
  const compressImage = async (file: File): Promise<{ base64: string; compressed: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => reject(new Error('Failed to read file'));

      reader.onload = (e) => {
        if (!e.target?.result) {
          reject(new Error('Failed to read file data'));
          return;
        }

        const img = new Image();

        img.onerror = () => reject(new Error('Invalid image file'));

        img.onload = () => {
          try {
            // Create canvas for compression
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Canvas not supported'));
              return;
            }

            // Limit max dimensions to 2048px to prevent memory issues
            const MAX_WIDTH = 2048;
            const MAX_HEIGHT = 2048;
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions while maintaining aspect ratio
            if (width > height) {
              if (width > MAX_WIDTH) {
                height = Math.floor((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width = Math.floor((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64 with 85% quality for good balance
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
            const cleanBase64 = compressedBase64.split(',')[1];

            resolve({ base64: compressedBase64, compressed: cleanBase64 });
          } catch (error) {
            reject(new Error('Image compression failed'));
          }
        };

        img.src = e.target.result as string;
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    // Validate file before processing
    const validation = validateImageFile(file);
    if (!validation.valid) {
      const errorCode: ErrorCode = 'INVALID_INPUT';
      const errorInfo = getErrorMessage(errorCode);

      setState(prev => ({
        ...prev,
        error: errorInfo.message,
        errorCode,
      }));

      // Announce error to screen readers
      announceError(errorInfo.message);
      return;
    }

    // Announce loading state
    announceLoading('Transforming screenshot to dark mode');

    // Set processing state
    setState(prev => ({
      ...prev,
      original: null,
      transformed: null,
      isProcessing: true,
      error: null,
      errorCode: undefined,
    }));

    try {
      // Compress image before sending to backend
      const { base64, compressed } = await compressImage(file);

      // Update state with compressed original image
      setState(prev => ({
        ...prev,
        original: base64,
      }));

      // Send compressed image to backend for transformation
      const result = await transformScreenshotToDark(compressed, file.type);

      setState(prev => ({
        ...prev,
        transformed: result,
        isProcessing: false,
      }));

      // Announce success to screen readers
      announceSuccess('Transformation complete. Your dark mode screenshot is ready.');
    } catch (error: unknown) {
      // Extract error code from Error object
      let errorCode: ErrorCode = 'TRANSFORMATION_FAILED';

      if (error instanceof Error) {
        // Map error messages to error codes
        if (error.message === 'API_KEY_EXPIRED') {
          errorCode = 'API_KEY_EXPIRED';
        } else if (error.message === 'QUOTA_EXCEEDED') {
          errorCode = 'QUOTA_EXCEEDED';
        } else if (error.message === 'FILE_TOO_LARGE') {
          errorCode = 'FILE_TOO_LARGE';
        } else if (error.message === 'INVALID_FILE_TYPE') {
          errorCode = 'INVALID_FILE_TYPE';
        } else if (error.message === 'NETWORK_ERROR') {
          errorCode = 'NETWORK_ERROR';
        } else if (error.message.includes('compression') || error.message.includes('Invalid image')) {
          errorCode = 'INVALID_INPUT';
        }
      }

      // Get user-friendly error message
      const errorInfo = getErrorMessage(errorCode);

      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: errorInfo.message,
        errorCode,
      }));

      // Announce error to screen readers
      announceError(errorInfo.message);
    }
  };

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
    setState({
      original: null,
      transformed: null,
      isProcessing: false,
      error: null,
      errorCode: undefined,
    });
  };

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

          <label className="clay-button px-12 py-5 bg-white text-[#4A4A4A] cursor-pointer shadow-lg hover:shadow-xl" aria-label="Upload screenshot file">
            Browse Files
            <input type="file" className="hidden" onChange={handleInput} accept="image/*" aria-label="Choose screenshot file to transform" />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#4A4A4A]/40">Input Signal</span>
              <button onClick={reset} className="text-[10px] font-black uppercase tracking-widest text-[#6A4FBF] hover:underline" aria-label="Replace screenshot with a new file">Replace</button>
            </div>
            <div className="clay-card p-6 bg-white shadow-2xl overflow-hidden min-h-[400px] flex items-center justify-center border-white">
              <img src={state.original} className="w-full h-auto rounded-2xl shadow-sm" alt="Original light mode screenshot uploaded for transformation" />
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
                <div className="text-center p-8" role="alert" aria-live="assertive">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  {state.errorCode && (
                    <>
                      <h3 className="text-white font-black mb-2 text-lg tracking-tight">
                        {getErrorMessage(state.errorCode).title}
                      </h3>
                      <p className="text-red-400 font-medium mb-6 text-sm leading-relaxed">
                        {getErrorMessage(state.errorCode).message}
                      </p>
                      <button
                        onClick={reset}
                        className="clay-button px-8 py-3 bg-white/10 text-white text-[10px] hover:bg-white/20 transition-colors"
                        aria-label={isRecoverableError(state.errorCode) ? 'Try transformation again' : 'Choose a different file'}
                      >
                        {isRecoverableError(state.errorCode) ? 'Try Again' : 'Choose New File'}
                      </button>
                    </>
                  )}
                </div>
              ) : state.transformed ? (
                <div className="w-full flex flex-col gap-8">
                  <img src={state.transformed} className="w-full h-auto rounded-2xl shadow-lg shadow-black/50" alt="Transformed dark mode screenshot ready for download" />
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={reset} className="py-4 bg-white/5 border border-white/10 rounded-2xl text-white/50 font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors" aria-label="Dismiss result and start new transformation">Dismiss</button>
                    <a href={state.transformed} download="sola-dark-pro.png" className="py-4 bg-[#6A4FBF] rounded-2xl text-white font-black text-xs uppercase tracking-widest text-center shadow-lg hover:shadow-xl transition-all" aria-label="Download transformed dark mode screenshot as PNG file">Download PNG</a>
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          role="alert"
          aria-live="polite"
        >
          <div className="clay-card p-8 bg-white shadow-2xl animate-scale-in pointer-events-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-black text-[#4A4A4A] tracking-tight">Transformation Complete!</h4>
                <p className="text-sm text-[#4A4A4A]/60 font-medium">Your dark mode screenshot is ready.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
