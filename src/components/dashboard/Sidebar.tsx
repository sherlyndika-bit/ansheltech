'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Gamepad2,
  LayoutDashboard,
  FileText,
  PlusCircle,
  ExternalLink,
  LogOut,
  Sparkles,
  Layers,
  Flame
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error(e);
    }
    router.push('/dashboard/login');
    router.refresh();
  };

  const navItems = [
    {
      label: 'Ringkasan Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Kelola Artikel',
      href: '/dashboard/articles',
      icon: FileText,
      exact: false,
    },
    {
      label: 'Tulis Artikel Baru',
      href: '/dashboard/articles/new',
      icon: PlusCircle,
      exact: true,
    },
  ];

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && (href !== '/dashboard' || pathname === '/dashboard');
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 text-slate-300 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/80 gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-sm">
          <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <div>
          <span className="font-extrabold text-base text-white tracking-wider font-mono">
            ANSHEL<span className="text-cyan-400">ADMIN</span>
          </span>
          <span className="block text-[10px] text-slate-400 font-sans font-normal">
            Content Management
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
            Menu Utama
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="space-y-1 pt-4 border-t border-slate-800/80">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
            Pintasan Cepat
          </p>
          <Link
            href="/review"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-amber-400 hover:bg-slate-800/70 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Halaman Review Publik</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/70 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Lihat Website Utama</span>
            </div>
          </Link>
        </div>
      </div>

      {/* User / Logout Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-cyan-900/50 border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
              AD
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-400 truncate">admin@ansheltech.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Keluar / Logout"
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
