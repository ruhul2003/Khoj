"use client";

import React from 'react';
import { 
  Star, 
  Eye, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  MapPin, 
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export function AdminProductTable({
  products,
  loading,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onInspect,
  onEdit,
  onDelete,
  onToggleFeatured,
  onUpdateStatus,
  onUpdatePrice
}) {
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [editingPriceVal, setEditingPriceVal] = useState('');
  const allSelected = products.length > 0 && products.every(p => selectedIds.includes(p._id || p.id));
  const someSelected = products.some(p => selectedIds.includes(p._id || p.id)) && !allSelected;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 })
      .format(val)
      .replace('BDT', '৳');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return {
          bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/60',
          dot: 'bg-emerald-500'
        };
      case 'Pending':
        return {
          bg: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-200/80 dark:border-amber-800/60',
          dot: 'bg-amber-500'
        };
      case 'Sold':
        return {
          bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          dot: 'bg-slate-400'
        };
      case 'Suspended':
        return {
          bg: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-rose-200/80 dark:border-rose-800/60',
          dot: 'bg-rose-500'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
          dot: 'bg-slate-400'
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-slate-300 dark:border-slate-700 border-t-amber-500 mb-3" />
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Loading catalog products...</p>
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
          No items match your active filters or search terms. Try clearing filters or create a new product.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/75 dark:bg-[#0c111c] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase text-[10px]">
              <th className="py-3 px-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                />
              </th>
              <th className="py-3 px-3">Product</th>
              <th className="py-3 px-3">Category</th>
              <th className="py-3 px-3">Price</th>
              <th className="py-3 px-3">Seller & Area</th>
              <th className="py-3 px-3 text-center">Featured</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {products.map((product) => {
              const id = product._id || product.id;
              const isSelected = selectedIds.includes(id);
              const imgUrl = (product.images && product.images.length > 0 && product.images[0]) ||
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80';
              const hasDiscount = product.originalPrice && product.originalPrice > product.price;
              const discountPct = hasDiscount 
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
                : 0;
              const badge = getStatusBadge(product.status || 'Available');

              return (
                <tr 
                  key={id}
                  className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors ${
                    isSelected ? 'bg-amber-500/5 dark:bg-amber-500/10' : ''
                  }`}
                >
                  {/* Selection Checkbox */}
                  <td className="py-3 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(id)}
                      className="rounded border-slate-300 dark:border-slate-700 text-amber-500 focus:ring-amber-500 cursor-pointer"
                    />
                  </td>

                  {/* Thumbnail & Title Info */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <img
                        src={imgUrl}
                        alt={product.title}
                        className="w-11 h-11 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-900 dark:text-slate-100 truncate hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                          <button 
                            onClick={() => onInspect(product)}
                            className="text-left font-semibold hover:underline truncate block w-full cursor-pointer"
                          >
                            {product.title}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                          <span className="font-medium text-slate-600 dark:text-slate-400">
                            {product.condition}
                          </span>
                          <span>·</span>
                          <span>{product.views || 0} views</span>
                          {product.stock !== undefined && (
                            <>
                              <span>·</span>
                              <span>Stock: {product.stock}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                      {product.category}
                    </span>
                  </td>

                  {/* Price & Discount */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {editingPriceId === id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400">৳</span>
                        <input
                          type="number"
                          autoFocus
                          value={editingPriceVal}
                          onChange={(e) => setEditingPriceVal(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (onUpdatePrice && editingPriceVal) {
                                onUpdatePrice(id, Number(editingPriceVal));
                              }
                              setEditingPriceId(null);
                            } else if (e.key === 'Escape') {
                              setEditingPriceId(null);
                            }
                          }}
                          onBlur={() => {
                            if (onUpdatePrice && editingPriceVal && Number(editingPriceVal) !== product.price) {
                              onUpdatePrice(id, Number(editingPriceVal));
                            }
                            setEditingPriceId(null);
                          }}
                          className="w-20 px-1.5 py-0.5 text-xs font-bold rounded border border-amber-500 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setEditingPriceId(id);
                          setEditingPriceVal(product.price);
                        }}
                        className="group/price cursor-pointer"
                        title="Click to edit price inline"
                      >
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1">
                          <span>{formatPrice(product.price)}</span>
                          <span className="text-[10px] text-slate-400 opacity-0 group-hover/price:opacity-100 transition-opacity">✎</span>
                        </div>
                        {hasDiscount && (
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span className="line-through">{formatPrice(product.originalPrice)}</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">-{discountPct}%</span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Seller & Location */}
                  <td className="py-3 px-3 min-w-[140px]">
                    <div className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {product.sellerName || 'Verified Seller'}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate">
                      <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                      <span className="truncate">{product.location || 'Dhaka'}</span>
                    </div>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleFeatured(id, !product.isFeatured)}
                      title={product.isFeatured ? "Unfeature product" : "Feature product in catalog"}
                      className={`p-1.5 rounded-lg transition-all duration-200 active:scale-90 cursor-pointer ${
                        product.isFeatured
                          ? 'text-amber-500 hover:text-amber-600 bg-amber-500/10 dark:bg-amber-500/20 shadow-xs'
                          : 'text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Star className={`w-4 h-4 transition-transform ${product.isFeatured ? 'fill-amber-500 scale-105' : ''}`} />
                    </button>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${badge.dot} animate-pulse`} />
                      <select
                        value={product.status || 'Available'}
                        onChange={(e) => onUpdateStatus(id, e.target.value)}
                        className={`text-[11px] font-semibold py-1 px-2 rounded-md border focus:outline-none cursor-pointer transition-colors ${badge.bg}`}
                      >
                        <option value="Available">Available</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold">Sold</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {/* Inspect */}
                      <button
                        type="button"
                        onClick={() => onInspect(product)}
                        title="Quick Inspect"
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        title="Edit All Product Data"
                        className="p-1.5 rounded-md text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Public Link */}
                      <Link
                        href={`/product/${id}`}
                        target="_blank"
                        title="View Public Storefront"
                        className="p-1.5 rounded-md text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(id, product.title)}
                        title="Delete Product"
                        className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
