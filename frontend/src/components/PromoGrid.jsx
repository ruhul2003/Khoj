"use client";

import React from 'react';
import Link from 'next/link';

const PROMOS = [
  {
    id: 1,
    badge: 'UP TO 20% OFF',
    title: 'On Headphones',
    price: 'From: $77.00',
    link: '/browse?category=Electronics',
    bg: 'bg-[#f4bf36]',
    textColor: 'text-slate-950',
    btnColor: 'text-slate-950 border-slate-950 hover:bg-slate-950 hover:text-white',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    badge: 'UP TO 30% OFF',
    title: "Women's Glasses",
    price: 'From: $49.00',
    link: '/browse?category=Fashion',
    bg: 'bg-[#1875f0]',
    textColor: 'text-white',
    btnColor: 'text-white border-white hover:bg-white hover:text-blue-600',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    badge: 'UP TO 35% OFF',
    title: 'Raoul Arm Chair',
    price: 'From: $99.00',
    link: '/browse?category=Furniture',
    bg: 'bg-[#dc2626]',
    textColor: 'text-white',
    btnColor: 'text-white border-white hover:bg-white hover:text-red-600',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
  }
];

export const PromoGrid = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 font-['Bai_Jamjuree']">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROMOS.map((promo) => (
          <div
            key={promo.id}
            className={`${promo.bg} rounded-3xl p-6 sm:p-8 flex items-center justify-between overflow-hidden relative shadow-md group`}
          >
            <div className={`space-y-3 z-10 max-w-[60%] ${promo.textColor}`}>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-black/15 inline-block">
                {promo.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight">
                {promo.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold opacity-90">
                {promo.price}
              </p>
              <div className="pt-2">
                <Link
                  href={promo.link}
                  className={`inline-block text-[11px] font-black uppercase tracking-wider pb-0.5 border-b-2 transition-colors cursor-pointer ${promo.btnColor}`}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>

            <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-2xl overflow-hidden shadow-lg border-2 border-white/40 shrink-0 transform group-hover:scale-105 transition-transform">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
