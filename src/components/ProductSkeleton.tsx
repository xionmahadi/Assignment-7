'use client';

import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs animate-pulse flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
        <div className="w-16 h-6 rounded-full bg-gray-200"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-16 h-7 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};
