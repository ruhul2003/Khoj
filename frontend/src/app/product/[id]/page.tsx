"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Product, api } from '@/lib/api';
import { MakeOfferModal } from '@/components/MakeOfferModal';
import { BuyModal } from '@/components/BuyModal';
import { ChatDrawer } from '@/components/ChatDrawer';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Heart, Eye, ShieldCheck, DollarSign, MessageSquare, ShoppingBag, Star, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { isSaved, toggleWishlist } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals / Drawers
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The listing might have been removed or marked as sold.</p>
        <Link href="/browse" className="inline-block px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const saved = isSaved(product._id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Navigation back */}
      <div>
        <Link
          href="/browse"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse Catalog</span>
        </Link>
      </div>

      {/* Main Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Hero Image */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden glass-panel border border-slate-800 bg-slate-950">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            {/* Condition Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-600/90 text-white border border-indigo-400 shadow-xl backdrop-blur-md">
                {product.condition}
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product._id)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all z-10 ${
                saved
                  ? 'bg-pink-600 text-white border-pink-500 shadow-xl scale-110'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Selector strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-indigo-500 scale-105' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Section */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-lg font-bold text-white">Item Overview & Specs</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
            
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div>
                <span className="block text-slate-500">Category</span>
                <span className="font-semibold text-white">{product.category}</span>
              </div>
              <div>
                <span className="block text-slate-500">Condition</span>
                <span className="font-semibold text-indigo-400">{product.condition}</span>
              </div>
              <div>
                <span className="block text-slate-500">Location</span>
                <span className="font-semibold text-white">{product.location}</span>
              </div>
              <div>
                <span className="block text-slate-500">Views</span>
                <span className="font-semibold text-white">{product.views || 1} views</span>
              </div>
              <div>
                <span className="block text-slate-500">Posted</span>
                <span className="font-semibold text-white">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Action Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            
            {/* Title & Location */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 font-semibold">
                  {product.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {product.location}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">Selling Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">${product.price.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-slate-500 line-through">${product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
              {discountPercent > 0 && (
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold">
                    Save {discountPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {product.status === 'Sold' ? (
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800 text-center space-y-1">
                <p className="text-sm font-bold text-rose-400">THIS ITEM HAS BEEN SOLD</p>
                <p className="text-xs text-slate-400">Browse other items in {product.category}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setIsBuyModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now (Instant Order)</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsOfferModalOpen(true)}
                    className="py-3 bg-slate-900 hover:bg-slate-800 text-indigo-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                    <span>Make an Offer</span>
                  </button>

                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="py-3 bg-slate-900 hover:bg-slate-800 text-purple-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    <span>Chat Seller</span>
                  </button>
                </div>
              </div>
            )}

            {/* Seller Information Card */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">About the Seller</h4>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-3">
                  {product.sellerAvatar ? (
                    <img src={product.sellerAvatar} alt={product.sellerName} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                      {product.sellerName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-1">
                      {product.sellerName}
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h5>
                    <div className="flex items-center gap-1 text-xs text-amber-400 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{product.sellerRating || 4.9}</span>
                      <span className="text-slate-500">(15+ ratings)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 text-white font-bold">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Buyer Safety Tips</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                <li>Meet the seller in a safe, public place.</li>
                <li>Inspect the product condition thoroughly before paying.</li>
                <li>Never transfer advance money without verification.</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Modals */}
      <MakeOfferModal
        product={product}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />

      <BuyModal
        product={product}
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />

      <ChatDrawer
        product={product}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

    </div>
  );
}
