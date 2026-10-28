"use client";

import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Edit3, 
  ExternalLink, 
  Copy, 
  Check, 
  Code
} from 'lucide-react';
import Link from 'next/link';

export function ProductInspectModal({ product, onClose, onEdit }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(false);
  const [showJson, setShowJson] = useState(false);

  if (!product) return null;

  const id = product._id || product.id;
  const images = product.images && product.images.length > 0 ? product.images : [
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
  ];

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 })
      .format(val)
      .replace('BDT', '৳');
  };

  const handleCopyId = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 1500);
    }
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountAmount = hasDiscount ? (product.originalPrice - product.price) : 0;
  const discountPct = hasDiscount ? Math.round((discountAmount / product.originalPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Product Inspection
            </span>
            <button
              onClick={handleCopyId}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-mono transition-colors"
              title="Click to copy ID"
            >
              <span>{id}</span>
              {copiedId ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Section: Images + Quick Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image Preview & Thumbnails */}
            <div className="space-y-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800">
                <img
                  src={images[activeImgIndex] || images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIndex(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImgIndex === idx 
                          ? 'border-amber-500 scale-95' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Pricing & Status Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {product.category}
                  </span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {product.condition}
                  </span>
                  {product.isFeatured && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-950" /> Featured
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-50 leading-snug">
                  {product.title}
                </h2>
              </div>

              {/* Price Block */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                <div className="text-xs text-slate-400 font-medium">Listing Price</div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl font-black text-slate-900 dark:text-slate-50">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Save {formatPrice(discountAmount)} ({discountPct}% OFF)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock, Views, SKU */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{product.status || 'Available'}</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Stock</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{product.stock ?? 1} units</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Views</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{product.views || 0}</span>
                </div>
              </div>

              {/* Seller Summary */}
              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Seller Account</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{product.sellerName || 'Verified Seller'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{product.sellerPhone || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-medium">Location</span>
                  <span className="text-slate-700 dark:text-slate-300">{product.location || 'Dhaka'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Product Description
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {product.description || 'No description provided.'}
            </div>
          </div>

          {/* Admin Internal Notes */}
          {product.adminNotes && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                Internal Admin Notes
              </span>
              <p className="text-amber-900 dark:text-amber-200">{product.adminNotes}</p>
            </div>
          )}

          {/* Raw JSON Debug View */}
          <div className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
            <button
              type="button"
              onClick={() => setShowJson(!showJson)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span>Raw Product Record Data</span>
              </div>
              <span className="text-[10px] text-slate-400">{showJson ? 'Hide' : 'Show JSON'}</span>
            </button>
            {showJson && (
              <pre className="p-3 bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-60">
                {JSON.stringify(product, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c111c] flex items-center justify-between gap-3">
          <Link
            href={`/product/${id}`}
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Listing</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(product);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
