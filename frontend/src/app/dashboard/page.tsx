"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Product, Order, Offer, api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Package, ShoppingBag, MessageSquare, Heart, CheckCircle2, XCircle, Trash2, Eye, PlusCircle } from 'lucide-react';

function DashboardContent() {
  const { user, savedItemIds } = useAuth();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'listings';

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [myListings, setMyListings] = useState<Product[]>([]);
  const [myPurchases, setMyPurchases] = useState<Order[]>([]);
  const [myOffers, setMyOffers] = useState<Offer[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Fetch seller listings
      const listRes = await api.get('/products', { params: { sellerId: user.id } });
      setMyListings(listRes.data || []);

      // Fetch buyer orders
      const orderRes = await api.get('/orders', { params: { userId: user.id, role: 'buyer' } });
      setMyPurchases(orderRes.data || []);

      // Fetch offers
      const offerRes = await api.get('/offers', { params: { userId: user.id, role: 'seller' } });
      setMyOffers(offerRes.data || []);

      // Fetch all products to filter saved wishlist
      const allProdRes = await api.get('/products');
      const allProds: Product[] = allProdRes.data || [];
      setSavedProducts(allProds.filter(p => savedItemIds.includes(p._id)));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSold = async (productId: string) => {
    try {
      await api.put(`/products/${productId}/status`, { status: 'Sold' });
      setMyListings(prev => prev.map(p => p._id === productId ? { ...p, status: 'Sold' } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteListing = async (productId: string) => {
    try {
      await api.delete(`/products/${productId}`);
      setMyListings(prev => prev.filter(p => p._id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOfferStatus = async (offerId: string, status: 'Accepted' | 'Rejected') => {
    try {
      await api.put(`/offers/${offerId}/status`, { status });
      setMyOffers(prev => prev.map(o => o._id === offerId ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500 shadow-xl" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl">
              {user?.name.charAt(0) || 'U'}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-extrabold text-white">{user?.name || 'User Dashboard'}</h1>
            <p className="text-xs text-slate-400">{user?.email || 'user@example.com'} • {user?.location || 'Dhaka, Bangladesh'}</p>
            <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Seller Rating: 4.9 ★</span>
            </div>
          </div>
        </div>

        <Link
          href="/sell"
          className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Post New Product</span>
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'listings' ? 'border-indigo-500 text-indigo-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          My Active Listings ({myListings.length})
        </button>

        <button
          onClick={() => setActiveTab('purchases')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'purchases' ? 'border-purple-500 text-purple-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          My Orders / Purchases ({myPurchases.length})
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'offers' ? 'border-emerald-500 text-emerald-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Price Offers Inbox ({myOffers.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'saved' ? 'border-pink-500 text-pink-400 font-bold' : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          Saved Wishlist ({savedProducts.length})
        </button>
      </div>

      {/* Tab 1: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-3">
              <Package className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No active listings yet</h3>
              <p className="text-xs text-slate-400">Post your unused electronics, smartphones, or furniture today.</p>
              <Link href="/sell" className="inline-block px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl">
                + Create First Ad
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((prod) => (
                <div key={prod._id} className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div className="flex gap-3">
                    <img src={prod.images[0]} alt="" className="w-20 h-20 rounded-xl object-cover border border-slate-700" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">{prod.condition}</span>
                      <h4 className="text-xs font-bold text-white truncate">{prod.title}</h4>
                      <p className="text-sm font-black text-emerald-400 mt-1">${prod.price}</p>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 ${
                        prod.status === 'Sold' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        Status: {prod.status}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <Link href={`/product/${prod._id}`} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:text-white">
                      View Ad
                    </Link>
                    {prod.status !== 'Sold' && (
                      <button
                        onClick={() => handleMarkSold(prod._id)}
                        className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-semibold hover:bg-emerald-600/30"
                      >
                        Mark as Sold
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteListing(prod._id)}
                      className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                      title="Delete Listing"
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

      {/* Tab 2: My Purchases */}
      {activeTab === 'purchases' && (
        <div className="space-y-4">
          {myPurchases.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Order History</h3>
              <p className="text-xs text-slate-400">Items you buy will appear here with delivery details.</p>
              <Link href="/browse" className="inline-block px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-xl">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myPurchases.map((ord) => (
                <div key={ord._id} className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={ord.productImage || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80'} alt="" className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{ord.productTitle}</h4>
                      <p className="text-slate-400">Seller: {ord.sellerName} • {ord.deliveryAddress}</p>
                      <span className="text-emerald-400 font-bold">${ord.productPrice} ({ord.paymentMethod})</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                    Order {ord.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Price Offers Inbox */}
      {activeTab === 'offers' && (
        <div className="space-y-4">
          {myOffers.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-2">
              <MessageSquare className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No Incoming Offers Yet</h3>
              <p className="text-xs text-slate-400">When buyers make price proposals on your items, they show up here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myOffers.map((off) => (
                <div key={off._id} className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={off.productImage} alt="" className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-white text-sm">{off.productTitle}</h4>
                      <p className="text-slate-300">
                        Buyer <span className="font-bold text-indigo-400">{off.buyerName}</span> offered: <span className="text-emerald-400 font-extrabold">${off.offeredPrice}</span> (Asking: ${off.productPrice})
                      </p>
                      {off.message && <p className="text-slate-400 italic mt-0.5">"{off.message}"</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {off.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => handleOfferStatus(off._id, 'Accepted')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Accept Offer
                        </button>
                        <button
                          onClick={() => handleOfferStatus(off._id, 'Rejected')}
                          className="px-3 py-1.5 bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 font-bold rounded-lg flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded-full font-bold ${
                        off.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        Offer {off.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Saved Wishlist */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedProducts.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-2">
              <Heart className="w-10 h-10 text-pink-500 mx-auto" />
              <h3 className="text-base font-bold text-white">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-400">Click the heart icon on any listing to bookmark it.</p>
              <Link href="/browse" className="inline-block px-4 py-2 bg-pink-600 text-white text-xs font-semibold rounded-xl">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading User Dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
