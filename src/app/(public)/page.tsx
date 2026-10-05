import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getPublishedArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/public/ArticleCard';
import { ReviewCard } from '@/components/public/ReviewCard';
import { formatDate } from '@/lib/utils';

export const revalidate = 60;

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const featured = articles[0];
  const latest = articles.slice(1, 7);
  const reviews = articles.filter(a => a.category === 'review').slice(0, 3);
  const guides = articles.filter(a => a.category === 'guide').slice(0, 3);
  return (
    <div className="site-container pb-20">
      <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-end sm:py-10">
        <div><p className="eyebrow mb-3">Untuk yang hidup di dunia game</p><h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Play more. Know more<span className="text-lime-300">.</span></h1></div>
        <p className="max-w-xs text-sm leading-relaxed text-zinc-400">Berita, ulasan, dan panduan untuk menemukan pengalaman bermain berikutnya.</p>
      </div>
      <section aria-label="Sorotan redaksi" className="grid gap-6 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
        {featured ? <ArticleCard article={featured} featured /> : <div className="empty-state">Artikel terbaru akan hadir di sini.</div>}
        <aside className="flex flex-col rounded-2xl border border-white/10 bg-[#181b19] p-6 sm:p-7">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4"><h2 className="text-lg font-bold text-white">Dalam sorotan</h2><span className="h-2 w-2 rounded-full bg-lime-300" /></div>
          {articles.slice(1, 5).map((article, index) => <Link key={article.id} href={`/artikel/${article.slug}`} className="group flex flex-1 gap-4 border-b border-white/10 py-5 last:border-0"><span className="text-xl font-medium tabular-nums text-zinc-600">0{index + 1}</span><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-lime-300">{article.category === 'news' ? 'Berita' : article.category === 'guide' ? 'Panduan' : 'Review'}</p><h3 className="text-base font-semibold leading-snug text-zinc-100 group-hover:text-lime-300">{article.title}</h3><p className="mt-2 text-xs text-zinc-500">{formatDate(article.published_at || article.created_at)}</p></div></Link>)}
          {articles.length < 2 && <p className="py-8 text-sm text-zinc-400">Nantikan sorotan berikutnya dari redaksi.</p>}
        </aside>
      </section>
      <section className="mt-14 sm:mt-20" aria-labelledby="latest-title">
        <div className="section-heading"><div><p className="eyebrow mb-2">Update terbaru</p><h2 id="latest-title">Dari meja redaksi</h2></div><Link className="section-link" href="/cari">Semua artikel <ArrowRight size={16} /></Link></div>
        {latest.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{latest.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <div className="empty-state">Belum ada artikel lainnya. Kembali lagi untuk update terbaru.</div>}
      </section>
      <section className="mt-14 rounded-2xl border border-white/10 bg-[#181b19] p-5 sm:mt-20 sm:p-8" aria-labelledby="reviews-title">
        <div className="section-heading"><div><p className="eyebrow mb-2">Sebelum kamu bermain</p><h2 id="reviews-title">Game di bawah lensa</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">Temukan ulasan dan skor redaksi untuk game berikutnya di daftar mainmu.</p></div><Link className="section-link" href="/review">Semua review <ArrowRight size={16} /></Link></div>
        {reviews.length ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{reviews.map(a => <ReviewCard key={a.id} article={a} />)}</div> : <div className="empty-state">Belum ada review yang dipublikasikan.</div>}
      </section>
      <section className="mt-14 sm:mt-20" aria-labelledby="guides-title">
        <div className="section-heading"><div><p className="eyebrow mb-2">Level up</p><h2 id="guides-title">Main dengan lebih siap</h2></div><Link className="section-link" href="/kategori/guide">Semua panduan <ArrowRight size={16} /></Link></div>
        {guides.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{guides.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <div className="empty-state">Panduan baru akan hadir di sini.</div>}
      </section>
      <section className="mt-14 flex flex-col justify-between gap-6 rounded-2xl bg-lime-300 p-7 text-zinc-950 sm:mt-20 sm:flex-row sm:items-center sm:p-10"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest">Temukan duniamu</p><h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Satu portal. Banyak cara bermain.</h2><p className="mt-3 text-sm text-zinc-800">Jelajahi berita dan panduan untuk platform favoritmu.</p></div><Link href="/platform/PC" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-zinc-950 px-6 text-sm font-semibold text-white hover:bg-zinc-800">Jelajahi PC gaming <ArrowUpRight size={18} /></Link></section>
    </div>
  );
}
