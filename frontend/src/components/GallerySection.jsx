"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    title: 'How to Write a Blog Post Your Readers Will Love in 5 Steps',
    date: 'Sep 08, 2026',
    author: 'Editorial Team'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    title: '9 Content Marketing Trends and Ideas to Increase Traffic',
    date: 'Sep 05, 2026',
    author: 'Marketing Hub'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    title: 'The Ultimate Guide to Marketing Strategies to Improve Sales',
    date: 'Aug 29, 2026',
    author: 'Business Insights'
  }
];

export const GallerySection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 font-['Bai_Jamjuree']">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          From The Gallery
        </h2>

        {/* Carousel Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors cursor-pointer shadow-xs"
            aria-label="Previous Articles"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors cursor-pointer shadow-xs"
            aria-label="Next Articles"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Blog Cards */}
      <div
        ref={scrollRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
      >
        {ARTICLES.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col space-y-3 cursor-pointer"
          >
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-gray-400 font-semibold tracking-wide">
                {art.date} • {art.author}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2">
                {art.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
