'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-200 shadow-xl text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
          <ShoppingCart className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-emerald-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            পৃষ্ঠাটি পাওয়া যায়নি!
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            আপনি যে পেজটি খুঁজতেছেন তা সরিয়ে ফেলা হয়েছে অথবা পেজটির লিংকটি ভুল হতে পারে।
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 shadow-md w-full justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
