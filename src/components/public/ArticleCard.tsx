import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/database';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { RatingBadge } from './RatingBadge';
import { Calendar, Clock } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const categoryBadgeColors: Record<string, string> = {
    news: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    review: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    guide: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  };

  const categoryLabel: Record<string, string> = {
    news: 'Berita',
    review: 'Review',
    guide: 'Panduan',
  };

  const coverUrl = article.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';

  if (featured) {
    return (
      <article className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0c1220] hover:border-cyan-500/50 transition-all duration-300 hover:shadow-neon-cyan">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative h-72 lg:h-[420px] overflow-hidden">
            <Image
              src={coverUrl}
              alt={article.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md border ${
                    categoryBadgeColors[article.category] || categoryBadgeColors.news
                  }`}
                >
                  {categoryLabel[article.category] || article.category}
                </span>

                {article.rating !== null && (
                  <RatingBadge rating={article.rating} size="sm" />
                )}

                {article.platforms.slice(0, 2).map((p) => (
                  <span
                    key={p}
                    className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h2 className="text-xl lg:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                <Link href={`/artikel/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {formatDate(article.published_at || article.created_at)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {calculateReadingTime(article.content)}
                </span>
              </div>

              <Link
                href={`/artikel/${article.slug}`}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Baca Lengkap →
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col rounded-xl overflow-hidden border border-slate-800/90 bg-[#0c1220] hover:border-slate-700 hover:bg-[#0f172a] transition-all duration-200">
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <Image
          src={coverUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border backdrop-blur-md ${
              categoryBadgeColors[article.category] || categoryBadgeColors.news
            }`}
          >
            {categoryLabel[article.category] || article.category}
          </span>
        </div>

        {article.rating !== null && (
          <div className="absolute top-3 right-3">
            <RatingBadge rating={article.rating} size="sm" />
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {article.genres.slice(0, 2).map((g) => (
              <span key={g} className="text-[10px] text-slate-400 font-mono">
                #{g}
              </span>
            ))}
          </div>

          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/artikel/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            {formatDate(article.published_at || article.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {calculateReadingTime(article.content)}
          </span>
        </div>
      </div>
    </article>
  );
}
