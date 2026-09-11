"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilter } from '@/components/ProductFilter';
import { api } from '@/lib/api';
import { Search, SlidersHorizontal, PackageX } from 'lucide-react';

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialCondition = searchParams.get('condition') || 'All';
  const initialSort = searchParams.get('sort') || 'newest';
  const initialMinPrice = searchParams.get('minPrice') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';
  const initialFeatured = searchParams.get('featured') || '';
  const initialDeal = searchParams.get('deal') || '';

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [condition, setCondition] = useState(initialCondition);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sort, setSort] = useState(initialSort);
  const [featured, setFeatured] = useState(initialFeatured);
  const [deal, setDeal] = useState(initialDeal);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state whenever the URL search params change (e.g. user clicked navbar link or back/forward)
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
    setCondition(searchParams.get('condition') || 'All');
    setSort(searchParams.get('sort') || 'newest');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setFeatured(searchParams.get('featured') || '');
    setDeal(searchParams.get('deal') || '');
  }, [searchParams]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [category, condition, sort, minPrice, maxPrice, featured, deal]);

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
          sort,
          featured: featured === 'true' ? 'true' : undefined,
          deal: deal || undefined
        }
      });
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
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
    setFeatured('');
    setDeal('');
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 space-y-10 font-['Bai_Jamjuree']">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder="Search by keywords, brand, or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-950 text-white placeholder-zinc-500 rounded-2xl text-sm border border-zinc-800 focus:outline-none focus:border-[#0c9096] font-medium"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-4.5" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all"
          >
            Search Catalog
          </button>
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-2xl flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#0c9096]" />
            <span>Toggle Filters</span>
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className={`lg:col-span-3 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
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

        <div className="lg:col-span-9 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400 pb-3 border-b border-zinc-800">
            <div className="flex flex-wrap items-center gap-2">
              <span>Found <strong className="text-white font-bold">{products.length}</strong> matching products</span>
              {(category !== 'All' || condition !== 'All' || search || minPrice || maxPrice || featured || deal) && (
                <div className="flex flex-wrap items-center gap-1.5 ml-2">
                  {deal === 'flash' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold">
                      ⚡ Flash Deals
                      <button onClick={() => setDeal('')} className="hover:text-white cursor-pointer ml-0.5">✕</button>
                    </span>
                  )}
                  {featured === 'true' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      ⭐ Featured
                      <button onClick={() => setFeatured('')} className="hover:text-white cursor-pointer ml-0.5">✕</button>
                    </span>
                  )}
                  {category !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0c9096]/20 border border-[#0c9096]/40 text-[#38d4dc] text-[10px] font-bold">
                      {category}
                      <button onClick={() => setCategory('All')} className="hover:text-white cursor-pointer ml-0.5">✕</button>
                    </span>
                  )}
                  {condition !== 'All' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-bold">
                      {condition}
                      <button onClick={() => setCondition('All')} className="hover:text-white cursor-pointer ml-0.5">✕</button>
                    </span>
                  )}
                  {(minPrice || maxPrice) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold">
                      ৳{minPrice || 0} - ৳{maxPrice || '∞'}
                      <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="hover:text-white cursor-pointer ml-0.5">✕</button>
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-medium">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#0c9096] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="views">Most Popular</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-88 rounded-3xl bg-zinc-900/60 animate-pulse border border-zinc-800" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="glass-panel p-20 text-center rounded-3xl border border-zinc-800 space-y-4">
              <PackageX className="w-14 h-14 text-zinc-600 mx-auto" />
              <h3 className="text-xl font-bold text-white">No Products Found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                No items match your selected parameters. Try resetting your price or condition filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-3 bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading Catalog...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
