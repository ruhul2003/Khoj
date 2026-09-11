"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { PlusCircle, Sparkles, CheckCircle2, AlertCircle, Image as ImageIcon, Store, ArrowRight, ShieldCheck } from 'lucide-react';
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
  const { user, userShop, isLoading } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [condition, setCondition] = useState('Used - Like New');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(user?.location || userShop?.location || 'Gulshan, Dhaka');
  const [sellerPhone, setSellerPhone] = useState(user?.phone || userShop?.phone || '+880 1712-345678');
  const [images, setImages] = useState([]);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-['Bai_Jamjuree']">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0c9096]"></div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 font-['Bai_Jamjuree']">
        <div className="glass-panel max-w-lg p-8 sm:p-10 rounded-3xl border border-zinc-800 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Store className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sign In & Register a Shop to Sell</h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
            On Khoj Marketplace, only registered shop owners can post products for sale. Please sign in to access your shop.
          </p>
          <div className="pt-2 flex gap-3 justify-center">
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-gradient-to-r from-[#0c9096] to-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-zinc-700"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. User Logged in BUT Has No Registered Shop
  if (!userShop) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 font-['Bai_Jamjuree']">
        <div className="glass-panel max-w-lg p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-[#141b24] text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 font-black">
            <Store className="w-8 h-8 text-slate-950" />
          </div>
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-wider inline-block">
              Shop Registration Required
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Register a Shop to Sell Products
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
              On Khoj Marketplace, only registered shop owners can post products for sale. Open your official storefront in less than a minute to start listing items!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 text-left space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Official marketplace storefront with brand logo & banner</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Post unlimited products directly linked to your shop</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Verified seller trust badge for buyer confidence</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop/create"
              className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>Open Your Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        location: location || userShop?.location || 'Dhaka, Bangladesh',
        sellerId: user?.id || userShop?.ownerId,
        sellerName: user?.name || userShop?.name || 'Shop Seller',
        sellerAvatar: user?.avatar || userShop?.logo || '',
        sellerPhone: sellerPhone || userShop?.phone || '+880 1712-345678',
        shopId: userShop?._id || userShop?.id,
        shopName: userShop?.name,
        shopSlug: userShop?.slug
      });

      const newProd = res.data;
      router.push(`/product/${newProd._id || newProd.id || ''}`);
    } catch (err) {
      console.error("Failed to post ad", err);
      setFormError(err.response?.data?.error || err.response?.data?.message || 'Failed to post product ad. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
          <Store className="w-4 h-4" />
          <span>Listing for Shop: {userShop.name}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white">Post a Product for Sale</h1>
        <p className="text-xs text-zinc-400">Products are automatically published and showcased under your official store.</p>
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
