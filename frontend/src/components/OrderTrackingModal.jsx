"use client";

import React from 'react';
import { Truck, CheckCircle2, Clock, MapPin, Phone, ShieldCheck, X, FileText } from 'lucide-react';
import { formatBDT } from '@/utils/formatters';

export function OrderTrackingModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const steps = [
    {
      title: 'Order Confirmed',
      desc: 'Purchase interest received and reserved on Khoj.',
      status: 'completed',
      time: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Confirmed'
    },
    {
      title: 'Seller Contact & Schedule',
      desc: `Buyer & seller agreed to meetup or dispatch from ${order.location || 'seller hub'}.`,
      status: 'completed',
      time: 'Completed'
    },
    {
      title: 'Transit / Handover In Progress',
      desc: order.deliveryMethod === 'Courier'
        ? 'Parcel handed to courier for doorstep delivery.'
        : 'In-person physical meetup scheduled at agreed safe zone.',
      status: order.status === 'Completed' ? 'completed' : 'current',
      time: 'In Progress'
    },
    {
      title: 'Inspection & Final Payment',
      desc: 'Item physically inspected, IMEI/serials verified, and payment settled.',
      status: order.status === 'Completed' ? 'completed' : 'upcoming',
      time: order.status === 'Completed' ? 'Settled' : 'Pending inspection'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden bg-zinc-950 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096]">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Handover & Order Tracking</h3>
              <p className="text-[11px] text-zinc-400">Order Ref #{order._id?.slice(-8) || order.id || 'KHJ-01'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Details Preview */}
        <div className="p-5 border-b border-zinc-800/80 bg-zinc-900/30 flex items-center gap-4">
          <img
            src={order.productImage || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80'}
            alt={order.productTitle}
            className="w-16 h-16 rounded-2xl object-cover border border-zinc-800 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-white truncate">{order.productTitle || 'Product Order'}</h4>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-400">
              <span>Seller: <strong className="text-zinc-200">{order.sellerName || 'Merchant'}</strong></span>
              <span>•</span>
              <span className="font-bold text-teal-400">{formatBDT(order.price || 0)}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6 space-y-6">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-zinc-800">
            {steps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <div key={idx} className="relative flex items-start gap-4 text-xs">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    isCompleted
                      ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-[#0c9096] text-white ring-4 ring-[#0c9096]/20 animate-pulse'
                      : 'bg-zinc-900 border border-zinc-700 text-zinc-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                  </div>

                  <div className="flex-1 space-y-0.5 pt-0.5">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-sm ${isCurrent ? 'text-[#38d4dc]' : isCompleted ? 'text-white' : 'text-zinc-500'}`}>
                        {step.title}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-medium">{step.time}</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety Reminder */}
          <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5 text-[11px] text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Always test device switches, cameras, and connectivity before confirming receipt.</span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Close Tracking
          </button>
        </div>

      </div>
    </div>
  );
}
