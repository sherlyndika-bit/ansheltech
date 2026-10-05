import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { getPublishedArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/public/ArticleCard';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Cari Artikel — Ansheltech' };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const query = (typeof params.q === 'string' ? params.q : '').trim();
  const articles = await getPublishedArticles();
  const term = query.toLocaleLowerCase('id');
  const matches = query ? articles.filter(a => [a.title, a.excerpt, a.content, ...a.genres, ...a.platforms].join(' ').toLocaleLowerCase('id').includes(term)) : articles;
  return <div className="site-container py-10 sm:py-16">
    <p className="eyebrow mb-3">Jelajahi Ansheltech</p><h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Cerita apa yang kamu cari?</h1>
    <form action="/cari" role="search" className="my-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
      <label htmlFor="article-search" className="sr-only">Cari judul, game, genre, atau platform</label>
      <div className="relative flex-1"><Search size={20} className="absolute left-4 top-4 text-slate-500" /><input id="article-search" name="q" defaultValue={query} placeholder="Judul, game, genre, atau platform…" className="min-h-13 w-full rounded-lg border border-white/15 bg-[#061525] py-3.5 pl-12 pr-4 text-base text-white placeholder:text-slate-500" /></div>
      <button className="rounded-lg bg-sky-300 px-6 py-3.5 text-sm font-bold text-slate-950 hover:bg-sky-200">Cari artikel</button>
    </form>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5"><p role="status" className="text-sm text-slate-400">{query ? `${matches.length} artikel untuk “${query}”` : `Semua artikel · ${matches.length}`}</p>{query && <Link href="/cari" className="section-link">Hapus pencarian <ArrowRight size={15} /></Link>}</div>
    {matches.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{matches.map(a => <ArticleCard key={a.id} article={a} />)}</div> : <div className="empty-state"><h2 className="mb-2 text-lg font-semibold text-white">Belum ada hasil yang cocok</h2><p>Coba nama game, genre, atau kata kunci yang lebih singkat.</p><Link className="mt-5 inline-block text-sky-300" href="/cari">Lihat semua artikel →</Link></div>}
  </div>;
}
