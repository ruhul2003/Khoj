"use client";

import React from 'react';
import { 
  Package, 
  DollarSign, 
  Sparkles, 
  Eye, 
  AlertTriangle
} from 'lucide-react';

export function AdminStatsOverview({ stats, onSelectCategory, selectedCategory }) {
  if (!stats) return null;

  const {
    total = 0,
    available = 0,
    sold = 0,
    pending = 0,
    suspended = 0,
    featured = 0,
    totalInventoryValue = 0,
    avgPrice = 0,
    totalViews = 0,
    categoryBreakdown = {},
    reportedCount = 0
  } = stats;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 })
      .format(val)
      .replace('BDT', '৳');
  };

  const cards = [
    {
      title: "Total Catalog Items",
      value: total,
      subtext: `${available} active · ${sold} sold`,
      icon: Package,
      badge: "Inventory"
    },
    {
      title: "Total Inventory Value",
      value: formatPrice(totalInventoryValue),
      subtext: `Avg. ${formatPrice(avgPrice)} / item`,
      icon: DollarSign,
      badge: "Valuation"
    },
    {
      title: "Featured Listings",
      value: featured,
      subtext: `${Math.round((featured / (total || 1)) * 100)}% of catalog`,
      icon: Sparkles,
      badge: "Spotlight"
    },
    {
      title: "Catalog Impressions",
      value: totalViews.toLocaleString(),
      subtext: "Total buyer views",
      icon: Eye,
      badge: "Traffic"
    },
    {
      title: "Trust & Safety Reports",
      value: reportedCount,
      subtext: suspended > 0 ? `${suspended} suspended listings` : "All listings verified",
      icon: AlertTriangle,
      badge: reportedCount > 0 ? "Review Needed" : "Clean",
      badgeColor: reportedCount > 0 ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    }
  ];

  const categories = Object.entries(categoryBreakdown);

  return (
    <div className="space-y-4">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <div 
              key={idx}
              className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-4 transition-all duration-150 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-medium truncate">{c.title}</span>
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${c.badgeColor || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}`}>
                  {c.badge}
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {c.value}
              </div>
              <div className="mt-1 text-xs text-slate-400 dark:text-slate-500 truncate">
                {c.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Pills Breakdown */}
      {categories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1 uppercase tracking-wider shrink-0">
            Categories:
          </span>
          <button
            onClick={() => onSelectCategory && onSelectCategory('All')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 cursor-pointer ${
              !selectedCategory || selectedCategory === 'All'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold'
                : 'bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400'
            }`}
          >
            All ({total})
          </button>
          {categories.map(([cat, count]) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory && onSelectCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-semibold'
                    : 'bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-white/20 text-white dark:bg-slate-950/20 dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
