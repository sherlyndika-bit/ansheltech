import React from 'react';
import { getArticlesByCategory } from '@/lib/articles';
import { ArticleCard } from '@/components/public/ArticleCard';
import { notFound } from 'next/navigation';
import { Layers } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_NAMES: Record<string, { title: string; desc: string }> = {
  news: {
    title: 'Berita Game Terkini',
    desc: 'Update industri, pengumuman game baru, rilis konsol, dan turnamen esports.',
  },
  review: {
    title: 'Review & Ulasan Game',
    desc: 'Kritik dan penilaian game dengan rating terstandar dari redaksi.',
  },
  guide: {
    title: 'Panduan & Tips Walkthrough',
    desc: 'Tips bermain, strategi boss fight, dan rekomendasi build karakter.',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_NAMES[category.toLowerCase()];
  return {
    title: `${meta ? meta.title : category} — Ansheltech`,
    description: meta ? meta.desc : `Artikel kategori ${category}`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const meta = CATEGORY_NAMES[category.toLowerCase()];

  if (!meta && !['news', 'review', 'guide'].includes(category.toLowerCase())) {
    notFound();
  }

  const articles = await getArticlesByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase font-mono tracking-wider mb-2">
          <Layers className="w-4 h-4" /> Kategori
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {meta?.title || category}
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          {meta?.desc || `Kumpulan artikel dalam kategori ${category}`}
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 bg-[#0c1220] rounded-2xl border border-slate-800">
          Belum ada artikel dalam kategori ini.
        </div>
      )}
    </div>
  );
}
