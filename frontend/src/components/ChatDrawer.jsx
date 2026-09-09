"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Phone, MessageCircle, MapPin, Handshake } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const HANDOVER_QUICK_TOPICS = [
  "📍 Where can we meet for handover?",
  "📦 Can you send via courier or meet in person?",
  "🕒 Is it available for inspection today?",
  "💵 What is your final price for pickup?"
];

export const ChatDrawer = ({ product, isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, product._id]);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/messages', {
        params: { productId: product._id }
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessageWithText = async (textToSend) => {
    if (!textToSend.trim()) return;

    const newMsgObj = {
      productId: product._id,
      productTitle: product.title,
      senderId: user?.id || 'user_demo_2',
      senderName: user?.name || 'Sabbir Hossain',
      receiverId: product.sellerId,
      text: textToSend.trim()
    };

    setInputText('');

    try {
      const res = await api.post('/messages', newMsgObj);
      setMessages(prev => [...prev, res.data]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          _id: 'msg_' + Date.now(),
          productId: product._id,
          senderId: user?.id || 'user_demo_2',
          senderName: user?.name || 'Sabbir Hossain',
          receiverId: product.sellerId,
          text: textToSend.trim(),
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessageWithText(inputText);
  };

  if (!isOpen) return null;

  const phone = product.sellerPhone || '+880 1712-345678';
  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950/95 border-l border-zinc-800 shadow-2xl backdrop-blur-xl flex flex-col font-['Bai_Jamjuree']">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {product.sellerAvatar ? (
              <img src={product.sellerAvatar} alt={product.sellerName} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-sm">
                {product.sellerName.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                {product.sellerName}
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </h4>
              <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-500" />
                {product.location}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Contact & Handover Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {phone}</span>
          </a>
          <a
            href={`https://wa.me/${cleanPhone.replace('+', '')}`}
            target="_blank"
            rel="noreferrer"
            className="py-1.5 px-3 rounded-xl bg-green-600/15 hover:bg-green-600/25 border border-green-500/30 text-green-400 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Handover Notice */}
      <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-900/40 flex items-center gap-2 text-[11px] text-indigo-300">
        <Handshake className="w-4 h-4 shrink-0 text-indigo-400" />
        <p className="truncate">Discuss meetup spot, courier option, and inspect before paying.</p>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <div className="py-10 text-center text-zinc-500 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-indigo-400">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-300">Start Handover Discussion with {product.sellerName}</p>
              <p className="text-[11px] text-zinc-500 mt-1 max-w-[280px] mx-auto">
                Discuss meetup in {product.location}, inspect item condition, or coordinate courier delivery.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === (user?.id || 'user_demo_2');
            return (
              <div
                key={msg._id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Handover Chips */}
      <div className="px-3 py-2 border-t border-zinc-800/80 bg-zinc-900/40">
        <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mb-1.5 px-1">Suggested Handover Questions:</p>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {HANDOVER_QUICK_TOPICS.map((topic, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendMessageWithText(topic)}
              className="px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-[11px] text-zinc-300 border border-zinc-800 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-900/90 flex gap-2 items-center">
        <input
          type="text"
          placeholder={`Message ${product.sellerName} about handover...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-3 bg-zinc-950 text-xs text-white placeholder-zinc-500 rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500 font-medium"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl shadow-md transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
