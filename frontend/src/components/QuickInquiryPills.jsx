"use client";

import React from 'react';
import { MessageSquare, Sparkles, HelpCircle, CheckCircle2, Box, Tag } from 'lucide-react';

const QUICK_INQUIRIES = [
  { text: "Is this still available for sale?", icon: CheckCircle2 },
  { text: "What is your best/last cash price?", icon: Tag },
  { text: "Does it come with original box & invoice?", icon: Box },
  { text: "Can we meet at a nearby Metro station?", icon: Sparkles },
  { text: "Are there any internal or physical issues?", icon: HelpCircle },
];

export const QuickInquiryPills = ({ onSelectInquiry }) => {
  return (
    <div className="space-y-2 font-['Bai_Jamjuree']">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
        <MessageSquare className="w-3.5 h-3.5 text-[#0c9096]" />
        <span>Instant Quick Inquiries</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {QUICK_INQUIRIES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectInquiry(item.text)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-[#0c9096]/50 text-xs text-zinc-300 hover:text-white transition-all cursor-pointer shadow-xs group"
            >
              <Icon className="w-3 h-3 text-[#0c9096] group-hover:scale-110 transition-transform" />
              <span>{item.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
