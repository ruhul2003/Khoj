"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  Handshake, 
  ShoppingBag, 
  Store, 
  AlertTriangle, 
  ChevronDown, 
  MessageCircle, 
  Mail, 
  Phone, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';

const FAQ_TOPICS = [
  {
    category: 'Buying & Handover',
    icon: ShoppingBag,
    color: 'text-[#0c9096]',
    items: [
      {
        q: 'How does buying on Khoj work?',
        a: 'Khoj connects local buyers and sellers directly. When you find an item you want, you can make a price offer, chat in-app, or call the seller to agree on a physical handover location (like a metro station or shopping mall) or courier delivery.'
      },
      {
        q: 'Can I negotiate the price with the seller?',
        a: 'Yes! On every listing, click the "Make Offer" button. You can select preset discounts (-5%, -10%, -15%, -20%) or type your custom proposal with a note. Sellers can accept, reject, or propose a counter-offer.'
      },
      {
        q: 'Should I ever pay in advance before meeting?',
        a: 'Never send advance bKash or bank transfers to individual sellers before physically meeting and verifying the item in person. Always inspect devices, test hardware, and verify paperwork first.'
      }
    ]
  },
  {
    category: 'Selling & Shop Setup',
    icon: Store,
    color: 'text-amber-400',
    items: [
      {
        q: 'How do I open a shop on Khoj?',
        a: 'Visit "/shop/create" or navigate to your Dashboard > My Shop tab. Fill in your shop name, description, location, and custom handle. Your shop storefront is activated immediately with free listing privileges.'
      },
      {
        q: 'How do I get a Verified Seller Badge?',
        a: 'In your Dashboard under the "My Shop" tab, click "Store Badge". You can select your badge tier (Standard, Pro Merchant, or Official Brand) and provide your NID or Trade License number to activate the trust badge on your listings.'
      },
      {
        q: 'How many items can I list for sale?',
        a: 'Registered shop owners enjoy unlimited product listings with full image gallery uploads, asking price adjustments, and direct inquiry notifications.'
      }
    ]
  },
  {
    category: 'Safety & Scam Prevention',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    items: [
      {
        q: 'Where is the safest place to meet for an exchange?',
        a: 'We strongly advise meeting during daylight hours in public, high-traffic locations such as shopping mall food courts, Metro stations, or bank lobbies where security cameras and people are present.'
      },
      {
        q: 'How do I test a smartphone before paying?',
        a: 'Use our interactive Handover Inspection Checklist on the product page! Dial *#06# to verify IMEI against the box, drag an icon across all screen edges to test touch digitizers, test camera lenses, and ensure iCloud or Google FRP accounts are completely removed.'
      },
      {
        q: 'What should I do if I suspect a fraudulent listing?',
        a: 'Do not transfer any money. Contact our trust & safety team immediately via support@khojshop.com or WhatsApp hotline (+880 1712-345-678) with the listing URL. We investigate and suspend fraudulent accounts.'
      },
      {
        q: 'How do I safely accept bKash or Nagad payments as a seller?',
        a: 'Always open your official bKash or Nagad app and verify your balance directly. Never rely on an incoming SMS from a regular 11-digit mobile number claiming to be bKash. Scammers often forge sender headers.'
      },
      {
        q: 'Can I use courier Cash on Delivery (COD) across districts?',
        a: 'Yes, sellers frequently use verified Bangladesh courier partners like Steadfast, Pathao, and RedX with open-box verification and conditional cash collection on delivery.'
      }
    ]
  },
  {
    category: 'Account & Privacy',
    icon: Lock,
    color: 'text-purple-400',
    items: [
      {
        q: 'How do I update my profile details and password?',
        a: 'Navigate to the Profile page in the top navbar menu. You can update your display name, location, contact number, avatar URL, or sign out securely.'
      },
      {
        q: 'How is my phone number protected on listings?',
        a: 'By default, your seller phone number is protected behind a "Call / WhatsApp" reveal button, preventing automated scrapers from harvesting your contact details.'
      }
    ]
  }
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleAccordion = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredTopics = FAQ_TOPICS.map(topic => {
    const matchingItems = topic.items.filter(item => {
      const matchQuery = !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === 'All' || topic.category === activeCategory;
      return matchQuery && matchCat;
    });
    return { ...topic, items: matchingItems };
  }).filter(topic => topic.items.length > 0);

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-12 font-['Bai_Jamjuree']">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c9096]/15 border border-[#0c9096]/30 text-[#38d4dc] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Khoj Knowledge Base & Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          How can we help you today?
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
          Find instant answers about peer-to-peer buying, safe handovers, store management, and merchant verification.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. handover, verify phone, make offer)..."
            className="w-full pl-12 pr-4 py-4 bg-zinc-950 border border-zinc-800 focus:border-[#0c9096] rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none shadow-xl"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-6" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['All', 'Buying & Handover', 'Selling & Shop Setup', 'Safety & Scam Prevention', 'Account & Privacy'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#0c9096] text-white shadow-lg shadow-[#0c9096]/25'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="max-w-4xl mx-auto space-y-8">
        {filteredTopics.length === 0 ? (
          <div className="text-center py-16 space-y-3 glass-panel rounded-3xl border border-zinc-800">
            <HelpCircle className="w-12 h-12 text-zinc-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Matching Questions Found</h3>
            <p className="text-xs text-zinc-400">Try adjusting your search query or reach out to our team below.</p>
          </div>
        ) : (
          filteredTopics.map((topic, topicIdx) => {
            const Icon = topic.icon;
            return (
              <div key={topic.category} className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider pb-2 border-b border-zinc-800">
                  <Icon className={`w-4 h-4 ${topic.color}`} />
                  <span>{topic.category}</span>
                </div>

                <div className="space-y-3">
                  {topic.items.map((item, idx) => {
                    const id = `${topicIdx}_${idx}`;
                    const isOpen = !!openItems[id];

                    return (
                      <div
                        key={id}
                        className="glass-panel rounded-2xl border border-zinc-800/80 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => toggleAccordion(id)}
                          className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-900/30 transition-colors"
                        >
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#0c9096]' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed font-light border-t border-zinc-800/50 bg-zinc-950/40">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Support Contact Grid */}
      <div className="pt-8 border-t border-zinc-800">
        <div className="text-center mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">
            Still Have Questions? We're Here 24/7
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reach out to our community operations and fraud prevention desk
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">WhatsApp Helpline</h4>
            <p className="text-[11px] text-zinc-400">Instant answers for urgent handover & safety questions.</p>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>+880 1712-345-678</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0c9096]/15 border border-[#0c9096]/30 text-[#38d4dc] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Email Support Desk</h4>
            <p className="text-[11px] text-zinc-400">Shop verification, reporting violations, and general support.</p>
            <a
              href="mailto:support@khojshop.com"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c9096] hover:text-[#38d4dc]"
            >
              <span>support@khojshop.com</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-zinc-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-sm">Emergency Hotlines</h4>
            <p className="text-[11px] text-zinc-400">Bangladesh National Emergency Helpline is available 24 hours.</p>
            <a
              href="tel:999"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Dial 999 (Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
