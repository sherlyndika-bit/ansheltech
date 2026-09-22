'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Gamepad2,
  Flame,
  Search,
  Menu,
  X,
  ChevronDown,
  Layers,
  Monitor,
  Sparkles
} from 'lucide-react';
import { GENRE_OPTIONS, PLATFORM_OPTIONS } from '@/types/database';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/genre/${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-neon-cyan transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-white font-mono flex items-center gap-1">
                ANSHEL<span className="text-cyan-400">TECH</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase block -mt-1 font-mono">
                Game Media Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/kategori/news"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/kategori/news'
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Berita
            </Link>

            <Link
              href="/review"
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                pathname === '/review'
                  ? 'text-amber-400 bg-amber-950/40 border border-amber-500/20 font-semibold'
                  : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/50'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-500" />
              Review Game
            </Link>

            <Link
              href="/kategori/guide"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/kategori/guide'
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Guide & Tips
            </Link>

            {/* Platform Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setPlatformOpen(!platformOpen)}
                onBlur={() => setTimeout(() => setPlatformOpen(false), 200)}
                className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1 transition-colors"
              >
                <Monitor className="w-4 h-4 text-slate-400" />
                Platform
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0e1626] border border-slate-700/80 rounded-xl shadow-xl py-2 hidden group-hover:block transition-all">
                {PLATFORM_OPTIONS.slice(0, 5).map((p) => (
                  <Link
                    key={p}
                    href={`/platform/${encodeURIComponent(p)}`}
                    className="block px-4 py-2 text-xs text-slate-300 hover:text-cyan-400 hover:bg-slate-800/70"
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>

            {/* Genre Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                onBlur={() => setTimeout(() => setGenreOpen(false), 200)}
                className="px-3.5 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 flex items-center gap-1 transition-colors"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                Genre
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0e1626] border border-slate-700/80 rounded-xl shadow-xl py-2 hidden group-hover:block transition-all">
                {GENRE_OPTIONS.slice(0, 6).map((g) => (
                  <Link
                    key={g}
                    href={`/genre/${encodeURIComponent(g)}`}
                    className="block px-4 py-2 text-xs text-slate-300 hover:text-cyan-400 hover:bg-slate-800/70"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Action: Editorial Search Box */}
          <div className="hidden sm:flex items-center gap-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berita, review game..."
                className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
              />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-300 hover:text-cyan-400"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, review, atau platform..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0b101c] px-4 pt-2 pb-6 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Beranda
          </Link>
          <Link
            href="/kategori/news"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Berita
          </Link>
          <Link
            href="/review"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-amber-400 hover:bg-slate-800"
          >
            Review Game
          </Link>
          <Link
            href="/kategori/guide"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Guide & Tips
          </Link>

          <div className="pt-3 border-t border-slate-800/80">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Platform Populer
            </p>
            <div className="grid grid-cols-2 gap-1 px-1">
              {PLATFORM_OPTIONS.slice(0, 4).map((p) => (
                <Link
                  key={p}
                  href={`/platform/${encodeURIComponent(p)}`}
                  onClick={() => setMobileOpen(false)}
                  className="px-2.5 py-1.5 rounded text-xs text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
