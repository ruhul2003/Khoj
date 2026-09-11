"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  PlusCircle,
  Store,
  ExternalLink,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Edit3,
  Save,
  Sparkles
} from 'lucide-react';

function DashboardContent() {
  const { user, userShop, fetchUserShop, setUserShop, savedItemIds } = useAuth();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'listings';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [myListings, setMyListings] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Shop Edit Form State
  const [editingShop, setEditingShop] = useState(false);
  const [shopName, setShopName] = useState('');
  const [shopDesc, setShopDesc] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopLoc, setShopLoc] = useState('');
  const [savingShop, setSavingShop] = useState(false);
  const [shopMessage, setShopMessage] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  useEffect(() => {
    if (userShop) {
      setShopName(userShop.name || '');
      setShopDesc(userShop.description || '');
      setShopPhone(userShop.phone || '');
      setShopLoc(userShop.location || '');
    }
  }, [userShop]);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const listRes = await api.get('/products', { params: { sellerId: user.id } });
      setMyListings(listRes.data || []);

      const orderRes = await api.get('/orders', { params: { userId: user.id, role: 'buyer' } });
      setMyPurchases(orderRes.data || []);

      const offerRes = await api.get('/offers', { params: { userId: user.id, role: 'seller' } });
      setMyOffers(offerRes.data || []);

      const allProdRes = await api.get('/products');
      const allProds = allProdRes.data || [];
      setSavedProducts(allProds.filter(p => savedItemIds.includes(p._id)));

      if (!userShop) {
        await fetchUserShop(user.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSold = async (productId) => {
    try {
      await api.put(`/products/${productId}/status`, { status: 'Sold' });
      setMyListings(prev => prev.map(p => p._id === productId ? { ...p, status: 'Sold' } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteListing = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      setMyListings(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOfferStatus = async (offerId, status) => {
    try {
      await api.put(`/offers/${offerId}/status`, { status });
      setMyOffers(prev => prev.map(o => o._id === offerId ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveShopDetails = async (e) => {
    e.preventDefault();
    if (!userShop) return;
    setSavingShop(true);
    setShopMessage('');
    try {
      const updateData = {
        name: shopName,
        description: shopDesc,
        phone: shopPhone,
        location: shopLoc
      };
      const res = await api.put(`/shops/${userShop._id}`, updateData);
      setUserShop(res.data.shop);
      setEditingShop(false);
      setShopMessage('Shop information updated successfully!');
      setTimeout(() => setShopMessage(''), 3000);
    } catch (err) {
      setShopMessage(err.response?.data?.error || 'Failed to update shop.');
    } finally {
      setSavingShop(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-10 font-['Bai_Jamjuree']">
      {/* Profile Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#0c9096] shadow-xl" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[#0c9096] text-white flex items-center justify-center font-bold text-2xl">
              {user?.name?.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-white">{user?.name || 'User Dashboard'}</h1>
            <p className="text-xs text-zinc-400 mt-0.5">{user?.email || 'user@example.com'} • {user?.location || 'Dhaka, Bangladesh'}</p>
            <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Seller Rating: 5.0 ★</span>
              </span>
              {userShop && (
                <span className="px-2 py-0.5 rounded-md bg-[#0c9096]/20 text-[#0c9096] font-bold text-[11px] border border-[#0c9096]/30 flex items-center gap-1">
                  <Store className="w-3 h-3" />
                  <span>{userShop.name}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {userShop ? (
            <Link
              href={`/shop/${userShop.slug}`}
              className="px-5 py-3 bg-zinc-900 hover:bg-zinc-850 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 shadow-md flex items-center gap-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#0c9096]" />
              <span>Visit My Shop</span>
            </Link>
          ) : (
            <Link
              href="/shop/create"
              className="px-5 py-3 bg-gradient-to-r from-[#0c9096] to-[#0a6c71] hover:from-[#0da2a9] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2 transition-all"
            >
              <Store className="w-4 h-4" />
              <span>Open A Shop</span>
            </Link>
          )}

          <Link
            href="/sell"
            className="px-6 py-3 bg-white text-[#031615] font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2 hover:bg-zinc-100 transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#0c9096]" />
            <span>+ Post Product</span>
          </Link>
        </div>
      </div>

      {/* Summary Metrics Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        <button
          onClick={() => setActiveTab('listings')}
          className={`glass-panel p-5 rounded-3xl border text-left transition-all cursor-pointer ${
            activeTab === 'listings'
              ? 'border-[#0c9096] bg-[#0c9096]/10 shadow-lg shadow-[#0c9096]/10'
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">My Listings</span>
            <div className="w-8 h-8 rounded-xl bg-[#0c9096]/15 flex items-center justify-center text-[#0c9096]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{myListings.length}</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Active on marketplace</span>
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`glass-panel p-5 rounded-3xl border text-left transition-all cursor-pointer ${
            activeTab === 'purchases'
              ? 'border-[#689db8] bg-[#689db8]/10 shadow-lg shadow-[#689db8]/10'
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Orders</span>
            <div className="w-8 h-8 rounded-xl bg-[#689db8]/15 flex items-center justify-center text-[#689db8]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{myPurchases.length}</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Reserved & ordered</span>
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`glass-panel p-5 rounded-3xl border text-left transition-all cursor-pointer ${
            activeTab === 'offers'
              ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Offers Inbox</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{myOffers.length}</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Price proposals</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`glass-panel p-5 rounded-3xl border text-left transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'border-rose-500 bg-rose-500/10 shadow-lg shadow-rose-500/10'
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Wishlist</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{savedProducts.length}</div>
          <span className="text-[10px] text-zinc-500 mt-1 block">Bookmarked deals</span>
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`glass-panel p-5 rounded-3xl border text-left transition-all cursor-pointer col-span-2 sm:col-span-1 ${
            activeTab === 'shop'
              ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10'
              : 'border-zinc-800 hover:border-zinc-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">My Shop</span>
            <div className="w-8 h-8 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-400">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white truncate">
            {userShop ? 'Active' : 'Open Now'}
          </div>
          <span className="text-[10px] text-zinc-500 mt-1 block">
            {userShop ? userShop.name : 'Free storefront'}
          </span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-zinc-800 gap-3 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'listings' ? 'border-[#0c9096] text-[#0c9096] font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          My Listings ({myListings.length})
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'purchases' ? 'border-[#689db8] text-[#689db8] font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Orders ({myPurchases.length})
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'offers' ? 'border-emerald-500 text-emerald-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Offers Inbox ({myOffers.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'saved' ? 'border-rose-500 text-rose-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wishlist ({savedProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'shop' ? 'border-amber-400 text-amber-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4" />
          My Shop {userShop && '✓'}
        </button>
      </div>

      {/* Tab Contents */}

      {/* MY SHOP TAB */}
      {activeTab === 'shop' && (
        <div className="space-y-6">
          {shopMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold text-center">
              {shopMessage}
            </div>
          )}

          {userShop ? (
            <div className="space-y-6">
              {/* Store Hero Card */}
              <div className="glass-panel rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl relative">
                <div className="h-40 sm:h-52 w-full relative">
                  <img src={userShop.banner} alt={userShop.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                </div>

                <div className="p-6 sm:p-8 relative -mt-14 sm:-mt-16 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                    <img
                      src={userShop.logo}
                      alt={userShop.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-zinc-950 shadow-2xl bg-zinc-900"
                    />
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-2xl font-black text-white">{userShop.name}</h2>
                        <ShieldCheck className="w-5 h-5 text-[#0c9096]" />
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        URL: <span className="text-[#0c9096] font-bold">/shop/{userShop.slug}</span> • {userShop.category}
                      </p>
                      <div className="mt-2 flex items-center justify-center sm:justify-start gap-3 text-xs text-zinc-400">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {userShop.rating || 5.0} Rating
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          {userShop.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/shop/${userShop.slug}`}
                      className="px-5 py-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Public Store</span>
                    </Link>
                    <button
                      onClick={() => setEditingShop(!editingShop)}
                      className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>{editingShop ? 'Cancel Edit' : 'Edit Info'}</span>
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {editingShop && (
                  <form onSubmit={handleSaveShopDetails} className="p-6 sm:p-8 border-t border-zinc-800/80 bg-zinc-950/50 space-y-4">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#0c9096]" />
                      <span>Edit Store Information</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Shop Name</label>
                        <input
                          type="text"
                          value={shopName}
                          onChange={(e) => setShopName(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 bg-zinc-900 text-white rounded-xl border border-zinc-700 text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Phone Number</label>
                        <input
                          type="text"
                          value={shopPhone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-2.5 bg-zinc-900 text-white rounded-xl border border-zinc-700 text-xs font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Location / City</label>
                        <input
                          type="text"
                          value={shopLoc}
                          onChange={(e) => setShopLoc(e.target.value)}
                          className="w-full px-4 py-2.5 bg-zinc-900 text-white rounded-xl border border-zinc-700 text-xs font-medium"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Store Bio / Policy</label>
                        <textarea
                          rows={2}
                          value={shopDesc}
                          onChange={(e) => setShopDesc(e.target.value)}
                          className="w-full px-4 py-2.5 bg-zinc-900 text-white rounded-xl border border-zinc-700 text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={savingShop}
                        className="px-6 py-2.5 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{savingShop ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Shop Items Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-white">Items in My Shop ({myListings.length})</h3>
                    <p className="text-xs text-zinc-400">All products you list are automatically featured in your shop storefront</p>
                  </div>
                  <Link
                    href="/sell"
                    className="px-4 py-2 bg-white hover:bg-zinc-100 text-[#031615] font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#0c9096]" />
                    <span>+ Add Item</span>
                  </Link>
                </div>

                {myListings.length === 0 ? (
                  <div className="glass-panel p-12 text-center rounded-3xl border border-zinc-800 space-y-3">
                    <Package className="w-12 h-12 text-zinc-600 mx-auto" />
                    <h4 className="text-base font-bold text-white">Your shop is ready for its first product!</h4>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                      List your used or brand new items now and share your personal storefront link with buyers.
                    </p>
                    <Link
                      href="/sell"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c9096] text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg mt-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Post Product Now</span>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map((prod) => (
                      <ProductCard key={prod._id} product={prod} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Onboarding Banner if User has No Shop */
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-zinc-800 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#0c9096]/20 to-amber-400/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096] mx-auto shadow-xl">
                <Store className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="px-3 py-1 rounded-full bg-[#0c9096]/15 text-[#0c9096] text-xs font-black uppercase tracking-widest border border-[#0c9096]/30">
                  Seller Storefront Feature
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Open Your Official Marketplace Shop
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Take your selling to the next level. Build buyer credibility with your personal custom URL, verified seller badge, and consolidated storefront catalog.
                </p>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <div className="text-[#0c9096] font-bold text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Custom Handle
                  </div>
                  <p className="text-[11px] text-zinc-400">Share your dedicated store URL with customers across social media.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Verified Badge
                  </div>
                  <p className="text-[11px] text-zinc-400">Display official trusted seller certification on every listing.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                  <div className="text-[#689db8] font-bold text-xs flex items-center gap-1.5">
                    <Phone className="w-4 h-4" /> Direct Inquiries
                  </div>
                  <p className="text-[11px] text-zinc-400">Receive instant calls and WhatsApp proposals from verified buyers.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/shop/create"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#0c9096] to-[#0a6c71] hover:from-[#0da2a9] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-[#0c9096]/20 transition-all active:scale-[0.99]"
                >
                  <Store className="w-4 h-4" />
                  <span>Create Your Free Shop Now</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MY LISTINGS TAB */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-3">
              <Package className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Listings Found</h3>
              <p className="text-xs text-zinc-400">You haven't listed any items for sale yet.</p>
              <Link href="/sell" className="inline-block mt-2 px-6 py-3 bg-[#0c9096] text-white font-bold text-xs uppercase rounded-xl">
                Post First Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((p) => (
                <div key={p._id} className="relative group">
                  <ProductCard product={p} />
                  <div className="mt-3 flex items-center justify-between gap-2 px-1">
                    {p.status !== 'Sold' && (
                      <button
                        onClick={() => handleMarkSold(p._id)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[11px] font-bold border border-amber-500/30 transition-colors cursor-pointer"
                      >
                        Mark Sold
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteListing(p._id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-bold border border-rose-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PURCHASES TAB */}
      {activeTab === 'purchases' && (
        <div className="space-y-4">
          {myPurchases.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-2">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Orders Yet</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {myPurchases.map((ord) => (
                <div key={ord._id} className="glass-card p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <img src={ord.productImage} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{ord.productTitle}</h4>
                      <p className="text-zinc-400">Seller: {ord.sellerName} • ৳{ord.price?.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
                    {ord.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* OFFERS TAB */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          {myOffers.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-2">
              <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Proposals</h3>
            </div>
          ) : (
            <div className="space-y-3">
              {myOffers.map((off) => (
                <div key={off._id} className="glass-card p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <img src={off.productImage} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{off.productTitle}</h4>
                      <p className="text-zinc-300">
                        Buyer <span className="font-bold text-[#0c9096]">{off.buyerName}</span> proposed: <span className="text-emerald-400 font-extrabold">৳{off.offeredPrice?.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {off.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleOfferStatus(off._id, 'Accepted')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => handleOfferStatus(off._id, 'Rejected')}
                          className="px-4 py-2 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 font-bold rounded-xl flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                        off.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {off.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SAVED / WISHLIST TAB */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedProducts.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-2">
              <Heart className="w-12 h-12 text-rose-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">Wishlist Empty</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
