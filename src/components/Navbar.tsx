'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getBanglaDate, toBengaliNumber } from '@/lib/bengali';
import { getAllProducts, Product } from '@/lib/api';
import { LogOut, User as UserIcon, Settings, ChevronDown, ShoppingCart } from 'lucide-react';

const CATEGORIES = [
  { slug: 'chal', nameBn: 'চাল', icon: '🍚' },
  { slug: 'dal', nameBn: 'ডাল', icon: '🫘' },
  { slug: 'tel', nameBn: 'তেল', icon: '🛢️' },
  { slug: 'sobji', nameBn: 'সবজি', icon: '🥬' },
  { slug: 'mach', nameBn: 'মাছ', icon: '🐟' },
  { slug: 'mangsho', nameBn: 'মাংস', icon: '🍗' },
  { slug: 'dim-dui', nameBn: 'ডিম-দুধ', icon: '🥛' },
  { slug: 'mosla', nameBn: 'মসলা', icon: '🌶️' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [tickerProducts, setTickerProducts] = useState<Product[]>([]);
  const [banglaDate, setBanglaDate] = useState<string>('');

  useEffect(() => {
    setBanglaDate(getBanglaDate());
    getAllProducts().then((data) => {
      if (data && data.length > 0) {
        setTickerProducts(data);
      }
    });
  }, []);

  // Duplicate list to make smooth continuous loop for marquee
  const tickerItems = [...tickerProducts, ...tickerProducts];

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand Logo & Date */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-xs text-gray-500 font-medium">
              {banglaDate || 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬'}
            </p>
          </div>
        </Link>

        {/* Right Side: Auth / Profile */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-sm sm:btn-md normal-case flex items-center gap-2 rounded-full border border-gray-200 hover:bg-gray-50 px-3 py-1.5"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300"
                />
                <span className="font-semibold text-gray-800 text-sm hidden sm:inline">
                  {user.name}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100 mt-2 text-sm z-50"
              >
                <li className="px-3 py-2 border-b border-gray-100">
                  <span className="font-bold text-gray-900 block truncate">{user.name}</span>
                  <span className="text-xs text-gray-500 block truncate">{user.email}</span>
                </li>
                <li>
                  <Link href="/profile" className="flex items-center gap-2 py-2">
                    <UserIcon className="w-4 h-4 text-emerald-600" />
                    আমার প্রোফাইল
                  </Link>
                </li>
                <li>
                  <Link href="/profile/update" className="flex items-center gap-2 py-2">
                    <Settings className="w-4 h-4 text-emerald-600" />
                    তথ্য আপডেট করুন
                  </Link>
                </li>
                <li className="border-t border-gray-100 mt-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 py-2 text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4" />
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm text-gray-700 font-medium hover:bg-gray-100"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Category Navigation Links Row */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none py-2 flex items-center justify-start sm:justify-center gap-1 sm:gap-4">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              pathname === '/'
                ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                : 'text-gray-600 hover:bg-gray-200/60'
            }`}
          >
            🏠 সকল পণ্য
          </Link>
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* PRICE TICKER (MARQUEE) - ROTATING FROM RIGHT TO LEFT (MARKED AREA) */}
      <div className="w-full bg-slate-50 border-t border-b border-gray-200/80 py-2.5 overflow-hidden relative">
        <div className="animate-marquee-rtl flex items-center gap-3 px-2">
          {tickerItems.length > 0 ? (
            tickerItems.map((prod, idx) => {
              const isUp = prod.change?.dir === 'up';
              const isDown = prod.change?.dir === 'down';
              return (
                <Link
                  key={`${prod.id}-${idx}`}
                  href={`/product/${prod.slug || prod.id}`}
                  className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all whitespace-nowrap cursor-pointer hover:border-emerald-500 shrink-0"
                >
                  <span className="text-base">{prod.categoryIcon || prod.image || '🛒'}</span>
                  <span className="font-semibold text-gray-800">{prod.nameBn}</span>
                  <span className="font-medium text-gray-600">
                    {toBengaliNumber(prod.today)} টাকা/{prod.unit === 'kg' ? 'কেজি' : prod.unit}
                  </span>
                  {isUp && (
                    <span className="font-bold text-rose-600 flex items-center text-xs">
                      ▲ {toBengaliNumber(prod.change.pct)}%
                    </span>
                  )}
                  {isDown && (
                    <span className="font-bold text-emerald-600 flex items-center text-xs">
                      ▼ {toBengaliNumber(prod.change.pct)}%
                    </span>
                  )}
                  {!isUp && !isDown && (
                    <span className="font-bold text-gray-400 text-xs">- ০.০%</span>
                  )}
                </Link>
              );
            })
          ) : (
            <div className="text-xs text-gray-400 italic px-4">
              দরের তথ্য লোড হচ্ছে...
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
