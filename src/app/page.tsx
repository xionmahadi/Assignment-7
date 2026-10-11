'use client';

import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { getAllProducts, Product } from '@/lib/api';
import { TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Section A: Top 6 Risers
  const risers = [...products]
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers
  const fallers = [...products]
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* Banner / Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Section A — আজ দাম বেড়েছে ▲ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 font-bold shadow-2xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম বেড়েছে <span className="text-rose-600">▲</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                সর্বাধিক মূল্য বৃদ্ধি পাওয়া নিত্যপ্রয়োজনীয় পণ্যসমূহ
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {risers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section B — আজ দাম কমেছে ▼ */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-2xs">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম কমেছে <span className="text-emerald-600">▼</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                মূল্য হ্রাস পাওয়া স্বস্তিদায়ক পণ্যসমূহ
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section C — সব পণ্য */}
        <section id="সব-পণ্য" className="space-y-6 pt-4 scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-2xs">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                সব পণ্য
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের তালিকা ও লাইভ দর
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={`all-${product.id}`} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
