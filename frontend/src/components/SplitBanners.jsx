"use client";

import React from 'react';
import Link from 'next/link';

export const SplitBanners = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 font-['Bai_Jamjuree']">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Banner 1: Contemporary 2 Seater Sofa */}
        <div className="bg-[#f5f5f4] rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-stone-200">
          <div className="w-full sm:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
              alt="Contemporary 2 Seater Sofa"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full sm:w-1/2 space-y-3 text-left">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
              Contemporary 2 Seater Sofa In White Colour
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="pt-2">
              <Link
                href="/browse?category=Furniture"
                className="inline-block px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>

        {/* Banner 2: Want To Capture Your Photograph */}
        <div className="bg-[#fce7f3]/50 rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-pink-100">
          <div className="w-full sm:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
              alt="Capture Photograph In Colour"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full sm:w-1/2 space-y-3 text-left">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
              Want To Capture Your Photograph In Colour
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <div className="pt-2">
              <Link
                href="/browse?category=Electronics"
                className="inline-block px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105"
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
