import { getPublishedArticles } from '@/lib/articles';
import { ReviewCard } from '@/components/public/ReviewCard';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Review Game — Ansheltech',
  description: 'Ulasan game dan skor redaksi untuk membantu menemukan game berikutnya.',
};
export default async function ReviewsPage() {
  const articles = await getPublishedArticles();
  const reviews = articles.filter(a => a.category === 'review');
  return <div className="site-container py-10 sm:py-16">
    <header className="mb-10 grid gap-7 border-b border-white/10 pb-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
      <div><p className="eyebrow mb-3">Game di bawah lensa</p><h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Layak masuk daftar main?</h1><p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">Kenali gameplay, visual, dan pengalaman bermain melalui ulasan redaksi sebelum memilih game berikutnya.</p></div>
      <div className="rounded-xl border border-white/10 bg-[#181b19] p-5"><p className="mb-4 text-xs font-semibold text-zinc-400">PANDUAN SKOR REDAKSI · 0–10</p><div className="grid grid-cols-3 gap-3 text-sm"><div><strong className="block text-xl text-emerald-400">8–10</strong><span className="text-xs text-zinc-400">Direkomendasikan</span></div><div><strong className="block text-xl text-amber-400">5–7.9</strong><span className="text-xs text-zinc-400">Cukup baik</span></div><div><strong className="block text-xl text-rose-400">&lt; 5</strong><span className="text-xs text-zinc-400">Kurang memuaskan</span></div></div></div>
    </header>
    <p className="mb-6 text-sm text-zinc-500">{reviews.length} ulasan tersedia</p>
    {reviews.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{reviews.map(a => <ReviewCard key={a.id} article={a} />)}</div> : <div className="empty-state">Belum ada review yang dipublikasikan.</div>}
  </div>;
}
