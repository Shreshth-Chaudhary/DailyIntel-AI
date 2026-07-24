import { NextRequest, NextResponse } from 'next/server';
import { getArticles, storeVerifiedArticlesInSupabase } from '@/lib/storage/supabase-client';
import { fetchLiveRssArticles } from '@/lib/news-ingestion/parser';
import { batchVerifyArticlesWithAI } from '@/lib/news-ingestion/ai-verifier';

// Server-Side In-Memory Cache for Live RSS Feed (5-minute TTL)
let cachedLiveRss: any[] = [];
let lastRssFetchTime = 0;
const RSS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const exam = searchParams.get('exam');
    const query = searchParams.get('q');
    const ministry = searchParams.get('ministry');
    const live = searchParams.get('live') !== 'false'; // Enabled by default for real-time news

    let articles = await getArticles();

    if (live) {
      const now = Date.now();
      if (cachedLiveRss.length > 0 && (now - lastRssFetchTime < RSS_CACHE_TTL_MS)) {
        // Use cached live RSS feeds
        articles = [...cachedLiveRss, ...articles];
      } else {
        const freshRss = await fetchLiveRssArticles();
        if (freshRss.length > 0) {
          // Server-side AI fact-check and isolate facts for fresh RSS items
          const verifiedRss = await batchVerifyArticlesWithAI(freshRss);
          cachedLiveRss = verifiedRss;
          lastRssFetchTime = now;

          // Store verified AI fact-checked news into Supabase DB
          await storeVerifiedArticlesInSupabase(verifiedRss);

          articles = [...verifiedRss, ...articles];
        }
      }
    }

    if (category && category !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    if (exam && exam !== 'All') {
      articles = articles.filter(a => 
        a.examRelevance.exams.some(e => e.toLowerCase() === exam.toLowerCase())
      );
    }

    if (ministry) {
      articles = articles.filter(a => a.ministry?.toLowerCase().includes(ministry.toLowerCase()));
    }

    if (query) {
      const q = query.toLowerCase();
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.keywords.some(k => k.toLowerCase().includes(q)) ||
        a.organizations.some(o => o.toLowerCase().includes(q)) ||
        a.personalities.some(p => p.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: articles.length,
      articles
    }, {
      headers: {
        'Cache-Control': 'public, max-age=180, s-maxage=300, stale-while-revalidate=600',
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
