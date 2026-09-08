"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Truck, Lock, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 border-t border-slate-800/80 text-slate-400">
      
      {/* Guarantees & Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-900 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Verified Sellers</h4>
            <p className="text-xs text-slate-400">Trusted community reviews</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">New & Used Deals</h4>
            <p className="text-xs text-slate-400">Quality checked listings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Easy Meetup / Delivery</h4>
            <p className="text-xs text-slate-400">Local pickup & courier</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Fair Price Negotiation</h4>
            <p className="text-xs text-slate-400">Make offer & chat live</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl glow-gradient flex items-center justify-center text-white font-extrabold text-lg">
              K
            </div>
            <span className="text-xl font-bold text-white">Khoj Marketplace</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Khoj is Bangladesh’s premier peer-to-peer buy & sell marketplace. List unused gadgets, furniture, vehicles, and fashion items, or discover amazing prices on brand new & like-new products.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-xs text-indigo-400 border border-slate-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Express & MongoDB Backend Ready
            </span>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Top Categories</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/browse?category=Electronics" className="hover:text-indigo-400 transition-colors">Electronics & Laptops</Link></li>
            <li><Link href="/browse?category=Mobile+Phones" className="hover:text-indigo-400 transition-colors">Mobile Phones & Tablets</Link></li>
            <li><Link href="/browse?category=Gaming" className="hover:text-indigo-400 transition-colors">Gaming Consoles & PCs</Link></li>
            <li><Link href="/browse?category=Vehicles" className="hover:text-indigo-400 transition-colors">Cars & Motorcycles</Link></li>
            <li><Link href="/browse?category=Furniture" className="hover:text-indigo-400 transition-colors">Home & Office Furniture</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Quick Navigation</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/browse" className="hover:text-indigo-400 transition-colors">Browse Marketplace</Link></li>
            <li><Link href="/sell" className="hover:text-indigo-400 transition-colors">+ Post a Free Ad</Link></li>
            <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">User Dashboard</Link></li>
            <li><Link href="/dashboard?tab=offers" className="hover:text-indigo-400 transition-colors">Offer Inbox</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Safety & Support</h5>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-1 hover:text-white">Safety Tips for Meetups <ArrowUpRight className="w-3 h-3 text-slate-500" /></li>
            <li className="flex items-center gap-1 hover:text-white">Community Guidelines <ArrowUpRight className="w-3 h-3 text-slate-500" /></li>
            <li className="flex items-center gap-1 hover:text-white">Condition Standard Guide <ArrowUpRight className="w-3 h-3 text-slate-500" /></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© 2026 Khoj Marketplace. Built with Next.js, Express.js & Tailwind CSS.</p>
        <p className="flex items-center gap-2">
          <span>Safe Transactions</span> • <span>Instant Offers</span> • <span>Peer-to-Peer</span>
        </p>
      </div>

    </footer>
  );
};
