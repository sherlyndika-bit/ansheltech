import React from 'react';
import { ArticleForm } from '@/components/dashboard/ArticleForm';

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Tulis Artikel Baru
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Buat berita, review, atau tips panduan baru. Upload cover gambar ke Supabase Storage.
        </p>
      </div>

      <ArticleForm isEditing={false} />
    </div>
  );
}
