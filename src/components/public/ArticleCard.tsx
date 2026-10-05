import Link from 'next/link';
import { ArticleCover } from '@/components/public/ArticleCover';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Article } from '@/types/database';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { RatingBadge } from './RatingBadge';

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  const label = { news: 'Berita', review: 'Review', guide: 'Panduan' }[article.category];
  const cover = article.cover_image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
  const href = `/artikel/${article.slug}`;
  if (featured) return (
    <article className="group relative isolate flex min-h-[480px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 sm:min-h-[560px]">
      <ArticleCover src={cover} alt="" fill priority sizes="(max-width: 1024px) 100vw, 70vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
      <div className="relative flex min-h-[480px] flex-1 flex-col justify-end p-6 sm:min-h-[560px] sm:p-10">
        <div className="mb-5 flex items-center gap-3"><span className="rounded bg-lime-300 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-950">{label}</span><span className="text-xs text-zinc-200">{article.platforms.slice(0, 2).join(' / ')}</span></div>
        <h2 className="max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl"><Link className="after:absolute after:inset-0" href={href}>{article.title}</Link></h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">{article.excerpt}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4 text-xs text-zinc-300"><span>{formatDate(article.published_at || article.created_at)}</span><span className="flex items-center gap-1.5"><Clock size={14} />{calculateReadingTime(article.content)}</span><ArrowUpRight className="ml-auto text-lime-300" size={24} /></div>
      </div>
    </article>
  );
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#181b19] transition-colors hover:border-lime-300/35">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <ArticleCover src={cover} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        {article.rating !== null && <div className="absolute right-3 top-3"><RatingBadge rating={article.rating} size="sm" /></div>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider"><span className="text-lime-300">{label}</span>{article.genres[0] && <><span className="text-zinc-600">/</span><span className="text-zinc-400">{article.genres[0]}</span></>}</div>
        <h3 className="text-xl font-bold leading-snug tracking-tight text-white group-hover:text-lime-200"><Link href={href} className="after:absolute after:inset-0">{article.title}</Link></h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">{article.excerpt}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-zinc-400"><span className="mt-4">{formatDate(article.published_at || article.created_at)}</span><span className="mt-4">{calculateReadingTime(article.content)}</span></div>
      </div>
    </article>
  );
}
