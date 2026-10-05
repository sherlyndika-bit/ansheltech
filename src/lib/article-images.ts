import type { Article } from '@/types/database';

// Replace only the old demo photograph, never an editor's uploaded cover.
// Official editorial image: https://en.bandainamcoent.eu/elden-ring/elden-ring/shadow-of-the-erdtree
const eldenRingArtwork = 'https://static.bandainamcoent.eu/high/elden-ring/elden-ring/08-shadow-of-the-erdtree/elden-ring-expansion-SOTE/00-page-content/ERSOTE-header-desktop.jpg';
const legacyEldenCover = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80';

export function articleCover(article: Pick<Article, 'slug' | 'cover_image_url'>) {
  if (article.slug === 'panduan-lengkap-build-karakter-elden-ring-erdtree' && article.cover_image_url === legacyEldenCover) return eldenRingArtwork;
  return article.cover_image_url || '';
}

