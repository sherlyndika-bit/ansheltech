# Ansheltech — Portal Berita Game, Review & Guide (Next.js 15 & Supabase)

Portal website berita game modern, ulasan mendalam dengan sistem rating dinamis, serta panduan tips gameplay yang dilengkapi dengan dashboard admin CMS komprehensif.

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth%20%26%20Storage-3ecf8e?style=flat&logo=supabase)

---

## Fitur Utama

### 1. Sisi Publik (Gamer Portal)
- **Desain Dark Gaming Aesthetic:** Nuansa gelap dengan aksen neon (`cyan`, `amber`, `purple`), efek glow, dan tipografi gaming modern.
- **Beranda Interaktif (`/`):**
  - Section **Featured Article** hero banner.
  - Grid artikel published terbaru dengan tanggal, estimasi waktu baca, dan tag platform/genre.
  - Section **Spotlight Review Game** dengan kartu rating khusus.
- **Halaman Detail Artikel (`/artikel/[slug]`):**
  - Rendering konten Markdown lengkap (Heading, list, blockquote, code syntax, tabel).
  - Tampilan rating badge verdict untuk kategori review.
  - Rekomendasi artikel terkait (*Related Articles*) berdasarkan genre & topik serupa.
- **Halaman Khusus Review (`/review`):**
  - Galeri ulasan game lengkap dengan indikator skor warna transparan:
    - 🟢 **Hijau (≥ 8.0):** Sangat Direkomendasikan
    - 🟡 **Kuning (5.0 – 7.9):** Cukup Baik
    - 🔴 **Merah (< 5.0):** Kurang Direkomendasikan
- **Halaman Filter:** Filter artikel berdasarkan kategori (`/kategori/[category]`), genre (`/genre/[genre]`), dan platform (`/platform/[platform]`).

### 2. Sisi Dashboard Admin (`/dashboard`)
- **Desain Panel Bersih & Terang:** Layout modern berbasis sidebar + topbar standar admin profesional.
- **Proteksi Akses (Middleware):** Otomatis mengarahkan pengguna non-otentikasi ke halaman login (`/dashboard/login`).
- **Autentikasi Supabase Auth:** Login berbasis email dan password.
- **Statistik Ringkas:** Total artikel, perbandingan jumlah Published vs Draft, total review game, dan rata-rata skor.
- **DataTable Interaktif (`/dashboard/articles`):**
  - Pencarian instan (judul & slug).
  - Filter kategori (`news`, `review`, `guide`) & status (`published`, `draft`).
  - Modal konfirmasi hapus artikel yang aman.
  - Akses langsung untuk preview artikel di sisi publik.
- **Formulir Artikel Komprehensif (`/dashboard/articles/new` & `edit`):**
  - Auto-generate slug dari judul secara realtime (dengan opsi unlock edit manual).
  - Editor Markdown dengan tab **Live Preview** dan tombol pembantu formatting (Bold, Italic, Header, List, Quote, Code).
  - Unggah cover image ke **Supabase Storage** (bucket `article-covers`) dengan preview sebelum submit.
  - Input rating interaktif (slider & number 0.0 - 10.0) yang muncul dinamis saat kategori dipilih `review`.
  - Tombol aksi terpisah: **"Simpan Draf"** dan **"Publish Sekarang"**.

---

## Skema Database & Setup Supabase

Proyek ini telah dilengkapi dengan skrip SQL siap pakai di direktori `supabase/`:

### 1. Jalankan Skema Database
Buka **Supabase Dashboard** > **SQL Editor** > **New Query**, kemudian salin dan jalankan seluruh isi file:
📄 `supabase/schema.sql`

File ini akan otomatis membuat:
1. Enum types: `article_category` (`news`, `review`, `guide`) dan `article_status` (`draft`, `published`).
2. Tabel `articles` dengan field `id`, `title`, `slug`, `excerpt`, `content`, `cover_image_url`, `category`, `genres`, `platforms`, `rating`, `status`, `author_id`, `created_at`, `updated_at`, `published_at`.
3. Indeks performa query dan auto-update timestamp trigger.
4. Kebijakan Row Level Security (RLS) untuk akses publik dan editor.
5. Konfigurasi bucket storage `article-covers` beserta policy upload dan public read.

### 2. Masukkan Data Seed (6 Dummy Articles)
Buka tab baru di **SQL Editor** Supabase, lalu jalankan isi file:
📄 `supabase/seed.sql`

Data seed mencakup:
- 2 Berita Game (GTA VI Trailer & PS5 Pro)
- 2 Ulasan Game (Black Myth: Wukong dengan skor 9.2 dan Concord dengan skor 4.8)
- 2 Panduan Gameplay (Build Elden Ring DLC & Tips Crosshair Valorant)

---

## Konfigurasi Environment Variable (.env.local)

Salin file `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Isi dengan kredensial project Supabase Anda (ditemukan di Supabase Dashboard > **Project Settings** > **API**):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Menjalankan Proyek Secara Lokal

```bash
# Instalasi dependensi (jika belum)
npm install

# Menjalankan server development
npm run dev
```

Buka peramban di [http://localhost:3000](http://localhost:3000).

- **Sisi Publik:** `http://localhost:3000/`
- **Dashboard Admin:** `http://localhost:3000/dashboard`
- **Halaman Login:** `http://localhost:3000/dashboard/login`

---

## Deploy ke Vercel

1. Push repository ke GitHub.
2. Buka [vercel.com](https://vercel.com) dan impor repository `ansheltech`.
3. Pada bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Klik tombol **Deploy**. Aplikasi akan otomatis ter-build dan online.
