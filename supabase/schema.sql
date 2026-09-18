-- ==============================================================================
-- ANSHELTECH / GAME NEWS HUB - SUPABASE DATABASE SCHEMA & STORAGE SETUP
-- Jalankan file SQL ini di Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- 1. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE article_category AS ENUM ('news', 'review', 'guide');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE article_status AS ENUM ('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT,
    category article_category NOT NULL DEFAULT 'news',
    genres TEXT[] NOT NULL DEFAULT '{}',
    platforms TEXT[] NOT NULL DEFAULT '{}',
    rating NUMERIC(3, 1) CHECK (rating IS NULL OR (rating >= 0 AND rating <= 10)),
    status article_status NOT NULL DEFAULT 'draft',
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS articles_slug_idx ON public.articles(slug);
CREATE INDEX IF NOT EXISTS articles_status_idx ON public.articles(status);
CREATE INDEX IF NOT EXISTS articles_category_idx ON public.articles(category);
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON public.articles(published_at DESC);

-- 3. AUTO-UPDATE UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_articles_updated_at ON public.articles;
CREATE TRIGGER set_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Policy: Publik hanya bisa membaca artikel yang published
DROP POLICY IF EXISTS "Public can view published articles" ON public.articles;
CREATE POLICY "Public can view published articles"
    ON public.articles
    FOR SELECT
    USING (status = 'published');

-- Policy: Authenticated users (Admin/Editor) punya akses SELECT penuh (termasuk draft)
DROP POLICY IF EXISTS "Authenticated users can view all articles" ON public.articles;
CREATE POLICY "Authenticated users can view all articles"
    ON public.articles
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Authenticated users bisa menambah artikel baru
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON public.articles;
CREATE POLICY "Authenticated users can insert articles"
    ON public.articles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy: Authenticated users bisa mengubah artikel
DROP POLICY IF EXISTS "Authenticated users can update articles" ON public.articles;
CREATE POLICY "Authenticated users can update articles"
    ON public.articles
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy: Authenticated users bisa menghapus artikel
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public.articles;
CREATE POLICY "Authenticated users can delete articles"
    ON public.articles
    FOR DELETE
    TO authenticated
    USING (true);

-- 5. STORAGE BUCKET CONFIGURATION (article-covers)
-- Menyiapkan bucket storage untuk upload cover image artikel
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-covers', 'article-covers', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policy: Publik dapat melihat image cover
DROP POLICY IF EXISTS "Public can view cover images" ON storage.objects;
CREATE POLICY "Public can view cover images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'article-covers');

-- Storage Policy: Authenticated user dapat mengupload image cover
DROP POLICY IF EXISTS "Authenticated users can upload cover images" ON storage.objects;
CREATE POLICY "Authenticated users can upload cover images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'article-covers');

-- Storage Policy: Authenticated user dapat mengupdate/menghapus cover image
DROP POLICY IF EXISTS "Authenticated users can update cover images" ON storage.objects;
CREATE POLICY "Authenticated users can update cover images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'article-covers');

DROP POLICY IF EXISTS "Authenticated users can delete cover images" ON storage.objects;
CREATE POLICY "Authenticated users can delete cover images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'article-covers');
