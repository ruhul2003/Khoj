"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsgObj = {
      productId: product._id,
      productTitle: product.title,
      senderId: user?.id || 'user_demo_2',
      senderName: user?.name || 'Sabbir Hossain',
      receiverId: product.sellerId,
      text: inputText.trim()
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
          text: inputText.trim(),
          createdAt: new Date().toISOString()
        }
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950/95 border-l border-zinc-800 shadow-2xl backdrop-blur-xl flex flex-col font-['Bai_Jamjuree']">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
        <div className="flex items-center gap-3">
          {product.sellerAvatar ? (
            <img src={product.sellerAvatar} alt={product.sellerName} className="w-9 h-9 rounded-full object-cover border border-indigo-500" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
              {product.sellerName.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1">
              {product.sellerName}
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h4>
            <p className="text-[10px] text-zinc-400 truncate max-w-[200px]">Re: {product.title}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 space-y-2">
            <p className="text-xs">No messages yet with {product.sellerName}.</p>
            <p className="text-[11px] text-zinc-400">Ask about item condition, meetup spot, or availability!</p>
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

      <form onSubmit={handleSendMessage} className="p-3 border-t border-zinc-800 bg-zinc-900/90 flex gap-2 items-center">
        <input
          type="text"
          placeholder={`Message ${product.sellerName}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-3 bg-zinc-950 text-xs text-white placeholder-zinc-500 rounded-2xl border border-zinc-800 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl shadow-md transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
