'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getCategories, getProductsByCategory, Category, Product } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { ChevronDown, ArrowLeft, Filter, AlertCircle } from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const slug = params.slug;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<'default' | 'lowToHigh' | 'highToLow'>('default');

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategories(), getProductsByCategory(slug)])
      .then(([cats, prods]) => {
        const cat = cats.find((c) => c.slug === slug || c.id === slug);
        if (cat) {
          setCategory(cat);
        } else if (prods.length > 0) {
          // Construct category metadata from products if cat match is implicit
          setCategory({
            id: slug,
            slug: slug,
            nameBn: prods[0].categoryNameBn || slug,
            icon: prods[0].categoryIcon || '🛒',
          });
        }
        setProducts(prods);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Handle C1 Sort logic (Numeric value sorting)
  const getSortedProducts = () => {
    const list = [...products];
    if (sortOption === 'lowToHigh') {
      return list.sort((a, b) => Number(a.today) - Number(b.today));
    }
    if (sortOption === 'highToLow') {
      return list.sort((a, b) => Number(b.today) - Number(a.today));
    }
    return list;
  };

  const sortedProducts = getSortedProducts();

  if (!loading && products.length === 0 && !category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          ক্যাটাগরিটি পাওয়া যায়নি!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি বিদ্যমান নেই অথবা বর্তমানে কোন পণ্য পাওয়া যায়নি।
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Category Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-4xl shadow-2xs">
            {category?.icon || '🛒'}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <Link href="/" className="hover:underline">হোম</Link>
              <span>/</span>
              <span>ক্যাটাগরি</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {category?.nameBn || 'পণ্যের ক্যাটাগরি'}
            </h1>
          </div>
        </div>

        {/* C1 Sort Dropdown Control */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 whitespace-nowrap">
            <Filter className="w-4 h-4 text-emerald-600" />
            <span>সাজান:</span>
          </div>
          <div className="dropdown dropdown-bottom dropdown-end w-full md:w-auto">
            <label
              tabIndex={0}
              className="btn btn-outline btn-sm sm:btn-md border-gray-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-500 rounded-xl flex items-center justify-between gap-3 w-full md:w-48 normal-case font-semibold text-gray-700 bg-white"
            >
              <span>
                {sortOption === 'default' && 'ডিফল্ট'}
                {sortOption === 'lowToHigh' && 'দাম: কম থেকে বেশি'}
                {sortOption === 'highToLow' && 'দাম: বেশি থেকে কম'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow-xl bg-white rounded-xl w-52 border border-gray-100 mt-1 z-50 text-sm font-medium"
            >
              <li>
                <button
                  onClick={() => setSortOption('default')}
                  className={sortOption === 'default' ? 'active bg-emerald-50 text-emerald-700 font-bold' : ''}
                >
                  ডিফল্ট
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSortOption('lowToHigh')}
                  className={sortOption === 'lowToHigh' ? 'active bg-emerald-50 text-emerald-700 font-bold' : ''}
                >
                  দাম: কম থেকে বেশি
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSortOption('highToLow')}
                  className={sortOption === 'highToLow' ? 'active bg-emerald-50 text-emerald-700 font-bold' : ''}
                >
                  দাম: বেশি থেকে কম
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={`cat-prod-${product.id}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4">
          <p className="text-gray-500 font-medium">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none px-6 py-2 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}
