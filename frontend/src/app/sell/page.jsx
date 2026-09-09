"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { PlusCircle, Sparkles, CheckCircle2 } from 'lucide-react';

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
  { id: 'Brand New', label: 'Brand New (Unopened/Sealed)' },
  { id: 'Used - Like New', label: 'Used - Like New' },
  { id: 'Used - Good', label: 'Used - Good' },
  { id: 'Used - Fair', label: 'Used - Fair' }
];

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1580481072645-022f9a6d1294?auto=format&fit=crop&w=1000&q=80"
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
  const [images, setImages] = useState([
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages(prev => [...prev, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleSubmit = async (e) => {
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
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest">
          <PlusCircle className="w-4 h-4" />
          Create Ad Listing
        </div>
        <h1 className="text-4xl font-extrabold text-white">Post a Product for Sale</h1>
        <p className="text-xs text-zinc-400">List your used or new product for thousands of local buyers on Khoj.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-zinc-800 space-y-6">
          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
              Product Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Apple MacBook Air M1 (8GB RAM, 256GB SSD) Space Gray"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-5 py-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 text-xs font-medium cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 text-xs font-medium cursor-pointer"
              >
                {CONDITIONS.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
                Price (BDT / Tk) *
              </label>
              <input
                type="number"
                placeholder="1450"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-5 py-3.5 bg-zinc-950 text-white font-extrabold text-lg rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
                Original Price (BDT / Tk)
              </label>
              <input
                type="number"
                placeholder="1999"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-5 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
              Location *
            </label>
            <input
              type="text"
              placeholder="Gulshan, Dhaka"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-5 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
              Image URL
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                placeholder="Paste image URL..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-4 py-3 bg-zinc-950 text-xs text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 font-medium"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white rounded-2xl border border-zinc-700 uppercase tracking-wider"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
              Description *
            </label>
            <textarea
              rows={5}
              placeholder="Describe product condition details, reason for selling..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-5 py-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 text-xs leading-relaxed font-light"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish Product Listing'}</span>
          </button>
        </form>

        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-28">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Live Card Preview</h3>
            
            <div className="glass-card rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <div className="relative aspect-[4/3] w-full bg-zinc-950">
                <img
                  src={images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-600 text-white shadow">
                  {condition}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{category}</span>
                <h4 className="text-base font-bold text-white leading-snug">
                  {title || 'Product Title Preview'}
                </h4>
                <div className="flex items-baseline justify-between pt-3 border-t border-zinc-800">
                  <span className="text-2xl font-black text-white">৳{price ? Number(price).toLocaleString() : '0'}</span>
                  <span className="text-xs text-zinc-400">{location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
