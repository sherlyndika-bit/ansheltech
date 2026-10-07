import { isValidYouTubeUrl } from '@/lib/youtube';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { ArticleCategory, ArticleContentType, ArticleStatus, ArticleSource } from '@/types/database';
const categories: ArticleCategory[] = ['news','review','guide','tips','recommendation','deals','game-update','gaming-industry','esports','hardware-tech'];
const contentTypes: ArticleContentType[] = ['news','guide','tips','recommendation','review','deals','achievement','update','evergreen'];
const statuses: ArticleStatus[] = ['draft','published','scheduled'];
const allowed = ['title','slug','excerpt','content','category','content_type','cover_image_url','video_url','platforms','genres','rating','focus_keyword','seo_title','seo_description','source_urls','status','published_at','is_featured','ai_generated','ai_confidence','research_score','freshness_score','source_verified','automation_run_id'];
const score = (v: unknown) => v == null || (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100);
function isHttpUrl(value: unknown): boolean {
 if (typeof value !== 'string' || !/^https?:\/\//i.test(value)) return false;
 try {
  const url = new URL(value);
  return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
 } catch { return false; }
}
export async function POST(request: NextRequest) {
 const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, N8N_ARTICLE_INGEST_SECRET } = process.env;
 if (!NEXT_PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !N8N_ARTICLE_INGEST_SECRET) return NextResponse.json({error:'Server configuration is incomplete'},{status:500});
 if (request.headers.get('authorization') !== `Bearer ${N8N_ARTICLE_INGEST_SECRET}`) return NextResponse.json({error:'Unauthorized'},{status:401});
 const body = await request.json().catch(()=>null); if (!body || typeof body !== 'object') return NextResponse.json({error:'Invalid JSON body'},{status:400});
 const unknown = Object.keys(body).filter(k => !allowed.includes(k)); if (unknown.length) return NextResponse.json({error:`Unexpected fields: ${unknown.join(', ')}`},{status:400});
 if (!body.title || !body.slug || !body.content || !categories.includes(body.category) || (body.content_type && !contentTypes.includes(body.content_type)) || !statuses.includes(body.status || 'draft')) return NextResponse.json({error:'Invalid article fields'},{status:400});
 if (body.published_at && Number.isNaN(Date.parse(body.published_at))) return NextResponse.json({error:'published_at must be valid'},{status:400});
 if (![body.ai_confidence,body.research_score,body.freshness_score].every(score)) return NextResponse.json({error:'scores must be between 0 and 100'},{status:400});
 if (body.source_urls !== undefined && !Array.isArray(body.source_urls)) return NextResponse.json({error:'source_urls must be an array'},{status:400});
 const videoUrl = typeof body.video_url === 'string' ? body.video_url.trim() || null : body.video_url;
 if (videoUrl !== undefined && videoUrl !== null && !isValidYouTubeUrl(videoUrl)) return NextResponse.json({error:'video_url must be a valid HTTPS YouTube URL'}, {status:400});
 const sources: ArticleSource[] = Array.isArray(body.source_urls) ? body.source_urls : [];
 if (sources.some(source => !source || !isHttpUrl(source.url) || typeof source.publisher !== 'string' || !source.publisher.trim() || !['official','media','database','community','other'].includes(source.type))) return NextResponse.json({error:'source_urls contains an invalid source'},{status:400});
 if (body.status === 'scheduled' && (!body.published_at || Number.isNaN(Date.parse(body.published_at)) || Date.parse(body.published_at) <= Date.now())) return NextResponse.json({error:'scheduled published_at must be a valid future timestamp'},{status:400});
 const payload = Object.fromEntries(allowed.filter(k => body[k] !== undefined).map(k => [k,body[k]])); payload.platforms=Array.isArray(body.platforms)?body.platforms:[]; payload.genres=Array.isArray(body.genres)?body.genres:[]; payload.source_urls=sources; payload.status = body.status || 'draft'; payload.video_url = videoUrl ?? null;
 const supabase=createClient(NEXT_PUBLIC_SUPABASE_URL,SUPABASE_SERVICE_ROLE_KEY); const {data,error}=await supabase.from('articles').insert(payload).select().single(); if(error) return NextResponse.json({error:error.message},{status:400}); return NextResponse.json({article:data},{status:201});
}

