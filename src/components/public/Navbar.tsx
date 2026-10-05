'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { PLATFORM_OPTIONS } from '@/types/database';
import { Brand } from './Brand';

const navigation = [['Beranda', '/'], ['Berita', '/kategori/news'], ['Review Game', '/review'], ['Guides & Tips', '/kategori/guide']];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const pathname = usePathname();
  const platformRef = useRef<HTMLDivElement>(null);
  const platformButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); setPlatformOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (platformOpen) platformButton.current?.focus();
      else if (open) menuButton.current?.focus();
      setOpen(false); setPlatformOpen(false);
    };
    const outside = (e: PointerEvent) => { if (!platformRef.current?.contains(e.target as Node)) setPlatformOpen(false); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', outside); };
  }, [open, platformOpen]);
  const active = (href: string) => pathname === href;
  return <header className="site-header">
    <div className="site-container header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {navigation.map(([label, href]) => <Link key={href} href={href} aria-current={active(href) ? 'page' : undefined}>{label}</Link>)}
        <div ref={platformRef} className="platform-menu" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPlatformOpen(false); }}>
          <button ref={platformButton} type="button" aria-expanded={platformOpen} aria-controls="platform-links" onClick={() => setPlatformOpen(!platformOpen)}>Platform <ChevronDown size={13} /></button>
          {platformOpen && <div id="platform-links" className="platform-dropdown">{PLATFORM_OPTIONS.map(p => <Link key={p} href={`/platform/${encodeURIComponent(p)}`} onClick={() => setPlatformOpen(false)}>{p}</Link>)}</div>}
        </div>
        <Link href="/genre/Esports" aria-current={active('/genre/Esports') ? 'page' : undefined}>eSports</Link>
      </nav>
      <form action="/cari" role="search" className="header-search">
        <label htmlFor="header-search" className="sr-only">Cari artikel, game, atau topik</label>
        <button aria-label="Jalankan pencarian"><Search size={16} /></button>
        <input id="header-search" name="q" placeholder="Cari artikel, game, atau topik…" />
      </form>
      <div className="mobile-actions">
        <Link href="/cari" aria-label="Cari artikel" className="icon-button"><Search size={20} /></Link>
        <button ref={menuButton} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Tutup menu' : 'Buka menu'} className="icon-button">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Navigasi mobile" className="mobile-nav site-container">
      {[...navigation, ['eSports', '/genre/Esports']].map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={active(href) ? 'page' : undefined}>{label}</Link>)}
      <p className="eyebrow mt-5 mb-3">Platform</p><div className="flex flex-wrap gap-2">{PLATFORM_OPTIONS.map(p => <Link key={p} className="topic-link" href={`/platform/${encodeURIComponent(p)}`} onClick={() => setOpen(false)}>{p}</Link>)}</div>
    </nav>}
  </header>;
}
