"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroBanner } from '@/components/HeroBanner';
import { ProductCard } from '@/components/ProductCard';
import { Product, api } from '@/lib/api';
import { Sparkles, ArrowRight, ShieldCheck, Tag, Zap, PlusCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      const data: Product[] = res.data || [];
      
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
    <div className="space-y-12 pb-16">
      
      {/* Hero Header */}
      <HeroBanner />

      {/* Featured Deals Carousel/Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Hot Picks
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Marketplace Deals</h2>
          </div>
          <Link
            href="/browse?featured=true"
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>See All Featured</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Interactive Condition Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold inline-block">
                Transparent Item Ratings
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Shop by Item Condition
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Whether you want factory-sealed brand new gear with warranty or high-value pre-owned electronics, filter effortlessly.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {['All', 'Brand New', 'Used - Like New', 'Used - Good', 'Used - Fair'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCondition === cond
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Browse Catalog Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-400" />
              Recently Listed Items ({filteredRecent.length})
            </h2>
            <p className="text-xs text-slate-400">Fresh listings posted by sellers across Bangladesh</p>
          </div>

          <Link
            href="/browse"
            className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
          >
            <span>Open Catalog Filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : filteredRecent.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-4">
            <p className="text-slate-400 text-sm">No items found for "{selectedCondition}" condition.</p>
            <button
              onClick={() => setSelectedCondition('All')}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
            >
              Show All Conditions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecent.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Sell Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/30">
              Turn Unused Items Into Cash
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Have something to sell? Post your ad in under 2 minutes!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              List laptops, mobile phones, furniture, or clothes for free. Connect directly with thousands of verified local buyers on Khoj.
            </p>
          </div>

          <Link
            href="/sell"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center gap-2 transform hover:scale-105 transition-all shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Post a Free Product Ad</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
