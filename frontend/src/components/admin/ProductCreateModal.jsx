"use client";

import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Loader2, 
  Sparkles, 
  Package, 
  MapPin, 
  DollarSign, 
  User, 
  ShieldCheck,
  CheckCircle2
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

export function ProductCreateModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    condition: 'Brand New',
    price: '',
    originalPrice: '',
    description: '',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Dhaka, Bangladesh',
    sellerName: 'Khoj Verified Partner',
    sellerPhone: '+880 1700-000000',
    sellerRating: 5.0,
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'Available',
    isFeatured: false,
    isVerified: true,
    stock: 1,
    sku: '',
    tags: '',
    adminNotes: 'Direct admin creation'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyPreset = (type) => {
    if (type === 'khoj_official') {
      setFormData(prev => ({
        ...prev,
        sellerName: 'Khoj Official Store',
        sellerPhone: '+880 1800-KHOJBD',
        sellerRating: 5.0,
        isVerified: true,
        isFeatured: true
      }));
    } else if (type === 'refurbished') {
      setFormData(prev => ({
        ...prev,
        condition: 'Used - Like New',
        sellerName: 'Khoj Certified Refurbished',
        sellerPhone: '+880 1700-REFURB',
        sellerRating: 4.9,
        isVerified: true
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.price || !formData.description.trim()) {
      alert('Please fill in title, price, and description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || 0),
        stock: Number(formData.stock || 1),
        sellerRating: Number(formData.sellerRating || 5.0),
        tags: typeof formData.tags === 'string'
          ? formData.tags.split(',').map(t => t.trim()).filter(Boolean)
          : (formData.tags || [])
      };
      await onCreate(payload);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-[#111726] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Create Catalog Product
              </h3>
              <p className="text-[11px] text-slate-400">Add a verified listing directly into the marketplace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-4 sm:px-6 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Presets:</span>
          <button
            type="button"
            onClick={() => handleApplyPreset('khoj_official')}
            className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-amber-500 text-[11px] transition-colors cursor-pointer"
          >
            Khoj Official Store
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('refurbished')}
            className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium hover:border-amber-500 text-[11px] transition-colors cursor-pointer"
          >
            Certified Refurbished
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Sony PlayStation 5 Slim 1TB Console"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
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
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              >
                {CONDITIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Price (৳ BDT) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="e.g. 52000"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Original Price (for discount strikethrough)
              </label>
              <input
                type="number"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => handleChange('originalPrice', e.target.value)}
                placeholder="Optional, e.g. 60000"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Gallery Component */}
          <div>
            <AdminImageManager
              images={formData.images}
              onChange={(newImgs) => handleChange('images', newImgs)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Full details of features, condition, warranty, and included accessories..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
            />
          </div>

          {/* Location & Seller Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location City/Area *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Seller Name
              </label>
              <input
                type="text"
                value={formData.sellerName}
                onChange={(e) => handleChange('sellerName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Stock, Status & Featured Flags */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Initial Stock
              </label>
              <input
                type="number"
                min="1"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0c111c] text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange('isFeatured', e.target.checked)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                  Featured Item
                </span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
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
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 text-xs font-bold transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Creating Product...</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Publish Product</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
