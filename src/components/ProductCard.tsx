'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/api';
import { formatUnitBn, toBengaliNumber } from '@/lib/bengali';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Category Icon Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-xs">
          {product.categoryIcon || product.image || '🍚'}
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          {product.categoryNameBn || 'পণ্য'}
        </span>
      </div>

      {/* Product Title & Unit */}
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
          {product.nameBn}
        </h3>
        <p className="text-xs text-gray-500 font-medium">
          {formatUnitBn(product.unit)}
        </p>
      </div>

      {/* Price & Change Badge */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 font-medium block">আজকের দাম</span>
          <span className="text-xl font-extrabold text-gray-900">
            {toBengaliNumber(product.today)} <span className="text-sm font-semibold text-gray-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div>
          {isUp && (
            <div className="flex items-center gap-1 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>▲ {toBengaliNumber(product.change.pct)}%</span>
            </div>
          )}
          {isDown && (
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-200">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>▼ {toBengaliNumber(product.change.pct)}%</span>
            </div>
          )}
          {!isUp && !isDown && (
            <div className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold border border-gray-200">
              <Minus className="w-3.5 h-3.5" />
              <span>- ০.০%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
