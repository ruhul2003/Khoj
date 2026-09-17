"use client";

import React, { useEffect } from 'react';
import { Command, X, Search, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function KeyboardShortcutsModal({ isOpen, onClose }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger navigation shortcuts if user is typing in an input
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea';

      if (!isInput && e.altKey) {
        if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          onClose();
          router.push('/browse');
        } else if (e.key === 'h' || e.key === 'H') {
          e.preventDefault();
          onClose();
          router.push('/');
        } else if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          onClose();
          router.push('/dashboard');
        }
      }

      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      keys: ['Ctrl', 'K'],
      label: 'Focus Search Bar',
      desc: 'Instantly jump to search bar from any page'
    },
    {
      keys: ['Alt', 'B'],
      label: 'Browse Catalog',
      desc: 'Navigate to full products catalog'
    },
    {
      keys: ['Alt', 'H'],
      label: 'Home Page',
      desc: 'Return to homepage showcase'
    },
    {
      keys: ['Alt', 'D'],
      label: 'Seller Dashboard',
      desc: 'View listings, offers, and orders'
    },
    {
      keys: ['?'],
      label: 'Shortcuts Help',
      desc: 'Open or close this helper dialog'
    },
    {
      keys: ['Esc'],
      label: 'Dismiss Overlay',
      desc: 'Close any active modal or drawer'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md overflow-y-auto font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden bg-zinc-950 text-white animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center text-[#0c9096]">
              <Command className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Keyboard Shortcuts</h3>
              <p className="text-[11px] text-zinc-400">Power user quick navigation hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-5 space-y-3">
          {shortcuts.map((sc, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-white block">{sc.label}</span>
                <span className="text-[11px] text-zinc-400 font-light">{sc.desc}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {sc.keys.map((k, kIdx) => (
                  <kbd
                    key={kIdx}
                    className="px-2 py-1 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-300 font-mono text-[11px] font-bold shadow-xs"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800/80 bg-zinc-900/40 text-center">
          <span className="text-[11px] text-zinc-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 text-[10px]">Esc</kbd> anytime to return.
          </span>
        </div>

      </div>
    </div>
  );
}
