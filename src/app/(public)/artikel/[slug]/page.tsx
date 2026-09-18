import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { RatingBadge } from '@/components/public/RatingBadge';
import { ArticleCard } from '@/components/public/ArticleCard';
import { MarkdownRenderer } from '@/components/public/MarkdownRenderer';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  Monitor,
  Flame,
  Bookmark
} from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - Ansheltech',
    };
  }

  return {
    title: `${article.title} — Ansheltech`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || '',
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    article.slug,
    article.genres,
    article.category
  );

  const categoryLabels: Record<string, string> = {
    news: 'Berita',
    review: 'Review Game',
    guide: 'Panduan & Tips',
  };

  const coverUrl = article.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="py-8 sm:py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-slate-800/50"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>
        </div>

        {/* Header Title & Badges */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/kategori/${article.category}`}
              className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              {categoryLabels[article.category] || article.category}
            </Link>

            {article.platforms.map((p) => (
              <Link
                key={p}
                href={`/platform/${encodeURIComponent(p)}`}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 hover:text-white transition-colors flex items-center gap-1 font-mono"
              >
                <Monitor className="w-3 h-3 text-slate-400" />
                {p}
              </Link>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {article.excerpt}
            </p>
          )}

          {/* Meta Bar */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-5 flex-wrap">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-500" />
                {formatDate(article.published_at || article.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                {calculateReadingTime(article.content)}
              </span>
              <span className="text-slate-500">
                Oleh <strong className="text-slate-300 font-medium">Redaksi Ansheltech</strong>
              </span>
            </div>

            {article.rating !== null && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Skor Ulasan:</span>
                <RatingBadge rating={article.rating} size="md" showLabel={true} />
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-64 sm:h-96 lg:h-[480px] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          <Image
            src={coverUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Rating Spotlight Box (If review) */}
        {article.category === 'review' && article.rating !== null && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40">
                <Flame className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Verdict Penilaian Redaksi</h4>
                <p className="text-xs text-slate-400">
                  Rating dievaluasi berdasarkan gameplay, visual, performa teknis, dan kesenangan bermain.
                </p>
              </div>
            </div>
            <RatingBadge rating={article.rating} size="lg" showLabel={true} />
          </div>
        )}

        {/* Markdown Body Content */}
        <div className="py-4">
          <MarkdownRenderer content={article.content} />
        </div>

        {/* Genre Tags */}
        {article.genres.length > 0 && (
          <div className="pt-6 border-t border-slate-800 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {article.genres.map((genre) => (
              <Link
                key={genre}
                href={`/genre/${encodeURIComponent(genre)}`}
                className="text-xs px-3 py-1 rounded-full bg-slate-800/80 hover:bg-cyan-950 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 text-slate-300 transition-colors"
              >
                #{genre}
              </Link>
            ))}
          </div>
        )}

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="pt-12 mt-12 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Artikel Terkait</h3>
              <span className="text-xs text-slate-500">Rekomendasi genre & topik serupa</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
