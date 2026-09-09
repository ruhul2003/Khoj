"use client";

import React, { useState } from 'react';
import { X, DollarSign, Send, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export const MakeOfferModal = ({ product, isOpen, onClose }) => {
  const { user } = useAuth();
  const [offeredPrice, setOfferedPrice] = useState(Math.round(product.price * 0.9));
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/offers', {
        productId: product._id,
        buyerId: user?.id || 'user_demo_2',
        buyerName: user?.name || 'Sabbir Hossain',
        offeredPrice: Number(offeredPrice),
        message: message || `Hi ${product.sellerName}, I am offering ৳${offeredPrice} for this item.`
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const discountAmount = product.price - offeredPrice;
  const discountPercent = Math.round((discountAmount / product.price) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-md p-6 rounded-3xl border border-zinc-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Offer Sent to Seller!</h3>
            <p className="text-xs text-zinc-300">
              Your price offer of <span className="font-bold text-emerald-400">৳{offeredPrice.toLocaleString()}</span> has been sent to {product.sellerName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                Make Proposal
              </div>
              <h3 className="text-xl font-bold text-white">Negotiate Price</h3>
              <p className="text-xs text-zinc-400 truncate mt-0.5">{product.title}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs">
              <div>
                <span className="text-zinc-400 block font-medium">Asking Price</span>
                <span className="text-sm font-bold text-white">৳{product.price.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-400 block font-medium">Your Proposal</span>
                <span className="text-sm font-extrabold text-indigo-400">৳{offeredPrice.toLocaleString()}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs text-zinc-300 mb-2">
                <label className="font-semibold">Your Price (BDT / Tk)</label>
                {discountPercent > 0 && (
                  <span className="text-emerald-400 font-bold">
                    {discountPercent}% discount
                  </span>
                )}
              </div>
              <input
                type="number"
                min={1}
                max={product.price}
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(Number(e.target.value))}
                className="w-full px-4 py-3.5 bg-zinc-950 text-white font-extrabold text-xl rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Note for {product.sellerName}</label>
              <textarea
                rows={3}
                placeholder="e.g. Can meet in Gulshan today for cash payment."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 text-xs text-white placeholder-zinc-500 rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending...' : 'Send Offer Proposal'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
