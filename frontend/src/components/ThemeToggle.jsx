"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme, mounted } = useTheme();

  // Avoid hydration layout mismatch before mount
  if (!mounted) {
    return (
      <div className={`p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-zinc-400 w-10 h-10 ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
        isDark
          ? 'bg-zinc-900/80 border-zinc-800 text-amber-400 hover:text-amber-300 hover:bg-zinc-800/80 hover:border-zinc-700 shadow-sm'
          : 'bg-[#e6f2f4] border-[#b0ccd4] text-[#0a6c71] hover:bg-[#d4e4e9] hover:text-[#032e2e] shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 transition-transform duration-300 transform rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-5 h-5 transition-transform duration-300 transform -rotate-12 hover:rotate-0" />
        )}
      </div>
    </button>
  );
};
