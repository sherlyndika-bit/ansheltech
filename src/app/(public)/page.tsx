import React from 'react';
import Link from 'next/link';
import { getPublishedArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/public/ArticleCard';
import { ReviewCard } from '@/components/public/ReviewCard';
import { NewsletterForm } from '@/components/public/NewsletterForm';
import { Flame, TrendingUp, ChevronRight, Mail, Bell } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const articles = await getPublishedArticles();

  // Featured article (first one)
  const featuredArticle = articles[0];
  // Next recent articles
  const recentArticles = articles.slice(1);
  // Reviews section articles
  const reviewArticles = articles.filter((a) => a.category === 'review');

  const trendingTopics = [
    { label: 'GTA VI', href: '/genre/Open%20World' },
    { label: 'PS5 Pro', href: '/platform/PlayStation%205' },
    { label: 'Black Myth: Wukong', href: '/genre/Soulslike' },
    { label: 'Elden Ring DLC', href: '/genre/RPG' },
    { label: 'Valorant', href: '/genre/FPS' },
    { label: 'Nintendo Switch', href: '/platform/Nintendo%20Switch' },
    { label: 'PC Master Race', href: '/platform/PC' },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Trending Topics Ticker Bar */}
      <section className="border-b border-slate-800/80 bg-[#090e18]/90 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-x-auto text-xs no-scrollbar">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold whitespace-nowrap uppercase tracking-wider font-mono">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            Topik Hangat:
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            {trendingTopics.map((topic) => (
              <Link
                key={topic.label}
                href={topic.href}
                className="px-2.5 py-1 rounded-full bg-slate-900/90 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800/80 transition-colors"
              >
                #{topic.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero / Featured Article Section */}
      <section className="relative overflow-hidden pt-2 pb-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#080c14] to-[#080c14] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold">
                Laporan Utama Redaksi
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Update Terkini
            </span>
          </div>

          {/* Featured Article Card */}
          {featuredArticle && (
            <ArticleCard article={featuredArticle} featured={true} />
          )}
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
                Berita & Analisis Terbaru
              </h2>
              <p className="text-xs text-slate-400">
                Informasi aktual industri video game, pengumuman perilisan, dan teknologi komputasi
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
                  Ulasan mendalam dari tim redaksi dengan sistem penilaian objektif dan transparan
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

      {/* Professional Reader Newsletter Banner (Replaced Internal Author Callout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d1527] to-slate-900 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" /> Buletin Mingguan Ansheltech
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Jangan Lewatkan Berita & Diskon Game Terbaik
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dapatkan rangkuman ulasan game terbaru, rumor industri terpercaya, dan tips walkthrough langsung ke kotak masuk email Anda setiap akhir pekan.
            </p>

            <NewsletterForm />
            <p className="text-[11px] text-slate-500">
              Bebas spam. Anda dapat berhenti berlangganan kapan saja dengan 1 klik.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none hidden lg:block">
            <Bell className="w-80 h-80 text-cyan-400" />
          </div>
        </div>
      </section>
    </div>
  );
}
