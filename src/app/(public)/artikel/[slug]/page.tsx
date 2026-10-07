import { YouTubeEmbed } from '@/components/public/YouTubeEmbed';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, Gamepad2 } from 'lucide-react';
import type { Metadata } from 'next';
import { getArticleBySlug, getRelatedArticles, getPublishedArticles } from '@/lib/articles';
import { articleCover } from '@/lib/article-images';
import { getArticleHeadings } from '@/lib/markdown-headings';
import { formatDate } from '@/lib/utils';
import { ArticleCover } from '@/components/public/ArticleCover';
import { ArticleHero } from '@/components/public/ArticleHero';
import { ArticleCard } from '@/components/public/ArticleCard';
import { RatingBadge } from '@/components/public/RatingBadge';
import { MarkdownRenderer } from '@/components/public/MarkdownRenderer';
import { TableOfContents } from '@/components/public/TableOfContents';

type PageProps = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug((await params).slug);
  if (!article) return { title: 'Artikel Tidak Ditemukan — Ansheltech' };
  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt || article.title;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ansheltech.vercel.app').replace(/\/+$/, '');
  const canonical = `${siteUrl}/artikel/${article.slug}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, images: articleCover(article) ? [articleCover(article)] : [] }, twitter: { card: 'summary_large_image', title, description, images: articleCover(article) ? [articleCover(article)] : [] } };
}
export default async function ArticleDetailPage({ params }: PageProps) {
  const article = await getArticleBySlug((await params).slug);
  if (!article) notFound();
  const [related, published] = await Promise.all([getRelatedArticles(article.slug, article.genres, article.category), getPublishedArticles()]);
  const recommendations = published.filter(a => a.slug !== article.slug).slice(0, 4);
  const headings = getArticleHeadings(article.content);
  return <>
    <ArticleHero article={article} detail />
    <div className="site-container article-layout">
      <article className="article-main">
        <TableOfContents headings={headings} mobile />
        <div className="article-lead-image"><ArticleCover src={articleCover(article)} alt={article.title} fill priority sizes="(max-width: 1024px) 100vw, 820px" className="object-cover" /></div>
        {article.video_url && <YouTubeEmbed url={article.video_url} title={article.title} />}
        {article.category === 'review' && article.rating !== null && <div className="review-verdict"><div><p className="eyebrow">Penilaian redaksi</p><h2>Skor ulasan</h2></div><RatingBadge rating={article.rating} size="lg" showLabel /></div>}
        <MarkdownRenderer content={article.content} />
        <div className="article-tags">{article.genres.map(genre => <Link className="topic-link" key={genre} href={`/genre/${encodeURIComponent(genre)}`}>#{genre}</Link>)}</div>
        {related.length > 0 && <section className="related-section"><div className="section-heading"><h2>Artikel Terkait</h2><Link className="section-link" href={article.category === 'review' ? '/review' : `/kategori/${article.category}`}>Lihat semua <ArrowRight size={16} /></Link></div><div className="grid gap-4 sm:grid-cols-3">{related.map(a => <ArticleCard article={a} key={a.id} compact />)}</div></section>}
      </article>
      <aside className="article-sidebar">
        <div className="sidebar-sticky">
          <TableOfContents headings={headings} />
          {recommendations.length > 0 && <section className="sidebar-panel"><h2>Artikel Pilihan</h2><div className="sidebar-stories">{recommendations.map(a => <Link key={a.id} href={`/artikel/${a.slug}`} className="sidebar-story"><div className="sidebar-thumb"><ArticleCover src={articleCover(a)} alt="" fill sizes="76px" className="object-cover" /></div><div><h3>{a.title}</h3><span><CalendarDays size={12} />{formatDate(a.published_at || a.created_at)}</span></div></Link>)}</div></section>}
          <section className="discover-panel"><div className="discover-art"><ArticleCover src={articleCover(article)} alt="" fill sizes="340px" className="object-cover" /></div><div className="discover-copy"><Gamepad2 className="mb-3 text-sky-400" size={25} /><h2>Jelajahi dunia game<br />bersama Ansheltech</h2><p>Temukan berita, review, dan panduan untuk petualangan berikutnya.</p><Link className="primary-button" href="/cari">Jelajahi sekarang <ArrowRight size={16} /></Link></div></section>
        </div>
      </aside>
    </div>
  </>;
}

