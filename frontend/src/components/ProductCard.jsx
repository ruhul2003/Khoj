"use client";

import React from 'react';
import Link from 'next/link';
import { MapPin, Heart, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, isSaved } = useAuth();
  const saved = isSaved(product._id);

  const getConditionBadge = (cond) => {
    switch (cond) {
      case 'Brand New':
        return { label: 'Brand New', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'Used - Like New':
        return { label: 'Used - Like New', bg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      case 'Used - Good':
        return { label: 'Used - Good', bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30' };
      default:
        return { label: 'Used - Fair', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    }
  };

  const badge = getConditionBadge(product.condition);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-zinc-800/70 font-['Bai_Jamjuree']">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start z-10">
          <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${badge.bg}`}>
            {badge.label}
          </span>
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-lg bg-rose-600 text-white text-[10px] font-extrabold shadow">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all z-10 ${
            saved
              ? 'bg-rose-600 text-white border-rose-500 shadow-lg scale-110'
              : 'bg-zinc-950/70 text-zinc-300 border-zinc-800 hover:bg-zinc-900 hover:text-white'
          }`}
          title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {product.status === 'Sold' && (
          <div className="absolute inset-0 bg-zinc-950/85 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="px-5 py-2 bg-rose-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-full border border-rose-400">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span className="font-bold text-indigo-400 uppercase tracking-widest text-[10px]">{product.category}</span>
            <span className="flex items-center gap-1 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              {product.location}
            </span>
          </div>

          <Link href={`/product/${product._id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white">৳{product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-zinc-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>

          <Link
            href={`/product/${product._id}`}
            className="px-4 py-2 bg-zinc-800 hover:bg-indigo-600 text-zinc-200 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-zinc-700 hover:border-indigo-500 transition-all flex items-center gap-1.5"
          >
            <span>View</span>
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
