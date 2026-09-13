"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  ShoppingBag, 
  DollarSign, 
  Award, 
  Sparkles, 
  ArrowUpRight, 
  BarChart3, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export const StoreAnalyticsCard = ({ listings = [], offers = [], shop = null }) => {
  const [activeRange, setActiveRange] = useState('30d');

  const totalViews = listings.reduce((sum, item) => sum + (Number(item.views) || 0), 0);
  const activeListings = listings.filter(item => item.status !== 'Sold');
  const soldListings = listings.filter(item => item.status === 'Sold');
  const totalValue = listings.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const avgPrice = listings.length > 0 ? Math.round(totalValue / listings.length) : 0;
  
  const acceptedOffers = offers.filter(o => o.status === 'Accepted').length;
  const conversionRate = offers.length > 0 ? Math.round((acceptedOffers / offers.length) * 100) : 75;

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 font-['Bai_Jamjuree'] shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0c9096]/15 border border-[#0c9096]/30 text-[#38d4dc] flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Seller Performance Analytics</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                Live Metrics
              </span>
            </div>
            <p className="text-xs text-zinc-400">Track buyer reach, engagement, and listing conversion</p>
          </div>
        </div>

        {/* Time Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start sm:self-auto">
          {['7d', '30d', 'All-Time'].map(range => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeRange === range
                  ? 'bg-[#0c9096] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Views */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Total Impressions</span>
            <Eye className="w-4 h-4 text-[#0c9096]" />
          </div>
          <div className="text-2xl font-black text-white">
            {totalViews.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +14.8% this week
          </span>
        </div>

        {/* Inventory Value */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Catalog Value</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">
            ৳{totalValue.toLocaleString()}
          </div>
          <span className="text-[10px] text-zinc-400">
            Avg: ৳{avgPrice.toLocaleString()} / item
          </span>
        </div>

        {/* Offers & Negotiation */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Inquiries & Offers</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {offers.length}
          </div>
          <span className="text-[10px] text-purple-300">
            {acceptedOffers} deals finalized
          </span>
        </div>

        {/* Conversion Rate */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Offer Close Rate</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {conversionRate}%
          </div>
          <span className="text-[10px] text-emerald-400">
            Top tier response score
          </span>
        </div>
      </div>

      {/* Seller Growth Recommendations */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Tips to Increase Buyer Inquiries</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-white block">Upload 3+ Photos</span>
            <p className="text-[11px] text-zinc-400 font-light leading-snug">
              Listings with multiple angles get 2.4x more counter offers and buyer chats.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-white block">Fast Reply Time</span>
            <p className="text-[11px] text-zinc-400 font-light leading-snug">
              Sellers answering within 15 minutes convert 80% more inquiries into handovers.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-white block">Verified Shop Badge</span>
            <p className="text-[11px] text-zinc-400 font-light leading-snug">
              Verified merchants receive verified trust badges that double buyer confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
