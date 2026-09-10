"use client";

import React from 'react';
import Link from 'next/link';

export const TechBanner = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 font-['Bai_Jamjuree']">
      <div className="bg-[#17212d] rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-14 border border-slate-800 relative shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4 text-left z-10">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs">
              DISCOUNT UP TO 40 % OFF
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl">
              Vivo V40 Pro 5G V2347 Ganges Blue 256GB 8GB RAM
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-lg">
              Co-engineered with ZEISS optics. Ultra-slim 3D curved display with 5500mAh battery and 80W FlashCharge.
            </p>

            <div className="pt-2">
              <Link
                href="/browse?category=Mobile+Phones"
                className="inline-block px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-md hover:scale-105"
              >
                SHOP NOW
              </Link>
            </div>
          </div>

          {/* Right Smartphone Graphic Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-900/60">
              <img
                src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80"
                alt="Vivo V40 Pro 5G Smartphone"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
