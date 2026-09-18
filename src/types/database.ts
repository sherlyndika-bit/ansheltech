export type ArticleCategory = 'news' | 'review' | 'guide';
export type ArticleStatus = 'draft' | 'published';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
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
}

export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
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
