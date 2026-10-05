import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

type MarkdownNode = {
  type: string;
  value?: string;
  alt?: string;
  depth?: number;
  position?: { start: { line: number } };
  children?: MarkdownNode[];
  data?: { hProperties?: Record<string, unknown> };
};
export type ArticleHeading = { id: string; title: string; depth: number };
const parser = unified().use(remarkParse).use(remarkGfm);
const text = (node: MarkdownNode): string => node.value || node.alt || (node.children || []).map(text).join('');
const headingId = (node: MarkdownNode) => `section-${node.position?.start.line || 0}`;

export function getArticleHeadings(content: string): ArticleHeading[] {
  const tree = parser.parse(content) as MarkdownNode;
  // Only top-level headings belong in the reading navigation.
  return (tree.children || []).filter(n => n.type === 'heading' && (n.depth || 0) <= 3).map(n => ({ id: headingId(n), title: text(n), depth: n.depth || 1 }));
}

export function remarkArticleHeadings() {
  return (tree: MarkdownNode) => {
    for (const node of tree.children || []) {
      if (node.type !== 'heading') continue;
      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: headingId(node) } };
    }
  };
}

