import { getYouTubeEmbedUrl } from '@/lib/youtube';

export function YouTubeEmbed({ url, title }: { url: string; title: string }) {
  const src = getYouTubeEmbedUrl(url);
  if (!src) return null;
  return <div className="my-6 aspect-video w-full overflow-hidden rounded-2xl border border-slate-800">
    <iframe src={src} title={`Video YouTube: ${title}`} className="h-full w-full border-0" loading="lazy" allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin" />
  </div>;
}
