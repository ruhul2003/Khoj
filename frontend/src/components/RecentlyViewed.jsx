"use client";

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Clock, Trash2 } from 'lucide-react';

export function RecentlyViewed({ currentProductId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('khoj_recently_viewed');
      if (stored) {
        let parsed = JSON.parse(stored);
        if (currentProductId) {
          parsed = parsed.filter(item => (item._id || item.id) !== currentProductId);
        }
        setItems(parsed.slice(0, 4));
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentProductId]);

  const handleClear = () => {
    try {
      localStorage.removeItem('khoj_recently_viewed');
      setItems([]);
    } catch (e) {
      console.error(e);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="pt-12 border-t border-zinc-800 space-y-6 font-['Bai_Jamjuree']">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">
              Recently Viewed Listings
            </h3>
            <p className="text-xs text-zinc-400">
              Pick up where you left off from your recent browsing
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="text-xs font-bold text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-800 hover:border-rose-500/30 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard key={item._id || item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
