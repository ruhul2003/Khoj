"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  Zap,
  PlusCircle,
  LogOut,
  Package,
  Tag,
  ShieldCheck,
  Laptop,
  Smartphone,
  Car,
  Armchair,
  Shirt,
  BookOpen,
  Tv
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const CATEGORIES = [
  { name: 'Electronics', icon: Laptop },
  { name: 'Mobile Phones', icon: Smartphone },
  { name: 'Vehicles', icon: Car },
  { name: 'Furniture', icon: Armchair },
  { name: 'Fashion', icon: Shirt },
  { name: 'Books & Hobbies', icon: BookOpen },
  { name: 'Home Appliances', icon: Tv },
];

export const Navbar = () => {
  const router = useRouter();
  const { user, logout, savedItemIds } = useAuth();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let url = '/browse?';
    if (searchTerm.trim()) url += `search=${encodeURIComponent(searchTerm.trim())}&`;
    if (selectedCategory !== 'All Categories') url += `category=${encodeURIComponent(selectedCategory)}`;
    router.push(url);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    addToast('Signed out successfully', 'info');
  };

  return (
    <header className="sticky top-0 z-50 font-['Bai_Jamjuree'] shadow-md">
      {/* 1. Top Dark Navy Header Bar */}
      <div className="bg-[#1e2837] text-white py-3.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                Khoj<span className="text-amber-400">shop</span>
              </span>
            </div>
          </Link>

          {/* Search Bar with Category Select */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl items-center bg-white rounded-full p-1 shadow-inner">
            <div className="relative pl-3 pr-2 border-r border-gray-200">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-gray-700 font-semibold focus:outline-none pr-4 cursor-pointer py-2 appearance-none"
              >
                <option value="All Categories">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Mobile Phones">Mobile Phones</option>
                <option value="Vehicles">Vehicles</option>
                <option value="Furniture">Furniture</option>
                <option value="Fashion">Fashion</option>
                <option value="Books & Hobbies">Books & Hobbies</option>
                <option value="Home Appliances">Home Appliances</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <input
              type="text"
              placeholder="Search product here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
            />

            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 transition-colors shadow cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Right Header Controls */}
          <div className="flex items-center gap-5 lg:gap-7 shrink-0 text-xs">
            {/* Call For Order */}
            <div className="hidden xl:flex items-center gap-2.5 text-slate-300">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Call For Order:</span>
                <span className="font-bold text-white text-xs">(+880)-1712-345-678</span>
              </div>
            </div>

            {/* Sign In / Sign Up */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-slate-200 hover:text-white cursor-pointer py-1"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-amber-400" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <span className="hidden sm:inline font-bold text-xs max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#1b2432] rounded-2xl shadow-2xl py-3 border border-slate-700 z-50 text-xs font-medium">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard?tab=listings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Package className="w-4 h-4 text-amber-400" />
                      My Listings
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-400" />
                      Wishlist ({savedItemIds.length})
                    </Link>
                    <Link
                      href="/sell"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-emerald-400" />
                      Post Free Ad
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-400 hover:bg-rose-500/10 border-t border-slate-700 mt-1 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-200">
                <User className="w-4 h-4 text-amber-400" />
                <Link href="/auth/login" className="hover:text-amber-400 font-semibold transition-colors">
                  Sign In
                </Link>
                <span className="text-slate-500">/</span>
                <Link href="/auth/register" className="hover:text-amber-400 font-semibold transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Wishlist Icon with count */}
            <Link
              href="/wishlist"
              className="relative text-slate-300 hover:text-white transition-colors p-1"
              title="Saved Wishlist"
            >
              <Heart className="w-6 h-6 text-slate-300 hover:text-rose-400 transition-colors" />
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-amber-500 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center">
                {savedItemIds.length}
              </span>
            </Link>

            {/* Cart Pill Button */}
            <Link
              href="/browse"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-colors"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span className="tracking-wide">Cart {savedItemIds.length}</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-1"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Sub-Navbar (Clean White Bar) */}
      <div className="bg-white border-b border-gray-200 text-slate-800 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14">
          
          <div className="flex items-center gap-8">
            {/* Left: Shop By Categories Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-3 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <Menu className="w-4 h-4" />
                <span>Shop By Categories</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-3 z-50 font-medium">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.name}
                        href={`/browse?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setIsCategoryMenuOpen(false)}
                        className="flex items-center gap-3 px-5 py-2.5 text-xs text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      >
                        <Icon className="w-4 h-4 text-amber-500" />
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-gray-700">
              <Link href="/" className="text-amber-600 hover:text-amber-700 pb-1 border-b-2 border-amber-500 font-extrabold">
                Home
              </Link>
              
              <Link href="/browse" className="hover:text-amber-600 transition-colors flex items-center gap-1">
                Shop <ChevronDown className="w-3 h-3 text-gray-400" />
              </Link>

              <Link href="/browse" className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                Categories
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-white leading-none">
                  SALE
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </Link>

              <Link href="/browse" className="hover:text-amber-600 transition-colors flex items-center gap-1.5">
                Products
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500 text-white leading-none">
                  HOT
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </Link>

              <Link href="/browse?featured=true" className="hover:text-amber-600 transition-colors flex items-center gap-1">
                Top Deals <ChevronDown className="w-3 h-3 text-gray-400" />
              </Link>

              <Link href="/browse" className="hover:text-amber-600 transition-colors flex items-center gap-1">
                Elements <ChevronDown className="w-3 h-3 text-gray-400" />
              </Link>
            </nav>
          </div>

          {/* Right: Flash Deal & Post Free Ad */}
          <div className="flex items-center gap-4">
            <Link
              href="/browse?deal=flash"
              className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-colors"
            >
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>Flash Deal</span>
            </Link>

            <Link
              href="/sell"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Sell Product</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1e2837] text-white px-6 py-5 space-y-4 border-b border-slate-700">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-full p-1">
            <input
              type="text"
              placeholder="Search product here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 text-xs text-gray-900 focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase">
            <Link href="/browse" onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-800 rounded-xl text-center text-slate-200">
              Browse Shop
            </Link>
            <Link href="/sell" onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-amber-500 text-slate-950 rounded-xl text-center font-black">
              + Post Ad
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Categories</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.name}
                  href={`/browse?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs font-medium"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
