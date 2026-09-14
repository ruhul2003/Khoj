"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  ChevronDown, 
  ExternalLink, 
  Star, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { api } from '@/lib/api';

const DEFAULT_PROMPTS = [
  "🔍 Find laptops under $2000",
  "📱 Show top smartphones",
  "🛡️ How do Safe Handover Hubs work?",
  "💰 How to sell an item quickly?",
  "🤝 Can I negotiate prices?"
];

export const AiChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 **Hi! I'm Khoj AI**, your personal marketplace assistant.\n\nAsk me anything: find deals on gadgets, check how safe handovers work, or learn how to price and sell your items!",
      suggestedPrompts: DEFAULT_PROMPTS,
      recommendedProducts: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.text }));

      const res = await api.post('/ai/chat', {
        message: text,
        history
      });

      const aiReply = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: res.data.reply || "I'm here to help! Let me know if you need specific product recommendations.",
        suggestedPrompts: res.data.suggestedPrompts || [],
        recommendedProducts: res.data.recommendedProducts || [],
        action: res.data.action || null
      };

      setMessages((prev) => [...prev, aiReply]);
      if (!isOpen) setHasUnread(true);
    } catch (err) {
      console.error('Khoj AI chat request failed:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          text: "⚠️ I encountered a brief issue connecting to the catalog server. Please try asking again in a moment, or explore our [Browse Categories](/browse) page.",
          suggestedPrompts: ["Show Electronics", "Safe Handover Hubs", "How to post an ad?"],
          recommendedProducts: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: "👋 **Chat cleared!** How can I assist you with Khoj today?",
        suggestedPrompts: DEFAULT_PROMPTS,
        recommendedProducts: []
      }
    ]);
  };

  // Simple parser to format bold, line breaks, and list points cleanly
  const renderFormattedText = (rawText) => {
    if (!rawText) return null;

    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Bold replacer (**bold text**)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-slate-900 dark:text-amber-400">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={pIdx} className="italic text-slate-700 dark:text-slate-300">{part.slice(1, -1)}</em>;
        }
        return part;
      });

      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-0.5 pl-1">
            <span className="text-amber-500 font-bold">•</span>
            <span>{formattedParts}</span>
          </div>
        );
      }

      if (/^\d+\./.test(line.trim())) {
        return (
          <div key={idx} className="my-0.5 pl-1 text-slate-800 dark:text-slate-200">
            {formattedParts}
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="my-0.5 leading-relaxed">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-['Bai_Jamjuree'] select-none">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-2xl hover:shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-amber-300/40"
          aria-label="Open Khoj AI Assistant"
        >
          <div className="relative">
            <Bot className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <span className="text-xs uppercase tracking-wider font-extrabold flex items-center gap-1">
            Khoj AI
            <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
          </span>

          {hasUnread && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
              1
            </span>
          )}
        </button>
      )}

      {/* Chatbox Window Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-black tracking-tight text-white">Khoj AI</h3>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-extrabold border border-amber-500/30">
                    Smart Guide
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Online • Marketplace Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="w-7 h-7 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Restart Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-slate-50/50 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Bubble Container */}
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-left ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-xs'
                  }`}
                >
                  {renderFormattedText(msg.text)}

                  {/* Embedded Action Button */}
                  {msg.action && (
                    <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <Link
                        href={msg.action.url}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] uppercase tracking-wider transition-all shadow-xs"
                      >
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Recommended Product Cards Carousel/List */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="w-full mt-2.5 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Recommended Listings
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.recommendedProducts.map((prod) => (
                        <Link
                          key={prod._id}
                          href={`/products/${prod._id}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 shadow-xs hover:shadow-md transition-all group"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700">
                            <img
                              src={prod.images?.[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=300&q=80'}
                              alt={prod.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-[11px] text-slate-900 dark:text-white truncate group-hover:text-amber-500 transition-colors">
                              {prod.title}
                            </h5>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-black text-xs text-amber-600 dark:text-amber-400">
                                ${prod.price}
                              </span>
                              {prod.originalPrice > prod.price && (
                                <span className="text-[10px] text-slate-400 line-through">
                                  ${prod.originalPrice}
                                </span>
                              )}
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold truncate">
                                {prod.condition}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                              <span className="flex items-center gap-0.5 truncate">
                                <MapPin className="w-2.5 h-2.5" /> {prod.location || 'Dhaka'}
                              </span>
                              {prod.sellerRating && (
                                <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                  <Star className="w-2.5 h-2.5 fill-amber-500" /> {prod.sellerRating}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-slate-400 group-hover:text-amber-500 transition-colors pr-1">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prompt Suggestions */}
                {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.suggestedPrompts.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-slate-800 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 text-[10px] font-semibold transition-all cursor-pointer text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Thinking / Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit">
                <Bot className="w-4 h-4 text-amber-500 animate-bounce" />
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse delay-200"></span>
                </div>
                <span className="text-[11px] text-slate-400 italic">Searching Khoj catalog...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Khoj AI (e.g. find iPhone, safe hubs)..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-transparent transition-all"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[9px] text-center text-slate-400 dark:text-slate-400 mt-2 font-medium">
              Khoj AI searches verified listings & provides smart peer-to-peer advice.
            </p>
          </div>

        </div>
      )}
    </div>
  );
};
