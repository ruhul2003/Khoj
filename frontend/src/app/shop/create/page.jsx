"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
  Store, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Camera, 
  Layers, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

const CATEGORIES = [
  'Electronics',
  'Mobile Phones',
  'Vehicles',
  'Furniture',
  'Fashion',
  'Gaming',
  'Books & Hobbies',
  'Home Appliances',
  'General'
];

const PRESET_BANNERS = [
  { id: 1, label: 'Modern Tech', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, label: 'Sleek Minimal', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, label: 'Urban Retail', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80' }
];

const PRESET_LOGOS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=300&q=80' },
  { id: 2, url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=300&q=80' },
  { id: 3, url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80' },
  { id: 4, url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80' }
];

function CreateShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get('welcome') === 'true';

  const { user, userShop, createShop, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Dhaka, Bangladesh');
  const [phone, setPhone] = useState('+880 1700-000000');
  const [banner, setBanner] = useState(PRESET_BANNERS[0].url);
  const [logo, setLogo] = useState(PRESET_LOGOS[0].url);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdShopData, setCreatedShopData] = useState(null);

  useEffect(() => {
    if (user && user.location) {
      setLocation(user.location);
    }
  }, [user]);

  // Auto-format slug from name if user hasn't manually edited slug
  const handleNameChange = (val) => {
    setName(val);
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a shop name.');
      return;
    }
    setSubmitting(true);
    setError('');

    try {
      const shopPayload = {
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        description: description.trim() || `Official marketplace shop for ${name}. Verified authentic inventory and dedicated customer service.`,
        location,
        phone,
        banner,
        logo,
        email: user?.email || '',
      };

      const newShop = await createShop(shopPayload);
      setCreatedShopData(newShop);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create shop.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0c9096] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If user already owns a shop and didn't just create it
  if (userShop && !createdShopData) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center font-['Bai_Jamjuree'] space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096] mx-auto shadow-xl">
          <Store className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">You already have a shop!</h1>
        <p className="text-sm text-zinc-400">
          Your shop <strong className="text-white font-bold">{userShop.name}</strong> is live on Khoj marketplace.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/shop/${userShop.slug}`}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>View Public Storefront</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard?tab=shop"
            className="w-full sm:w-auto px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all"
          >
            Manage in Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Celebratory view when shop is created successfully!
  if (createdShopData) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center font-['Bai_Jamjuree'] space-y-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#0c9096] to-emerald-500 flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>
          <Sparkles className="w-8 h-8 text-amber-400 absolute -top-2 -right-2 animate-bounce" />
        </div>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/30">
            Shop Launched Successfully
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Congratulations, {createdShopData.name}!
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Your brand new marketplace shop is now live. Start listing your items or customize your storefront appearance.
          </p>
        </div>

        {/* Storefront Preview Card */}
        <div className="glass-panel overflow-hidden rounded-3xl border border-zinc-800 text-left shadow-2xl">
          <div className="h-32 w-full relative">
            <img src={createdShopData.banner} alt="Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="p-6 relative -mt-12 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <img
                src={createdShopData.logo}
                alt="Logo"
                className="w-16 h-16 rounded-2xl object-cover border-4 border-zinc-900 shadow-xl"
              />
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  <span>{createdShopData.name}</span>
                  <ShieldCheck className="w-4 h-4 text-[#0c9096]" />
                </h3>
                <p className="text-xs text-zinc-400">{createdShopData.location} • {createdShopData.category}</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
              Verified 5.0 ★
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/shop/${createdShopData.slug}`}
            className="w-full sm:w-auto px-8 py-4 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0c9096]/20 transition-all flex items-center justify-center gap-2"
          >
            <span>Visit Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/sell"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-100 text-[#031615] font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all"
          >
            + Post First Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-['Bai_Jamjuree'] space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        {isWelcome && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c9096]/15 border border-[#0c9096]/30 text-[#0c9096] text-xs font-black uppercase tracking-wider mb-1 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Khoj! Step 2: Open Your Shop</span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Create Your Marketplace Shop
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Set up your branded seller storefront on Khoj. Reach thousands of local buyers with a verified storefront handle and instant product showcase.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
          {error}
        </div>
      )}

      {/* Main Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Store className="w-4 h-4 text-[#0c9096]" />
            <span>1. Basic Store Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Shop Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Dhaka Tech Zone"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Store URL Handle / Slug *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-zinc-500 text-xs font-medium select-none">
                  khoj/shop/
                </span>
                <input
                  type="text"
                  placeholder="dhaka-tech-zone"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                  required
                  className="w-full pl-24 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Primary Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Location / City *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dhanmondi, Dhaka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
                />
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Contact Phone / WhatsApp *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="+880 1712-345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
                />
                <Phone className="w-4 h-4 text-zinc-500 absolute left-4 top-4" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">
                Shop Bio & Seller Policy
              </label>
              <textarea
                rows={3}
                placeholder="Tell buyers about your shop, warranty guarantees, return policies, and specialty products..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
              />
            </div>
          </div>
        </div>

        {/* Visual Branding Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 shadow-xl">
          <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#689db8]" />
            <span>2. Store Branding & Cover Images</span>
          </h2>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Choose Cover Banner
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_BANNERS.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setBanner(b.url)}
                  className={`relative h-24 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all group ${
                    banner === b.url ? 'border-[#0c9096] scale-[1.02] shadow-lg shadow-[#0c9096]/20' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img src={b.url} alt={b.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center">
                    <span className="text-[11px] font-bold text-white drop-shadow-md">{b.label}</span>
                  </div>
                  {banner === b.url && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#0c9096] text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Choose Brand Logo Avatar
            </label>
            <div className="grid grid-cols-4 gap-3 max-w-sm">
              {PRESET_LOGOS.map((l) => (
                <div
                  key={l.id}
                  onClick={() => setLogo(l.url)}
                  className={`relative w-16 h-16 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                    logo === l.url ? 'border-[#0c9096] scale-105 shadow-lg shadow-[#0c9096]/20' : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <img src={l.url} alt="Logo" className="w-full h-full object-cover" />
                  {logo === l.url && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0c9096] text-white flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Link
            href="/dashboard"
            className="px-6 py-3.5 text-xs text-zinc-400 hover:text-white font-bold uppercase tracking-wider transition-colors"
          >
            Skip for now
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-4 bg-gradient-to-r from-[#0c9096] to-[#0a6c71] hover:from-[#0da2a9] hover:to-[#0c9096] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0c9096]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <Store className="w-4 h-4" />
            <span>{submitting ? 'Launching Store...' : 'Launch My Shop Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0c9096] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CreateShopContent />
    </Suspense>
  );
}
