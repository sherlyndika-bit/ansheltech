import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPublishedArticles } from '@/lib/articles';
import { ArticleHero } from '@/components/public/ArticleHero';
import { ArticleCard } from '@/components/public/ArticleCard';
import { PLATFORM_OPTIONS } from '@/types/database';

export const revalidate = 60;
export default async function HomePage() {
  const articles = await getPublishedArticles();
  const featured = articles[0];
  const recent = articles.slice(1, 7);
  const guides = articles.filter(a => a.category === 'guide').slice(0, 3);
  return <>
    {featured ? <ArticleHero article={featured} /> : <div className="site-container py-16"><h1 className="text-4xl font-bold">Dunia game, dalam satu tempat.</h1><p className="empty-state mt-8">Artikel terbaru akan segera hadir.</p></div>}
    <div className="platform-strip"><nav className="site-container" aria-label="Jelajahi platform"><span>MAIN DI MANA?</span>{PLATFORM_OPTIONS.filter(p => ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch', 'Mobile'].includes(p)).map(p => <Link key={p} href={`/platform/${encodeURIComponent(p)}`}>{p}<ArrowRight size={13} /></Link>)}</nav></div>
    <div className="site-container home-sections"><section><div className="section-heading"><div><p className="eyebrow mb-2">Dari meja redaksi</p><h2>Berita & Cerita Terbaru</h2></div><Link href="/cari" className="section-link">Lihat semua <ArrowRight size={16} /></Link></div>{recent.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{recent.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <div className="empty-state">Nantikan cerita berikutnya.</div>}</section>
    {guides.length > 0 && <section><div className="section-heading"><div><p className="eyebrow mb-2">Bermain lebih jauh</p><h2>Guides & Tips</h2></div><Link className="section-link" href="/kategori/guide">Semua panduan <ArrowRight size={16} /></Link></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{guides.map(a => <ArticleCard key={a.id} article={a} />)}</div></section>}
    </div>
  </>;
}
