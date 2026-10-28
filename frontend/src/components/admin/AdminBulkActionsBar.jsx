"use client";

import React, { useState } from 'react';
import { 
  CheckSquare, 
  X, 
  Trash2, 
  Star, 
  Percent, 
  Download, 
  CheckCircle2, 
  Clock, 
  Ban,
  ChevronDown
} from 'lucide-react';

export function AdminBulkActionsBar({
  selectedIds = [],
  onClearSelection,
  onBulkStatus,
  onBulkFeature,
  onBulkDiscount,
  onBulkDelete,
  onExportSelected
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(10);

  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl animate-in slide-in-from-bottom-5 duration-200">
      <div className="bg-slate-900/95 dark:bg-[#182234]/95 text-white backdrop-blur-md border border-slate-700/80 rounded-2xl p-3 sm:px-5 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Selection Count & Clear */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 flex items-center justify-center font-black text-[11px]">
              {selectedIds.length}
            </span>
            <span>Selected</span>
          </div>
          <button
            onClick={onClearSelection}
            className="text-slate-400 hover:text-white transition-colors p-1"
            title="Clear selection"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStatusMenu(!showStatusMenu);
                setShowDiscountInput(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Status</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-full mb-2 left-0 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-1 z-50 text-xs">
                <button
                  onClick={() => {
                    onBulkStatus('Available');
                    setShowStatusMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-700 text-emerald-400 font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Available</span>
                </button>
                <button
                  onClick={() => {
                    onBulkStatus('Pending');
                    setShowStatusMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-700 text-amber-400 font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-3 h-3" />
                  <span>Pending</span>
                </button>
                <button
                  onClick={() => {
                    onBulkStatus('Sold');
                    setShowStatusMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-700 text-slate-300 font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Sold</span>
                </button>
                <button
                  onClick={() => {
                    onBulkStatus('Suspended');
                    setShowStatusMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-700 text-rose-400 font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Ban className="w-3 h-3" />
                  <span>Suspend</span>
                </button>
              </div>
            )}
          </div>

          {/* Feature Toggle */}
          <button
            onClick={() => onBulkFeature(true)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Feature selected products"
          >
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="hidden sm:inline">Feature</span>
          </button>

          {/* Discount Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowDiscountInput(!showDiscountInput);
                setShowStatusMenu(false);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Percent className="w-3 h-3 text-emerald-400" />
              <span>Discount</span>
            </button>

            {showDiscountInput && (
              <div className="absolute bottom-full mb-2 right-0 sm:left-0 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-2.5 z-50 text-xs space-y-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Discount Percentage
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-600 text-white font-bold text-center focus:outline-none"
                  />
                  <span className="text-slate-400">%</span>
                  <button
                    onClick={() => {
                      onBulkDiscount(discountPercent);
                      setShowDiscountInput(false);
                    }}
                    className="flex-1 py-1 rounded bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export to CSV */}
          <button
            onClick={onExportSelected}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Export selected items to CSV"
          >
            <Download className="w-3 h-3 text-cyan-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Delete */}
          <button
            onClick={onBulkDelete}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 border border-rose-500/40 text-rose-300 hover:text-white font-semibold flex items-center gap-1 transition-all cursor-pointer"
            title="Delete selected products"
          >
            <Trash2 className="w-3 h-3" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
