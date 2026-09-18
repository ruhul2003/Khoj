"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { api } from '@/lib/api';
import { Heart, ArrowLeft, ShoppingBag, Trash2, Sparkles, Scale, Share2 } from 'lucide-react';
import { useCompare } from '@/context/CompareContext';
import { formatBDT } from '@/utils/formatters';

export default function WishlistPage() {
  const { savedItemIds, toggleWishlist } = useAuth();
  const { addToast } = useToast();
  const { addToCompare, setIsCompareOpen } = useCompare();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistProducts();
  }, [savedItemIds]);

  const fetchWishlistProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/products');
      const all = res.data || [];
      const saved = all.filter(item => savedItemIds.includes(item._id));
      setProducts(saved);
    } catch (err) {
      console.error("Failed to load wishlist products", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    if (products.length === 0) return;
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to remove all saved items from your wishlist?')) {
      return;
    }
    savedItemIds.forEach(id => toggleWishlist(id));
    addToast('Wishlist cleared successfully', 'info');
  };

  const totalValuation = products.reduce((sum, p) => sum + (p.price || 0), 0);

  const handleCompareAll = () => {
    if (products.length === 0) return;
    products.slice(0, 4).forEach(prod => addToCompare(prod));
    setIsCompareOpen(true);
    addToast(`Added ${Math.min(products.length, 4)} items to comparison matrix`, 'success');
  };

  const handleShareWishlist = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      addToast('Wishlist link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Browsing</span>
        </Link>
        <div className="flex items-center gap-3">
          {products.length > 0 && (
            <>
              <button
                onClick={handleShareWishlist}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors cursor-pointer"
                title="Share your wishlist"
              >
                <Share2 className="w-3.5 h-3.5 text-[#0c9096]" />
                <span>Share List</span>
              </button>

              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Header Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shadow-xl">
            <Heart className="w-8 h-8 fill-rose-500/30" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Saved Items
            </div>
            <h1 className="text-3xl font-extrabold text-white">Your Saved Wishlist</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-zinc-400">
              <span>{products.length} {products.length === 1 ? 'item' : 'items'} bookmarked.</span>
              {products.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-white font-bold">
                    Total Estimated Value: <strong className="text-teal-400">{formatBDT(totalValuation)}</strong>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {products.length > 1 && (
            <button
              onClick={handleCompareAll}
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-teal-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-700 shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-[#0c9096]" />
              <span>Compare Wishlist</span>
            </button>
          )}

          <Link
            href="/browse"
            className="px-6 py-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore More Deals</span>
          </Link>
        </div>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-96 rounded-3xl bg-zinc-900/60 animate-pulse border border-zinc-800" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-16 rounded-3xl border border-zinc-800 text-center space-y-5 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-600 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Your Wishlist is Empty</h3>
            <p className="text-xs text-zinc-400">
              Tap the heart icon on any product listing to bookmark it and track price updates.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Discover Products</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-zinc-800/80 space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {['Electronics', 'Mobile Phones', 'Fashion', 'Vehicles'].map(cat => (
                <Link
                  key={cat}
                  href={`/browse?category=${encodeURIComponent(cat)}`}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] font-medium transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
