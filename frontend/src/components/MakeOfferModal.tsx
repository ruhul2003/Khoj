"use client";

import React, { useState } from 'react';
import { X, DollarSign, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Product, api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface MakeOfferModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const MakeOfferModal: React.FC<MakeOfferModalProps> = ({ product, isOpen, onClose }) => {
  const { user } = useAuth();
  const [offeredPrice, setOfferedPrice] = useState<number>(Math.round(product.price * 0.9));
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/offers', {
        productId: product._id,
        buyerId: user?.id || 'user_demo_2',
        buyerName: user?.name || 'Sabbir Hossain',
        offeredPrice: Number(offeredPrice),
        message: message || `Hi ${product.sellerName}, I am offering $${offeredPrice} for this item.`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-700 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Offer Sent to Seller!</h3>
            <p className="text-xs text-slate-300">
              Your price offer of <span className="font-bold text-emerald-400">${offeredPrice}</span> has been sent to {product.sellerName}. You will get notified once they respond.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] font-semibold mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                Make Price Offer
              </div>
              <h3 className="text-lg font-bold text-white">Negotiate Price</h3>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{product.title}</p>
            </div>

            {/* Price Cards Summary */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">Listed Asking Price</span>
                <span className="text-sm font-bold text-white">${product.price}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block">Your Price Proposal</span>
                <span className="text-sm font-black text-indigo-400">${offeredPrice}</span>
              </div>
            </div>

            {/* Slider or Input for Offer Price */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                <label className="font-semibold">Your Offered Price ($)</label>
                {discountPercent > 0 && (
                  <span className="text-emerald-400 font-bold">
                    {discountPercent}% below asking price (-${discountAmount})
                  </span>
                )}
              </div>
              <input
                type="number"
                min={1}
                max={product.price}
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-900 text-white font-bold text-lg rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOfferedPrice(Math.round(product.price * 0.95))}
                className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded-lg"
              >
                -5% (${Math.round(product.price * 0.95)})
              </button>
              <button
                type="button"
                onClick={() => setOfferedPrice(Math.round(product.price * 0.90))}
                className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded-lg"
              >
                -10% (${Math.round(product.price * 0.90)})
              </button>
              <button
                type="button"
                onClick={() => setOfferedPrice(Math.round(product.price * 0.85))}
                className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 rounded-lg"
              >
                -15% (${Math.round(product.price * 0.85)})
              </button>
            </div>

            {/* Message to Seller */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Note for {product.sellerName}</label>
              <textarea
                rows={3}
                placeholder="e.g. Can meet in Gulshan today for cash payment."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Sending Offer...' : 'Send Offer to Seller'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
