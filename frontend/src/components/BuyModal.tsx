"use client";

import React, { useState } from 'react';
import { X, ShoppingBag, Truck, CreditCard, ShieldCheck, CheckCircle } from 'lucide-react';
import { Product, api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface BuyModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const BuyModal: React.FC<BuyModalProps> = ({ product, isOpen, onClose }) => {
  const { user } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState(user?.location || 'Gulshan 2, Dhaka, Bangladesh');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery / In-Person Meetup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/orders', {
        productId: product._id,
        buyerId: user?.id || 'user_demo_2',
        buyerName: user?.name || 'Sabbir Hossain',
        buyerEmail: user?.email || 'sabbir@example.com',
        deliveryAddress,
        paymentMethod
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-slate-700 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-900 border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
            <p className="text-sm text-slate-300 max-w-xs mx-auto">
              Congratulations! You have purchased <span className="font-semibold text-white">{product.title}</span>. The seller ({product.sellerName}) has been notified.
            </p>
            <div className="inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full">
              Status: Reserved & Confirmed
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmOrder} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold mb-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                Instant Checkout
              </div>
              <h3 className="text-xl font-bold text-white">Complete Purchase</h3>
            </div>

            {/* Product Summary */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
              <img
                src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80'}
                alt={product.title}
                className="w-16 h-16 rounded-lg object-cover border border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-indigo-400 uppercase">{product.condition}</span>
                <h4 className="text-xs font-bold text-white truncate">{product.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Seller: {product.sellerName}</p>
                <div className="text-sm font-black text-emerald-400 mt-1">${product.price}</div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-indigo-400" />
                Delivery / Meetup Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-900 text-xs text-white rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 text-xs text-white rounded-xl border border-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Cash on Delivery / In-Person Meetup">Cash on Delivery / Local Meetup</option>
                <option value="bKash / Nagad Mobile Banking">bKash / Nagad Mobile Banking</option>
                <option value="Bank Transfer">Bank Transfer / Online Payment</option>
              </select>
            </div>

            {/* Total breakdown */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Item Price</span>
                <span>${product.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Buyer Protection Fee</span>
                <span className="text-emerald-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-white text-sm">
                <span>Total Amount</span>
                <span className="text-emerald-400">${product.price}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full buyer protection guarantee. Pay only upon inspection.</span>
            </div>

            {/* Confirm button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Order Now'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
