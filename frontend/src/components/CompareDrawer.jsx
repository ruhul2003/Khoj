"use client";

import React from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { Scale, X, ArrowRight, Trash2, CheckCircle2, Star, MapPin } from 'lucide-react';

export function CompareDrawer() {
  const { compareItems, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useCompare();

  if (compareItems.length === 0) return null;

  const minPrice = Math.min(...compareItems.map(i => i.price || 0));

  return (
    <>
      {/* Floating Bottom Bar when collapsed */}
      {!isCompareOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5 font-['Bai_Jamjuree']">
          <div className="flex items-center gap-3 bg-zinc-950/95 text-white border border-[#0c9096]/60 px-5 py-3 rounded-2xl shadow-2xl shadow-[#0c9096]/30 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#0c9096]" />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Compare ({compareItems.length}/4)
              </span>
            </div>

            <div className="flex -space-x-2 overflow-hidden">
              {compareItems.map(item => (
                <img
                  key={item._id || item.id}
                  src={item.images?.[0] || ''}
                  alt={item.title}
                  className="w-8 h-8 rounded-full object-cover border-2 border-zinc-900"
                />
              ))}
            </div>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3.5 py-1.5 bg-[#0c9096] hover:bg-[#0a6c71] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              View Matrix
            </button>

            <button
              onClick={clearCompare}
              className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Clear Comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Full Compare Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md overflow-y-auto font-['Bai_Jamjuree']">
          <div className="glass-panel w-full max-w-6xl max-h-[90vh] rounded-3xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden my-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    Product Comparison Matrix
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Side-by-side spec and price evaluation ({compareItems.length} selected)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-xs font-bold text-zinc-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-rose-500/30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
                <button
                  onClick={() => setIsCompareOpen(false)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Matrix Content */}
            <div className="p-6 overflow-x-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-w-[700px]">
                {compareItems.map((item) => {
                  const id = item._id || item.id;
                  const isLowest = item.price === minPrice && compareItems.length > 1;

                  return (
                    <div
                      key={id}
                      className="glass-panel p-5 rounded-2xl border border-zinc-800/80 flex flex-col justify-between space-y-4 relative group"
                    >
                      <button
                        onClick={() => removeFromCompare(id)}
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-zinc-900/80 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-3">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 relative">
                          <img
                            src={item.images?.[0] || ''}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {isLowest && (
                            <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-extrabold uppercase tracking-wider">
                              Lowest Price
                            </span>
                          )}
                        </div>

                        <div>
                          <span className="text-[10px] text-[#0c9096] font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h4 className="text-sm font-bold text-white line-clamp-2 mt-0.5">
                            {item.title}
                          </h4>
                        </div>

                        {/* Price Row */}
                        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block font-bold">
                            Price
                          </span>
                          <div className="text-xl font-black text-white">
                            ৳{item.price?.toLocaleString()}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-[11px] text-zinc-500 line-through">
                              ৳{item.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>

                        {/* Attribute Specs */}
                        <div className="space-y-2 text-xs divide-y divide-zinc-800/60 pt-1">
                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-zinc-500 font-medium">Condition</span>
                            <span className="font-bold text-white">{item.condition}</span>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-zinc-500 font-medium">Location</span>
                            <span className="font-bold text-white flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-zinc-400" /> {item.location}
                            </span>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-zinc-500 font-medium">Seller</span>
                            <span className="font-bold text-white flex items-center gap-1">
                              {item.sellerName}
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-amber-400">{item.sellerRating || 4.9}</span>
                            </span>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-zinc-500 font-medium">Status</span>
                            <span className={`font-bold ${item.status === 'Sold' ? 'text-rose-400' : 'text-emerald-400'}`}>
                              {item.status || 'Available'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/product/${id}`}
                        onClick={() => setIsCompareOpen(false)}
                        className="w-full py-2.5 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
                      >
                        <span>View Listing</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
