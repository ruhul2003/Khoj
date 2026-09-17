"use client";

import React, { useState } from 'react';
import { QrCode, Printer, X, Copy, Check, Share2, MapPin, ShieldCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { formatBDT } from '@/utils/formatters';

export function ListingQrModal({ isOpen, onClose, product }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !product) return null;

  const productUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/product/${product._id || product.id}`
    : `https://khoj.market/product/${product._id || product.id}`;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(productUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    addToast('Product URL copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden bg-zinc-950 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Listing QR Code & Flyer</h3>
              <p className="text-[11px] text-zinc-400">Print or scan to view listing on mobile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div className="p-6 space-y-6">
          <div id="printable-qr-flyer" className="p-6 rounded-2xl bg-white text-zinc-950 border border-zinc-200 shadow-lg text-center space-y-4">
            
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-[#0a6c71]">
                <span>Khoj.</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 uppercase">
                  P2P Verified
                </span>
              </div>
              <span className="text-[11px] font-semibold text-zinc-500">
                {product.category}
              </span>
            </div>

            {/* QR Code */}
            <div className="flex justify-center my-2">
              <div className="p-3 bg-white rounded-2xl border-2 border-zinc-900/10 shadow-inner">
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${product.title}`}
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-zinc-900 line-clamp-2 leading-tight">
                {product.title}
              </h4>
              <div className="text-lg font-black text-[#0c9096]">
                {formatBDT(product.price)}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] font-medium text-zinc-600 border-t border-zinc-100 pt-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-400" /> {product.location || 'Dhaka'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> {product.condition}
              </span>
            </div>

            <p className="text-[10px] text-zinc-400 font-medium">
              Scan with camera to inspect item specifications & contact seller
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider border border-zinc-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#0c9096]" />
              <span>Print Flyer</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-3 px-4 rounded-xl bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
