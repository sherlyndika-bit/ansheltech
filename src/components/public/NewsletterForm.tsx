'use client';

import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  if (subscribed) {
    return (
      <div className="pt-3 flex items-center gap-2 text-emerald-400 text-xs font-semibold bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl max-w-md">
        <Check className="w-4 h-4" />
        Terima kasih! Anda telah terdaftar di buletin mingguan Ansheltech.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Masukkan alamat email Anda..."
        className="flex-1 px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors whitespace-nowrap shadow-neon-cyan"
      >
        Langganan Gratis
      </button>
    </form>
  );
}
