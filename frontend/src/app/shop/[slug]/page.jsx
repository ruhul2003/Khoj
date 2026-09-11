"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ProductCard } from '@/components/ProductCard';
import { 
  Store, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Star, 
  Package, 
  ExternalLink, 
  Search, 
  Share2, 
  PlusCircle, 
  ArrowLeft,
  MessageCircle,
  Clock
} from 'lucide-react';

export default function ShopStorefrontPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const { user } = useAuth();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchShopDetails();
  }, [slug]);

  const fetchShopDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/shops/${slug}`);
      setShop(res.data.shop);
      setProducts(res.data.products || []);
    } catch (err) {
      setError('Shop not found or currently unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0c9096] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center font-['Bai_Jamjuree'] space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/15 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">{error || 'Store Not Found'}</h1>
        <p className="text-xs text-zinc-400">The shop link you visited might have been renamed or does not exist.</p>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c9096] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Marketplace</span>
        </Link>
      </div>
    );
  }

  const isOwner = user && (user.id === shop.ownerId || user.shopId === shop._id);

  const filteredProducts = products.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-8 font-['Bai_Jamjuree'] space-y-8">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        {isOwner && (
          <div className="flex items-center gap-3">
            <Link
              href="/sell"
              className="px-4 py-2 bg-[#0c9096] hover:bg-[#0a6c71] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>
            <Link
              href="/dashboard?tab=shop"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors"
            >
              Manage Shop
            </Link>
          </div>
        )}
      </div>

      {/* Store Header Banner */}
      <div className="glass-panel overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl relative">
        {/* Cover Photo */}
        <div className="h-48 sm:h-64 w-full relative">
          <img
            src={shop.banner || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        {/* Storefront Info Row */}
        <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <div className="relative">
                <img
                  src={shop.logo || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=300&q=80'}
                  alt={shop.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-zinc-950 shadow-2xl bg-zinc-900"
                />
                {shop.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#0c9096] rounded-full flex items-center justify-center text-white shadow-md border-2 border-zinc-950" title="Verified Marketplace Seller">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{shop.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#0c9096]/20 text-[#0c9096] border border-[#0c9096]/30 text-[10px] font-extrabold uppercase">
                    {shop.category || 'Official Store'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {shop.location || 'Dhaka, Bangladesh'}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {shop.rating || 5.0} Rating ({shop.reviewsCount || 0} reviews)
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Package className="w-3.5 h-3.5" />
                    {products.length} Active Listings
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleShare}
                className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-2xl border border-zinc-800 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share Shop'}</span>
              </button>

              {shop.phone && (
                <a
                  href={`tel:${shop.phone}`}
                  className="px-5 py-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#0c9096]/20 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Seller</span>
                </a>
              )}
            </div>
          </div>

          {/* Description & Policies */}
          {shop.description && (
            <div className="mt-6 pt-6 border-t border-zinc-850 text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
              <p>{shop.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Catalog & Search Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-[#0c9096]" />
              <span>Shop Inventory ({filteredProducts.length})</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">Explore items currently listed for sale by {shop.name}</p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search in this shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl border border-zinc-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-zinc-900 flex items-center justify-center text-zinc-600 mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">No items found in this shop</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {searchQuery ? 'Try searching with different keywords.' : 'This seller hasn\'t posted any active products yet.'}
            </p>
            {isOwner && (
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c9096] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg hover:bg-[#0a6c71] transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Your First Item</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
