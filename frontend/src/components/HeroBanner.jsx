"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Laptop, Smartphone, Car, Armchair, Gamepad2, Shirt, BookOpen, Sparkles, ArrowRight, Tv } from 'lucide-react';

const CATEGORIES = [
  { name: 'All', icon: Sparkles, color: 'text-[#0c9096]' },
  { name: 'Electronics', icon: Laptop, color: 'text-blue-400' },
  { name: 'Mobile Phones', icon: Smartphone, color: 'text-[#689db8]' },
  { name: 'Gaming', icon: Gamepad2, color: 'text-pink-400' },
  { name: 'Vehicles', icon: Car, color: 'text-emerald-400' },
  { name: 'Furniture', icon: Armchair, color: 'text-amber-400' },
  { name: 'Fashion', icon: Shirt, color: 'text-rose-400' },
  { name: 'Books & Hobbies', icon: BookOpen, color: 'text-cyan-400' },
  { name: 'Home Appliances', icon: Tv, color: 'text-purple-400' },
];

export const HeroBanner = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    let url = '/browse?';
    if (searchTerm.trim()) url += `search=${encodeURIComponent(searchTerm.trim())}&`;
    if (selectedCondition !== 'All') url += `condition=${encodeURIComponent(selectedCondition)}`;
    router.push(url);
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24 font-['Bai_Jamjuree']">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-[#0a6c71]/35 via-[#0c9096]/20 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#032e2e]/60 border border-[#264b5d] text-[#689db8] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#0c9096]" />
          <span>Minimalist Marketplace</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Buy and Sell <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#689db8] via-[#0c9096] to-[#38d4dc]">Used & Brand New</span> Items
        </h1>

        <p className="text-base sm:text-lg text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">
          The cleanest peer-to-peer trading experience. Browse verified pre-owned gadgets, vehicles, furniture, and fashion with instant buyer-seller proposals.
        </p>

        <div className="max-w-4xl mx-auto glass-panel p-4 rounded-3xl border border-zinc-800 shadow-2xl">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Search MacBook Pro, iPhone 15, Honda Civic, Gaming PC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-zinc-950/90 text-white placeholder-zinc-500 rounded-2xl text-sm border border-zinc-800 focus:outline-none focus:border-[#0c9096] font-medium"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-4.5" />
            </div>

            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full sm:w-auto px-5 py-4 bg-zinc-950/90 text-zinc-300 rounded-2xl text-xs sm:text-sm border border-zinc-800 focus:outline-none focus:border-[#0c9096] cursor-pointer font-semibold uppercase tracking-wider"
            >
              <option value="All">All Conditions</option>
              <option value="Brand New">Brand New</option>
              <option value="Used - Like New">Used - Like New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
            </select>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0a6c71] to-[#0c9096] hover:from-[#0c9096] hover:to-[#13a7ad] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-[#0c9096]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Deals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="pt-4 flex items-center justify-center flex-wrap gap-3 max-w-5xl mx-auto">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => router.push(cat.name === 'All' ? '/browse' : `/browse?category=${encodeURIComponent(cat.name)}`)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-white text-xs font-semibold transition-all transform hover:-translate-y-0.5"
              >
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
