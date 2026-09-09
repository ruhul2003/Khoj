"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, PlusCircle, Heart, LogOut, Package, Tag, MessageSquare, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar = () => {
  const router = useRouter();
  const { user, logout, savedItemIds } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-zinc-800/80 py-1">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#0a6c71] to-[#0c9096] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-[#0c9096]/25 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2 font-['Bai_Jamjuree']">
                Khoj <span className="text-[#38d4dc] text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#0c9096]/15 border border-[#0c9096]/30">Marketplace</span>
              </span>
              <p className="text-[11px] text-slate-400 font-light tracking-wide -mt-0.5 hidden sm:block">Minimal Buy & Sell Platform</p>
            </div>
          </Link>

          {/* Minimal Search */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search laptops, smartphones, vehicles, furniture, clothing..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-28 py-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-[#0c9096] focus:ring-1 focus:ring-[#0c9096]/50 transition-all font-medium"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-4" />
              <button
                type="submit"
                className="absolute right-2 top-2 px-5 py-2 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-semibold text-xs rounded-xl transition-all tracking-wide cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/browse"
              className="hidden lg:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white px-4 py-2.5 rounded-xl hover:bg-zinc-800/60 transition-colors"
            >
              <Tag className="w-4 h-4 text-[#0c9096]" />
              Explore All
            </Link>

            <Link
              href="/dashboard?tab=saved"
              className="relative p-3 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-xl transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-rose-400" />
              {savedItemIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedItemIds.length}
                </span>
              )}
            </Link>

            <ThemeToggle />

            <Link
              href="/sell"
              className="flex items-center gap-2 bg-gradient-to-r from-[#0a6c71] to-[#0c9096] hover:from-[#0c9096] hover:to-[#13a7ad] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-[#0c9096]/20 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Post Product</span>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-[#0c9096]/50" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#0c9096]/25 text-[#689db8] flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-zinc-200 hidden sm:inline-block max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-60 glass-panel rounded-2xl shadow-2xl py-3 border border-zinc-800 z-50">
                    <div className="px-5 py-2.5 border-b border-zinc-800/80 space-y-1">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#0c9096]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Account
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard?tab=listings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
                      >
                        <Package className="w-4 h-4 text-[#0c9096]" />
                        My Product Listings
                      </Link>

                      <Link
                        href="/dashboard?tab=purchases"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
                      >
                        <Tag className="w-4 h-4 text-[#689db8]" />
                        Purchased Items
                      </Link>

                      <Link
                        href="/dashboard?tab=offers"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-xs text-zinc-300 hover:bg-zinc-800/60 hover:text-white transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        Price Proposals & Offers
                      </Link>
                    </div>

                    <div className="border-t border-zinc-800/80 pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-5 py-2.5 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/login"
                  className="text-xs font-semibold text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2.5 rounded-xl border border-zinc-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-800 space-y-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-500"
                />
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase tracking-wider">
              <Link href="/browse" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-zinc-900 text-center text-zinc-300">
                Catalog
              </Link>
              <Link href="/sell" onClick={() => setIsMobileMenuOpen(false)} className="p-3 rounded-xl bg-[#0c9096] hover:bg-[#0a6c71] text-center text-white">
                + Sell Item
              </Link>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs font-semibold text-zinc-300">
              <span>Color Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
