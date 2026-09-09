"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { api } from '@/lib/api';
import { ArrowRight, Tag, Zap, PlusCircle } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      const data = res.data || [];
      const featured = data.filter(p => p.isFeatured || p.price > 500);
      setFeaturedProducts(featured.slice(0, 4));
      setRecentProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecent = selectedCondition === 'All'
    ? recentProducts
    : recentProducts.filter(p => p.condition === selectedCondition);

  return (
    <div className="space-y-20 pb-24 font-['Bai_Jamjuree']">
      <HeroBanner />

      <section className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c9096] uppercase tracking-widest mb-1">
              <Zap className="w-4 h-4 fill-current" />
              Handpicked Deals
            </div>
            <h2 className="text-3xl font-extrabold text-white">Featured Marketplace Products</h2>
          </div>
          <Link
            href="/browse?featured=true"
            className="flex items-center gap-2 text-xs font-bold text-[#0c9096] hover:text-[#689db8] uppercase tracking-wider transition-colors"
          >
            <span>Browse All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-88 rounded-3xl bg-zinc-900/60 animate-pulse border border-zinc-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest inline-block">
                Transparent Quality Rating
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Filter by Item Condition
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Filter through unopened factory-sealed brand new gear, pristine like-new products, or budget-friendly pre-owned items.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Brand New', 'Used - Like New', 'Used - Good', 'Used - Fair'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCondition === cond
                      ? 'bg-white text-zinc-950 shadow-xl scale-105'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800/80">
          <div>
            <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <Tag className="w-6 h-6 text-[#689db8]" />
              Recently Added Listings ({filteredRecent.length})
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Freshly posted products from verified community sellers</p>
          </div>

          <Link
            href="/browse"
            className="flex items-center gap-2 text-xs font-bold text-[#689db8] hover:text-[#0c9096] uppercase tracking-wider transition-colors"
          >
            <span>Open Filter View</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-88 rounded-3xl bg-zinc-900/60 animate-pulse border border-zinc-800" />
            ))}
          </div>
        ) : filteredRecent.length === 0 ? (
          <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-4">
            <p className="text-zinc-400 text-sm">No items found matching "{selectedCondition}".</p>
            <button
              onClick={() => setSelectedCondition('All')}
              className="px-6 py-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
            >
              Reset Condition Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredRecent.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-10">
        <div className="glass-panel p-12 sm:p-16 rounded-3xl border border-zinc-800 bg-gradient-to-r from-[#031615] via-[#032e2e] to-[#031615] flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left shadow-2xl">
          <div className="space-y-4 max-w-2xl">
            <span className="px-4 py-1.5 rounded-full bg-[#0c9096]/15 text-[#0c9096] text-xs font-bold uppercase tracking-widest border border-[#0c9096]/30">
              Zero Listing Fees
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white">
              Turn unused gadgets, clothes & furniture into cash
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Create your ad listing in under 2 minutes. Receive direct buyer offers and chat live on Khoj.
            </p>
          </div>

          <Link
            href="/sell"
            className="px-10 py-5 bg-white text-[#031615] hover:bg-zinc-100 font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-3 transform hover:scale-105 transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-[#0c9096]" />
            <span>Post Your Free Product Ad</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
