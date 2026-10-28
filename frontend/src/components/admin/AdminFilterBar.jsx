"use client";

import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles,
  RotateCcw,
  LayoutGrid,
  List
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Electronics',
  'Mobile Phones',
  'Vehicles',
  'Furniture',
  'Fashion',
  'Gaming',
  'Books & Hobbies',
  'Home Appliances'
];

const CONDITIONS = [
  'All',
  'Brand New',
  'Used - Like New',
  'Used - Good',
  'Used - Fair'
];

const STATUSES = [
  'All',
  'Available',
  'Pending',
  'Sold',
  'Suspended'
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'discount', label: 'Highest Discount' }
];

export function AdminFilterBar({
  filters,
  onChange,
  onReset,
  viewMode,
  onViewModeChange,
  totalMatching = 0
}) {
  const isDirty = (
    Boolean(filters.search) ||
    (filters.category && filters.category !== 'All') ||
    (filters.condition && filters.condition !== 'All') ||
    (filters.status && filters.status !== 'All') ||
    Boolean(filters.featuredOnly)
  );

  return (
    <div className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3 shadow-sm space-y-3">
      {/* Top row: Search + View Toggles + Results count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Search by title, SKU, seller, or location..."
            className="w-full pl-9 pr-8 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
          />
          {filters.search && (
            <button
              onClick={() => onChange('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Switcher & Result Count */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-medium">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{totalMatching}</span> items
          </span>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => onViewModeChange('table')}
              title="Table View"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-[#111726] text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid Cards View"
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-[#111726] text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Second row: Select Dropdowns & Quick Toggles */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60">
        {/* Category Dropdown */}
        <select
          value={filters.category || 'All'}
          onChange={(e) => onChange('category', e.target.value)}
          className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c111c] text-slate-700 dark:text-slate-300 focus:outline-none focus:border-slate-400 cursor-pointer"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.filter(c => c !== 'All').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Condition Dropdown */}
        <select
          value={filters.condition || 'All'}
          onChange={(e) => onChange('condition', e.target.value)}
          className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c111c] text-slate-700 dark:text-slate-300 focus:outline-none focus:border-slate-400 cursor-pointer"
        >
          <option value="All">All Conditions</option>
          {CONDITIONS.filter(c => c !== 'All').map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Status Dropdown */}
        <select
          value={filters.status || 'All'}
          onChange={(e) => onChange('status', e.target.value)}
          className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c111c] text-slate-700 dark:text-slate-300 focus:outline-none focus:border-slate-400 cursor-pointer"
        >
          <option value="All">All Statuses</option>
          {STATUSES.filter(s => s !== 'All').map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={filters.sort || 'newest'}
          onChange={(e) => onChange('sort', e.target.value)}
          className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c111c] text-slate-700 dark:text-slate-300 focus:outline-none focus:border-slate-400 cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Featured Only Toggle Button */}
        <button
          type="button"
          onClick={() => onChange('featuredOnly', !filters.featuredOnly)}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
            filters.featuredOnly
              ? 'bg-amber-500/15 border border-amber-500/40 text-amber-600 dark:text-amber-400 font-semibold'
              : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${filters.featuredOnly ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
          <span>Featured Only</span>
        </button>

        {/* Reset Filters Button */}
        {isDirty && (
          <button
            type="button"
            onClick={onReset}
            className="px-2.5 py-1.5 rounded-lg text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1 font-medium cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
