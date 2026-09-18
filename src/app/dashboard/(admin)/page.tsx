import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticlesAdmin } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import {
  FileText,
  CheckCircle2,
  Clock,
  Flame,
  PlusCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const revalidate = 0; // Fresh stats on dashboard

export default async function DashboardHomePage() {
  const articles = await getAllArticlesAdmin();

  // Calculate statistics
  const totalArticles = articles.length;
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const reviewCount = articles.filter((a) => a.category === 'review').length;

  // Average review rating
  const reviewsWithRating = articles.filter(
    (a) => a.category === 'review' && a.rating !== null
  );
  const avgRating =
    reviewsWithRating.length > 0
      ? (
          reviewsWithRating.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          reviewsWithRating.length
        ).toFixed(1)
      : '0.0';

  const recentArticles = articles.slice(0, 5);

  const stats = [
    {
      label: 'Total Artikel',
      value: totalArticles,
      desc: 'Semua konten terdaftar',
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200',
    },
    {
      label: 'Artikel Published',
      value: publishedCount,
      desc: 'Tampil di sisi publik',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200',
    },
    {
      label: 'Artikel Draf',
      value: draftCount,
      desc: 'Menunggu review editor',
      icon: Clock,
      color: 'text-slate-600',
      bg: 'bg-slate-100 border-slate-200',
    },
    {
      label: 'Total Review Game',
      value: reviewCount,
      desc: `Rata-rata skor ${avgRating}/10`,
      icon: Flame,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            Selamat Datang di Admin Panel
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ringkasan Publikasi Redaksi
          </h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Kelola seluruh artikel berita, review game, dan panduan walkthrough langsung dari sistem CMS terintegrasi Supabase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/articles/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" /> Tulis Artikel Baru
          </Link>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.label}
                </span>
                <div className={`p-2.5 rounded-xl border ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight font-mono">
                  {item.value}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Articles Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-50 text-cyan-700">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Artikel Terbaru
              </h3>
              <p className="text-xs text-slate-500">
                5 artikel terakhir yang dibuat atau dimodifikasi
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/articles"
            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3.5">Artikel</th>
                <th scope="col" className="px-4 py-3.5">Kategori</th>
                <th scope="col" className="px-4 py-3.5">Status</th>
                <th scope="col" className="px-4 py-3.5">Tanggal</th>
                <th scope="col" className="px-6 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentArticles.map((article) => {
                const cover =
                  article.cover_image_url ||
                  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80';

                return (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                          <Image
                            src={cover}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-sm sm:max-w-md">
                          <Link
                            href={`/dashboard/articles/${article.id}/edit`}
                            className="font-semibold text-slate-900 hover:text-cyan-600 transition-colors line-clamp-1 text-sm"
                          >
                            {article.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 font-mono">
                            /{article.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {article.category}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {article.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-500">
                      {formatDate(article.published_at || article.created_at)}
                    </td>

                    <td className="px-6 py-3.5 whitespace-nowrap text-right text-xs">
                      <Link
                        href={`/dashboard/articles/${article.id}/edit`}
                        className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
