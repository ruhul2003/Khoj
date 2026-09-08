"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { Product, api } from '@/lib/api';
import { Search, Tag, SlidersHorizontal, PackageX } from 'lucide-react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialCondition = searchParams.get('condition') || 'All';

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [condition, setCondition] = useState(initialCondition);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, condition, sort]);

  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products', {
        params: {
          search,
          category: category !== 'All' ? category : undefined,
          condition: condition !== 'All' ? condition : undefined,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
          sort
        }
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchFilteredProducts();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setCondition('All');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    fetchFilteredProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Search Header */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search MacBook, Samsung, Honda, Office Chair, Shoes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 text-white placeholder-slate-400 rounded-xl text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all"
          >
            Search Marketplace
          </button>
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="md:hidden w-full px-4 py-2.5 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-xl flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <span>Toggle Filters</span>
          </button>
        </form>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filter */}
        <div className={`md:block ${isMobileFilterOpen ? 'block' : 'hidden'}`}>
          <ProductFilter
            category={category}
            setCategory={setCategory}
            condition={condition}
            setCondition={setCondition}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sort={sort}
            setSort={setSort}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Area */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span>Showing <strong className="text-white">{products.length}</strong> items found</span>
            {(category !== 'All' || condition !== 'All' || search) && (
              <span className="text-indigo-400 font-medium">Active filters applied</span>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel p-16 text-center rounded-3xl border border-slate-800 space-y-4">
              <PackageX className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Matching Products Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try loosening your filters, changing condition parameters, or clearing search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Marketplace Catalog...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
