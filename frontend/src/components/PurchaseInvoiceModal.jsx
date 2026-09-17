"use client";

import React from 'react';
import { Printer, X, Download, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { formatBDT } from '@/utils/formatters';

export function PurchaseInvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${(order._id || order.id || Date.now()).toString().slice(-8).toUpperCase()}`;
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : new Date().toLocaleDateString('en-GB');

  const deliveryFee = order.deliveryMethod === 'Courier' ? 120 : 0;
  const totalPrice = (order.price || 0) + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden bg-zinc-950 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Purchase Invoice Slip</h3>
              <p className="text-[11px] text-zinc-400">Official proof of transaction record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Invoice Printable Document */}
        <div id="printable-purchase-slip" className="p-8 bg-white text-zinc-900 space-y-6">
          
          {/* Slip Header */}
          <div className="flex items-start justify-between border-b border-zinc-200 pb-6">
            <div>
              <div className="flex items-center gap-1.5 font-black text-2xl tracking-tight text-[#0c9096]">
                Khoj.
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Bangladesh Peer-to-Peer Verified Marketplace
              </p>
              <p className="text-[10px] text-zinc-400">https://khoj.market</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                Invoice Reference
              </span>
              <span className="font-mono font-extrabold text-sm text-zinc-800">
                {invoiceNumber}
              </span>
              <span className="text-[11px] text-zinc-500 block mt-0.5">
                Date: {orderDate}
              </span>
            </div>
          </div>

          {/* Party Details: Buyer & Seller */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Seller Information
              </span>
              <span className="font-extrabold text-zinc-900 block">{order.sellerName || 'Verified Merchant'}</span>
              <span className="text-zinc-600 block">{order.location || 'Dhaka, Bangladesh'}</span>
              <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1 mt-1">
                <ShieldCheck className="w-3 h-3" /> Identity Verified Merchant
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                Buyer Details
              </span>
              <span className="font-extrabold text-zinc-900 block">{order.buyerName || 'Verified Buyer'}</span>
              <span className="text-zinc-600 block">{order.buyerEmail || 'Registered Khoj User'}</span>
              <span className="text-zinc-500 text-[11px] block mt-1">
                Handover: {order.deliveryMethod || 'In-Person Meetup'}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-zinc-200 rounded-2xl overflow-hidden text-xs">
            <div className="bg-zinc-100 p-3 font-bold text-zinc-700 grid grid-cols-12 gap-2 text-[11px] uppercase tracking-wider">
              <span className="col-span-8">Product Description</span>
              <span className="col-span-4 text-right">Amount</span>
            </div>
            
            <div className="p-3.5 grid grid-cols-12 gap-2 items-center border-b border-zinc-100">
              <div className="col-span-8">
                <span className="font-extrabold text-zinc-900 block text-xs">
                  {order.productTitle}
                </span>
                <span className="text-[10px] text-zinc-500">
                  Item ID: {order.productId || order._id?.slice(0, 10)} • Status: {order.status || 'Fulfilled'}
                </span>
              </div>
              <div className="col-span-4 text-right font-extrabold text-zinc-900 text-sm">
                {formatBDT(order.price || 0)}
              </div>
            </div>

            {deliveryFee > 0 && (
              <div className="p-3 grid grid-cols-12 gap-2 items-center border-b border-zinc-100 bg-zinc-50/50 text-[11px]">
                <span className="col-span-8 text-zinc-600">Nationwide Courier & Handling</span>
                <span className="col-span-4 text-right font-bold text-zinc-800">{formatBDT(deliveryFee)}</span>
              </div>
            )}

            <div className="p-3.5 grid grid-cols-12 gap-2 items-center bg-teal-50/50">
              <span className="col-span-8 font-extrabold text-zinc-900 text-sm">
                Total Transaction Amount
              </span>
              <span className="col-span-4 text-right font-black text-base text-[#0c9096]">
                {formatBDT(totalPrice)}
              </span>
            </div>
          </div>

          {/* Disclaimer & Policy Notice */}
          <div className="p-3.5 rounded-xl bg-zinc-100/80 border border-zinc-200 text-[11px] text-zinc-600 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-zinc-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Inspection & Handover Verified</span>
            </div>
            <p>
              This official voucher confirms successful physical exchange and settlement between the buyer and seller. Khoj charges 0% commission on direct trades.
            </p>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-5 border-t border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-[#0c9096] hover:bg-[#0a6c71] text-white text-xs font-extrabold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice Slip</span>
          </button>
        </div>

      </div>
    </div>
  );
}
