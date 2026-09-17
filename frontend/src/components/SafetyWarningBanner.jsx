"use client";

import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ChevronRight, X, Lock } from 'lucide-react';

export function SafetyWarningBanner({ category, price, onOpenChecklist }) {
  const [isDismissed, setIsDismissed] = useState(false);

  // Show on high-value items or sensitive categories (Electronics, Mobile Phones, Vehicles, Gaming)
  const isHighRiskCategory = ['Mobile Phones', 'Electronics', 'Vehicles', 'Gaming'].includes(category);
  const isHighValue = price >= 10000;

  if (isDismissed || (!isHighRiskCategory && !isHighValue)) {
    return null;
  }

  return (
    <div className="relative rounded-2xl p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 text-amber-200 font-['Bai_Jamjuree']">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1.5 pr-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Scam Prevention Notice
            </span>
            <span className="px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
              High Value Trade
            </span>
          </div>

          <p className="text-xs text-zinc-300 font-normal leading-relaxed">
            Never send advance "booking money" or courier charges through <span className="text-white font-bold">bKash/Nagad</span> before physically inspecting this {category ? category.toLowerCase() : 'item'}. Always meet in a public location and verify device serial numbers.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            {onOpenChecklist && (
              <button
                type="button"
                onClick={onOpenChecklist}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>View {category} Inspection Checklist</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3.5 right-3.5 p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          title="Dismiss advisory"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
