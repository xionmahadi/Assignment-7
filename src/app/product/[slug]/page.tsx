'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductBySlugOrId, Product } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { formatUnitBn, toBengaliNumber } from '@/lib/bengali';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  Info,
  ShieldAlert,
  Loader2,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const slug = params.slug;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Protected route check
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('পণ্যটির বিস্তারিত দেখতে প্রথমে সাইন ইন করুন');
      router.push('/signin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getProductBySlugOrId(slug)
        .then((data) => {
          setProduct(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug, user]);

  if (authLoading || (loading && !product)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
        <p className="text-gray-500 font-medium">পণ্যর তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          পণ্যটি পাওয়া যায়নি!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          আপনি যে পণ্যটি খুঁজছেন সেটি বর্তমানে উপলব্ধ নেই।
        </p>
        <div>
          <Link
            href="/"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-6 py-2.5 rounded-xl font-semibold inline-flex items-center gap-2 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  // Price statistics calculations
  const markets = product.markets || [];
  const allMins = markets.length > 0 ? markets.map((m) => m.min) : [product.today * 0.9];
  const allMaxs = markets.length > 0 ? markets.map((m) => m.max) : [product.today * 1.1];

  const minPrice = Math.round(Math.min(...allMins));
  const maxPrice = Math.round(Math.max(...allMaxs));
  const avgPrice = Math.round(
    markets.length > 0
      ? markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
      : product.today
  );

  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          সব পণ্যে ফিরে যান
        </Link>
      </div>

      {/* Top — Summary Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-4xl p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              {product.categoryIcon || product.image || '🍚'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge badge-emerald bg-emerald-100 text-emerald-800 font-semibold border-none">
                  {product.categoryNameBn || 'ক্যাটাগরি'}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {formatUnitBn(product.unit)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mt-1">
                {product.nameBn}
              </h1>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            আজকের বাজারদর অনুযায়ী {product.nameBn}-এর গড় মূল্য {toBengaliNumber(product.today)} টাকা। 
            গত সপ্তাহের তুলনায় মূল্যের পরিবর্তন {toBengaliNumber(product.change?.pct)}%।
          </p>
        </div>

        {/* Today's Highlight Box */}
        <div className="lg:col-span-4 bg-emerald-900 text-white rounded-2xl p-6 space-y-4 shadow-lg">
          <div className="text-xs uppercase tracking-wider text-emerald-300 font-bold">
            আজকের গড় মূল্য
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black">
              {toBengaliNumber(product.today)}
            </span>
            <span className="text-lg text-emerald-200 font-bold">টাকা/{product.unit === 'kg' ? 'কেজি' : product.unit}</span>
          </div>

          <div className="pt-3 border-t border-emerald-800 flex items-center justify-between text-xs">
            <span className="text-emerald-300">গতকাল: {toBengaliNumber(product.yesterday)} টাকা</span>
            <span className="text-emerald-300">গত সপ্তাহ: {toBengaliNumber(product.lastWeek)} টাকা</span>
          </div>
        </div>
      </div>

      {/* Price Summary Cards (Min, Max, Avg) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              সর্বনিম্ন মূল্য
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {toBengaliNumber(minPrice)} <span className="text-sm font-semibold text-gray-600">টাকা</span>
          </div>
          <p className="text-xs text-gray-400">বিভিন্ন বাজারে পাওয়া সর্বনিম্ন দর</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              সর্বোচ্চ মূল্য
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-700">
            {toBengaliNumber(maxPrice)} <span className="text-sm font-semibold text-gray-600">টাকা</span>
          </div>
          <p className="text-xs text-gray-400">বিভিন্ন বাজারে সর্বাধিক বিক্রিত দর</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              গড় বাজার দর
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Info className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-700">
            {toBengaliNumber(avgPrice)} <span className="text-sm font-semibold text-gray-600">টাকা</span>
          </div>
          <p className="text-xs text-gray-400">সারাদেশের গড় হিসাব অনুযায়ী</p>
        </div>
      </div>

      {/* Market-based Breakdown ("বাজারভিত্তিক আজকের দাম") */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-xs text-gray-500">
              বাংলাদেশের বিভাগীয় ও এলাকার প্রধান বাজারসমূহে পণ্যটির আজকের দরের তালিকা
            </p>
          </div>
        </div>

        {markets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-gray-700 border-b border-gray-200 text-xs uppercase">
                  <th className="py-3 px-4">বাজারের নাম</th>
                  <th className="py-3 px-4">বিভাগ</th>
                  <th className="py-3 px-4 text-center">সর্বনিম্ন (টাকা)</th>
                  <th className="py-3 px-4 text-center">সর্বোচ্চ (টাকা)</th>
                  <th className="py-3 px-4 text-center">গড় দাম (টাকা)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {markets.map((m, idx) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-gray-900 flex items-center gap-2">
                        <Store className="w-4 h-4 text-emerald-600 shrink-0" />
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {m.division}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-600">
                        {toBengaliNumber(m.min)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-rose-600">
                        {toBengaliNumber(m.max)}
                      </td>
                      <td className="py-3.5 px-4 text-center font-extrabold text-gray-900">
                        {toBengaliNumber(marketAvg)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            বাজারভিত্তিক আলাদা তথ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}
