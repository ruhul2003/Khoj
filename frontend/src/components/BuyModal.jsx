"use client";

import React, { useState } from 'react';
import { X, ShoppingBag, Truck, CreditCard, ShieldCheck, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export const BuyModal = ({ product, isOpen, onClose }) => {
  const { user } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState(user?.location || 'Gulshan 2, Dhaka, Bangladesh');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery / In-Person Meetup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirmOrder = async (e) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-lg p-6 rounded-3xl border border-zinc-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Order Reserved & Confirmed!</h3>
            <p className="text-xs text-zinc-300 max-w-xs mx-auto">
              You purchased <span className="font-semibold text-white">{product.title}</span>. Seller {product.sellerName} has been notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirmOrder} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShoppingBag className="w-3.5 h-3.5" />
                Checkout Order
              </div>
              <h3 className="text-xl font-bold text-white">Complete Purchase</h3>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800">
              <img
                src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80'}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-cover border border-zinc-700"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#689db8] uppercase tracking-widest">{product.condition}</span>
                <h4 className="text-xs font-bold text-white truncate">{product.title}</h4>
                <div className="text-sm font-black text-emerald-400 mt-1">৳{product.price.toLocaleString()}</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#0c9096]" />
                Delivery / Meetup Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-950 text-xs text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-[#689db8]" />
                Payment Option
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-950 text-xs text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] cursor-pointer"
              >
                <option value="Cash on Delivery / In-Person Meetup">Cash on Delivery / In-Person Meetup</option>
                <option value="bKash / Nagad Mobile Banking">bKash / Nagad Mobile Banking</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{isSubmitting ? 'Confirming...' : 'Confirm Purchase Order'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
