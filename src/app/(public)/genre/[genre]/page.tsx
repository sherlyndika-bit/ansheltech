import React from 'react';
import { getArticlesByGenre } from '@/lib/articles';
import { ArticleCard } from '@/components/public/ArticleCard';
import { Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ genre: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { genre } = await params;
  const decodedGenre = decodeURIComponent(genre);
  return {
    title: `Game Genre ${decodedGenre} — Ansheltech`,
    description: `Daftar berita, review, dan panduan untuk genre game ${decodedGenre}`,
  };
}

export default async function GenrePage({ params }: PageProps) {
  const { genre } = await params;
  const decodedGenre = decodeURIComponent(genre);
  const articles = await getArticlesByGenre(decodedGenre);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase font-mono tracking-wider mb-2">
          <Tag className="w-4 h-4" /> Filter Genre
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Genre: #{decodedGenre}
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Menampilkan seluruh artikel dan review yang berkaitan dengan genre {decodedGenre}.
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
          Belum ada artikel untuk genre {decodedGenre}.
        </div>
      )}
    </div>
  );
}
