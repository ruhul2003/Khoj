"use client";

import React from 'react';
import { Filter, RefreshCcw, Check } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Mobile Phones',
  'Gaming',
  'Vehicles',
  'Furniture',
  'Fashion',
  'Books & Hobbies'
];

const CONDITIONS = [
  { id: 'All', label: 'All Conditions' },
  { id: 'Brand New', label: 'Brand New (Sealed)', color: 'text-emerald-400' },
  { id: 'Used - Like New', label: 'Used - Like New', color: 'text-indigo-400' },
  { id: 'Used - Good', label: 'Used - Good', color: 'text-blue-400' },
  { id: 'Used - Fair', label: 'Used - Fair', color: 'text-amber-400' }
];

export const ProductFilter = ({
  category,
  setCategory,
  condition,
  setCondition,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  sort,
  setSort,
  onReset
}) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-8 font-['Bai_Jamjuree']">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-white text-xs uppercase tracking-widest">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filter & Refine</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-zinc-400 hover:text-indigo-400 flex items-center gap-1 transition-colors font-medium"
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
          className="w-full px-4 py-3 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="newest">Newest Listed First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="views">Most Popular</option>
        </select>
      </div>

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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/40'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                <span className={cond.color || ''}>{cond.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
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
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-purple-600/20 text-purple-300 font-bold border border-purple-500/40'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">
          Price Range (BDT / Tk)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 font-medium"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-zinc-950 text-zinc-200 border border-zinc-800 rounded-xl text-xs focus:outline-none focus:border-indigo-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
};
