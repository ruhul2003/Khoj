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

  const [products, setProducts] = useState([]);
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
    fetchFilteredProducts();
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
              className="w-full pl-12 pr-4 py-4 bg-zinc-950 text-white placeholder-zinc-500 rounded-2xl text-sm border border-zinc-800 focus:outline-none focus:border-indigo-500 font-medium"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-4.5" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all"
          >
            Search Catalog
          </button>
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden w-full px-5 py-3.5 bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 rounded-2xl flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
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
          <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-zinc-800">
            <span>Found <strong className="text-white font-bold">{products.length}</strong> matching products</span>
            {(category !== 'All' || condition !== 'All' || search) && (
              <span className="text-indigo-400 font-semibold uppercase tracking-wider">Filtered View</span>
            )}
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
                className="px-6 py-3 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl"
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
