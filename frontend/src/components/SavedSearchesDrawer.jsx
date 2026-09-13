"use client";

import React, { useState, useEffect } from 'react';
import { Bookmark, X, Trash2, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export const SavedSearchesDrawer = ({
  isOpen,
  onClose,
  onApplySearch,
  currentFilters,
  onSaveCurrent
}) => {
  const { addToast } = useToast();
  const [savedList, setSavedList] = useState([]);
  const [saveTitle, setSaveTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSavedSearches();
    }
  }, [isOpen]);

  const loadSavedSearches = () => {
    try {
      const raw = localStorage.getItem('khoj_saved_searches');
      if (raw) {
        setSavedList(JSON.parse(raw));
      } else {
        setSavedList([]);
      }
    } catch (e) {
      console.error(e);
      setSavedList([]);
    }
  };

  const handleDelete = (id) => {
    const updated = savedList.filter((item) => item.id !== id);
    setSavedList(updated);
    localStorage.setItem('khoj_saved_searches', JSON.stringify(updated));
    addToast('Saved search removed', 'info');
  };

  const handleSaveCurrentFilters = (e) => {
    e.preventDefault();
    const title = saveTitle.trim() || `${currentFilters.category || 'All'} in ${currentFilters.location || 'Bangladesh'}`;
    const newEntry = {
      id: 'srch_' + Date.now(),
      title,
      filters: { ...currentFilters },
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newEntry, ...savedList.filter(s => s.title !== title)].slice(0, 15);
    setSavedList(updated);
    localStorage.setItem('khoj_saved_searches', JSON.stringify(updated));
    setSaveTitle('');
    setIsSaving(false);
    addToast('Search filter saved successfully!', 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl animate-slideLeft font-['Bai_Jamjuree']">
        <div className="space-y-6 flex-1 overflow-y-auto pr-1">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Saved Searches</h3>
                <p className="text-[11px] text-zinc-400">Quick-apply your preferred marketplace filters</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Save Current View */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Save Current Query
              </span>
              <button
                type="button"
                onClick={() => setIsSaving(!isSaving)}
                className="text-[11px] font-bold text-[#0c9096] hover:underline cursor-pointer"
              >
                {isSaving ? 'Cancel' : '+ New Bookmark'}
              </button>
            </div>

            {isSaving ? (
              <form onSubmit={handleSaveCurrentFilters} className="space-y-2 pt-1">
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="e.g. Budget iPhone under 40k in Dhaka"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Bookmark Current Filters
                </button>
              </form>
            ) : (
              <div className="text-[11px] text-zinc-400 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
                  Cat: {currentFilters.category || 'All'}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
                  Loc: {currentFilters.location || 'All Bangladesh'}
                </span>
                {currentFilters.search && (
                  <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-amber-300">
                    "{currentFilters.search}"
                  </span>
                )}
                {currentFilters.maxPrice && (
                  <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-emerald-300">
                    &le; ৳{Number(currentFilters.maxPrice).toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* List of Saved Searches */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold">
              Your Bookmarks ({savedList.length})
            </span>

            {savedList.length === 0 ? (
              <div className="py-12 text-center space-y-2 glass-panel rounded-2xl border border-zinc-800/80">
                <Bookmark className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs font-bold text-zinc-300">No saved searches yet</p>
                <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                  Set your favorite category, price range, and location, then tap Save Current Query above!
                </p>
              </div>
            ) : (
              savedList.map((item) => (
                <div
                  key={item.id}
                  className="group p-4 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-all space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h4>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                      title="Delete bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[10px] text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {item.filters.category || 'All Categories'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {item.filters.location || 'All Bangladesh'}
                    </span>
                    {item.filters.maxPrice && (
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400">
                        Up to ৳{Number(item.filters.maxPrice).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-zinc-800/60">
                    <span className="text-[10px] text-zinc-500">Saved {item.savedAt}</span>
                    <button
                      onClick={() => {
                        onApplySearch(item.filters);
                        onClose();
                        addToast(`Applied "${item.title}"`, 'success');
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0c9096] hover:text-[#38d4dc] cursor-pointer"
                    >
                      <span>Apply Search</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 text-center">
          <p className="text-[11px] text-zinc-500">
            Bookmarks are saved in your local browser for lightning-fast queries.
          </p>
        </div>
      </div>
    </div>
  );
};
