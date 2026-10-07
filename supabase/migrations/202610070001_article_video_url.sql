-- Optional video for existing and new articles.
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS video_url text;
