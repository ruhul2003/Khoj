"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { PlusCircle, Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';

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
  const [sellerPhone, setSellerPhone] = useState(user?.phone || '+880 1712-345678');
  const [images, setImages] = useState([]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!title || !price || !description) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (images.length === 0) {
      setFormError('Please upload at least one product photo using the ImgBB uploader below.');
      return;
    }

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
        sellerAvatar: user?.avatar || '',
        sellerPhone: sellerPhone || '+880 1712-345678'
      });

      const newProd = res.data;
      router.push(`/product/${newProd._id || newProd.id || ''}`);
    } catch (err) {
      console.error("Failed to post ad", err);
      setFormError(err.response?.data?.message || 'Failed to post product ad. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c9096]/15 text-[#0c9096] text-xs font-bold uppercase tracking-widest">
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
              className="w-full px-5 py-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-sm font-medium"
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
                className="w-full px-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium cursor-pointer"
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
                className="w-full px-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium cursor-pointer"
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
                className="w-full px-5 py-3.5 bg-zinc-950 text-white font-extrabold text-lg rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096]"
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
                className="w-full px-5 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
                Location (Meetup / Handover Area) *
              </label>
              <input
                type="text"
                placeholder="Gulshan, Dhaka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-5 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-widest">
                Contact Phone / WhatsApp *
              </label>
              <input
                type="text"
                placeholder="+880 1712-345678"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                required
                className="w-full px-5 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-sm font-medium"
              />
            </div>
          </div>

          {/* Direct ImgBB Image Uploader */}
          <ImageUploader images={images} onChange={setImages} />

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
              className="w-full px-5 py-4 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs leading-relaxed font-light"
            />
          </div>

          {formError && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-400 text-xs font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#0a6c71] to-[#0c9096] hover:from-[#0c9096] hover:to-[#13a7ad] text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0c9096]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing Listing...' : 'Publish Product Listing'}</span>
          </button>
        </form>

        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Live Card Preview</h3>
              {images.length > 0 && (
                <span className="text-[11px] text-[#0c9096] font-bold">
                  {images.length} photo{images.length > 1 ? 's' : ''} uploaded
                </span>
              )}
            </div>
            
            <div className="glass-card rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <div className="relative aspect-[4/3] w-full bg-zinc-950 flex items-center justify-center">
                {images.length > 0 ? (
                  <img
                    src={images[0]}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/40 p-6 text-center border-b border-zinc-800">
                    <ImageIcon className="w-12 h-12 mb-2 text-zinc-700" />
                    <span className="text-xs font-semibold text-zinc-400">No photos uploaded yet</span>
                    <span className="text-[11px] text-zinc-600 mt-1">Upload images above to see your live preview</span>
                  </div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0c9096] text-white shadow">
                  {condition}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-[10px] font-bold text-[#0c9096] uppercase tracking-widest">{category}</span>
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
