'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/database';
import { formatDate } from '@/lib/utils';
import { RatingBadge } from '@/components/public/RatingBadge';
import { DeleteModal } from './DeleteModal';
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  FileEdit,
  Clock
} from 'lucide-react';
import { deleteArticleById } from '@/lib/articles';

interface DataTableProps {
  initialArticles: Article[];
}

export function DataTable({ initialArticles }: DataTableProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Delete modal states
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter logic
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' || article.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;
    setIsDeleting(true);
    try {
      await deleteArticleById(articleToDelete.id);
      setArticles((prev) => prev.filter((a) => a.id !== articleToDelete.id));
      setArticleToDelete(null);
    } catch (err) {
      console.error(err);
      alert('Gagal menghapus artikel. Silakan coba lagi.');
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryBadges: Record<string, { label: string; color: string }> = {
    news: { label: 'Berita', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    review: { label: 'Review', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    guide: { label: 'Guide', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul artikel atau slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">Semua Kategori</option>
            <option value="news">Berita (News)</option>
            <option value="review">Review</option>
            <option value="guide">Panduan (Guide)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">Semua Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

          {/* Add Article Button */}
          <Link
            href="/dashboard/articles/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap ml-auto"
          >
            <Plus className="w-4 h-4" />
            Tambah Artikel
          </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3.5">
                  Artikel
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Kategori
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Rating
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-4 py-3.5">
                  Tanggal
                </th>
                <th scope="col" className="px-6 py-3.5 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => {
                  const cover =
                    article.cover_image_url ||
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=300&q=80';
                  const cat = categoryBadges[article.category] || categoryBadges.news;

                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Title & Cover */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5 max-w-md">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                            <Image
                              src={cover}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/dashboard/articles/${article.id}/edit`}
                              className="font-semibold text-slate-900 hover:text-cyan-600 transition-colors line-clamp-1 text-sm"
                            >
                              {article.title}
                            </Link>
                            <p className="text-xs text-slate-400 font-mono line-clamp-1 mt-0.5">
                              /{article.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${cat.color}`}
                        >
                          {cat.label}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {article.rating !== null ? (
                          <div className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                            ⭐ {article.rating.toFixed(1)}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-mono">-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {article.status === 'published' ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-500">
                        {formatDate(article.published_at || article.created_at)}
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                        <div className="flex items-center justify-end gap-2">
                          {article.status === 'published' && (
                            <Link
                              href={`/artikel/${article.slug}`}
                              target="_blank"
                              title="Lihat Publik"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}

                          <Link
                            href={`/dashboard/articles/${article.id}/edit`}
                            title="Edit Artikel"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-cyan-600 hover:bg-slate-100 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setArticleToDelete(article)}
                            title="Hapus Artikel"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-slate-400 text-sm"
                  >
                    Tidak ada artikel yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filteredArticles.length} dari total {articles.length} artikel</span>
          <span className="font-mono">Tersambung ke Supabase</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(articleToDelete)}
        title={articleToDelete?.title || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setArticleToDelete(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
