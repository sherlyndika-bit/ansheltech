import Link from 'next/link';

export function Brand() {
  return <Link href="/" aria-label="Ansheltech, beranda" className="brand">
    <svg viewBox="0 0 36 42" fill="none" aria-hidden="true" className="brand-mark">
      <rect x="1" y="1" width="34" height="40" rx="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 31 14 12l4-4 4 4 6 19-10-6-10 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m13 27 5-13 5 13M16 23h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    <span><span className="brand-name">ANSHEL <b>TECH</b></span><span className="brand-tagline">TECH · GAME · LIFESTYLE</span></span>
  </Link>;
}

