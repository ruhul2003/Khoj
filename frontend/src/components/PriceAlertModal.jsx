"use client";

import React, { useState } from 'react';
import { Bell, X, CheckCircle2, TrendingDown, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export function PriceAlertModal({ product, isOpen, onClose }) {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [targetPrice, setTargetPrice] = useState(
    product ? Math.round(product.price * 0.9) : 0
  );
  const [notificationEmail, setNotificationEmail] = useState(user?.email || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !product) return null;

  const currentPrice = product.price || 0;
  const savingsAmount = currentPrice - targetPrice;
  const savingsPct = currentPrice > 0 ? Math.round((savingsAmount / currentPrice) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notificationEmail) {
      addToast('Please provide an email for price drop alerts', 'error');
      return;
    }

    try {
      const stored = localStorage.getItem('khoj_price_alerts');
      const alerts = stored ? JSON.parse(stored) : [];
      const newAlert = {
        id: 'alert_' + Date.now(),
        productId: product._id || product.id,
        productTitle: product.title,
        productImage: product.images?.[0] || '',
        currentPrice,
        targetPrice: Number(targetPrice),
        email: notificationEmail,
        createdAt: new Date().toISOString()
      };

      const updated = [newAlert, ...alerts.filter(a => a.productId !== (product._id || product.id))];
      localStorage.setItem('khoj_price_alerts', JSON.stringify(updated));

      setIsSaved(true);
      addToast(`Price alert activated for ৳${targetPrice.toLocaleString()}!`, 'success');
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
      addToast('Failed to set price alert', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative space-y-6 animate-in fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" />
            Price Tracker
          </div>
          <h3 className="text-xl font-bold text-white">Set Price Drop Alert</h3>
          <p className="text-xs text-zinc-400 truncate">{product.title}</p>
        </div>

        {isSaved ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Alert Set Successfully!</h4>
            <p className="text-xs text-zinc-300">
              We will notify you at <span className="font-bold text-emerald-400">{notificationEmail}</span> when this item drops to ৳{targetPrice.toLocaleString()}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Price Overview Card */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">
                  Current Price
                </span>
                <span className="text-base font-black text-white">
                  ৳{currentPrice.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">
                  Target Price
                </span>
                <span className="text-base font-black text-amber-400">
                  ৳{Number(targetPrice).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Target Price Input & Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <label className="text-zinc-300">Notify me when price drops to:</label>
                {savingsPct > 0 && (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Save {savingsPct}% (৳{savingsAmount.toLocaleString()})
                  </span>
                )}
              </div>

              <input
                type="number"
                min={1}
                max={currentPrice}
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full px-4 py-3 bg-zinc-950 text-white font-extrabold text-xl rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096]"
              />

              <div className="grid grid-cols-4 gap-2 pt-1">
                {[5, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTargetPrice(Math.round(currentPrice * (1 - pct / 100)))}
                    className="py-1.5 px-2 bg-zinc-900 hover:bg-amber-500/20 hover:border-amber-500/50 border border-zinc-800 rounded-xl text-[11px] font-bold text-zinc-300 hover:text-white transition-all cursor-pointer text-center"
                  >
                    -{pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Notification Email */}
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-300 font-bold block">
                Notification Email
              </label>
              <input
                type="email"
                required
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-zinc-950 text-xs text-white placeholder-zinc-500 rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span>Activate Price Alert</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
