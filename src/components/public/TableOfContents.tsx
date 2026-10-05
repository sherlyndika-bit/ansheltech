'use client';
import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import type { ArticleHeading } from '@/lib/markdown-headings';

export function TableOfContents({ headings, mobile = false }: { headings: ArticleHeading[]; mobile?: boolean }) {
  const [active, setActive] = useState(headings[0]?.id || '');
  useEffect(() => {
    const update = () => {
      let current = headings[0]?.id || '';
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= 150) current = heading.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [headings]);
  if (!headings.length) return null;
  const list = <nav aria-label={mobile ? 'Daftar isi mobile' : 'Daftar isi artikel'}><ol className="toc-list">{headings.map((heading, index) => <li key={heading.id}><a href={`#${heading.id}`} aria-current={active === heading.id ? 'location' : undefined} onClick={() => setActive(heading.id)}><span>{index + 1}.</span>{heading.title.replace(/^\d+[.)]\s+/, '')}</a></li>)}</ol></nav>;
  if (mobile) return <details className="sidebar-panel mobile-toc"><summary><List size={18} /> Daftar Isi</summary>{list}</details>;
  return <section className="sidebar-panel desktop-toc"><h2>Daftar Isi</h2>{list}</section>;
}
