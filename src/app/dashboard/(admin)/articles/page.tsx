import React from 'react';
import { getAllArticlesAdmin } from '@/lib/articles';
import { DataTable } from '@/components/dashboard/DataTable';
import { FileText } from 'lucide-react';

export const revalidate = 0; // Fresh list

export default async function ArticlesListPage() {
  const articles = await getAllArticlesAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Kelola Artikel
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar lengkap semua artikel, berita, review, dan panduan yang tersimpan di sistem
          </p>
        </div>
      </div>

      <DataTable initialArticles={articles} />
    </div>
  );
}
