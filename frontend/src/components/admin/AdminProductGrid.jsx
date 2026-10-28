"use client";

import React from 'react';
import { 
  Star, 
  Eye, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export function AdminProductGrid({
  products,
  loading,
  selectedIds,
  onToggleSelect,
  onInspect,
  onEdit,
  onDelete,
  onToggleFeatured,
  onUpdateStatus
}) {
  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 })
      .format(val)
      .replace('BDT', '৳');
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 animate-pulse space-y-3">
            <div className="w-full h-44 bg-slate-100 dark:bg-slate-800 rounded-lg" />
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-12 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">No products found</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          No items match your active filters. Try adjusting search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
      {products.map((product) => {
        const id = product._id || product.id;
        const isSelected = selectedIds.includes(id);
        const imgUrl = (product.images && product.images.length > 0 && product.images[0]) ||
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80';
        const hasDiscount = product.originalPrice && product.originalPrice > product.price;
        const discountPct = hasDiscount 
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
          : 0;

        return (
          <div
            key={id}
            className={`bg-white dark:bg-[#111726] border rounded-xl overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col ${
              isSelected 
                ? 'border-amber-500/80 dark:border-amber-500/80 ring-1 ring-amber-500/30' 
                : 'border-slate-200/80 dark:border-slate-800/80'
            }`}
          >
            {/* Thumbnail Header with Floating Actions */}
            <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <img
                src={imgUrl}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80';
                }}
              />
              {/* Checkbox */}
              <div className="absolute top-2 left-2">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect(id)}
                  className="rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer bg-white/90 backdrop-blur-xs w-4 h-4"
                />
              </div>

              {/* Featured Star Button */}
              <button
                type="button"
                onClick={() => onToggleFeatured(id, !product.isFeatured)}
                title={product.isFeatured ? "Unfeature" : "Feature"}
                className={`absolute top-2 right-2 p-1.5 rounded-lg backdrop-blur-xs transition-colors cursor-pointer ${
                  product.isFeatured
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-900/40 text-white/80 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${product.isFeatured ? 'fill-current' : ''}`} />
              </button>

              {/* Category & Condition Tags */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-950/70 text-white backdrop-blur-xs">
                  {product.category}
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-xs">
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <button
                  onClick={() => onInspect(product)}
                  className="text-left font-semibold text-xs text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 line-clamp-2 transition-colors cursor-pointer"
                >
                  {product.title}
                </button>

                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {formatPrice(product.price)}
                    </div>
                    {hasDiscount && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="line-through">{formatPrice(product.originalPrice)}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">-{discountPct}%</span>
                      </div>
                    )}
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={product.status || 'Available'}
                    onChange={(e) => onUpdateStatus(id, e.target.value)}
                    className="text-[10px] font-semibold py-1 px-2 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="Available">Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Sold">Sold</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Footer Meta & Actions */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px]">
                <div className="flex items-center gap-1 truncate max-w-[120px]">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{product.location || 'Dhaka'}</span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onInspect(product)}
                    title="Inspect"
                    className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    title="Edit"
                    className="p-1 rounded text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href={`/product/${id}`}
                    target="_blank"
                    title="Public page"
                    className="p-1 rounded text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => onDelete(id, product.title)}
                    title="Delete"
                    className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
