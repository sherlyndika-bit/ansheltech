import React from 'react';
import { getRatingColor, cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number | null | undefined;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RatingBadge({
  rating,
  size = 'md',
  showLabel = false,
  className,
}: RatingBadgeProps) {
  if (rating === null || rating === undefined) return null;

  const color = getRatingColor(rating);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5 font-bold',
    lg: 'text-base px-3.5 py-1.5 gap-2 font-extrabold',
  };

  const starSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg border font-mono transition-all',
        color.badge,
        sizeClasses[size],
        className
      )}
    >
      <Star className={cn('fill-current', starSizes[size])} />
      <span>{rating.toFixed(1)}</span>
      {showLabel && (
        <span className="text-xs font-sans font-normal opacity-90 border-l border-current/30 pl-1.5">
          {color.label}
        </span>
      )}
    </div>
  );
}
