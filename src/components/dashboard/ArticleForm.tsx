'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Article,
  ArticleCategory,
  ArticleFormData,
  GENRE_OPTIONS,
  PLATFORM_OPTIONS
} from '@/types/database';
import { slugify } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { uploadArticleCover } from '@/lib/supabase/storage';
import { MarkdownRenderer } from '@/components/public/MarkdownRenderer';
import { RatingBadge } from '@/components/public/RatingBadge';
import {
  Save,
  Send,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Lock,
  Unlock,
  Check,
  Eye,
  Edit3,
  Bold,
  Italic,
  Heading,
  List,
  Code,
  Quote,
  Table,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

interface ArticleFormProps {
  initialData?: Article | null;
  isEditing?: boolean;
}

export function ArticleForm({ initialData, isEditing = false }: ArticleFormProps) {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [isSlugLocked, setIsSlugLocked] = useState(!isEditing); // unlocked for edit
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState<ArticleCategory>(initialData?.category || 'news');
  const [genres, setGenres] = useState<string[]>(initialData?.genres || []);
  const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || []);
  const [rating, setRating] = useState<number | null>(
    initialData?.rating !== undefined ? initialData.rating : (initialData?.category === 'review' ? 8.0 : null)
  );
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || '');

  // UI / Action states
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(initialData?.cover_image_url || '');
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug from title if locked
  useEffect(() => {
    if (isSlugLocked && !isEditing) {
      setSlug(slugify(title));
    }
  }, [title, isSlugLocked, isEditing]);

  // Adjust rating when category changes
  const handleCategoryChange = (newCat: ArticleCategory) => {
    setCategory(newCat);
    if (newCat === 'review') {
      if (rating === null) setRating(8.0);
    } else {
      setRating(null);
    }
  };

  // Toggle genres
  const toggleGenre = (genre: string) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Toggle platforms
  const togglePlatform = (platform: string) => {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  // Handle local image selection
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      const objectUrl = URL.createObjectURL(file);
      setCoverPreview(objectUrl);
    }
  };

  // Toolbar action helpers
  const insertMarkdownTag = (prefix: string, suffix: string = '') => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || 'teks'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 4)
      );
    }, 50);
  };

  // Submit Handler (Draft or Publish)
  const handleSubmit = async (status: 'draft' | 'published') => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!title.trim()) {
      setErrorMessage('Judul artikel wajib diisi.');
      return;
    }

    if (!slug.trim()) {
      setErrorMessage('Slug artikel wajib diisi.');
      return;
    }

    if (!content.trim()) {
      setErrorMessage('Konten artikel tidak boleh kosong.');
      return;
    }

    if (status === 'draft') {
      setIsSavingDraft(true);
    } else {
      setIsPublishing(true);
    }

    try {
      let finalCoverUrl = coverImageUrl;

      // Upload image to Supabase storage if user chose a file
      if (coverFile) {
        try {
          finalCoverUrl = await uploadArticleCover(coverFile, slug || 'article');
        } catch (storageErr) {
          console.warn('Storage upload error, using preview or placeholder:', storageErr);
          // If storage bucket isn't set up yet, fallback to sample gaming cover image
          if (!finalCoverUrl) {
            finalCoverUrl =
              'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
          }
        }
      }

      if (!finalCoverUrl) {
        finalCoverUrl =
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80';
      }

      const supabase = createClient();

      // Get current logged-in user to attach as author
      const { data: { user } } = await supabase.auth.getUser();

      const payload: Record<string, any> = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content: content.trim(),
        cover_image_url: finalCoverUrl,
        category,
        genres,
        platforms,
        rating: category === 'review' ? Number(rating) : null,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      };

      // Attach author_id only if user is authenticated
      if (user?.id) {
        payload.author_id = user.id;
      }

      if (isEditing && initialData) {
        const { error } = await supabase
          .from('articles')
          .update(payload)
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('articles').insert([payload]);
        if (error) throw error;
      }

      setSuccessMessage(
        status === 'published'
          ? 'Artikel berhasil dipublikasikan!'
          : 'Draf artikel berhasil disimpan!'
      );

      setTimeout(() => {
        router.push('/dashboard/articles');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      console.error('Save error:', err);
      setErrorMessage(err.message || 'Terjadi kesalahan saat menyimpan artikel.');
    } finally {
      setIsSavingDraft(false);
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/dashboard/articles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={isSavingDraft || isPublishing}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-slate-500" />
            {isSavingDraft ? 'Menyimpan Draf...' : 'Simpan Draf'}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={isSavingDraft || isPublishing}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl shadow-sm transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {isPublishing ? 'Mempublikasikan...' : 'Publish Sekarang'}
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl font-medium flex items-center gap-2">
          <Check className="w-4 h-4" /> {successMessage}
        </div>
      )}

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Primary Content) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title & Slug Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Judul Artikel <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Review Game Eksklusif Terbaru..."
                className="w-full px-4 py-2.5 text-base font-semibold text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Slug URL <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugLocked(!isSlugLocked)}
                  className="text-xs font-semibold text-cyan-600 flex items-center gap-1 hover:underline"
                >
                  {isSlugLocked ? (
                    <>
                      <Lock className="w-3 h-3" /> Terkunci (Auto-sync judul)
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3" /> Edit Manual
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center">
                <span className="bg-slate-100 border border-r-0 border-slate-200 px-3 py-2 text-xs text-slate-500 font-mono rounded-l-xl">
                  /artikel/
                </span>
                <input
                  type="text"
                  value={slug}
                  disabled={isSlugLocked}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  placeholder="judul-artikel-slug"
                  className="w-full px-3 py-2 text-xs font-mono text-slate-800 border border-slate-200 rounded-r-xl bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Ringkasan Singkat (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Deskripsi singkat yang tampil pada kartu artikel dan meta SEO..."
                className="w-full px-3 py-2 text-xs text-slate-700 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Markdown Content Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Editor Toolbar & Tab Switcher */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'write'
                      ? 'bg-white text-cyan-700 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" /> Tulis (Markdown)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'preview'
                      ? 'bg-white text-cyan-700 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> Live Preview
                </button>
              </div>

              {/* Formatting Helper Buttons */}
              {activeTab === 'write' && (
                <div className="flex items-center gap-1 text-slate-600">
                  <button
                    type="button"
                    onClick={() => insertMarkdownTag('**', '**')}
                    title="Bold"
                    className="p-1.5 rounded hover:bg-slate-200"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownTag('*', '*')}
                    title="Italic"
                    className="p-1.5 rounded hover:bg-slate-200"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownTag('## ')}
                    title="Heading 2"
                    className="p-1.5 rounded hover:bg-slate-200"
                  >
                    <Heading className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownTag('- ')}
                    title="List Item"
                    className="p-1.5 rounded hover:bg-slate-200"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownTag('> ')}
                    title="Quote"
                    className="p-1.5 rounded hover:bg-slate-200"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdownTag('`', '`')}
                    title="Inline Code"
                    className="p-1.5 rounded hover:bg-slate-200"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Editor Body */}
            <div className="p-4">
              {activeTab === 'write' ? (
                <textarea
                  ref={textareaRef}
                  rows={18}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# Judul Bab...&#10;&#10;Tuliskan isi ulasan atau berita game Anda di sini menggunakan format Markdown.&#10;&#10;Contoh:&#10;- Poin kelebihan&#10;- Poin kekurangan&#10;&#10;> Kutipan penting dari developer"
                  className="w-full p-3 text-sm font-mono text-slate-800 border-0 focus:outline-none focus:ring-0 leading-relaxed resize-y"
                />
              ) : (
                <div className="min-h-[400px] p-6 bg-[#080c14] rounded-xl border border-slate-800">
                  <p className="text-[11px] uppercase font-mono text-cyan-400 font-bold mb-4 tracking-wider">
                    — Tampilan Sisi Publik (Live Preview) —
                  </p>
                  <MarkdownRenderer content={content || '*Belum ada konten untuk ditampilkan.*'} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Side Controls & Media) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category & Rating */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Kategori Artikel
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as ArticleCategory)}
                className="w-full px-3 py-2 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="news">📰 Berita (News)</option>
                <option value="review">⭐ Review Game</option>
                <option value="guide">🧭 Panduan (Guide)</option>
              </select>
            </div>

            {/* Conditional Rating (Only for category === 'review') */}
            {category === 'review' && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Rating Game (0 - 10)
                  </label>
                  <RatingBadge rating={rating} size="sm" />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={rating || 0}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={rating !== null ? rating : ''}
                    onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                    className="w-16 px-2 py-1 text-center font-mono font-bold text-xs bg-white border border-amber-300 rounded-lg text-amber-900"
                  />
                </div>
                <p className="text-[11px] text-amber-700 leading-tight">
                  Warna badge otomatis: Hijau (≥8.0), Kuning (5.0-7.9), Merah (&lt;5.0).
                </p>
              </div>
            )}
          </div>

          {/* Cover Image Upload (Supabase Storage) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Cover Image Artikel
            </label>

            {/* Preview Box */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt="Cover Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 text-slate-300" />
                  <span className="text-xs">Belum ada cover</span>
                </div>
              )}
            </div>

            {/* File Upload to Storage */}
            <div>
              <label className="flex items-center justify-center gap-2 w-full py-2 px-3 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700">
                <Upload className="w-4 h-4 text-cyan-600" />
                Upload File ke Supabase Storage
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Direct URL Input fallback */}
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-medium">Atau masukkan URL gambar:</span>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => {
                  setCoverImageUrl(e.target.value);
                  setCoverPreview(e.target.value);
                }}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-1.5 text-xs text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Platforms Multi-Select */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Platform Target
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PLATFORM_OPTIONS.map((plat) => {
                const isSelected = platforms.includes(plat);
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => togglePlatform(plat)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {plat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genres Multi-Select */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Genre & Tags
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {GENRE_OPTIONS.map((gen) => {
                const isSelected = genres.includes(gen);
                return (
                  <button
                    key={gen}
                    type="button"
                    onClick={() => toggleGenre(gen)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-cyan-600 text-white border-cyan-600 font-bold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    #{gen}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
