import { NextRequest, NextResponse } from 'next/server';
import { fetchLiveRssArticles } from '@/lib/news-ingestion/parser';
import { supabase, isSupabaseConfigured } from '@/lib/storage/supabase-client';
import { isGeminiConfigured, analyzeArticleWithGemini } from '@/lib/ai/gemini';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Verify Cron Secret if set in production
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized Cron Invocation' }, { status: 401 });
    }

    console.log('[Cron Ingestion] Starting scheduled 6-hour feed refresh...');
    const parsedArticles = await fetchLiveRssArticles();
    let insertedCount = 0;

    if (isSupabaseConfigured && supabase) {
      for (const article of parsedArticles) {
        // Enforce Gemini AI enhancement if configured
        if (isGeminiConfigured && article.content) {
          const aiAnalysis = await analyzeArticleWithGemini(article.title, article.summary);
          if (aiAnalysis) {
            article.importanceScore = aiAnalysis.strategicRating ?? article.importanceScore;
            article.keyFacts = aiAnalysis.keyPoints ?? article.keyFacts;
            article.examRelevance = {
              ...article.examRelevance,
              whyItMatters: aiAnalysis.upscSignificance ?? article.examRelevance.whyItMatters
            };
          }
        }

        const { error } = await supabase.from('articles').upsert(article, { onConflict: 'sourceUrl' });
        if (!error) insertedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Cron Ingestion completed. Fetched ${parsedArticles.length} items, synced ${insertedCount} to Supabase.`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('[Cron Ingestion Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
