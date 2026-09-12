"use client";

import React from 'react';
import { Filter, RefreshCcw, Check, MapPin, ShieldCheck } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Mobile Phones',
  'Gaming',
  'Vehicles',
  'Furniture',
  'Fashion',
  'Books & Hobbies',
  'Home Appliances'
];

const DIVISIONS = [
  'All Bangladesh',
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh'
];

const CONDITIONS = [
  { id: 'All', label: 'All Conditions' },
  { id: 'Brand New', label: 'Brand New (Sealed)', color: 'text-[#38d4dc]' },
  { id: 'Used - Like New', label: 'Used - Like New', color: 'text-[#0c9096]' },
  { id: 'Used - Good', label: 'Used - Good', color: 'text-[#689db8]' },
  { id: 'Used - Fair', label: 'Used - Fair', color: 'text-amber-400' }
];

export const ProductFilter = ({
  category,
  setCategory,
  condition,
  setCondition,
  location = 'All Bangladesh',
  setLocation,
  verifiedOnly = false,
  setVerifiedOnly,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  onReset
}) => {
  const activeCount = [
    category !== 'All',
    condition !== 'All',
    location && location !== 'All Bangladesh' && location !== 'All',
    Boolean(verifiedOnly),
    Boolean(minPrice),
    Boolean(maxPrice),
    sort !== 'newest'
  ].filter(Boolean).length;

  const PRICE_PRESETS = [
    { label: '< ৳5K', min: '', max: '5000' },
    { label: '৳5K - ৳25K', min: '5000', max: '25000' },
    { label: '৳25K - ৳75K', min: '25000', max: '75000' },
    { label: '৳75K+', min: '75000', max: '' },
  ];

  const handleApplyPreset = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-8 font-['Bai_Jamjuree']">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-widest">
          <Filter className="w-4 h-4 text-[#0c9096]" />
          <span>Filter & Refine</span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#0c9096]/20 border border-[#0c9096]/40 text-[#38d4dc] text-[10px] font-extrabold">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onReset}
          className="text-xs text-zinc-400 hover:text-[#0c9096] flex items-center gap-1 transition-colors font-medium cursor-pointer"
        >
          <RefreshCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">
          Sort Catalog
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0c9096] cursor-pointer"
        >
          <option value="newest">Newest Listed First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="views">Most Popular</option>
        </select>
      </div>

      {/* Location / Division Filter */}
      {setLocation && (
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5 text-[#0c9096]" />
            Location / Division
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:border-[#0c9096] cursor-pointer"
          >
            {DIVISIONS.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Verified Sellers Toggle */}
      {setVerifiedOnly && (
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              verifiedOnly
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-md'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className={`w-4 h-4 ${verifiedOnly ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <span>Verified Sellers Only</span>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
              verifiedOnly ? 'bg-emerald-500 border-emerald-400 text-zinc-950' : 'border-zinc-700 bg-zinc-900'
            }`}>
              {verifiedOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </button>
        </div>
      )}

      <div>
        <label className="block text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">
          Condition Rating
        </label>
        <div className="space-y-2">
          {CONDITIONS.map((cond) => {
            const isSelected = condition === cond.id;
            return (
              <button
                key={cond.id}
                onClick={() => setCondition(cond.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0c9096]/20 text-[#38d4dc] font-bold border border-[#0c9096]/40'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <span className={cond.color || ''}>{cond.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0c9096]" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">
          Category
        </label>
        <div className="space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a6c71]/25 text-[#38d4dc] font-bold border border-[#0a6c71]/40 shadow-xs'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#38d4dc] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            Price Range (BDT / Tk)
          </label>
          {(minPrice || maxPrice) && (
            <button
              onClick={() => { setMinPrice(''); setMaxPrice(''); }}
              className="text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            type="number"
            placeholder="Min Tk"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs focus:outline-none focus:border-[#0c9096] font-medium"
          />
          <input
            type="number"
            placeholder="Max Tk"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs focus:outline-none focus:border-[#0c9096] font-medium"
          />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {PRICE_PRESETS.map((preset) => {
            const isPresetActive = minPrice === preset.min && maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleApplyPreset(preset.min, preset.max)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer text-center ${
                  isPresetActive
                    ? 'bg-[#0c9096]/20 border-[#0c9096] text-[#38d4dc]'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
