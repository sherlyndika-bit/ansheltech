import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, UserRound } from 'lucide-react';
import type { Article } from '@/types/database';
import { articleCover } from '@/lib/article-images';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import { ArticleCover } from './ArticleCover';

export const categoryLabels = { news: 'Berita Game', guide: 'Panduan & Tips', review: 'Review Game' };

export function ArticleTitle({ title }: { title: string }) {
  const colon = title.indexOf(':');
  if (colon < 0) return <>{title}</>;
  const before = title.slice(0, colon + 1);
  const remainder = title.slice(colon + 1).trim();
  const separator = remainder.indexOf(' untuk ');
  return <>{before}<br /><span className="title-accent">{separator < 0 ? remainder : remainder.slice(0, separator)}</span>{separator >= 0 && <><br />{remainder.slice(separator + 1)}</>}</>;
}

export function ArticleHero({ article, detail = false }: { article: Article; detail?: boolean }) {
  return <section className={`cinematic-hero ${detail ? 'article-hero' : 'home-hero'}`} aria-label={detail ? 'Judul artikel' : 'Sorotan redaksi'}>
    <div className="hero-art"><ArticleCover src={articleCover(article)} alt="" fill priority sizes="100vw" className="object-cover" /></div>
    <div className="hero-shade" />
    <div className="site-container hero-content">
      {detail ? <Link href={article.category === 'review' ? '/review' : `/kategori/${article.category}`} className="back-link"><ArrowLeft size={15} /> Kembali ke {categoryLabels[article.category]}</Link> : <p className="hero-kicker"><span /> SOROTAN REDAKSI</p>}
      <div className="hero-copy">
        <div className="flex flex-wrap items-center gap-2 mb-5"><Link className="category-pill" href={article.category === 'review' ? '/review' : `/kategori/${article.category}`}>{categoryLabels[article.category]}</Link>{article.genres.slice(0, 2).map(g => <Link className="hero-tag" key={g} href={`/genre/${encodeURIComponent(g)}`}>{g}</Link>)}</div>
        <h1>{detail ? <ArticleTitle title={article.title} /> : <Link href={`/artikel/${article.slug}`}><ArticleTitle title={article.title} /></Link>}</h1>
        {article.excerpt && <p className="hero-description">{article.excerpt}</p>}
        <div className="article-meta"><span><CalendarDays size={16} />{formatDate(article.published_at || article.created_at)}</span><span><Clock3 size={16} />{calculateReadingTime(article.content)}</span>{detail && <span><span className="author-icon"><UserRound size={17} /></span>Oleh <b>Ansheltech</b></span>}</div>
        {!detail && <Link href={`/artikel/${article.slug}`} className="primary-button mt-7">Baca selengkapnya <ArrowRight size={17} /></Link>}
      </div>
    </div>
  </section>;
}
