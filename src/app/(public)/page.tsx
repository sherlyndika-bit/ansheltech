import React from 'react';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/public/ArticleCard';
import { ReviewCard } from '@/components/public/ReviewCard';
import { Flame, Sparkles, TrendingUp, ChevronRight, Gamepad2, ArrowUpRight } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const articles = await getPublishedArticles();

  // Featured article (first one)
  const featuredArticle = articles[0];
  // Next recent articles
  const recentArticles = articles.slice(1);
  // Reviews section articles
  const reviewArticles = articles.filter((a) => a.category === 'review');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero / Banner Section */}
      <section className="relative overflow-hidden pt-8 pb-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#080c14] to-[#080c14] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold">
                Sorotan Utama Hari Ini
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Update Terbaru 2026
            </span>
          </div>

          {/* Featured Article Card */}
          {featuredArticle && (
            <ArticleCard article={featuredArticle} featured={true} />
          )}
        </div>
      </section>

      {/* Quick Category Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-[#0b1220]/80 border border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-300">Jelajahi Berdasarkan Kategori:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <Link
              href="/kategori/news"
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors"
            >
              📰 Berita Game
            </Link>
            <Link
              href="/review"
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors"
            >
              ⭐ Review & Skor
            </Link>
            <Link
              href="/kategori/guide"
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 transition-colors"
            >
              🧭 Walkthrough & Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News / Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Artikel Terbaru
              </h2>
              <p className="text-xs text-slate-400">
                Informasi aktual industri game, pengumuman rilis, dan tren terkini
              </p>
            </div>
          </div>
        </div>

        {recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            Belum ada artikel tambahan.
          </div>
        )}
      </section>

      {/* Review Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0f172a] to-[#080c14] border border-amber-500/20 shadow-2xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 shadow-sm">
                <Flame className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Ulasan & Rating Game Pilihan
                  </h2>
                  <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Skor 0 - 10
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Ulasan mendalam dari tim redaksi dengan sistem penilaian objektif
                </p>
              </div>
            </div>

            <Link
              href="/review"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              Lihat Semua Review <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {reviewArticles.map((article) => (
              <ReviewCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              Ansheltech Author & Editor Portal
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Punya Berita atau Ulasan Game untuk Dibagikan?
            </h3>
            <p className="text-sm text-slate-400 max-w-xl">
              Masuk ke Dashboard Admin untuk membuat draf artikel baru, mengunggah cover image ke Supabase Storage, dan mempublikasikannya ke komunitas.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-neon-cyan transition-all flex items-center gap-2"
          >
            Buka Dashboard <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
