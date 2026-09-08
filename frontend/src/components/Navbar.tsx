"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, PlusCircle, Heart, User as UserIcon, LogOut, Package, Tag, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const router = useRouter();
  const { user, logout, savedItemIds } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl glow-gradient flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Khoj <span className="text-indigo-400 text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30">Buy & Sell</span>
              </span>
              <p className="text-[10px] text-slate-400 -mt-1 hidden sm:block">Find Used & New Deals</p>
            </div>
          </Link>

          {/* Quick Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search MacBook, iPhone, Honda, Sneakers, Sofa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 bg-slate-900/80 border border-slate-700/70 rounded-full text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-full transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation Items */}
          <div className="flex items-center gap-3">
            
            <Link
              href="/browse"
              className="hidden lg:flex items-center gap-1.5 text-sm text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <Tag className="w-4 h-4 text-indigo-400" />
              Browse All
            </Link>

            <Link
              href="/dashboard?tab=saved"
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-pink-400" />
              {savedItemIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {savedItemIds.length}
                </span>
              )}
            </Link>

            {/* Sell Product CTA */}
            <Link
              href="/sell"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-full shadow-md shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Sell Product</span>
            </Link>

            {/* User Account Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-indigo-500/50" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-medium text-slate-200 hidden sm:inline-block max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl shadow-2xl py-2 border border-slate-800 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-800/80">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Member
                      </div>
                    </div>

                    <Link
                      href="/dashboard?tab=listings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600/10 hover:text-indigo-400 transition-colors"
                    >
                      <Package className="w-4 h-4 text-indigo-400" />
                      My Listings
                    </Link>

                    <Link
                      href="/dashboard?tab=purchases"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600/10 hover:text-indigo-400 transition-colors"
                    >
                      <Tag className="w-4 h-4 text-purple-400" />
                      My Purchases
                    </Link>

                    <Link
                      href="/dashboard?tab=offers"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:bg-indigo-600/10 hover:text-indigo-400 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      Offers & Negotiate
                    </Link>

                    <div className="border-t border-slate-800/80 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/login"
                  className="text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-white font-medium px-3.5 py-2 rounded-lg border border-slate-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Search & Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 space-y-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-200 placeholder-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/browse" onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded bg-slate-900 text-center text-slate-300">
                Browse Marketplace
              </Link>
              <Link href="/sell" onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded bg-indigo-600 text-center text-white font-semibold">
                + Sell Item
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
