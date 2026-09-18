import React from 'react';
import { notFound } from 'next/navigation';
import { getArticleById } from '@/lib/articles';
import { ArticleForm } from '@/components/dashboard/ArticleForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Artikel Tidak Ditemukan</h3>
        <p className="text-sm text-slate-500">
          Artikel dengan ID tersebut tidak ditemukan di database.
        </p>
        <Link
          href="/dashboard/articles"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Edit Artikel
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Ubah konten, perbarui rating, atau ganti status publikasi artikel
        </p>
      </div>

      <ArticleForm initialData={article} isEditing={true} />
    </div>
  );
}
