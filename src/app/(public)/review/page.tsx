import React from 'react';
import { getPublishedArticles } from '@/lib/articles';
import { ReviewCard } from '@/components/public/ReviewCard';
import { Flame, Award, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review Game Terkini — Ansheltech',
  description: 'Kumpulan ulasan game PC, PlayStation, Xbox, dan Switch lengkap dengan skor rating transparan dari redaksi.',
};

export default async function ReviewsPage() {
  const articles = await getPublishedArticles();
  const reviews = articles.filter((a) => a.category === 'review');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-400" /> Database Ulasan Game
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Review & Skor Game
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Kritik obyektif, pengujian performa gameplay mendalam, dan skor rating terpercaya untuk membantu Anda memutuskan game mana yang layak dimainkan.
          </p>
        </div>

        {/* Floating rating badge graphic */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4 opacity-70">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <span className="text-2xl font-black text-emerald-400">8 - 10</span>
            <span className="block text-[10px] text-emerald-300">Wajib Main</span>
          </div>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
            <span className="text-2xl font-black text-amber-400">5 - 7.9</span>
            <span className="block text-[10px] text-amber-300">Cukup Baik</span>
          </div>
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center">
            <span className="text-2xl font-black text-rose-400">&lt; 5.0</span>
            <span className="block text-[10px] text-rose-300">Hindari</span>
          </div>
        </div>
      </div>

      {/* Grid of Reviews */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} article={rev} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0c1220] rounded-2xl border border-slate-800">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">Belum ada review yang dipublikasikan.</p>
        </div>
      )}
    </div>
  );
}
