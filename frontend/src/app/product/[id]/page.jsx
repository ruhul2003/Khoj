"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { MakeOfferModal } from '@/components/MakeOfferModal';
import { ChatDrawer } from '@/components/ChatDrawer';
import { ProductCard } from '@/components/ProductCard';
import { ProductReviews } from '@/components/ProductReviews';
import { InspectionChecklistModal } from '@/components/InspectionChecklistModal';
import { RecentlyViewed } from '@/components/RecentlyViewed';
import { PriceAlertModal } from '@/components/PriceAlertModal';
import { ReportListingModal } from '@/components/ReportListingModal';
import { SafeHandoverHubs } from '@/components/SafeHandoverHubs';
import { QuickInquiryPills } from '@/components/QuickInquiryPills';
import { WarrantyBadge } from '@/components/WarrantyBadge';
import { ShareModal } from '@/components/ShareModal';
import { EmiCalculatorModal } from '@/components/EmiCalculatorModal';
import { DeliveryEstimator } from '@/components/DeliveryEstimator';
import { ConditionGuideModal } from '@/components/ConditionGuideModal';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  MapPin,
  Heart,
  ShieldCheck,
  DollarSign,
  MessageSquare,
  Star,
  ArrowLeft,
  Handshake,
  Phone,
  Award,
  Zap,
  Clock,
  ExternalLink,
  MessageCircle,
  Copy,
  Check,
  Share2,
  Bell,
  Flag,
  Calculator
} from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { isSaved, toggleWishlist } = useAuth();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState('');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isPriceAlertOpen, setIsPriceAlertOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);
  const [isConditionGuideOpen, setIsConditionGuideOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isCopiedLink, setIsCopiedLink] = useState(false);

  const handleShare = () => {
    if (!product) return;
    setIsShareModalOpen(true);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product._id);
    if (saved) {
      addToast('Removed from your wishlist', 'info');
    } else {
      addToast('Saved to your wishlist!', 'success');
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data);

      try {
        const stored = localStorage.getItem('khoj_recently_viewed');
        let parsed = stored ? JSON.parse(stored) : [];
        const currentId = res.data._id || res.data.id;
        parsed = [res.data, ...parsed.filter(p => (p._id || p.id) !== currentId)].slice(0, 8);
        localStorage.setItem('khoj_recently_viewed', JSON.stringify(parsed));
      } catch (e) {
        console.error('Failed to sync recently viewed:', e);
      }

      if (res.data?.category) {
        try {
          const relRes = await api.get('/products', { params: { category: res.data.category } });
          const list = (relRes.data || [])
            .filter(p => (p._id || p.id) !== productId)
            .slice(0, 4);
          setRelatedProducts(list);
        } catch (e) {
          console.error("Failed to load similar products", e);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-20 text-center font-['Bai_Jamjuree']">
        <div className="w-12 h-12 border-4 border-[#0c9096] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400 text-xs uppercase tracking-widest">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-20 text-center space-y-4 font-['Bai_Jamjuree']">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-zinc-400">This listing may have been removed.</p>
        <Link href="/browse" className="inline-block px-5 py-2.5 bg-[#0c9096] hover:bg-[#0a6c71] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const saved = isSaved(product._id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const sellerPhoneNumber = product.sellerPhone || '+880 1712-345678';
  const cleanPhone = sellerPhoneNumber.replace(/[^0-9+]/g, '');

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-8 font-['Bai_Jamjuree']">
      {/* Dynamic Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
        <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
        <span className="text-zinc-600">/</span>
        <Link href="/browse" className="hover:text-amber-400 transition-colors">Catalog</Link>
        <span className="text-zinc-600">/</span>
        <Link href={`/browse?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-400 transition-colors">
          {product.category}
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-zinc-300 font-bold truncate max-w-[280px] sm:max-w-md">{product.title}</span>
      </nav>

      <div className="flex items-center justify-between">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPriceAlertOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-amber-400 hover:text-amber-300 transition-all cursor-pointer shadow-sm"
            title="Set Price Drop Alert"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Price Alert</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
            title="Share this listing"
          >
            {isCopiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#0c9096]" />}
            <span>{isCopiedLink ? 'Copied Link' : 'Share Listing'}</span>
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer shadow-sm ${
              saved
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
            title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`} />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden glass-panel border border-zinc-800 bg-zinc-950">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#0c9096] text-white border border-[#689db8]/40 shadow-xl">
                {product.condition}
              </span>
              <button
                type="button"
                onClick={() => setIsConditionGuideOpen(true)}
                className="px-2.5 py-1.5 rounded-full text-[11px] font-bold bg-zinc-950/80 hover:bg-zinc-900 text-teal-300 border border-teal-500/30 backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1 shadow-lg"
                title="View Condition Rating Guide"
              >
                <Award className="w-3.5 h-3.5" /> Guide
              </button>
            </div>

            <button
              onClick={handleWishlistToggle}
              className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md border transition-all z-10 cursor-pointer ${
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
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx ? 'border-[#0c9096] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
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
                <button
                  type="button"
                  onClick={() => setIsConditionGuideOpen(true)}
                  className="font-bold text-[#0c9096] hover:underline flex items-center gap-1 cursor-pointer"
                  title="View Condition Rating Guide"
                >
                  {product.condition} <Award className="w-3 h-3" />
                </button>
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

          {/* Warranty & Guarantee Overview */}
          <WarrantyBadge condition={product.condition} category={product.category} variant="detailed" />

          <ProductReviews productId={product._id || product.id} sellerId={product.sellerId} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-zinc-800 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[#0c9096] font-bold uppercase tracking-widest text-[10px]">
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
                  <span className="text-3xl font-black text-white">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-zinc-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {product.price >= 3000 && (
                  <button
                    type="button"
                    onClick={() => setIsEmiModalOpen(true)}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-400" />
                    <span>From ৳{Math.round(product.price / 6).toLocaleString()}/mo on 0% EMI ➔</span>
                  </button>
                )}
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
              <div className="space-y-4">
                {/* Primary Action: Contact & Discuss Handover */}
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="w-full py-4 bg-gradient-to-r from-[#0a6c71] to-[#0c9096] hover:from-[#0c9096] hover:to-[#13a7ad] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0c9096]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Handshake className="w-4 h-4" />
                  <span>Contact Seller & Discuss Handover</span>
                </button>

                {/* Secondary Actions: Price Offer & Call Seller */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsOfferModalOpen(true)}
                    className="py-3.5 bg-zinc-900 hover:bg-[#032e2e] text-[#689db8] hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <DollarSign className="w-4 h-4 text-[#0c9096]" />
                    <span>Make Offer</span>
                  </button>

                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="py-3.5 bg-zinc-900 hover:bg-[#032e2e] text-[#38d4dc] hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#0c9096]" />
                    <span>{showPhone ? 'Hide Phone' : 'Call / WhatsApp'}</span>
                  </button>
                </div>

                {/* Seller Phone Reveal Box */}
                {showPhone && (
                  <div className="p-4 rounded-2xl bg-zinc-950 border border-[#264b5d] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-medium">Seller Phone:</span>
                      <span className="font-extrabold text-white text-sm tracking-wide">{sellerPhoneNumber}</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="flex-1 py-2 px-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" /> Call Now
                      </a>
                      <a
                        href={`https://wa.me/${cleanPhone.replace('+', '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 bg-[#0a6c71] hover:bg-[#0c9096] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(sellerPhoneNumber);
                          setCopiedPhone(true);
                          addToast('Seller phone number copied to clipboard', 'info');
                          setTimeout(() => setCopiedPhone(false), 2000);
                        }}
                        className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Copy Phone"
                      >
                        {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#38d4dc]" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Instant Quick Inquiries */}
                <QuickInquiryPills
                  onSelectInquiry={(inquiryText) => {
                    setChatInitialMessage(inquiryText);
                    setIsChatOpen(true);
                  }}
                />

                {/* Direct Handover Information Panel */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-[#689db8] font-bold uppercase tracking-wider text-[11px]">
                    <Handshake className="w-4 h-4 text-[#0c9096]" />
                    <span>How Handover Works</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-[11px]">
                    Khoj connects local buyers and sellers directly without automated checkout. Contact the seller to arrange how you'll receive the item:
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
                      <span className="w-5 h-5 rounded-full bg-[#0c9096]/20 text-[#38d4dc] font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                      <div>
                        <span className="font-bold text-white block">Contact Seller</span>
                        <span className="text-zinc-400 text-[11px]">Chat on Khoj or call to verify product availability.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
                      <span className="w-5 h-5 rounded-full bg-[#0c9096]/20 text-[#38d4dc] font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                      <div>
                        <span className="font-bold text-white block">Agree on Handover</span>
                        <span className="text-zinc-400 text-[11px]">Choose in-person meetup in {product.location} or courier delivery.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50">
                      <span className="w-5 h-5 rounded-full bg-[#0c9096]/20 text-[#38d4dc] font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                      <div>
                        <span className="font-bold text-white block">Inspect & Pay</span>
                        <span className="text-zinc-400 text-[11px]">Check condition thoroughly before paying in cash or bKash.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verified Safe Handover Hubs */}
                <SafeHandoverHubs location={product.location} />

                {/* Delivery & Shipping Fee Estimator */}
                <DeliveryEstimator sellerCity={product.location || 'Dhaka'} />
              </div>
            )}

            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Seller Details</h4>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    {product.sellerAvatar ? (
                      <img src={product.sellerAvatar} alt={product.sellerName} className="w-12 h-12 rounded-full object-cover border-2 border-[#0c9096]" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#0c9096] text-white flex items-center justify-center font-bold text-lg">
                        {product.sellerName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {product.sellerName}
                        <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Khoj Merchant" />
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.sellerRating || 4.9}</span>
                        </div>
                        <span>•</span>
                        <span className="text-emerald-400 font-medium">99% Positive</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-200 rounded-xl border border-zinc-800 cursor-pointer transition-colors"
                  >
                    Message
                  </button>
                </div>

                {/* Seller Trust Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-[11px] text-zinc-300">
                    <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Replies in ~15 mins</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800/50 text-[11px] text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Member since 2024</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Safety & Trust Box */}
            <div className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Khoj Buyer Safety Assurance</span>
              </div>
              <ul className="space-y-2 text-[11px] text-zinc-400 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Meet in a busy, well-lit public place (e.g. Metro station, shopping mall) for exchange.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Inspect devices, verify IMEI/serial numbers, and test before completing payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Never transfer advance money or share OTPs before receiving the item.</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setIsChecklistOpen(true)}
                className="w-full mt-3 py-2.5 px-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Physical Inspection Checklist</span>
              </button>

              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="w-full py-2 px-3 rounded-xl hover:bg-rose-950/30 text-zinc-500 hover:text-rose-400 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Flag className="w-3 h-3 text-rose-500/70" />
                <span>Report suspicious listing or scam</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products Recommendation Grid */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Similar Products in {product.category}</h3>
              <p className="text-xs text-zinc-400">Discover more listings like this from verified sellers</p>
            </div>
            <Link
              href={`/browse?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
            >
              <span>Explore All {product.category}</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed History */}
      <RecentlyViewed currentProductId={productId} />

      <InspectionChecklistModal
        category={product.category}
        productTitle={product.title}
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      <MakeOfferModal
        product={product}
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
      />

      <ChatDrawer
        product={product}
        isOpen={isChatOpen}
        initialMessage={chatInitialMessage}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialMessage('');
        }}
      />

      <PriceAlertModal
        product={product}
        isOpen={isPriceAlertOpen}
        onClose={() => setIsPriceAlertOpen(false)}
      />

      <ReportListingModal
        productId={product._id || product.id}
        productTitle={product.title}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        product={product}
      />

      <EmiCalculatorModal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
        price={product.price}
        productTitle={product.title}
      />

      <ConditionGuideModal
        isOpen={isConditionGuideOpen}
        onClose={() => setIsConditionGuideOpen(false)}
      />
    </div>
  );
}
