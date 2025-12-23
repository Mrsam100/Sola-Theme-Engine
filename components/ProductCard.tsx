
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { KnowledgeItem } from '../types';
import { getSourceColor } from '../constants';

interface ProductCardProps {
  product: KnowledgeItem;
  onClick: (item: KnowledgeItem) => void;
  onUpvote: (id: string) => void;
  isUpvoted: boolean;
  // Added missing props passed from ProductGrid
  onPublisherClick?: (publisher: string) => void;
  onToggleSave?: (item: any) => void;
  isSaved?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const sourceColor = getSourceColor(product.sourceType);

  return (
    <div 
        className="clay-card clay-bevel p-6 h-full flex flex-col justify-between cursor-pointer hover:scale-[1.03] transition-all duration-300 relative group" 
        onClick={() => onClick(product)}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
             <div className="flex items-center gap-3">
                 <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black shadow-lg"
                    style={{ backgroundColor: sourceColor }}
                 >
                    {product.sourceType.substring(0,2).toUpperCase()}
                 </div>
                 <div>
                    <h3 className="font-bold text-[#4A4A4A] leading-tight text-lg group-hover:text-[#6A4FBF] transition-colors">{product.title}</h3>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.sourceType}</span>
                 </div>
             </div>
        </div>

        <div className="mb-6 h-32 w-full clay-img-inset bg-white/40 flex flex-col p-4 overflow-hidden">
             {product.sourceType === 'Snippet' ? (
                 <code className="text-[10px] text-[#6A4FBF] font-mono leading-tight block whitespace-pre">
                    {product.content.substring(0, 100)}...
                 </code>
             ) : (
                <div className="flex flex-col gap-2">
                    <div className="h-1.5 w-3/4 bg-gray-200 rounded-full"></div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
                    <div className="h-1.5 w-1/2 bg-gray-200 rounded-full"></div>
                </div>
             )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
             {product.tags.map((tag, i) => (
                 <span key={i} className="px-3 py-1 rounded-lg text-[9px] font-black text-[#6A4FBF] clay-tag">
                     {tag}
                 </span>
             ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-200/50 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>{new Date(product.timestamp).toLocaleDateString()}</span>
          <span className="text-[#6A4FBF]">Ref: {product.linkedItemIds.length}</span>
      </div>
    </div>
  );
}

export default ProductCard;
