"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Laptop, Smartphone, Car, Armchair, Gamepad2, Shirt, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  { name: 'All', icon: Sparkles, color: 'text-indigo-400' },
  { name: 'Electronics', icon: Laptop, color: 'text-blue-400' },
  { name: 'Mobile Phones', icon: Smartphone, color: 'text-purple-400' },
  { name: 'Gaming', icon: Gamepad2, color: 'text-pink-400' },
  { name: 'Vehicles', icon: Car, color: 'text-emerald-400' },
  { name: 'Furniture', icon: Armchair, color: 'text-amber-400' },
  { name: 'Fashion', icon: Shirt, color: 'text-rose-400' },
  { name: 'Books & Hobbies', icon: BookOpen, color: 'text-cyan-400' },
];

export const HeroBanner = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/browse?';
    if (searchTerm.trim()) url += `search=${encodeURIComponent(searchTerm.trim())}&`;
    if (selectedCondition !== 'All') url += `condition=${encodeURIComponent(selectedCondition)}`;
    router.push(url);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-12">
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-pink-600/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge Header */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Bangladesh’s #1 Buy & Sell Marketplace</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Buy & Sell <span className="glow-text">Used & Brand New</span> Products Near You
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Discover verified deals on MacBooks, iPhones, furniture, cars, and fashion. Turn unused items into instant cash or make offers on quality pre-owned goods.
        </p>

        {/* Main Search & Filter Box */}
        <div className="mt-8 max-w-3xl mx-auto glass-panel p-3 rounded-2xl border border-slate-700/80 shadow-2xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="What are you looking to buy today?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/90 text-white placeholder-slate-400 rounded-xl text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            {/* Quick Condition Selector */}
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 bg-slate-900/90 text-slate-300 rounded-xl text-xs sm:text-sm border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All">All Conditions</option>
              <option value="Brand New">Brand New</option>
              <option value="Used - Like New">Used - Like New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
            </select>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Explore Deals</span>
            </button>
          </form>
        </div>

        {/* Quick Category Chips */}
        <div className="mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-3 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => router.push(cat.name === 'All' ? '/browse' : `/browse?category=${encodeURIComponent(cat.name)}`)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all transform hover:-translate-y-0.5"
              >
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Live Marketplace Highlights */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 max-w-3xl mx-auto flex items-center justify-around text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct Buyer-Seller Chat</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Make Price Offers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span>Zero Listing Fees</span>
          </div>
        </div>

      </div>
    </div>
  );
};
