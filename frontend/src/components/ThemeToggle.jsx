"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid hydration layout mismatch before mount
  if (!mounted) {
    return (
      <div className={`p-2 rounded-xl border border-slate-700/60 bg-slate-800/50 text-slate-400 w-9 h-9 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm active:scale-90 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-amber-400 hover:text-amber-300 hover:bg-slate-700'
          : 'bg-slate-800/50 border-slate-700/60 text-amber-400 hover:bg-slate-700 hover:text-amber-300'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 transform rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 transform -rotate-12 hover:rotate-0" />
        )}
      </div>
    </button>
  );
};
