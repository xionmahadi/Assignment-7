'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Edit3, ArrowLeft, ShieldCheck, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      toast.error('প্রোফাইল দেখতে প্রথমে সাইন ইন করুন');
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 pb-8 text-center sm:text-left">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-500 shadow-md"
          />
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>যাচাইকৃত ব্যবহারকারী</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {user.name}
            </h1>
            <p className="text-gray-500 text-sm font-medium flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              {user.email}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 justify-between pt-2">
          <Link
            href="/profile/update"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-bold px-6 py-2.5 shadow-md flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            তথ্য আপডেট করুন
          </Link>

          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="btn btn-outline border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 rounded-xl font-semibold px-6 py-2.5 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
