-- Safe, additive migration for CMS and n8n article ingestion.
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'tips';
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'recommendation';
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'deals';
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'game-update';
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'gaming-industry';
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'esports';
ALTER TYPE article_category ADD VALUE IF NOT EXISTS 'hardware-tech';
ALTER TYPE article_status ADD VALUE IF NOT EXISTS 'scheduled';

ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS content_type text,
  ADD COLUMN IF NOT EXISTS focus_keyword text,
  ADD COLUMN IF NOT EXISTS seo_title text,
  ADD COLUMN IF NOT EXISTS seo_description text,
  ADD COLUMN IF NOT EXISTS source_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ai_generated boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ai_confidence numeric,
  ADD COLUMN IF NOT EXISTS research_score numeric,
  ADD COLUMN IF NOT EXISTS freshness_score numeric,
  ADD COLUMN IF NOT EXISTS source_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS automation_run_id text;

ALTER TABLE public.articles DROP CONSTRAINT IF EXISTS articles_content_type_check;
ALTER TABLE public.articles ADD CONSTRAINT articles_content_type_check CHECK (content_type IS NULL OR content_type IN ('news','guide','tips','recommendation','review','deals','achievement','update','evergreen'));
ALTER TABLE public.articles DROP CONSTRAINT IF EXISTS articles_scores_check;
ALTER TABLE public.articles ADD CONSTRAINT articles_scores_check CHECK ((ai_confidence IS NULL OR ai_confidence BETWEEN 0 AND 100) AND (research_score IS NULL OR research_score BETWEEN 0 AND 100) AND (freshness_score IS NULL OR freshness_score BETWEEN 0 AND 100));
CREATE INDEX IF NOT EXISTS articles_featured_idx ON public.articles(is_featured) WHERE is_featured = true;

