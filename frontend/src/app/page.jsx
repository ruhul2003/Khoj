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
      <section id="hero" className="scroll-mt-24">
        <HeroBanner />
      </section>

      {/* 2. Four Trust / Service Badges */}
      <section id="trust" className="scroll-mt-24">
        <TrustBadges />
      </section>

      {/* 3. Three Colored Promo Cards */}
      <section id="promo" className="scroll-mt-24">
        <PromoGrid />
      </section>

      {/* 4. Shop By Categories (7 Pastel Tiles) */}
      <section id="categories" className="scroll-mt-24">
        <CategoryShowcase />
      </section>

      {/* 5. Popular Products (with Flash Countdown Timers) */}
      <section id="popular" className="scroll-mt-24">
        <PopularProducts products={products} />
      </section>

      {/* 6. Two Split Banners */}
      <section id="split-banners" className="scroll-mt-24">
        <SplitBanners />
      </section>

      {/* 7. Trending Products (with Category Filter Pills) */}
      <section id="trending" className="scroll-mt-24">
        <TrendingProducts allProducts={products} />
      </section>

      {/* 8. Full-Width Tech Promo Banner */}
      <section id="tech" className="scroll-mt-24">
        <TechBanner />
      </section>

      {/* 9. From The Gallery (Articles / Blog) */}
      <section id="gallery" className="scroll-mt-24">
        <GallerySection />
      </section>

      {/* 10. Floating Back-to-Top Button */}
      <BackToTop />
    </div>
  );
}
