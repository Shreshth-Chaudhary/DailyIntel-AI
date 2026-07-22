import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '@/lib/storage/supabase-client';
import { fetchLiveRssArticles } from '@/lib/news-ingestion/parser';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const exam = searchParams.get('exam');
    const query = searchParams.get('q');
    const ministry = searchParams.get('ministry');
    const live = searchParams.get('live') === 'true';

    let articles = await getArticles();

    if (live) {
      const freshRss = await fetchLiveRssArticles();
      if (freshRss.length > 0) {
        articles = [...freshRss, ...articles];
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
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
