import React from 'react';
import Link from 'next/link';
import { Gamepad2, Heart, Github, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800 bg-[#06090f] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-lg text-white font-mono">
                ANSHEL<span className="text-cyan-400">TECH</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Portal media berita video game independen, review jujur dengan rating transparan, dan panduan komprehensif untuk para gamer di seluruh Indonesia.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Kategori
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/kategori/news" className="hover:text-cyan-400 transition-colors">
                  Berita Terkini
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-amber-400 transition-colors">
                  Ulasan & Rating Game
                </Link>
              </li>
              <li>
                <Link href="/kategori/guide" className="hover:text-cyan-400 transition-colors">
                  Panduan & Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/platform/PC" className="hover:text-cyan-400 transition-colors">
                  PC Gaming
                </Link>
              </li>
              <li>
                <Link href="/platform/PlayStation 5" className="hover:text-cyan-400 transition-colors">
                  PlayStation 5
                </Link>
              </li>
              <li>
                <Link href="/platform/Xbox Series X/S" className="hover:text-cyan-400 transition-colors">
                  Xbox Series X/S
                </Link>
              </li>
              <li>
                <Link href="/platform/Nintendo Switch" className="hover:text-cyan-400 transition-colors">
                  Nintendo Switch
                </Link>
              </li>
            </ul>
          </div>

          {/* Admin & System */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Sistem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-cyan-400 hover:underline">
                  Dashboard Editor & Admin
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Tech Stack: Next.js 15 & Supabase</span>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a href="#" className="p-1.5 rounded-lg bg-slate-800 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-1.5 rounded-lg bg-slate-800 hover:text-cyan-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-1.5 rounded-lg bg-slate-800 hover:text-rose-500 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ansheltech Game Media. Hak cipta dilindungi.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Dibuat untuk para antusias video game.
          </p>
        </div>
      </div>
    </footer>
  );
}
