"use client";

import React from 'react';
import { X, Award, CheckCircle2, HelpCircle } from 'lucide-react';

const CONDITIONS = [
  {
    grade: 'Brand New (Intact Box)',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    description: 'Original packaging is factory sealed, unopened, and never used with all warranty cards and accessories.',
    checklist: ['Original factory seal intact', 'Zero battery cycle / wear', 'Full manufacturer warranty']
  },
  {
    grade: 'Like New (Open Box)',
    badge: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    description: 'Virtually indistinguishable from new. May have been unboxed for testing or display, but has zero cosmetic blemishes.',
    checklist: ['Flawless cosmetic condition', '100% functional components', 'Includes original or OEM charger/box']
  },
  {
    grade: 'Used - Excellent',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    description: 'Gently used with minimal faint micro-scratches only visible under direct light. Works 100% as intended.',
    checklist: ['Clean screen & chassis', 'Battery health typically > 85%', 'Tested and certified functional']
  },
  {
    grade: 'Used - Good',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    description: 'Normal everyday signs of use such as light scuffs or hairline scratches. No cracks, dents, or functional defects.',
    checklist: ['Fully tested hardware', 'Screen free of cracks or dead pixels', 'May not include original retail box']
  },
  {
    grade: 'Used - Fair',
    badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    description: 'Heavier cosmetic wear, minor casing dents or scratches, but all core functions operate properly. High value budget pick.',
    checklist: ['Completely usable without repair', 'All defects explicitly stated in listing', 'Substantial price discount']
  }
];

export function ConditionGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-['Bai_Jamjuree'] animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Marketplace Condition Grading Guide</h3>
              <p className="text-xs text-slate-400">Understand how Khoj verifies and rates product quality</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-800/60">
          {CONDITIONS.map((c, i) => (
            <div key={i} className={i > 0 ? "pt-4" : ""}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${c.badge}`}>
                  {c.grade}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
                {c.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {c.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-950/40 px-2 py-1 rounded-lg border border-slate-800/40">
                    <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-teal-400" /> Have questions? Chat directly with the seller.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
