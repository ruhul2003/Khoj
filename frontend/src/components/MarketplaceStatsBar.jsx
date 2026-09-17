"use client";

import React from 'react';
import { ShieldCheck, MapPin, Percent, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export function MarketplaceStatsBar() {
  const stats = [
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      value: '12,500+',
      label: 'Verified Listings',
      desc: 'Tested peer-to-peer inventory'
    },
    {
      icon: <MapPin className="w-5 h-5 text-teal-400" />,
      value: '64 Districts',
      label: 'Nationwide Reach',
      desc: 'Local meetup & courier coverage'
    },
    {
      icon: <Percent className="w-5 h-5 text-emerald-400" />,
      value: '৳0 Platform Fee',
      label: 'Zero Commission',
      desc: 'Keep 100% of your selling price'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      value: '99.4%',
      label: 'Safe Trade Rating',
      desc: 'Physical inspection protected'
    }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 font-['Bai_Jamjuree']">
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-zinc-800/80 bg-zinc-950/90 dark:bg-[#111722]/90 backdrop-blur-xl shadow-2xl shadow-zinc-950/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/60">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${idx !== 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''}`}
            >
              <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 shadow-inner">
                {stat.icon}
              </div>
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-black text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-zinc-300 truncate">
                  {stat.label}
                </div>
                <div className="text-[10px] text-zinc-500 truncate font-light hidden sm:block">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
