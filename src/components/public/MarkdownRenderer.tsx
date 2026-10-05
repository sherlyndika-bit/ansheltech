import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { remarkArticleHeadings } from '@/lib/markdown-headings';

export function MarkdownRenderer({ content }: { content: string }) {
  return <div className="article-prose">
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkArticleHeadings]} components={{
      h1: ({ children, id }) => <h2 id={id}>{children}</h2>,
      h2: ({ children, id }) => <h2 id={id}>{children}</h2>,
      h3: ({ children, id }) => <h3 id={id}>{children}</h3>,
      table: ({ children }) => <div className="article-table" role="region" aria-label="Tabel artikel, geser untuk melihat seluruh kolom" tabIndex={0}><table>{children}</table></div>,
      a: ({ children, href }) => <a href={href}>{children}</a>,
    }}>{content}</ReactMarkdown>
  </div>;
}
