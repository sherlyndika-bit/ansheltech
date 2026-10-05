import Link from 'next/link';
import { CalendarDays, Clock3 } from 'lucide-react';
import type { Article } from '@/types/database';
import { formatDate, calculateReadingTime } from '@/lib/utils';
import { articleCover } from '@/lib/article-images';
import { ArticleCover } from './ArticleCover';
import { RatingBadge } from './RatingBadge';
import { ArticleHero, categoryLabels } from './ArticleHero';

export function ArticleCard({ article, featured = false, compact = false }: { article: Article; featured?: boolean; compact?: boolean }) {
  if (featured) return <ArticleHero article={article} />;
  return <article className={`story-card ${compact ? 'story-card-compact' : ''}`}>
    <div className="story-cover"><ArticleCover src={articleCover(article)} alt="" fill sizes={compact ? '(max-width: 640px) 100vw, 300px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px'} className="object-cover" />{article.rating !== null && <div className="absolute right-3 top-3"><RatingBadge rating={article.rating} size="sm" /></div>}</div>
    <div className="story-body"><p className="story-category">{categoryLabels[article.category]}</p><h3><Link href={`/artikel/${article.slug}`}>{article.title}</Link></h3>{!compact && article.excerpt && <p className="story-excerpt">{article.excerpt}</p>}<div className="story-meta"><span><CalendarDays size={13} />{formatDate(article.published_at || article.created_at)}</span><span><Clock3 size={13} />{calculateReadingTime(article.content)}</span></div></div>
  </article>;
}
