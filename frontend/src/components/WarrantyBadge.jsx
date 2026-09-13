"use client";

import React from 'react';
import { ShieldCheck, Award, RotateCcw, CheckCircle2 } from 'lucide-react';

export const WarrantyBadge = ({ condition = 'Used - Good', category = 'Electronics', variant = 'compact' }) => {
  const isBrandNew = condition.toLowerCase().includes('brand new');
  const isLikeNew = condition.toLowerCase().includes('like new');

  const warrantyType = isBrandNew 
    ? 'Official 1-Year Brand Warranty' 
    : (isLikeNew ? '6-Month Shop Warranty' : '7-Day Return & Replacement');

  if (variant === 'compact') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
        <ShieldCheck className="w-3 h-3 text-emerald-500" />
        <span className="truncate max-w-[130px]">{isBrandNew ? 'Brand Warranty' : '7-Day Guarantee'}</span>
      </span>
    );
  }

  return (
    <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3 font-['Bai_Jamjuree']">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Buyer Protection & Guarantee</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
          Verified
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">{warrantyType}</span>
            <span className="text-[11px] text-zinc-400 font-light">
              {isBrandNew ? 'Full manufacturer service support included' : 'Check device thoroughly at handover with 7-day fallback'}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
          <RotateCcw className="w-4 h-4 text-[#0c9096] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">100% Genuine Guarantee</span>
            <span className="text-[11px] text-zinc-400 font-light">
              Verified original IMEI/serial validation backed by Khoj Safety Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
