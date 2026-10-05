'use client';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

export function ArticleCover({ src, alt, ...props }: ImageProps) {
  const [failedSource, setFailedSource] = useState<ImageProps['src'] | null>(null);
  if (!src || failedSource === src) return <div role={alt ? 'img' : undefined} aria-label={alt || undefined} className="cover-placeholder"><Gamepad2 size={48} strokeWidth={1} aria-hidden="true" /></div>;
  return <Image {...props} src={src} alt={alt} onError={() => setFailedSource(src)} />;
}
