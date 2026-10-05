import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Brand } from './Brand';

export function Footer() {
  return <footer className="site-footer"><div className="site-container">
    <div className="footer-grid"><div><Brand /><p className="footer-description">Media informasi seputar teknologi, game, dan dunia digital untuk kamu yang selalu ingin update.</p></div>
      <nav aria-label="Navigasi footer"><h2>Navigasi</h2>{[['Beranda', '/'], ['Berita', '/kategori/news'], ['Review Game', '/review'], ['Guides & Tips', '/kategori/guide'], ['PC Gaming', '/platform/PC']].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
      <nav aria-label="Kategori footer"><h2>Kategori</h2>{['Action', 'RPG', 'Strategy', 'Esports', 'Simulation'].map(g => <Link key={g} href={`/genre/${encodeURIComponent(g)}`}>{g}</Link>)}</nav>
      <div><h2>Temukan cerita berikutnya</h2><p className="footer-description">Dari kabar terbaru sampai panduan bermain. Cari game favoritmu di sini.</p><Link href="/cari" className="footer-search-link">Jelajahi semua artikel <ArrowUpRight size={18} /></Link></div>
    </div><div className="footer-bottom"><p>© {new Date().getFullYear()} Ansheltech. Semua hak cipta dilindungi.</p><Link href="/dashboard/login">Akses redaksi</Link></div>
  </div></footer>;
}
