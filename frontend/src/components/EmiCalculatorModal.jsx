"use client";

import React, { useState } from 'react';
import { 
  Calculator, 
  X, 
  CreditCard, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  HelpCircle 
} from 'lucide-react';

const TENURES = [3, 6, 9, 12, 18];
const POPULAR_BANKS = [
  { name: 'City Bank AMEX', note: '0% EMI available up to 12 months' },
  { name: 'BRAC Bank Visa/MC', note: 'Fast approval & flexible tenure' },
  { name: 'Eastern Bank (EBL)', note: 'Easy payment plan with 0% markup' },
  { name: 'Standard Chartered', note: 'Instant smart installment option' },
  { name: 'bKash PayLater', note: 'Micro-installment without credit card' },
];

export const EmiCalculatorModal = ({ isOpen, onClose, price = 0, productTitle = '' }) => {
  const [tenure, setTenure] = useState(6);
  const [downPaymentPercent, setDownPaymentPercent] = useState(0);

  if (!isOpen) return null;

  const validPrice = Number(price) || 0;
  const downPaymentAmount = Math.round((validPrice * downPaymentPercent) / 100);
  const financedAmount = validPrice - downPaymentAmount;
  const monthlyAmount = Math.round(financedAmount / tenure);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6 font-['Bai_Jamjuree'] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Installment & Financing</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">EMI Plan Estimator</h3>
          <p className="text-xs text-zinc-400 line-clamp-1">{productTitle}</p>
        </div>

        {/* Big Highlight Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c9096]/20 via-zinc-900 to-zinc-900 border border-[#0c9096]/30 text-center space-y-2 shadow-inner">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Estimated Monthly Installment
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white">
            ৳{monthlyAmount.toLocaleString()}
            <span className="text-sm font-normal text-zinc-400"> / month</span>
          </div>
          <p className="text-[11px] text-[#38d4dc] font-medium">
            For {tenure} months • Total financed: ৳{financedAmount.toLocaleString()}
          </p>
        </div>

        {/* Tenure Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300 uppercase tracking-wider">Select Tenure (Months)</span>
            <span className="text-amber-400 font-bold">{tenure} Months</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {TENURES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTenure(t)}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  tenure === t
                    ? 'bg-[#0c9096] text-white shadow-lg shadow-[#0c9096]/30'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {t} Mo
              </button>
            ))}
          </div>
        </div>

        {/* Down Payment Option */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-300 uppercase tracking-wider">Down Payment</span>
            <span className="text-white font-bold">{downPaymentPercent}% (৳{downPaymentAmount.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            {[0, 10, 20, 30, 50].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setDownPaymentPercent(pct)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  downPaymentPercent === pct
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Repayment Breakdown Table */}
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-2 text-xs">
          <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] block">
            Installment Overview
          </span>
          <div className="flex justify-between text-zinc-300 py-1 border-b border-zinc-800/60">
            <span>Product Asking Price:</span>
            <strong className="text-white font-bold">৳{validPrice.toLocaleString()}</strong>
          </div>
          <div className="flex justify-between text-zinc-300 py-1 border-b border-zinc-800/60">
            <span>Down Payment:</span>
            <strong className="text-amber-400 font-bold">-৳{downPaymentAmount.toLocaleString()}</strong>
          </div>
          <div className="flex justify-between text-zinc-300 py-1">
            <span>Monthly Payment ({tenure}x):</span>
            <strong className="text-emerald-400 font-bold">৳{monthlyAmount.toLocaleString()} / mo</strong>
          </div>
        </div>

        {/* Supported Banks */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-300 uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-[#0c9096]" />
            <span>Eligible Card & Financing Partners in BD</span>
          </div>
          <div className="space-y-1.5">
            {POPULAR_BANKS.map((b) => (
              <div
                key={b.name}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs"
              >
                <span className="font-bold text-white text-[11px]">{b.name}</span>
                <span className="text-[10px] text-zinc-400">{b.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-light">
          <Info className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
          <span>
            Actual EMI approval, interest subsidies, and bank fees depend on your issuing bank card policy upon seller agreement.
          </span>
        </div>
      </div>
    </div>
  );
};
