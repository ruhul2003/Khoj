"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2, User, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const DEFAULT_QUESTIONS = [
  {
    id: 'q_1',
    author: 'Tanvir Hossain',
    question: 'Is the physical condition completely scratchless? Does it include original receipt?',
    createdAt: '2 days ago',
    answer: {
      author: 'Verified Seller',
      isSeller: true,
      text: 'Yes, it is 100% genuine with original box, cable, and purchase invoice from Jamuna Future Park.',
      answeredAt: '1 day ago'
    }
  },
  {
    id: 'q_2',
    author: 'Rafiqul Islam',
    question: 'Is in-person handover possible near Metro Rail station or Uttara?',
    createdAt: '3 days ago',
    answer: {
      author: 'Verified Seller',
      isSeller: true,
      text: 'Certainly! We can easily meet at Agargaon or Uttara North Metro station for convenient inspection.',
      answeredAt: '2 days ago'
    }
  }
];

const SUGGESTED_QUESTIONS = [
  'Is the price negotiable?',
  'Does it have original box and accessories?',
  'Can we test the item before payment?',
  'Can you ship via Steadfast or Pathao?'
];

export function ProductQaSection({ productId, sellerName = 'Seller' }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`khoj_qa_${productId}`);
      if (saved) {
        setQuestions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse saved Q&A:', e);
    }
  }, [productId]);

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setIsSubmitting(true);
    const newQ = {
      id: 'q_' + Date.now(),
      author: user?.name || 'Interested Buyer',
      question: newQuestionText.trim(),
      createdAt: 'Just now',
      answer: null
    };

    const updated = [newQ, ...questions];
    setQuestions(updated);
    try {
      localStorage.setItem(`khoj_qa_${productId}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setNewQuestionText('');
    setIsSubmitting(false);
    addToast('Your question was posted! The seller will be notified.', 'success');
  };

  const handleSelectSuggested = (text) => {
    setNewQuestionText(text);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-6 font-['Bai_Jamjuree']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096]">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Questions & Answers ({questions.length})
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Have questions about this item? Ask publicly or browse seller answers below.
          </p>
        </div>
      </div>

      {/* Ask Question Form */}
      <form onSubmit={handleAskQuestion} className="space-y-3">
        <div className="relative">
          <textarea
            rows={2}
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            placeholder="Ask the seller a question (e.g. condition, warranty, accessories, pickup spot)..."
            className="w-full px-4 py-3 bg-zinc-950 text-white rounded-2xl border border-zinc-800 focus:outline-none focus:border-[#0c9096] text-xs font-medium placeholder-zinc-500 resize-none"
          />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Suggestions:
          </span>
          {SUGGESTED_QUESTIONS.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSuggested(suggestion)}
              className="px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-400 hover:text-white text-[11px] font-medium transition-colors cursor-pointer"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={!newQuestionText.trim() || isSubmitting}
            className="px-5 py-2.5 bg-[#0c9096] hover:bg-[#0a6c71] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Question</span>
          </button>
        </div>
      </form>

      {/* Questions List */}
      <div className="space-y-4 pt-2">
        {questions.length === 0 ? (
          <p className="text-xs text-zinc-500 text-center py-4">No questions asked yet. Be the first to ask!</p>
        ) : (
          questions.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-3 text-xs"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-200">{item.author}</span>
                      <span className="text-[10px] text-zinc-500">• {item.createdAt}</span>
                    </div>
                    <p className="text-zinc-300 font-medium mt-1 leading-relaxed">
                      {item.question}
                    </p>
                  </div>
                </div>
              </div>

              {/* Answer Box */}
              {item.answer ? (
                <div className="ml-8 p-3 rounded-xl bg-teal-950/30 border border-teal-900/40 space-y-1">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-bold text-teal-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                      {sellerName} (Seller)
                    </span>
                    <span className="text-[10px] text-zinc-500">• {item.answer.answeredAt}</span>
                  </div>
                  <p className="text-zinc-300 text-xs leading-relaxed font-light">
                    {item.answer.text}
                  </p>
                </div>
              ) : (
                <div className="ml-8 text-[11px] text-zinc-500 italic flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Awaiting seller reply</span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
