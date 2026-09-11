"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export const ProductCard = ({ product, countdown }) => {
  const { toggleWishlist, isSaved } = useAuth();
  const { addToast } = useToast();
  const saved = isSaved(product._id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product._id);
    if (saved) {
      addToast(`Removed "${product.title.slice(0, 25)}..." from wishlist`, 'info');
    } else {
      addToast(`Saved "${product.title.slice(0, 25)}..." to wishlist`, 'success');
    }
  };

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : (product.price > 100 ? 15 : 0);

  const originalPriceVal = product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : (discountPercent > 0 ? Math.round(product.price * 1.2) : null);

  // Formatting price to $ or ৳
  const formattedPrice = `$${product.price.toLocaleString()}`;
  const formattedOriginal = originalPriceVal ? `$${originalPriceVal.toLocaleString()}` : null;

  return (
    <div className="group bg-white dark:bg-[#131b26] rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between font-['Bai_Jamjuree'] relative">
      
      {/* Product Image Area */}
      <div className="relative aspect-square w-full p-4 bg-white dark:bg-[#182230] flex items-center justify-center overflow-hidden transition-colors">
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-black tracking-wider z-10">
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full border transition-all z-10 cursor-pointer ${
            saved
              ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-105'
              : 'bg-white/90 dark:bg-slate-800/90 text-gray-400 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:text-rose-500 hover:border-rose-300 hover:bg-white dark:hover:bg-slate-700'
          }`}
          title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
        </button>

        <img
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
          }}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />

        {product.status === 'Sold' && (
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-4 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 pt-2 flex flex-col justify-between flex-1 border-t border-gray-100 dark:border-slate-800/80 space-y-2 transition-colors">
        
        {/* Optional Countdown Timer or Category + Condition Tag */}
        {countdown ? (
          <div className="text-center py-1 px-2 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-[11px] tracking-wider">
            {countdown}
          </div>
        ) : (
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="text-gray-400 dark:text-slate-400 uppercase tracking-wider truncate">{product.category || 'General'}</span>
            {product.condition && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                product.condition.includes('Brand New') 
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300' 
                  : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
              }`}>
                {product.condition.replace('Used - ', '')}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <Link href={`/product/${product._id}`}>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Star Ratings */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Price Row */}
        <div className="pt-2 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            {formattedOriginal && (
              <span className="text-xs text-gray-400 dark:text-slate-500 line-through font-medium">
                {formattedOriginal}
              </span>
            )}
            <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <Link
            href={`/product/${product._id}`}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-gray-600 dark:text-slate-300 flex items-center justify-center transition-colors shadow-xs"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};
