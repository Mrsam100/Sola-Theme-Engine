
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState } from 'react';
import { KnowledgeItem } from '../types';
import { getSourceColor } from '../constants';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: KnowledgeItem;
  relatedPapers: KnowledgeItem[];
  onBack: () => void;
  onProductClick: (item: KnowledgeItem) => void;
}

const TiltWrapper: React.FC<{ children: React.ReactNode; intensity?: number }> = ({ children, intensity = 10 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const rotateX = ((rect.height/2 - (e.clientY - rect.top)) / (rect.height/2)) * intensity;
        const rotateY = (((e.clientX - rect.left) - rect.width/2) / (rect.width/2)) * intensity;
        setRotation({ x: rotateX, y: rotateY });
    };
    return (
        <div 
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setRotation({x:0, y:0})}
            className="transition-transform duration-200 transform-style-3d"
            style={{ transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
            {children}
        </div>
    );
};

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  relatedPapers,
  onBack, 
  onProductClick
}) => {
  const sourceColor = getSourceColor(product.sourceType);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#fdfbf7]">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <button onClick={onBack} className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#6A4FBF] mb-12 hover:pl-2 transition-all">
            ← Back to Stack
        </button>

        <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                    <div 
                        className="w-16 h-16 rounded-[2rem] flex items-center justify-center text-white text-xl font-black shadow-2xl"
                        style={{ backgroundColor: sourceColor }}
                    >
                        {product.sourceType.substring(0,2)}
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#4A4A4A] tracking-tight">{product.title}</h1>
                        <span className="text-xs font-bold text-[#6A4FBF] uppercase tracking-widest">{product.sourceType} Knowledge Object</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                    {product.tags.map(t => (
                        <span key={t} className="px-4 py-2 bg-white rounded-xl shadow-sm text-xs font-black text-[#4A4A4A] border border-white">#{t}</span>
                    ))}
                    {product.language && (
                        <span className="px-4 py-2 bg-[#6A4FBF] text-white rounded-xl shadow-sm text-xs font-black">{product.language}</span>
                    )}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="md:col-span-3">
                <TiltWrapper intensity={3}>
                    <div className="bg-white rounded-[3rem] p-12 shadow-[30px_30px_60px_#d1d5db,-30px_-30px_60px_#ffffff] border border-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r" style={{ background: `linear-gradient(to right, ${sourceColor}, transparent)` }}></div>
                        <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-[#4A4A4A]/40">Internal Data</h3>
                        <div className="bg-gray-50 rounded-2xl p-6 font-mono text-sm text-[#4A4A4A] border border-gray-100 whitespace-pre-wrap">
                            {product.content}
                        </div>
                        {product.url && (
                            <a href={product.url} target="_blank" className="mt-8 inline-block px-8 py-3 bg-[#6A4FBF] text-white font-black text-xs rounded-xl shadow-lg hover:shadow-xl transition-all">
                                Open Source URI
                            </a>
                        )}
                    </div>
                </TiltWrapper>
            </div>

            <div className="space-y-8">
                <div className="bg-[#f3e8ff] rounded-3xl p-8 border border-white shadow-lg">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#6A4FBF] mb-4">Metadata</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-500 font-bold">Importance</span>
                            <span className="font-black text-[#6A4FBF]">{product.importance}/10</span>
                        </div>
                        {product.meta.repoStars && (
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500 font-bold">GitHub Stars</span>
                                <span className="font-black text-[#6A4FBF]">{product.meta.repoStars.toLocaleString()}</span>
                            </div>
                        )}
                        {product.meta.resolvedStatus !== undefined && (
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-gray-500 font-bold">Status</span>
                                <span className="font-black text-[#2AB9A9]">{product.meta.resolvedStatus ? 'Resolved' : 'Open'}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {relatedPapers.length > 0 && (
            <div className="pt-24 border-t border-gray-200">
                <h3 className="text-2xl font-black text-[#4A4A4A] mb-12 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6A4FBF] flex items-center justify-center text-white text-xs">∞</div>
                    Linked Concepts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedPapers.map(item => (
                        <ProductCard key={item.id} product={item} onClick={onProductClick} onUpvote={()=>{}} isUpvoted={false} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
