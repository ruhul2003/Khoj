"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Eye, Scale, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useCompare } from '@/context/CompareContext';
import { formatBDT } from '@/utils/formatters';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, isSaved } = useAuth();
  const { addToast } = useToast();
  const { addToCompare, removeFromCompare, isCompared } = useCompare();
  const saved = isSaved(product._id);
  const compared = isCompared(product._id || product.id);

  const handleCompareToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = product._id || product.id;
    if (compared) {
      removeFromCompare(id);
      addToast(`Removed from comparison`, 'info');
    } else {
      const result = addToCompare(product);
      if (result.success) {
        addToast(`Added "${product.title.slice(0, 20)}..." to compare`, 'success');
      } else {
        addToast(result.message, 'info');
      }
    }
  };

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

  // Formatting price to Bangladeshi Taka (৳)
  const formattedPrice = formatBDT(product.price);
  const formattedOriginal = originalPriceVal ? formatBDT(originalPriceVal) : null;

  return (
    <div className="group bg-white dark:bg-[#131b26] rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between font-['Bai_Jamjuree'] relative">
      
      {/* Product Image Area */}
      <div className="relative aspect-square w-full p-4 bg-gray-50/70 dark:bg-[#182230] flex items-center justify-center overflow-hidden transition-colors">
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-rose-600/90 text-white text-[10px] font-bold tracking-wider z-10 shadow-xs">
            -{discountPercent}%
          </span>
        )}

        {/* Action Buttons: Compare & Wishlist */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={handleCompareToggle}
            className={`p-1.5 rounded-full border transition-all cursor-pointer backdrop-blur-xs ${
              compared
                ? 'bg-[#0c9096] text-white border-[#0c9096] shadow-sm scale-105'
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-400 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:text-[#0c9096] hover:bg-white dark:hover:bg-slate-700'
            }`}
            title={compared ? 'Remove from compare' : 'Compare this product'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`p-1.5 rounded-full border transition-all cursor-pointer backdrop-blur-xs ${
              saved
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm scale-105'
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-400 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-700'
            }`}
            title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

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
            <span className="px-3.5 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 font-bold text-[11px] uppercase tracking-wider rounded-full">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2 transition-colors">
        
        {/* Category & Condition Tag */}
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 dark:text-slate-500">
          <span className="uppercase tracking-wider truncate">{product.category || 'General'}</span>
          {product.condition && (
            <span className="shrink-0 text-[10px] text-gray-400 dark:text-slate-500">
              {product.condition.replace('Used - ', '')}
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${product._id}`}>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Rating & Trust */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-800 dark:text-slate-200 text-xs">
              {product.sellerRating ? Number(product.sellerRating).toFixed(1) : '4.8'}
            </span>
            <span className="text-gray-400 dark:text-slate-500 text-[11px]">
              ({product.reviewsCount || 12})
            </span>
          </div>

          {(product.sellerRating >= 4.8 || product.isVerified) && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
              title="Verified Trusted Seller"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="pt-2 mt-auto flex items-baseline justify-between border-t border-gray-100 dark:border-slate-800/70">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white tracking-tight">
              {formattedPrice}
            </span>
            {formattedOriginal && (
              <span className="text-xs text-gray-400 dark:text-slate-500 line-through font-normal">
                {formattedOriginal}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product._id}`}
            className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-gray-500 dark:text-slate-300 flex items-center justify-center transition-colors shadow-xs"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
