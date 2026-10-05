'use client';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export function ArticleCover({ src, alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div role={alt ? 'img' : undefined} aria-label={alt || undefined} className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#283426] via-[#181b19] to-[#101211]"><span aria-hidden="true" className="text-5xl font-extrabold tracking-tighter text-lime-300/20">a.</span></div>;
  return <Image {...props} src={src} alt={alt} onError={() => setFailed(true)} />;
}
