"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Package, ShoppingBag, MessageSquare, Heart, CheckCircle2, XCircle, Trash2, PlusCircle } from 'lucide-react';

function DashboardContent() {
  const { user, savedItemIds } = useAuth();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'listings';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [myListings, setMyListings] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

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

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      <div className="glass-panel p-8 rounded-3xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-center sm:text-left">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-xl" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl">
              {user?.name.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-white">{user?.name || 'User Dashboard'}</h1>
            <p className="text-xs text-zinc-400 mt-0.5">{user?.email || 'user@example.com'} • {user?.location || 'Dhaka, Bangladesh'}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Seller Rating: 4.9 ★</span>
            </div>
          </div>
        </div>

        <Link
          href="/sell"
          className="px-6 py-3 bg-white text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4 text-indigo-600" />
          <span>+ Post Product</span>
        </Link>
      </div>

      <div className="flex border-b border-zinc-800 gap-3 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'listings' ? 'border-indigo-500 text-indigo-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          My Listings ({myListings.length})
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'purchases' ? 'border-purple-500 text-purple-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Orders ({myPurchases.length})
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'offers' ? 'border-emerald-500 text-emerald-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Offers Inbox ({myOffers.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-4 px-5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'saved' ? 'border-rose-500 text-rose-400 font-extrabold' : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          Wishlist ({savedProducts.length})
        </button>
      </div>

      {activeTab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-3">
              <Package className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Active Listings</h3>
              <p className="text-xs text-zinc-400">Post an ad for gadgets or furniture you want to sell.</p>
              <Link href="/sell" className="inline-block px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
                + Post First Product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myListings.map((prod) => (
                <div key={prod._id} className="glass-card rounded-3xl p-5 border border-zinc-800 flex flex-col justify-between space-y-4">
                  <div className="flex gap-4">
                    <img src={prod.images[0]} alt="" className="w-20 h-20 rounded-2xl object-cover border border-zinc-700" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{prod.condition}</span>
                      <h4 className="text-sm font-bold text-white truncate">{prod.title}</h4>
                      <p className="text-base font-black text-emerald-400 mt-1">৳{prod.price?.toLocaleString()}</p>
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 ${
                        prod.status === 'Sold' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {prod.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 text-xs">
                    <Link href={`/product/${prod._id}`} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl hover:text-white font-bold">
                      View
                    </Link>
                    {prod.status !== 'Sold' && (
                      <button
                        onClick={() => handleMarkSold(prod._id)}
                        className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-bold hover:bg-emerald-600/30"
                      >
                        Mark Sold
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteListing(prod._id)}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'purchases' && (
        <div className="space-y-4">
          {myPurchases.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-zinc-800 space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Order History</h3>
              <Link href="/browse" className="inline-block px-5 py-2.5 bg-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl">
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myPurchases.map((ord) => (
                <div key={ord._id} className="glass-card p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-4">
                    <img src={ord.productImage} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{ord.productTitle}</h4>
                      <p className="text-zinc-400">Seller: {ord.sellerName} • {ord.deliveryAddress}</p>
                      <span className="text-emerald-400 font-bold">৳{ord.productPrice?.toLocaleString()} ({ord.paymentMethod})</span>
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
                        Buyer <span className="font-bold text-indigo-400">{off.buyerName}</span> proposed: <span className="text-emerald-400 font-extrabold">৳{off.offeredPrice?.toLocaleString()}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {off.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleOfferStatus(off._id, 'Accepted')}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 uppercase tracking-wider"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => handleOfferStatus(off._id, 'Rejected')}
                          className="px-4 py-2 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 font-bold rounded-xl flex items-center gap-1.5 uppercase tracking-wider"
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
