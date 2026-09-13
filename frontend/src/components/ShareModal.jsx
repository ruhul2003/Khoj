"use client";

import React, { useState } from 'react';
import { 
  Share2, 
  X, 
  Copy, 
  Check, 
  QrCode, 
  MessageCircle, 
  Send, 
  ExternalLink 
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export const ShareModal = ({ isOpen, onClose, product }) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen || !product) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://khojshop.com/product/${product._id}`;
  const shareText = `Check out "${product.title}" for ৳${product.price?.toLocaleString()} on Khoj!`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      addToast('Listing link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const shareChannels = [
    {
      name: 'WhatsApp',
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`
    },
    {
      name: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      icon: ExternalLink,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Twitter / X',
      color: 'bg-zinc-800 hover:bg-zinc-700 text-white',
      icon: Send,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'Telegram',
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    }
  ];

  // Stylized SVG QR code mockup representing encoded URL
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&bgcolor=182230&color=ffffff&margin=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-7 shadow-2xl space-y-6 font-['Bai_Jamjuree']">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c9096]/15 border border-[#0c9096]/30 text-[#38d4dc] text-[11px] font-bold uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Listing</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Spread The Word</h3>
          <p className="text-xs text-zinc-400 line-clamp-1">{product.title}</p>
        </div>

        {/* Product Preview Snippet */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
          <img
            src={product.images?.[0] || '/placeholder.png'}
            alt=""
            className="w-14 h-14 rounded-xl object-cover bg-zinc-800 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{product.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-black text-[#0c9096]">
                ৳{product.price?.toLocaleString()}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">
                {product.location}
              </span>
            </div>
          </div>
        </div>

        {/* Copy Link Row */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Direct Listing Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-xl focus:outline-none select-all truncate font-mono"
            />
            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 bg-[#0c9096] hover:bg-[#0a6c71] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Share to Channels</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {shareChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.name}
                  href={ch.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${ch.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{ch.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* QR Code Toggle */}
        <div className="pt-2 border-t border-zinc-800 text-center">
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>{showQr ? 'Hide QR Code ▲' : 'Show Mobile QR Code ▼'}</span>
          </button>

          {showQr && (
            <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 inline-block text-center space-y-2">
              <img
                src={qrSvgUrl}
                alt="Product QR"
                className="w-36 h-36 mx-auto rounded-xl bg-white p-1"
              />
              <p className="text-[10px] text-zinc-400">Scan with phone camera to view listing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
