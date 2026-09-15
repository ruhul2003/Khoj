"use client";

import React, { useRef } from 'react';
import { X, Printer, FileText, CheckCircle2, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { formatBDT } from '@/utils/formatters';

export function HandoverReceiptModal({ isOpen, onClose, product }) {
  const printRef = useRef(null);

  if (!isOpen || !product) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const receiptId = `KHJ-${(product._id || product.id || '9999').toString().slice(-6).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-['Bai_Jamjuree'] animate-in fade-in duration-150">
      <div 
        className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Marketplace Handover Receipt</h3>
              <p className="text-xs text-slate-400">Printable proof of exchange document</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Voucher</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div ref={printRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-950 text-slate-100">
          {/* Receipt Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <div>
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                KHOJ<span className="text-teal-400">.</span>
              </h1>
              <p className="text-[11px] text-slate-400">Verified Peer-to-Peer Exchange</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-teal-400 block">{receiptId}</span>
              <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3 text-slate-500" /> {today}
              </span>
            </div>
          </div>

          {/* Product Summary */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider">{product.category}</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{product.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-semibold text-slate-300">
                    {product.condition}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" /> {product.location || 'Dhaka'}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-slate-400 block">Agreed Price</span>
                <span className="text-lg font-black text-white">{formatBDT(product.price)}</span>
              </div>
            </div>
          </div>

          {/* Seller & Verification Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">Seller</span>
              <p className="font-bold text-white">{product.sellerName || 'Verified Member'}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Khoj Verified Merchant</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">Payment Method</span>
              <p className="font-bold text-white">Cash / bKash Direct</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Paid Upon Inspection</p>
            </div>
          </div>

          {/* Inspection Confirmation */}
          <div className="p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Inspection & Handover Declaration</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Both buyer and seller have physically inspected this item and agreed on its working order, authenticity, and physical cosmetic condition at the time of exchange.
            </p>
          </div>

          {/* Signature Blocks */}
          <div className="pt-4 grid grid-cols-2 gap-8 border-t border-slate-800">
            <div>
              <div className="h-10 border-b border-dashed border-slate-700" />
              <span className="text-[11px] text-slate-400 mt-1 block">Buyer Signature & Date</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-700" />
              <span className="text-[11px] text-slate-400 mt-1 block">Seller Signature & Date</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
