import { createClient } from '@/lib/supabase/client';
import { Article } from '@/types/database';
import { INITIAL_DUMMY_ARTICLES } from './dummy-data';

// Helper to check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes('placeholder-project') &&
    !url.includes('your-supabase-project')
  );
}

// Memory cache fallback for local operations when Supabase is not yet populated
let localArticlesStore: Article[] = [...INITIAL_DUMMY_ARTICLES];

export async function getPublishedArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return localArticlesStore.filter((a) => a.status === 'published');
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return localArticlesStore.filter((a) => a.status === 'published');
    }
    return data as Article[];
  } catch {
    return localArticlesStore.filter((a) => a.status === 'published');
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    const found = localArticlesStore.find((a) => a.slug === slug);
    return found || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return localArticlesStore.find((a) => a.slug === slug) || null;
    }
    return data as Article;
  } catch {
    return localArticlesStore.find((a) => a.slug === slug) || null;
  }
}

export async function getRelatedArticles(
  currentSlug: string,
  genres: string[] = [],
  category?: string
): Promise<Article[]> {
  const allPublished = await getPublishedArticles();
  return allPublished
    .filter((a) => a.slug !== currentSlug)
    .filter((a) => {
      const matchGenre = a.genres.some((g) => genres.includes(g));
      const matchCategory = category ? a.category === category : false;
      return matchGenre || matchCategory;
    })
    .slice(0, 3);
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const allPublished = await getPublishedArticles();
  return allPublished.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

export async function getArticlesByGenre(genre: string): Promise<Article[]> {
  const allPublished = await getPublishedArticles();
  const cleanGenre = decodeURIComponent(genre).toLowerCase();
  return allPublished.filter((a) =>
    a.genres.some((g) => g.toLowerCase() === cleanGenre)
  );
}

export async function getArticlesByPlatform(platform: string): Promise<Article[]> {
  const allPublished = await getPublishedArticles();
  const cleanPlatform = decodeURIComponent(platform).toLowerCase();
  return allPublished.filter((a) =>
    a.platforms.some((p) => p.toLowerCase() === cleanPlatform)
  );
}

export async function getAllArticlesAdmin(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return localArticlesStore;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return localArticlesStore;
    }
    return data as Article[];
  } catch {
    return localArticlesStore;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    const found = localArticlesStore.find((a) => a.id === id);
    return found || null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return localArticlesStore.find((a) => a.id === id) || null;
    }
    return data as Article;
  } catch {
    return localArticlesStore.find((a) => a.id === id) || null;
  }
}

export async function deleteArticleById(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    localArticlesStore = localArticlesStore.filter((a) => a.id !== id);
    return true;
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
    localArticlesStore = localArticlesStore.filter((a) => a.id !== id);
    return true;
  } catch (err) {
    console.error('Delete article error:', err);
    throw err;
  }
}

