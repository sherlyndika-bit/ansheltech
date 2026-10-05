import type { Article } from '@/types/database';
import { ArticleCard } from './ArticleCard';

export function ReviewCard({ article }: { article: Article }) {
  return <ArticleCard article={article} />;
}
