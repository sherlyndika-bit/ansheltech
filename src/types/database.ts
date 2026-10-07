export type ArticleCategory = 'news' | 'review' | 'guide' | 'tips' | 'recommendation' | 'deals' | 'game-update' | 'gaming-industry' | 'esports' | 'hardware-tech';
export type ArticleStatus = 'draft' | 'published' | 'scheduled';
export type ArticleContentType = 'news' | 'guide' | 'tips' | 'recommendation' | 'review' | 'deals' | 'achievement' | 'update' | 'evergreen';
export type SourceType = 'official' | 'media' | 'database' | 'community' | 'other';
export interface ArticleSource { url: string; publisher: string; type: SourceType; }

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  video_url?: string | null;
  cover_image_url: string | null;
  category: ArticleCategory;
  genres: string[];
  platforms: string[];
  rating: number | null;
  status: ArticleStatus;
  author_id: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  content_type?: ArticleContentType | null;
  focus_keyword?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  source_urls?: ArticleSource[] | null;
  is_featured?: boolean;
  ai_generated?: boolean;
  ai_confidence?: number | null;
  research_score?: number | null;
  freshness_score?: number | null;
  source_verified?: boolean;
  automation_run_id?: string | null;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  video_url?: string | null;
  cover_image_url: string;
  category: ArticleCategory;
  genres: string[];
  platforms: string[];
  rating: number | null;
  status: ArticleStatus;
}

export const GENRE_OPTIONS = [
  'Action',
  'RPG',
  'Open World',
  'FPS',
  'Soulslike',
  'Adventure',
  'Horror',
  'Multiplayer',
  'Esports',
  'Simulation',
  'Strategy',
  'Indie',
  'Fighting',
  'Racing',
  'Hardware',
  'Tech'
];

export const PLATFORM_OPTIONS = [
  'PC',
  'PlayStation 5',
  'PlayStation 4',
  'Xbox Series X/S',
  'Xbox One',
  'Nintendo Switch',
  'Mobile',
  'VR'
];

export const CATEGORY_OPTIONS: Array<{ value: ArticleCategory; label: string }> = [
  { value: 'news', label: 'Berita' }, { value: 'review', label: 'Review' }, { value: 'guide', label: 'Guide' },
  { value: 'tips', label: 'Tips & Tricks' }, { value: 'recommendation', label: 'Rekomendasi' }, { value: 'deals', label: 'Deals & Sale' },
  { value: 'game-update', label: 'Update Game' }, { value: 'gaming-industry', label: 'Gaming Industry' }, { value: 'esports', label: 'Esports' }, { value: 'hardware-tech', label: 'Hardware & Tech' },
];
export const CONTENT_TYPE_OPTIONS: Array<{ value: ArticleContentType; label: string }> = [
  { value: 'news', label: 'News' }, { value: 'guide', label: 'Guide' }, { value: 'tips', label: 'Tips' }, { value: 'recommendation', label: 'Recommendation' }, { value: 'review', label: 'Review' }, { value: 'deals', label: 'Deals' }, { value: 'achievement', label: 'Achievement' }, { value: 'update', label: 'Update' }, { value: 'evergreen', label: 'Evergreen' },
];

