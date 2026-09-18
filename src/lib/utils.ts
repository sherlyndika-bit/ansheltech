import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Baru saja';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return 'Baru saja';
  }
}

export function getRatingColor(rating: number | null | undefined) {
  if (rating === null || rating === undefined) {
    return {
      bg: 'bg-slate-800',
      text: 'text-slate-300',
      border: 'border-slate-700',
      badge: 'bg-slate-800 text-slate-300 border-slate-700',
      ring: 'ring-slate-700',
      label: 'Unrated',
    };
  }

  if (rating >= 8.0) {
    return {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-neon-green',
      ring: 'ring-emerald-500',
      label: 'Sangat Direkomendasikan',
    };
  } else if (rating >= 5.0) {
    return {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
      ring: 'ring-amber-500',
      label: 'Cukup Baik',
    };
  } else {
    return {
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/40',
      badge: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
      ring: 'ring-rose-500',
      label: 'Kurang Direkomendasikan',
    };
  }
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} menit baca`;
}
