"use client";

import React, { useState, useEffect } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { PromoGrid } from '@/components/PromoGrid';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { PopularProducts } from '@/components/PopularProducts';
import { SplitBanners } from '@/components/SplitBanners';
import { TrendingProducts } from '@/components/TrendingProducts';
import { TechBanner } from '@/components/TechBanner';
import { GallerySection } from '@/components/GallerySection';
import { BackToTop } from '@/components/BackToTop';
import { api } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen font-['Bai_Jamjuree'] selection:bg-amber-500/30 selection:text-amber-900 pb-16">
      {/* 1. Hero Showcase Slider */}
      <HeroBanner />

      {/* 2. Four Trust / Service Badges */}
      <TrustBadges />

      {/* 3. Three Colored Promo Cards */}
      <PromoGrid />

      {/* 4. Shop By Categories (7 Pastel Tiles) */}
      <CategoryShowcase />

      {/* 5. Popular Products (with Flash Countdown Timers) */}
      <PopularProducts products={products} />

      {/* 6. Two Split Banners */}
      <SplitBanners />

      {/* 7. Trending Products (with Category Filter Pills) */}
      <TrendingProducts allProducts={products} />

      {/* 8. Full-Width Tech Promo Banner */}
      <TechBanner />

      {/* 9. From The Gallery (Articles / Blog) */}
      <GallerySection />

      {/* 10. Floating Back-to-Top Button */}
      <BackToTop />
    </div>
  );
}
