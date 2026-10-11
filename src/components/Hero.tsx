'use client';

import React from 'react';
import Image from 'next/image';
import { getBanglaDate } from '@/lib/bengali';
import { ArrowDown, ShoppingBag } from 'lucide-react';

export const Hero: React.FC = () => {
  const banglaDate = getBanglaDate();

  const handleScrollToProducts = () => {
    const el = document.getElementById('সব-পণ্য');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-emerald-50/50 border-b border-emerald-100/60 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Content */}
          <div className="md:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>{banglaDate || 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              আজকের বাজারের দাম <span className="text-emerald-600">এক নজরে</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={handleScrollToProducts}
                className="btn btn-emerald bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-md px-6 py-3 rounded-xl font-semibold flex items-center gap-2 text-base transition-all hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                সব পণ্য দেখুন
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md aspect-4/3 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-emerald-200/40 rounded-3xl blur-2xl transform scale-90 -z-10"></div>
              <img
                src="/bazar-hero.png"
                alt="বাজারের পণ্য ও দাম"
                className="w-full h-auto max-h-80 object-contain drop-shadow-xl hover:scale-103 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
