"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Loader2
} from 'lucide-react';
import { AdminImageManager } from './AdminImageManager';

const CATEGORIES = [
  'Electronics',
  'Mobile Phones',
  'Vehicles',
  'Furniture',
  'Fashion',
  'Gaming',
  'Books & Hobbies',
  'Home Appliances'
];

const CONDITIONS = [
  'Brand New',
  'Used - Like New',
  'Used - Good',
  'Used - Fair'
];

const STATUSES = [
  'Available',
  'Pending',
  'Sold',
  'Suspended'
];

const getInitialProductState = (product) => {
  if (!product) return null;
  return {
    title: product.title || '',
    category: product.category || 'Electronics',
    condition: product.condition || 'Used - Like New',
    price: product.price || 0,
    originalPrice: product.originalPrice || 0,
    description: product.description || '',
    images: Array.isArray(product.images) ? [...product.images] : [],
    location: product.location || 'Dhaka',
    status: product.status || 'Available',
    isFeatured: Boolean(product.isFeatured),
    isVerified: product.isVerified !== undefined ? Boolean(product.isVerified) : true,
    stock: product.stock !== undefined ? product.stock : 1,
    sku: product.sku || '',
    tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    sellerId: product.sellerId || '',
    sellerName: product.sellerName || '',
    sellerPhone: product.sellerPhone || '',
    sellerRating: product.sellerRating || 5.0,
    sellerAvatar: product.sellerAvatar || '',
    adminNotes: product.adminNotes || '',
    views: product.views || 0
  };
};

export function ProductEditDrawer({ product, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(() => getInitialProductState(product));
  const [prevProductId, setPrevProductId] = useState(product?._id || product?.id);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const currentId = product?._id || product?.id;
  if (currentId !== prevProductId) {
    setPrevProductId(currentId);
    setFormData(getInitialProductState(product));
  }

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !formData) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyDiscount = (pct) => {
    const original = formData.originalPrice > 0 ? formData.originalPrice : (formData.price || 0);
    const newPrice = Math.round(original * ((100 - pct) / 100));
    setFormData(prev => ({
      ...prev,
      originalPrice: original,
      price: newPrice
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData.title.trim()) {
      alert('Product title is required.');
      return;
    }

    setIsSaving(true);
    try {
      const cleanData = {
        ...formData,
        price: Number(formData.price) || 0,
        originalPrice: Number(formData.originalPrice) || 0,
        stock: Number(formData.stock) || 0,
        views: Number(formData.views) || 0,
        sellerRating: Number(formData.sellerRating) || 5.0,
        tags: typeof formData.tags === 'string' 
          ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
          : (formData.tags || [])
      };
      await onSave(product._id || product.id, cleanData);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to update product');
    } finally {
      setIsSaving(false);
    }
  };

  const hasDiscount = formData.originalPrice > formData.price;
  const discountPct = hasDiscount 
    ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) 
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#111726] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                Admin Editor
              </span>
              <span className="text-xs text-slate-400 font-mono truncate max-w-[200px]">
                {product._id || product.id}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate mt-1">
              {formData.title || 'Edit Product Listing'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Minimalist Tab Navigation */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-slate-100 dark:border-slate-800 overflow-x-auto scrollbar-none text-xs">
          {[
            { id: 'general', label: 'General Info' },
            { id: 'pricing', label: 'Pricing & Stock' },
            { id: 'images', label: `Gallery (${formData.images.length})` },
            { id: 'seller', label: 'Seller & Location' },
            { id: 'admin', label: 'Admin Audit' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 px-3 font-semibold transition-all relative shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs">
          {/* TAB 1: General Info */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Apple iPhone 15 Pro Max - 256GB"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Condition *
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleChange('condition', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
                  >
                    {CONDITIONS.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
                  placeholder="Full description of specifications, warranty, accessories included..."
                />
                <span className="text-[11px] text-slate-400 block text-right mt-1">
                  {formData.description.length} characters
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* Featured Toggle */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleChange('isFeatured', e.target.checked)}
                    className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      Featured in Catalog
                    </span>
                    <span className="text-[10px] text-slate-400">Promote to top homepage spots</span>
                  </div>
                </label>

                {/* Verified Toggle */}
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => handleChange('isVerified', e.target.checked)}
                    className="rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      Verified Listing
                    </span>
                    <span className="text-[10px] text-slate-400">Authenticity badge granted</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: Pricing & Stock */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Selling Price (৳ BDT) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Original / Retail Price (৳ BDT)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => handleChange('originalPrice', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Discount Calculator Display */}
              {hasDiscount && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
                  <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                    Calculated Discount
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                    {discountPct}% OFF (Saves ৳ {(formData.originalPrice - formData.price).toLocaleString()})
                  </span>
                </div>
              )}

              {/* Quick Discount Presets */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Apply Quick Discount:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[5, 10, 15, 20, 25, 30, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleApplyDiscount(pct)}
                      className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      -{pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Inventory Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => handleChange('sku', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                    placeholder="e.g. SKU-84729"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Buyer Views
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.views}
                    onChange={(e) => handleChange('views', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Listing Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:border-amber-500"
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 3: Images */}
          {activeTab === 'images' && (
            <div>
              <AdminImageManager
                images={formData.images}
                onChange={(newImages) => handleChange('images', newImages)}
              />
            </div>
          )}

          {/* TAB 4: Seller & Location */}
          {activeTab === 'seller' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location Area / City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="e.g. Dhanmondi, Dhaka"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Seller Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.sellerName}
                    onChange={(e) => handleChange('sellerName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Seller Contact Phone
                  </label>
                  <input
                    type="text"
                    value={formData.sellerPhone}
                    onChange={(e) => handleChange('sellerPhone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Seller User ID
                  </label>
                  <input
                    type="text"
                    value={formData.sellerId}
                    onChange={(e) => handleChange('sellerId', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Seller Rating (1.0 - 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.sellerRating}
                    onChange={(e) => handleChange('sellerRating', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Seller Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.sellerAvatar}
                  onChange={(e) => handleChange('sellerAvatar', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          )}

          {/* TAB 5: Admin Audit */}
          {activeTab === 'admin' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Internal Admin Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.adminNotes}
                  onChange={(e) => handleChange('adminNotes', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="Moderation notes, seller verification notes, price validation..."
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Catalog Tags / Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                  placeholder="macbook, m3, apple, laptop, space-black"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1 text-slate-500">
                <div className="font-semibold text-slate-700 dark:text-slate-300">Audit Info</div>
                <div>Created: {product.createdAt ? new Date(product.createdAt).toLocaleString() : 'N/A'}</div>
                <div>Last Updated: {product.updatedAt ? new Date(product.updatedAt).toLocaleString() : 'Just now'}</div>
              </div>
            </div>
          )}
        </form>

        {/* Drawer Footer */}
        <div className="p-4 sm:px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0c111c] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
