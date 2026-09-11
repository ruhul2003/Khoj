"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
  Tv,
  Gamepad2,
  Flame,
  Sparkles,
  TrendingUp,
  ArrowRight,
  Layers,
  Compass,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const CATEGORIES = [
  { name: 'Electronics', desc: 'Laptops, Audio & Monitors', icon: Laptop, badge: '30% OFF' },
  { name: 'Mobile Phones', desc: 'Smartphones & Tablets', icon: Smartphone, badge: 'HOT' },
  { name: 'Gaming', desc: 'Consoles, GPUs & Games', icon: Gamepad2, badge: 'SAVE 25%' },
  { name: 'Vehicles', desc: 'Cars, Bikes & Parts', icon: Car, badge: 'BEST VALUE' },
  { name: 'Furniture', desc: 'Living & Office Decor', icon: Armchair, badge: 'CLEARANCE' },
  { name: 'Fashion', desc: 'Clothing, Shoes & Watches', icon: Shirt, badge: 'TRENDING' },
  { name: 'Books & Hobbies', desc: 'Books, Instruments & Art', icon: BookOpen, badge: 'SPECIAL' },
  { name: 'Home Appliances', desc: 'Kitchen & Living Electronics', icon: Tv, badge: 'POPULAR' },
];

const ELEMENTS_LIST = [
  { id: 'hero', name: 'Hero Showcase Slider', desc: 'Dynamic featured deals and hero promotions', icon: Sparkles },
  { id: 'trust', name: 'Trust & Protection', desc: 'Verified sellers & buyer guarantee', icon: ShieldCheck },
  { id: 'promo', name: 'Promo Grid Cards', desc: 'Category discount highlight cards', icon: Tag },
  { id: 'categories', name: 'Shop By Categories', desc: 'Interactive visual category grid', icon: Layers },
  { id: 'popular', name: 'Popular Products', desc: 'Fast-selling items with live countdown timers', icon: Flame },
  { id: 'split-banners', name: 'Split Promo Banners', desc: 'Curated editorial & hardware banners', icon: Compass },
  { id: 'trending', name: 'Trending Products', desc: 'Interactive category-filtered collection', icon: TrendingUp },
  { id: 'tech', name: 'Tech Showcase', desc: 'Featured gaming and workstation setup', icon: Laptop },
  { id: 'gallery', name: 'From The Gallery', desc: 'Community guides, reviews & tips', icon: BookOpen },
];

const NavbarContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, logout, savedItemIds } = useAuth();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Active navigation dropdown: 'categories-btn' | 'shop' | 'categories' | 'products' | 'deals' | 'elements' | null
  const [activeMenu, setActiveMenu] = useState(null);
  const closeTimeoutRef = useRef(null);
  const navContainerRef = useRef(null);

  // Smooth hover and click menu handling
  const handleMouseEnter = (menuName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 220);
  };

  const toggleMenu = (menuName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(prev => (prev === menuName ? null : menuName));
  };

  const closeAllMenus = () => {
    setActiveMenu(null);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveMenu(null);
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close menus when route/search changes
  useEffect(() => {
    closeAllMenus();
  }, [pathname, searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let url = '/browse?';
    if (searchTerm.trim()) url += `search=${encodeURIComponent(searchTerm.trim())}&`;
    if (selectedCategory !== 'All Categories') url += `category=${encodeURIComponent(selectedCategory)}`;
    closeAllMenus();
    router.push(url);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    addToast('Signed out successfully', 'info');
  };

  // Smooth jump to home page element
  const handleScrollToElement = (elementId) => {
    closeAllMenus();
    if (pathname === '/') {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      router.push(`/#${elementId}`);
    }
  };

  const isHome = pathname === '/';
  const isFlashActive = searchParams.get('deal') === 'flash';

  return (
    <header ref={navContainerRef} className="sticky top-0 z-50 font-['Bai_Jamjuree'] shadow-md bg-white">
      {/* 1. Top Dark Navy Header Bar */}
      <div className="bg-[#1e2837] text-white py-3.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 lg:gap-8">
          
          {/* Logo */}
          <Link href="/" onClick={closeAllMenus} className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center">
                Khoj<span className="text-amber-400">shop</span>
              </span>
            </div>
          </Link>

          {/* Search Bar with Category Select and Live Suggestions */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-white rounded-full p-1 shadow-inner">
              <div className="relative pl-3 pr-2 border-r border-gray-200">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-xs text-gray-700 font-semibold focus:outline-none pr-4 cursor-pointer py-2 appearance-none"
                >
                  <option value="All Categories">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <input
                type="text"
                placeholder="Search product here..."
                value={searchTerm}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
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

            {/* Live Search Auto-Suggest Dropdown */}
            {isSearchFocused && searchTerm.trim().length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-bold text-gray-400 border-b border-gray-100 mb-2">
                  <span>Quick Search Results</span>
                  <span className="text-amber-600 font-extrabold">Press Enter ↵</span>
                </div>

                <div className="space-y-1">
                  <button
                    onMouseDown={() => {
                      router.push(`/browse?search=${encodeURIComponent(searchTerm.trim())}`);
                      setIsSearchFocused(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-gray-800 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-amber-500" />
                      <span>Search for &quot;<strong className="text-slate-900">{searchTerm.trim()}</strong>&quot; in {selectedCategory}</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </button>

                  {CATEGORIES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(cat => {
                    const CatIcon = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onMouseDown={() => {
                          router.push(`/browse?category=${encodeURIComponent(cat.name)}&search=${encodeURIComponent(searchTerm.trim())}`);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <CatIcon className="w-3.5 h-3.5 text-gray-400" />
                          <span>Find in <strong className="font-bold">{cat.name}</strong></span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">{cat.badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-5 lg:gap-7 shrink-0 text-xs">
            {/* Call For Order */}
            <a href="tel:+8801712345678" className="hidden xl:flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Call For Order:</span>
                <span className="font-bold text-white text-xs">(+880)-1712-345-678</span>
              </div>
            </a>

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
                  <div className="absolute right-0 mt-3 w-56 bg-[#1b2432] rounded-2xl shadow-2xl py-3 border border-slate-700 z-50 text-xs font-medium animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-slate-700">
                      <p className="font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard?tab=listings"
                      onClick={closeAllMenus}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Package className="w-4 h-4 text-amber-400" />
                      My Listings
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={closeAllMenus}
                      className="flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-400" />
                      Wishlist ({savedItemIds.length})
                    </Link>
                    <Link
                      href="/sell"
                      onClick={closeAllMenus}
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
              className="md:hidden text-slate-300 hover:text-white p-1 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. Sub-Navbar (Clean White Bar with Dropdown Navigation) */}
      <div className="bg-white border-b border-gray-200 text-slate-800 px-4 sm:px-8 relative">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14">
          
          <div className="flex items-center gap-6 xl:gap-8">
            {/* A. Shop By Categories Dropdown Button */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('categories-btn')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => toggleMenu('categories-btn')}
                className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Menu className="w-4 h-4 stroke-[2.5]" />
                <span>Shop By Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${activeMenu === 'categories-btn' ? 'rotate-180' : ''}`} />
              </button>

              {/* Categories Button Dropdown Menu */}
              {activeMenu === 'categories-btn' && (
                <div 
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 font-medium animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => handleMouseEnter('categories-btn')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 pb-2 mb-1 border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <span>Marketplace Categories</span>
                    <span className="text-amber-600 font-extrabold">{CATEGORIES.length}</span>
                  </div>

                  <div className="py-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          href={`/browse?category=${encodeURIComponent(cat.name)}`}
                          onClick={closeAllMenus}
                          className="flex items-center justify-between px-4 py-2.5 text-xs text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-amber-100 flex items-center justify-center text-gray-600 group-hover:text-amber-600 transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-semibold">{cat.name}</span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 group-hover:bg-amber-200/60 group-hover:text-amber-900 transition-colors">
                            {cat.badge}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-2 mt-1 border-t border-gray-100 px-3">
                    <Link
                      href="/browse"
                      onClick={closeAllMenus}
                      className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50/70 hover:bg-amber-100/70 rounded-xl transition-colors"
                    >
                      <span>View All Categories</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* B. Navigation Links (Home, Shop, Categories, Products, Top Deals, Elements) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold text-gray-700">
              {/* 1. Home */}
              <Link 
                href="/" 
                onClick={closeAllMenus}
                className={`transition-all py-2 ${
                  isHome 
                    ? 'text-amber-600 hover:text-amber-700 pb-1 border-b-2 border-amber-500 font-extrabold' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Home
              </Link>
              
              {/* 2. Shop Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter('shop')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleMenu('shop')}
                  className={`hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'shop' ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                  }`}
                >
                  <span>Shop</span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${activeMenu === 'shop' ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {activeMenu === 'shop' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-[580px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-normal"
                    onMouseEnter={() => handleMouseEnter('shop')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {/* Col 1: Explore */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-100 flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-amber-500" />
                          <span>Catalog</span>
                        </p>
                        <div className="flex flex-col space-y-1 text-xs">
                          <Link href="/browse" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-semibold transition-colors flex items-center justify-between">
                            <span>All Products</span>
                            <ArrowRight className="w-3 h-3 text-gray-300" />
                          </Link>
                          <Link href="/browse?sort=newest" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-semibold transition-colors flex items-center justify-between">
                            <span>New Arrivals</span>
                            <span className="text-[9px] px-1 bg-amber-100 text-amber-700 rounded font-bold">NEW</span>
                          </Link>
                          <Link href="/browse?sort=views" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-semibold transition-colors flex items-center justify-between">
                            <span>Most Viewed</span>
                            <Flame className="w-3 h-3 text-rose-500" />
                          </Link>
                          <Link href="/browse?sort=price_asc" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-semibold transition-colors flex items-center justify-between">
                            <span>Price: Low to High</span>
                          </Link>
                          <Link href="/browse?sort=price_desc" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-semibold transition-colors flex items-center justify-between">
                            <span>Price: High to Low</span>
                          </Link>
                        </div>
                      </div>

                      {/* Col 2: By Condition */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-100 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Condition</span>
                        </p>
                        <div className="flex flex-col space-y-1 text-xs">
                          <Link href="/browse?condition=Brand%20New" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-semibold transition-colors flex items-center justify-between">
                            <span>Brand New (Sealed)</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          </Link>
                          <Link href="/browse?condition=Used%20-%20Like%20New" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-semibold transition-colors flex items-center justify-between">
                            <span>Used - Like New</span>
                            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                          </Link>
                          <Link href="/browse?condition=Used%20-%20Good" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-semibold transition-colors flex items-center justify-between">
                            <span>Used - Good</span>
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          </Link>
                          <Link href="/browse?condition=Used%20-%20Fair" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 font-semibold transition-colors flex items-center justify-between">
                            <span>Used - Fair</span>
                            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                          </Link>
                        </div>
                      </div>

                      {/* Col 3: Quick Price Filters */}
                      <div className="space-y-2">
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider pb-1 border-b border-gray-100 flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                          <span>Price Range</span>
                        </p>
                        <div className="flex flex-col space-y-1 text-xs">
                          <Link href="/browse?maxPrice=5000" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors">
                            Under ৳5,000
                          </Link>
                          <Link href="/browse?minPrice=5000&maxPrice=25000" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors">
                            ৳5,000 – ৳25,000
                          </Link>
                          <Link href="/browse?minPrice=25000&maxPrice=75000" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors">
                            ৳25,000 – ৳75,000
                          </Link>
                          <Link href="/browse?minPrice=75000" onClick={closeAllMenus} className="p-2 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-colors flex items-center justify-between">
                            <span>৳75,000+ Premium</span>
                            <span className="text-[9px] px-1 bg-blue-100 text-blue-700 rounded font-bold">LUXURY</span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Verified local listings with seller ratings
                      </span>
                      <Link href="/browse" onClick={closeAllMenus} className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                        Go to Catalog <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Categories [SALE] Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter('categories')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleMenu('categories')}
                  className={`hover:text-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeMenu === 'categories' ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                  }`}
                >
                  <span>Categories</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500 text-white leading-none shadow-sm">
                    SALE
                  </span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${activeMenu === 'categories' ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {activeMenu === 'categories' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-normal"
                    onMouseEnter={() => handleMouseEnter('categories')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Discounted Categories</h4>
                        <p className="text-[11px] text-gray-400">Exclusive season deals across top product departments</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                        Up to 50% OFF
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.name}
                            href={`/browse?category=${encodeURIComponent(cat.name)}`}
                            onClick={closeAllMenus}
                            className="flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-amber-200 hover:bg-amber-50/60 transition-all group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-gray-50 group-hover:bg-amber-500 text-gray-700 group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-colors shadow-sm">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-800 group-hover:text-amber-700 truncate">{cat.name}</span>
                                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">{cat.badge}</span>
                              </div>
                              <p className="text-[10px] text-gray-400 truncate">{cat.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">Looking for something specific?</span>
                      <Link href="/browse" onClick={closeAllMenus} className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                        View All Categories <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Products [HOT] Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleMenu('products')}
                  className={`hover:text-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeMenu === 'products' ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                  }`}
                >
                  <span>Products</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500 text-white leading-none shadow-sm">
                    HOT
                  </span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {activeMenu === 'products' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-normal"
                    onMouseEnter={() => handleMouseEnter('products')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-3 pb-1">Trending & Spotlight</p>

                      <Link
                        href="/browse?sort=views"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-rose-50 text-gray-800 hover:text-rose-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>Most Popular Products</span>
                            <span className="text-[9px] px-1 bg-rose-500 text-white rounded font-black">HOT</span>
                          </div>
                          <p className="text-[10px] text-gray-400">High demand & buyer inquiries</p>
                        </div>
                      </Link>

                      <Link
                        href="/browse?deal=flash"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50 text-gray-800 hover:text-amber-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <Zap className="w-4 h-4 fill-amber-500" />
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>Flash Deal Products</span>
                            <span className="text-[9px] px-1 bg-amber-500 text-slate-950 rounded font-black">FLASH</span>
                          </div>
                          <p className="text-[10px] text-gray-400">Active price cuts & discounts</p>
                        </div>
                      </Link>

                      <Link
                        href="/browse?featured=true"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-gray-800 hover:text-emerald-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>Featured Listings</span>
                            <span className="text-[9px] px-1 bg-emerald-500 text-white rounded font-black">VERIFIED</span>
                          </div>
                          <p className="text-[10px] text-gray-400">Spotlight items from top sellers</p>
                        </div>
                      </Link>

                      <Link
                        href="/browse?sort=newest"
                        onClick={closeAllMenus}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 text-gray-800 hover:text-blue-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">Newest Additions</div>
                          <p className="text-[10px] text-gray-400">Fresh products listed today</p>
                        </div>
                      </Link>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Link
                        href="/sell"
                        onClick={closeAllMenus}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Post Your Product</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Top Deals Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter('deals')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleMenu('deals')}
                  className={`hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'deals' ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                  }`}
                >
                  <span>Top Deals</span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${activeMenu === 'deals' ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {activeMenu === 'deals' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-normal"
                    onMouseEnter={() => handleMouseEnter('deals')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider px-2 pb-2 border-b border-gray-100 flex items-center justify-between">
                      <span>Curated Deal Filters</span>
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                    </p>

                    <div className="py-2 space-y-1 text-xs font-semibold">
                      <Link
                        href="/browse?deal=flash"
                        onClick={closeAllMenus}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-amber-50 text-gray-800 hover:text-amber-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>Flash Deal Specials</span>
                        </div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">SAVE</span>
                      </Link>

                      <Link
                        href="/browse?featured=true"
                        onClick={closeAllMenus}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-gray-800 hover:text-emerald-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          <span>Handpicked Featured</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">TOP</span>
                      </Link>

                      <Link
                        href="/browse?maxPrice=5000"
                        onClick={closeAllMenus}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 text-gray-800 hover:text-blue-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Tag className="w-4 h-4 text-blue-500" />
                          <span>Under ৳5,000 Steals</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">BUDGET</span>
                      </Link>

                      <Link
                        href="/browse?minPrice=5000&maxPrice=25000"
                        onClick={closeAllMenus}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-purple-50 text-gray-800 hover:text-purple-700 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <DollarSign className="w-4 h-4 text-purple-500" />
                          <span>৳5K – ৳25K Best Value</span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded">MID</span>
                      </Link>

                      <Link
                        href="/browse?minPrice=75000"
                        onClick={closeAllMenus}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-gray-800 hover:text-slate-900 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Package className="w-4 h-4 text-slate-700" />
                          <span>Luxury & Flagships</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded">VIP</span>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <Link
                        href="/browse?sort=price_asc"
                        onClick={closeAllMenus}
                        className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 rounded-xl transition-colors"
                      >
                        <span>Sort By Lowest Price</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 6. Elements Dropdown (Jumps to Homepage Features) */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter('elements')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => toggleMenu('elements')}
                  className={`hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer ${
                    activeMenu === 'elements' ? 'text-amber-600 font-extrabold' : 'text-gray-700'
                  }`}
                >
                  <span>Elements</span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${activeMenu === 'elements' ? 'rotate-180 text-amber-600' : ''}`} />
                </button>

                {activeMenu === 'elements' && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-normal"
                    onMouseEnter={() => handleMouseEnter('elements')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-gray-100">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Page Sections & UI Elements</h4>
                        <p className="text-[10px] text-gray-400">Quick jump to any feature showcase on the landing page</p>
                      </div>
                      <Layers className="w-4 h-4 text-amber-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {ELEMENTS_LIST.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleScrollToElement(item.id)}
                            className="text-left flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-50/70 border border-transparent hover:border-amber-200/60 transition-all cursor-pointer group"
                          >
                            <div className="w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-amber-500 text-gray-600 group-hover:text-slate-950 flex items-center justify-center shrink-0 transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-gray-800 group-hover:text-amber-700 truncate">{item.name}</p>
                              <p className="text-[10px] text-gray-400 truncate">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* C. Right: Flash Deal Link & Sell Product Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/browse?deal=flash"
              onClick={closeAllMenus}
              className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider transition-colors py-1 px-2.5 rounded-lg group ${
                isFlashActive ? 'bg-amber-500 text-slate-950' : 'text-amber-600 hover:text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Zap className={`w-4 h-4 animate-pulse transition-transform group-hover:scale-110 ${
                isFlashActive ? 'fill-slate-950 text-slate-950' : 'fill-amber-500 text-amber-500'
              }`} />
              <span>Flash Deal</span>
            </Link>

            <Link
              href="/sell"
              onClick={closeAllMenus}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Sell Product</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 3. Responsive Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#1e2837] text-white px-5 py-5 space-y-4 border-b border-slate-700 max-h-[85vh] overflow-y-auto">
          {/* Mobile Search */}
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
              className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase">
            <Link 
              href="/browse" 
              onClick={closeAllMenus} 
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-center text-slate-200 transition-colors"
            >
              Browse Shop
            </Link>
            <Link 
              href="/sell" 
              onClick={closeAllMenus} 
              className="p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-center font-black transition-colors"
            >
              + Sell Product
            </Link>
          </div>

          {/* Mobile Categories */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Categories</span>
              <span className="text-amber-400 font-extrabold">SALE</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.name}
                    href={`/browse?category=${encodeURIComponent(cat.name)}`}
                    onClick={closeAllMenus}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 rounded-xl text-slate-300 text-xs font-medium transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Deals & Special Links */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Filters & Deals</p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/browse?deal=flash"
                onClick={closeAllMenus}
                className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-bold"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Flash Deals</span>
              </Link>
              <Link
                href="/browse?featured=true"
                onClick={closeAllMenus}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Featured Deals</span>
              </Link>
              <Link
                href="/browse?sort=views"
                onClick={closeAllMenus}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-xl text-slate-300 text-xs font-medium"
              >
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>Hot Products</span>
              </Link>
              <Link
                href="/browse?maxPrice=5000"
                onClick={closeAllMenus}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-xl text-slate-300 text-xs font-medium"
              >
                <Tag className="w-3.5 h-3.5 text-blue-400" />
                <span>Under ৳5,000</span>
              </Link>
            </div>
          </div>

          {/* Mobile Elements Navigation */}
          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Jump To Section</p>
            <div className="flex flex-wrap gap-1.5">
              {ELEMENTS_LIST.map((el) => (
                <button
                  key={el.id}
                  onClick={() => handleScrollToElement(el.id)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {el.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const Navbar = () => {
  return (
    <React.Suspense fallback={<header className="sticky top-0 z-50 bg-[#1e2837] h-28" />}>
      <NavbarContent />
    </React.Suspense>
  );
};
