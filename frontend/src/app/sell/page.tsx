"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { PlusCircle, Image as ImageIcon, Tag, DollarSign, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'Electronics',
  'Mobile Phones',
  'Gaming',
  'Vehicles',
  'Furniture',
  'Fashion',
  'Books & Hobbies',
  'Home Appliances'
];

const CONDITIONS = [
  { id: 'Brand New', label: 'Brand New (Unopened/Sealed)', desc: 'Item is unused in original box' },
  { id: 'Used - Like New', label: 'Used - Like New', desc: 'Flawless condition with no visible scratches' },
  { id: 'Used - Good', label: 'Used - Good', desc: 'Normal wear & tear, 100% functional' },
  { id: 'Used - Fair', label: 'Used - Fair', desc: 'Visible marks or scratches, budget price' }
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1580481072645-022f9a6d1294?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80"
];

export default function SellPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Used - Like New');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(user?.location || 'Gulshan, Dhaka');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages(prev => [...prev, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    setIsSubmitting(true);
    try {
      const res = await api.post('/products', {
        title,
        category,
        condition,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : 0,
        description,
        images,
        location,
        sellerId: user?.id || 'user_demo_2',
        sellerName: user?.name || 'Sabbir Hossain',
        sellerAvatar: user?.avatar || ''
      });

      const newProd = res.data;
      router.push(`/product/${newProd._id || newProd.id || ''}`);
    } catch (err) {
      console.error("Failed to post ad", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold">
          <PlusCircle className="w-3.5 h-3.5" />
          Create Marketplace Listing
        </div>
        <h1 className="text-3xl font-extrabold text-white">Post an Ad / Sell Item</h1>
        <p className="text-xs text-slate-400">List your used or new product for thousands of local buyers on Khoj.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column (7 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          
          {/* Item Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Product Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Apple MacBook Air M1 (8GB, 256GB SSD) - Space Gray"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Category & Condition Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Item Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs cursor-pointer"
              >
                {CONDITIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Asking Price ($) *
              </label>
              <input
                type="number"
                placeholder="e.g. 750"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-900 text-white font-bold rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Original Price ($) (Optional)
              </label>
              <input
                type="number"
                placeholder="e.g. 999 (Shows savings)"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Item Location *
            </label>
            <input
              type="text"
              placeholder="e.g. Dhanmondi, Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Product Images (Image URL)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                placeholder="Paste image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-900 text-xs text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl border border-slate-700"
              >
                Add Image
              </button>
            </div>

            {/* Quick Demo Image Presets */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400">Or pick sample product photos:</span>
              <div className="flex gap-2 overflow-x-auto py-1">
                {SAMPLE_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImages([img, ...images.slice(1)])}
                    className="w-12 h-12 rounded-lg overflow-hidden border border-slate-800 shrink-0 hover:border-indigo-500"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              Detailed Description *
            </label>
            <textarea
              rows={5}
              placeholder="Describe condition details, battery health, included accessories, reason for selling..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs leading-relaxed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isSubmitting ? 'Publishing Ad...' : 'Publish Product Ad Now'}</span>
          </button>

        </form>

        {/* Live Preview Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Buyer Card Preview</h3>
            
            <div className="glass-card rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <img
                  src={images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-600/90 text-white shadow">
                  {condition}
                </span>
              </div>
              <div className="p-4 space-y-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase">{category}</span>
                <h4 className="text-base font-bold text-white leading-snug">
                  {title || 'Your Product Title Will Appear Here'}
                </h4>
                <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                  <span className="text-2xl font-black text-white">${price || '0'}</span>
                  <span className="text-xs text-slate-400">{location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant Visibility</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Your listing will immediately be published on the homepage and searchable by condition, category, and price range.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
