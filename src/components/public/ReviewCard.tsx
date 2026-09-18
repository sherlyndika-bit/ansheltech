import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/database';
import { formatDate } from '@/lib/utils';
import { RatingBadge } from './RatingBadge';

interface ReviewCardProps {
  article: Article;
}

export function ReviewCard({ article }: ReviewCardProps) {
  const coverUrl = article.cover_image_url || 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80';

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1424] hover:border-amber-500/50 hover:shadow-lg transition-all duration-300">
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <Image
          src={coverUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-[#0d1424]/30 to-transparent" />

        {/* Big Rating Badge in Corner */}
        <div className="absolute top-3 right-3 shadow-lg">
          <RatingBadge rating={article.rating} size="md" />
        </div>

        {/* Platform tags */}
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {article.platforms.slice(0, 3).map((p) => (
            <span
              key={p}
              className="text-[10px] px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-slate-200 border border-slate-700/50 font-mono"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Ulasan Game
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">
              {formatDate(article.published_at || article.created_at)}
            </span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/artikel/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {article.genres.slice(0, 2).map((g) => (
              <span key={g} className="text-[11px] text-slate-400">
                #{g}
              </span>
            ))}
          </div>

          <Link
            href={`/artikel/${article.slug}`}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Baca Ulasan →
          </Link>
        </div>
      </div>
    </article>
  );
}
