const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be']);

export function extractYouTubeVideoId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || !HOSTS.has(url.hostname) || url.username || url.password || url.port) return null;
    let id: string | null = null;
    if (url.hostname === 'youtu.be') {
      id = /^\/([A-Za-z0-9_-]{11})\/?$/.exec(url.pathname)?.[1] ?? null;
    } else if (url.pathname === '/watch') {
      if (url.searchParams.getAll('v').length !== 1) return null;
      id = url.searchParams.get('v');
    } else {
      id = /^\/(?:shorts|live|embed)\/([A-Za-z0-9_-]{11})\/?$/.exec(url.pathname)?.[1] ?? null;
    }
    return id && VIDEO_ID.test(id) ? id : null;
  } catch { return null; }
}

export function isValidYouTubeUrl(value: unknown): boolean {
  return extractYouTubeVideoId(value) !== null;
}

export function getYouTubeEmbedUrl(value: unknown): string | null {
  const id = extractYouTubeVideoId(value);
  return id ? 'https://www.youtube-nocookie.com/embed/' + id : null;
}
