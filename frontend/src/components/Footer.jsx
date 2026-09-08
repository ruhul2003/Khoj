"use client";

import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Truck, Lock, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-28 bg-[#06070a] border-t border-zinc-800/80 text-zinc-400 font-['Bai_Jamjuree']">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 border-b border-zinc-900 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Verified Sellers</h4>
            <p className="text-xs text-zinc-400 mt-0.5">Trusted peer ratings & history</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">New & Used Deals</h4>
            <p className="text-xs text-zinc-400 mt-0.5">Transparent condition scores</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Easy Meetup</h4>
            <p className="text-xs text-zinc-400 mt-0.5">Local pickup & direct delivery</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center font-bold shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Price Proposals</h4>
            <p className="text-xs text-zinc-400 mt-0.5">Make offers & negotiate live</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-5 gap-12 text-sm">
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl">
              K
            </div>
            <span className="text-2xl font-black text-white tracking-tight">Khoj Marketplace</span>
          </div>
          <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
            Khoj is a minimalist peer-to-peer buy & sell marketplace. Post pre-owned electronics, vehicles, furniture, or clothes for free and connect directly with local buyers.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-indigo-400">Categories</h5>
          <ul className="space-y-3 text-xs font-medium">
            <li><Link href="/browse?category=Electronics" className="hover:text-white transition-colors">Electronics & Laptops</Link></li>
            <li><Link href="/browse?category=Mobile+Phones" className="hover:text-white transition-colors">Mobile Phones</Link></li>
            <li><Link href="/browse?category=Gaming" className="hover:text-white transition-colors">Gaming Consoles</Link></li>
            <li><Link href="/browse?category=Vehicles" className="hover:text-white transition-colors">Vehicles & Bikes</Link></li>
            <li><Link href="/browse?category=Furniture" className="hover:text-white transition-colors">Home Furniture</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-indigo-400">Navigation</h5>
          <ul className="space-y-3 text-xs font-medium">
            <li><Link href="/browse" className="hover:text-white transition-colors">Browse Catalog</Link></li>
            <li><Link href="/sell" className="hover:text-white transition-colors">+ Post Product Ad</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
            <li><Link href="/dashboard?tab=offers" className="hover:text-white transition-colors">Offer Proposals</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white mb-4 text-xs uppercase tracking-widest text-indigo-400">Guidelines</h5>
          <ul className="space-y-3 text-xs font-medium">
            <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">Safety Guidelines <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" /></li>
            <li className="flex items-center gap-1.5 hover:text-white cursor-pointer">Condition Ratings <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" /></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 border-t border-zinc-900 text-xs text-zinc-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2026 Khoj Marketplace. Built with Next.js, Express.js & Tailwind CSS.</p>
        <p>Bai Jamjuree Typography • Wide Layout • Minimal JSX</p>
      </div>
    </footer>
  );
};
