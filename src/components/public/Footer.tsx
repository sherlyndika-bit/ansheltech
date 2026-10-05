import Link from 'next/link';
const platforms = ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'];
export function Footer() {
  return <footer className="border-t border-white/10 bg-[#0c0e0d]">
    <div className="site-container py-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <div><Link href="/" className="text-2xl font-extrabold tracking-tight text-white">anshel<span className="text-lime-300">tech.</span></Link><p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">Perspektif baru tentang dunia game. Berita, ulasan, dan panduan untuk gamer Indonesia.</p><span className="mt-5 block text-xs text-zinc-500">Play more. Know more.</span></div>
        <nav aria-label="Kanal footer"><h2 className="eyebrow mb-4">Kanal</h2><div className="flex flex-col gap-3 text-sm text-zinc-400">{[['Berita', '/kategori/news'], ['Review game', '/review'], ['Panduan & tips', '/kategori/guide'], ['Cari artikel', '/cari']].map(([label, href]) => <Link className="hover:text-lime-300" key={href} href={href}>{label}</Link>)}</div></nav>
        <nav aria-label="Platform footer"><h2 className="eyebrow mb-4">Platform</h2><div className="flex flex-col gap-3 text-sm text-zinc-400">{platforms.map(p => <Link className="hover:text-lime-300" key={p} href={`/platform/${encodeURIComponent(p)}`}>{p}</Link>)}</div></nav>
      </div>
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row"><p>© {new Date().getFullYear()} Ansheltech. Hak cipta dilindungi.</p><Link className="hover:text-zinc-200" href="/dashboard/login">Akses redaksi ↗</Link></div>
    </div>
  </footer>;
}
