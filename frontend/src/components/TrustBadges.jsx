"use client";

import React from 'react';
import { ShieldCheck, Truck, Gift, RotateCcw } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: '100% Genuine Products',
    iconColor: 'text-rose-500',
    bg: 'bg-rose-50'
  },
  {
    icon: Truck,
    title: 'Free Domestic Shipping',
    iconColor: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    icon: Gift,
    title: 'Offers And Discounts',
    iconColor: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    icon: RotateCcw,
    title: '7 Days Of Free Returning',
    iconColor: 'text-orange-500',
    bg: 'bg-orange-50'
  }
];

export const TrustBadges = () => {
  return (
    <div className="bg-white dark:bg-[#101722] border-b border-gray-100 dark:border-slate-800/80 py-6 font-['Bai_Jamjuree'] shadow-xs transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-between">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 justify-center sm:justify-start">
                <div className={`w-11 h-11 rounded-full ${item.bg} dark:bg-slate-800/90 flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon className={`w-5 h-5 ${item.iconColor} stroke-[2.2]`} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-slate-200 tracking-tight">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
