"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Heart, Eye, Sparkles, Tag, CheckCircle2 } from 'lucide-react';
import { Product } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isSaved } = useAuth();
  const saved = isSaved(product._id);

  // Helper for condition badge styling
  const getConditionBadge = (cond: string) => {
    switch (cond) {
      case 'Brand New':
        return {
          label: 'Brand New',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        };
      case 'Used - Like New':
        return {
          label: 'Used - Like New',
          bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        };
      case 'Used - Good':
        return {
          label: 'Used - Good',
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        };
      default:
        return {
          label: 'Used - Fair',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
    }
  };

  const badge = getConditionBadge(product.condition);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between relative">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-md ${badge.bg}`}>
            {badge.label}
          </span>
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold shadow">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all z-10 ${
            saved
              ? 'bg-pink-600/90 text-white border-pink-500 shadow-lg scale-110'
              : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:bg-slate-900 hover:text-white'
          }`}
          title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Status Overlay if Sold */}
        {product.status === 'Sold' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-4 py-1.5 bg-rose-600/90 text-white font-extrabold text-xs uppercase tracking-widest rounded-full border border-rose-400">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Location */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="font-semibold text-indigo-400 uppercase tracking-wider">{product.category}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              {product.location}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product._id}`}>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Seller Info Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white">${product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400">Negotiable offer available</p>
          </div>

          <Link
            href={`/product/${product._id}`}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 hover:border-indigo-500 transition-all flex items-center gap-1"
          >
            <span>View</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
