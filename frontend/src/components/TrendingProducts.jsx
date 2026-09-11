"use client";

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

const TABS = [
  { id: 'Fashion', label: 'Fashion', categoryKey: 'Fashion' },
  { id: 'Electronics', label: 'Electronics', categoryKey: 'Electronics' },
  { id: 'Furniture', label: 'Furniture', categoryKey: 'Furniture' },
  { id: 'Clothing & Shoes', label: 'Clothing & Shoes', categoryKey: 'Fashion' }
];

export const TrendingProducts = ({ allProducts = [] }) => {
  const [activeTab, setActiveTab] = useState('Fashion');
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  const filtered = allProducts.filter((p) => {
    if (activeTab === 'Fashion' || activeTab === 'Clothing & Shoes') {
      return p.category === 'Fashion' || p.category === 'Clothing';
    }
    return p.category === currentTab.categoryKey;
  });

  const displayProducts = filtered.length > 0 ? filtered : allProducts.slice(0, 6);

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 font-['Bai_Jamjuree']">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-gray-100 dark:border-slate-800 transition-colors">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Trending Products
          </h2>

          <div className="flex items-center gap-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors cursor-pointer shadow-xs"
            aria-label="Previous Products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors cursor-pointer shadow-xs"
            aria-label="Next Products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trending Products Grid / Row */}
      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[minmax(240px,280px)] gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {displayProducts.map((prod, idx) => (
          <ProductCard key={prod._id || idx} product={prod} />
        ))}
      </div>
    </section>
  );
};
