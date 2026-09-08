"use client";

import React from 'react';
import { Filter, RefreshCcw, DollarSign, Tag, Check, Sparkles } from 'lucide-react';

interface ProductFilterProps {
  category: string;
  setCategory: (val: string) => void;
  condition: string;
  setCondition: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
  onReset: () => void;
}

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

export const ProductFilter: React.FC<ProductFilterProps> = ({
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
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filter & Refine</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <RefreshCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Sort By Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
          Sort Results By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-700/80 rounded-xl text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="newest">Newest Listed First</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="views">Most Popular / Viewed</option>
        </select>
      </div>

      {/* Item Condition Filter */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
          Item Condition
        </label>
        <div className="space-y-1.5">
          {CONDITIONS.map((cond) => {
            const isSelected = condition === cond.id;
            return (
              <button
                key={cond.id}
                onClick={() => setCondition(cond.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/40'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white border border-transparent'
                }`}
              >
                <span className={cond.color || ''}>{cond.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
          Category
        </label>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                  isSelected
                    ? 'bg-purple-600/20 text-purple-300 font-bold border border-purple-500/40'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
          Price Range ($)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-700/80 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 text-slate-200 border border-slate-700/80 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

    </div>
  );
};
