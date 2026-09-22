import React from 'react';
import Link from 'next/link';
import { Gamepad2, Twitter, Youtube, Disc as DiscordIcon, ShieldCheck } from 'lucide-react';

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
              Media jurnalisme video game independen. Menyajikan berita aktual, ulasan mendalam dengan skor rating transparan, serta panduan gameplay komprehensif untuk gamer Indonesia.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Kanal Berita
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
                  Panduan & Tips Gameplay
                </Link>
              </li>
              <li>
                <Link href="/genre/Esports" className="hover:text-cyan-400 transition-colors">
                  Turnamen Esports
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 font-mono">
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

          {/* Editorial & About */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Redaksi & Media
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  Standar Penilaian & Rating
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  Pedoman Editorial
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  Hubungi Tim Redaksi
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">
                  Kebijakan Privasi
                </span>
              </li>
              <li className="pt-2 flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors"
                  title="Komunitas Discord"
                >
                  <DiscordIcon className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with subtle editorial login */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ansheltech Game Media. Hak cipta dilindungi.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <span>Diterbitkan di Indonesia</span>
            <span>•</span>
            <Link
              href="/dashboard/login"
              className="text-slate-600 hover:text-slate-400 transition-colors"
              title="Khusus Editor & Jurnalis Ansheltech"
            >
              Akses Redaksi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
