"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';

export const PopularProducts = ({ products = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const sampleCountdowns = [
    null,
    null,
    '768d : 13h : 46m : 54s',
    '805d : 14h : 56m : 57s',
    null,
    '420d : 08h : 12m : 30s'
  ];

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 font-['Bai_Jamjuree']">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100 dark:border-slate-800 transition-colors">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Popular Products
        </h2>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
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

      {/* Products Row / Grid */}
      <div
        ref={scrollRef}
        className="grid grid-flow-col auto-cols-[minmax(240px,280px)] gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {products.slice(0, 8).map((product, idx) => (
          <ProductCard
            key={product._id || idx}
            product={product}
            countdown={sampleCountdowns[idx % sampleCountdowns.length]}
          />
        ))}
      </div>
    </section>
  );
};
