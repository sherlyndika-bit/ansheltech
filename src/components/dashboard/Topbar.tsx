'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Bell, Shield, User } from 'lucide-react';

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export function Topbar({ title = 'Dashboard Admin', subtitle }: TopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 font-normal -mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Lihat Website Publik</span>
        </Link>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">Admin Redaksi</p>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Online
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
