"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Footer = () => {
  const { userShop } = useAuth();
  return (
    <footer className="mt-16 bg-[#17212d] border-t border-slate-800 text-slate-400 font-['Bai_Jamjuree']">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Khoj<span className="text-amber-400">shop</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-md leading-relaxed">
            Khoj is a modern, high-speed multi-category e-commerce marketplace. Discover verified electronics, smartphones, fashion apparel, furniture, and home appliances with direct local peer transactions.
          </p>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Gulshan 2, Dhaka - 1212, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>(+880) 1712-345-678 (24/7 Order Hotline)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>support@khojshop.com</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h5 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-amber-400">Categories</h5>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/browse?category=Electronics" className="hover:text-amber-400 transition-colors">Electronics & PCs</Link></li>
            <li><Link href="/browse?category=Mobile%20Phones" className="hover:text-amber-400 transition-colors">Mobile Phones</Link></li>
            <li><Link href="/browse?category=Gaming" className="hover:text-amber-400 transition-colors">Gaming Consoles & GPUs</Link></li>
            <li><Link href="/browse?category=Vehicles" className="hover:text-amber-400 transition-colors">Vehicles & Bikes</Link></li>
            <li><Link href="/browse?category=Furniture" className="hover:text-amber-400 transition-colors">Furniture & Decor</Link></li>
            <li><Link href="/browse?category=Fashion" className="hover:text-amber-400 transition-colors">Fashion & Apparel</Link></li>
            <li><Link href="/browse?category=Books%20%26%20Hobbies" className="hover:text-amber-400 transition-colors">Books & Hobbies</Link></li>
            <li><Link href="/browse?category=Home%20Appliances" className="hover:text-amber-400 transition-colors">Home Appliances</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-amber-400">Explore Shop</h5>
          <ul className="space-y-2.5 text-xs font-medium">
            <li><Link href="/browse" className="hover:text-amber-400 transition-colors">All Products</Link></li>
            <li><Link href="/browse?deal=flash" className="hover:text-amber-400 transition-colors">⚡ Flash Deals</Link></li>
            <li><Link href="/wishlist" className="hover:text-amber-400 transition-colors">Saved Wishlist</Link></li>
            {userShop ? (
              <li><Link href="/sell" className="hover:text-amber-400 transition-colors">+ Post Product Ad</Link></li>
            ) : (
              <li><Link href="/shop/create" className="hover:text-amber-400 transition-colors">Register Your Shop</Link></li>
            )}
            <li><Link href="/dashboard" className="hover:text-amber-400 transition-colors">My Account</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h5 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-amber-400">Customer Care</h5>
          <ul className="space-y-2.5 text-xs font-medium">
            <li>
              <Link href="/help" className="flex items-center gap-1.5 text-white font-bold hover:text-amber-400 transition-colors">
                Help & Safety Center <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </Link>
            </li>
            <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">7-Day Free Returns <ArrowUpRight className="w-3 h-3 text-slate-500" /></li>
            <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">100% Genuine Guarantee <ArrowUpRight className="w-3 h-3 text-slate-500" /></li>
            <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">Terms & Conditions <ArrowUpRight className="w-3 h-3 text-slate-500" /></li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Khojshop Marketplace. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="text-slate-400">Accepted Payments:</span>
          <span className="px-2 py-0.5 rounded bg-pink-950/60 border border-pink-700/40 text-pink-300 font-bold">bKash</span>
          <span className="px-2 py-0.5 rounded bg-orange-950/60 border border-orange-700/40 text-orange-300 font-bold">Nagad</span>
          <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-700/40 text-purple-300 font-bold">Rocket</span>
          <span className="px-2 py-0.5 rounded bg-blue-950/60 border border-blue-700/40 text-blue-300 font-bold">Visa / Master</span>
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 font-bold">Doorstep COD</span>
        </div>
      </div>
    </footer>
  );
};
