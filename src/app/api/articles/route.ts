import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { ArticleCategory, ArticleContentType, ArticleStatus, ArticleSource } from '@/types/database';

const categories: ArticleCategory[] = ['news','review','guide','tips','recommendation','deals','game-update','gaming-industry','esports','hardware-tech'];
const contentTypes: ArticleContentType[] = ['news','guide','tips','recommendation','review','deals','achievement','update','evergreen'];
const statuses: ArticleStatus[] = ['draft','published','scheduled'];
const sourceTypes = ['official','media','database','community','other'];
const isScore = (value: unknown) => value == null || (typeof value === 'number' && value >= 0 && value <= 100);

export async function POST(request: NextRequest) {
  if (!process.env.N8N_ARTICLE_INGEST_SECRET || request.headers.get('authorization') !== `Bearer ${process.env.N8N_ARTICLE_INGEST_SECRET}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || !body.title || !body.slug || !body.content || !categories.includes(body.category) || (body.content_type && !contentTypes.includes(body.content_type)) || !statuses.includes(body.status || 'draft')) return NextResponse.json({ error: 'title, slug, content, category, content_type, and status are invalid or missing' }, { status: 400 });
  if (body.status === 'scheduled' && !body.published_at) return NextResponse.json({ error: 'published_at is required for scheduled articles' }, { status: 400 });
  if (![body.ai_confidence, body.research_score, body.freshness_score].every(isScore)) return NextResponse.json({ error: 'scores must be between 0 and 100' }, { status: 400 });
  const sources: ArticleSource[] = Array.isArray(body.source_urls) ? body.source_urls : [];
  if (sources.some(s => !s || !s.url || !s.publisher || !sourceTypes.includes(s.type) || !/^https?:\/\//i.test(s.url))) return NextResponse.json({ error: 'source_urls contains an invalid source' }, { status: 400 });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data, error } = await supabase.from('articles').insert({ ...body, source_urls: sources, platforms: Array.isArray(body.platforms) ? body.platforms : [], genres: Array.isArray(body.tags) ? body.tags : (Array.isArray(body.genres) ? body.genres : []) }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ article: data }, { status: 201 });
}

