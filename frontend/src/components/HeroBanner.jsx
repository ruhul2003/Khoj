"use client";

import React, { useState, useEffect } from 'react';
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
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  // Automatic slide changing on its own every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative font-['Bai_Jamjuree'] overflow-hidden select-none">
      <div className={`w-full ${slide.bgColor} transition-colors duration-700 min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex items-center`}>
        <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12 py-8 sm:py-10 relative">
          
          {/* Slider Arrow Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all z-20 cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Slide Content Grid with locked height */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[360px] sm:min-h-[390px] lg:min-h-[420px]">
            
            {/* Left Text Information - Fixed Height Container with smooth transition */}
            <div 
              key={`text-${slide.id}`}
              className="lg:col-span-6 space-y-4 text-left z-10 pl-4 sm:pl-8 flex flex-col justify-center min-h-[220px] sm:min-h-[260px] lg:min-h-[280px] animate-in fade-in duration-500"
            >
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-md bg-[#fed7aa] text-amber-950 font-black text-xs uppercase tracking-wider shadow-xs">
                  {slide.discountBadge}
                </span>
              </div>

              {/* Fixed height title box so varying text length never changes banner height */}
              <div className="h-[72px] sm:h-[105px] lg:h-[125px] flex items-center overflow-hidden">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] line-clamp-2">
                  {slide.title}
                </h1>
              </div>

              <div className="flex items-baseline gap-2 pt-0.5">
                <span className="text-white text-base sm:text-lg font-medium">From</span>
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

            {/* Right Product Showcase Cutout - Fixed locked dimensions */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg sm:max-w-xl h-[220px] sm:h-[280px] lg:h-[340px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-xs">
                <img
                  key={`img-${slide.id}`}
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700 animate-in fade-in zoom-in-95"
                />
              </div>
            </div>

          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center gap-2.5 pt-4">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-10 bg-white shadow-lg shadow-white/30' 
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
