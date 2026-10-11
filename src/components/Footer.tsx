'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 mt-16 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Left Side */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900">বাজার দর</span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="text-gray-600 font-medium">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </div>

        {/* Right Side */}
        <div className="text-xs text-gray-500 max-w-md">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
};
