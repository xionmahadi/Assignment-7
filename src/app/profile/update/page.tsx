'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, ArrowLeft, Save, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { user, loading, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error('তথ্য আপডেট করতে প্রথমে সাইন ইন করুন');
      router.push('/signin');
    } else if (user) {
      setName(user.name);
    }
  }, [user, loading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // BetterAuth user update pattern
    const success = updateProfile(name);
    setSubmitting(false);
    if (success) {
      router.push('/profile');
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          মাই প্রোফাইলে ফিরে যান
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="space-y-2 border-b border-gray-100 pb-4">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BetterAuth Profile Update</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            প্রোফাইল তথ্য আপডেট করুন
          </h1>
          <p className="text-xs text-gray-500">
            আপনার অ্যাকাউন্ট নেম বা প্রোফাইল ডিসপ্লে নাম পরিবর্তন করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 text-xs">
                ইমেইল (পরিবর্তন অযোগ্য)
              </span>
            </label>
            <input
              type="text"
              disabled
              value={user.email}
              className="input input-bordered w-full rounded-xl bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 text-xs">
                আপনার নতুন নাম (Name)
              </span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="আপনার নাম লিখুন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full pl-10 rounded-xl bg-gray-50 focus:bg-white text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <Link
              href="/profile"
              className="btn btn-ghost text-gray-600 rounded-xl text-sm font-semibold"
            >
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl font-bold px-6 shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {submitting ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
