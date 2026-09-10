"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    discountBadge: 'FLAT 20% DISCOUNT',
    title: 'Wells Fabric 3-Seater Sofa With Cushions',
    price: '$49.59',
    buttonText: 'SHOP NOW',
    link: '/browse?category=Furniture',
    bgColor: 'bg-[#efc44f]',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Modern living room handcrafted comfort'
  },
  {
    id: 2,
    discountBadge: 'HOT DEAL - 30% OFF',
    title: 'Studio Hi-Fi Noise Cancelling Wireless Headphones',
    price: '$77.00',
    buttonText: 'SHOP NOW',
    link: '/browse?category=Electronics',
    bgColor: 'bg-[#e5b63b]',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Immersive sound with 40-hour battery life'
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative font-['Bai_Jamjuree'] overflow-hidden">
      <div className={`w-full ${slide.bgColor} transition-colors duration-500`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 sm:py-16 lg:py-20 relative">
          
          {/* Slider Arrow Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer hover:scale-105"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer hover:scale-105"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Slide Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Text Information */}
            <div className="lg:col-span-6 space-y-5 text-left z-10 pl-4 sm:pl-8">
              <span className="inline-block px-3.5 py-1.5 rounded-md bg-[#fed7aa] text-amber-950 font-black text-xs uppercase tracking-wider shadow-xs">
                {slide.discountBadge}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                {slide.title}
              </h1>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-white text-lg sm:text-xl font-medium">From</span>
                <span className="text-white text-3xl sm:text-4xl font-black tracking-tight">{slide.price}</span>
              </div>

              <div className="pt-2">
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white hover:bg-slate-900 text-slate-950 hover:text-white font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 transform cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{slide.buttonText}</span>
                </Link>
              </div>
            </div>

            {/* Right Product Showcase Cutout */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-xl aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-xs">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
