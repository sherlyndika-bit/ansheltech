'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Gamepad2,
  Flame,
  Search,
  Menu,
  X,
  ShieldAlert,
  ChevronDown,
  Layers,
  Monitor
} from 'lucide-react';
import { GENRE_OPTIONS, PLATFORM_OPTIONS } from '@/types/database';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#080c14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
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
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Beranda
            </Link>

            <Link
              href="/kategori/news"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/kategori/news'
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Berita
            </Link>

            <Link
              href="/review"
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors ${
                pathname === '/review'
                  ? 'text-amber-400 bg-amber-950/40 border border-amber-500/20'
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
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/20'
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

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-slate-800 to-slate-900 hover:from-cyan-950 hover:to-slate-900 text-slate-200 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
              Admin Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/dashboard"
              className="p-2 text-slate-300 hover:text-cyan-400"
              title="Admin"
            >
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
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
          <div className="pt-2 border-t border-slate-800/80">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 text-sm font-semibold"
            >
              <ShieldAlert className="w-4 h-4" /> Masuk Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
