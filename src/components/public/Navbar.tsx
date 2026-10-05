'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { PLATFORM_OPTIONS, GENRE_OPTIONS } from '@/types/database';

const navigation = [
  ['Beranda', '/'], ['Berita', '/kategori/news'],
  ['Review', '/review'], ['Panduan', '/kategori/guide'],
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101211]/95 backdrop-blur-xl">
      <div className="site-container">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" aria-label="Ansheltech, beranda" className="flex shrink-0 items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-lime-300 text-lg font-black text-[#101211]">a.</span>
            <span className="text-xl font-extrabold tracking-tight text-white">anshel<span className="text-lime-300">tech</span><span className="hidden text-[10px] font-medium tracking-[0.18em] text-zinc-400 sm:block">GAME CULTURE & STORIES</span></span>
          </Link>
          <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
            {navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={`border-b-2 py-7 text-sm font-semibold transition-colors ${pathname === href ? 'border-lime-300 text-white' : 'border-transparent text-zinc-400 hover:text-white'}`}>{label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/cari" aria-label="Cari artikel" className="flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm text-zinc-300 hover:border-lime-300/40 hover:text-white"><Search size={17} /><span className="hidden sm:inline">Cari artikel</span></Link>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Tutup menu' : 'Buka menu'} className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden">{open ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {open && <nav id="mobile-navigation" aria-label="Navigasi mobile" className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 py-4 lg:hidden">
          {navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined} className={`flex min-h-12 items-center justify-between rounded-lg px-3 text-base ${pathname === href ? 'bg-lime-300/10 text-lime-300' : 'text-zinc-300 hover:bg-white/5'}`}>{label}<ArrowUpRight size={16} /></Link>)}
          <p className="eyebrow mb-3 mt-5 px-3">Platform</p>
          <div className="flex flex-wrap gap-2 px-3">{PLATFORM_OPTIONS.map(p => <Link onClick={() => setOpen(false)} className="topic-link" key={p} href={`/platform/${encodeURIComponent(p)}`}>{p}</Link>)}</div>
        </nav>}
      </div>
      <div className="border-t border-white/5">
        <nav aria-label="Jelajahi genre" className="site-container flex items-center gap-6 overflow-x-auto py-3 text-xs">
          <span className="shrink-0 font-semibold text-zinc-500">JELAJAHI</span>
          {GENRE_OPTIONS.slice(0, 8).map(g => <Link className="shrink-0 text-zinc-400 transition-colors hover:text-lime-300" key={g} href={`/genre/${encodeURIComponent(g)}`}>{g}</Link>)}
        </nav>
      </div>
    </header>
  );
}
