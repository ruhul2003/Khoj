"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { MakeOfferModal } from '@/components/MakeOfferModal';
import { BuyModal } from '@/components/BuyModal';
import { ChatDrawer } from '@/components/ChatDrawer';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Heart, ShieldCheck, DollarSign, MessageSquare, ShoppingBag, Star, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { isSaved, toggleWishlist } = useAuth();

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

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
      <div className="max-w-[1600px] mx-auto px-6 py-20 text-center font-['Bai_Jamjuree']">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-xs uppercase tracking-widest">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-20 text-center space-y-4 font-['Bai_Jamjuree']">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-zinc-400">This listing may have been removed.</p>
        <Link href="/browse" className="inline-block px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const saved = isSaved(product._id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      <div>
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden glass-panel border border-zinc-800 bg-zinc-950">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-5 left-5 z-10">
              <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-indigo-600 text-white border border-indigo-400 shadow-xl">
                {product.condition}
              </span>
            </div>

            <button
              onClick={() => toggleWishlist(product._id)}
              className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md border transition-all z-10 ${
                saved
                  ? 'bg-rose-600 text-white border-rose-500 shadow-xl scale-110'
                  : 'bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-indigo-500 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Product Details</h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-light">
              {product.description}
            </p>
            
            <div className="pt-6 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-400 font-medium">
              <div>
                <span className="block text-zinc-500 uppercase tracking-widest text-[10px]">Category</span>
                <span className="font-bold text-white">{product.category}</span>
              </div>
              <div>
                <span className="block text-zinc-500 uppercase tracking-widest text-[10px]">Condition</span>
                <span className="font-bold text-indigo-400">{product.condition}</span>
              </div>
              <div>
                <span className="block text-zinc-500 uppercase tracking-widest text-[10px]">Location</span>
                <span className="font-bold text-white">{product.location}</span>
              </div>
              <div>
                <span className="block text-zinc-500 uppercase tracking-widest text-[10px]">Views</span>
                <span className="font-bold text-white">{product.views || 1} views</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-indigo-400 font-bold uppercase tracking-widest text-[10px]">
                  {product.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {product.location}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                {product.title}
              </h1>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-widest block font-bold">Asking Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">${product.price.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-zinc-500 line-through">${product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
              {discountPercent > 0 && (
                <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {product.status === 'Sold' ? (
              <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-800 text-center space-y-1">
                <p className="text-sm font-bold text-rose-400 uppercase tracking-wider">ITEM SOLD OUT</p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => setIsBuyModalOpen(true)}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now (Instant Order)</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsOfferModalOpen(true)}
                    className="py-3.5 bg-zinc-900 hover:bg-zinc-800 text-indigo-300 font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-indigo-400" />
                    <span>Make Offer</span>
                  </button>

                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="py-3.5 bg-zinc-900 hover:bg-zinc-800 text-purple-300 font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-purple-400" />
                    <span>Chat Seller</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Seller Details</h4>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-4">
                  {product.sellerAvatar ? (
                    <img src={product.sellerAvatar} alt={product.sellerName} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                      {product.sellerName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {product.sellerName}
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </h5>
                    <div className="flex items-center gap-1 text-xs text-amber-400 mt-0.5 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{product.sellerRating || 4.9}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-200 rounded-xl border border-zinc-800"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
