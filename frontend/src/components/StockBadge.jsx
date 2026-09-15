"use client";

import React from 'react';
import { Flame, CheckCircle2, AlertCircle } from 'lucide-react';

export function StockBadge({ stock = 5, className = '' }) {
  const stockNum = typeof stock === 'number' ? stock : 5;

  if (stockNum <= 0) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800 ${className}`}>
        <AlertCircle className="w-3 h-3 shrink-0" />
        Sold Out
      </span>
    );
  }

  if (stockNum <= 3) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 animate-pulse ${className}`}>
        <Flame className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" />
        Only {stockNum} left!
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 ${className}`}>
      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
      In Stock
    </span>
  );
}
