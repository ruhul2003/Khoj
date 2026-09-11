"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    name: 'Electronics',
    categoryQuery: 'Electronics',
    bg: 'bg-[#fef3c7]',
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Clothing & Shoes',
    categoryQuery: 'Fashion',
    bg: 'bg-[#dcfce7]',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Auto & Tires',
    categoryQuery: 'Vehicles',
    bg: 'bg-[#ffe4e6]',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Grocery',
    categoryQuery: 'Books & Hobbies',
    bg: 'bg-[#e0f2fe]',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Baby & Nursery',
    categoryQuery: 'Home Appliances',
    bg: 'bg-[#fef9c3]',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Pet Supplies',
    categoryQuery: 'Gaming',
    bg: 'bg-[#ecfccb]',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sport & Outdoor',
    categoryQuery: 'Mobile Phones',
    bg: 'bg-[#fce7f3]',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=400&q=80'
  }
];

export const CategoryShowcase = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 font-['Bai_Jamjuree']">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100 dark:border-slate-800 transition-colors">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
          Shop By Categories
        </h2>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors cursor-pointer shadow-xs"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-center text-gray-600 dark:text-slate-300 transition-colors cursor-pointer shadow-xs"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-5 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {CATEGORY_ITEMS.map((cat, idx) => (
          <Link
            key={idx}
            href={`/browse?category=${encodeURIComponent(cat.categoryQuery)}`}
            className="group flex flex-col items-center shrink-0 w-36 sm:w-44 text-center space-y-3 cursor-pointer"
          >
            <div className={`w-32 sm:w-40 h-32 sm:h-40 rounded-2xl ${cat.bg} dark:opacity-90 p-4 flex items-center justify-center shadow-xs group-hover:shadow-md transition-all transform group-hover:-translate-y-1`}>
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 sm:w-28 h-24 sm:h-28 object-contain rounded-xl drop-shadow-md group-hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-amber-500 transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};
