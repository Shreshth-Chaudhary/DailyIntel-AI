import { createClient } from '@supabase/supabase-js';
import { Article, DailyBriefing, PracticeSuite } from '../types';
import { INITIAL_ARTICLES, INITIAL_BRIEFING, INITIAL_PRACTICE_SUITE } from './mock-db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Local storage fallback handlers for client-side persistence
const STORAGE_KEYS = {
  ARTICLES: 'dailyintel_articles_v1',
  BRIEFING: 'dailyintel_briefing_v1',
  PRACTICE: 'dailyintel_practice_v1',
  BOOKMARKS: 'dailyintel_bookmarks_v1',
};

export async function getArticles(): Promise<Article[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('publishedAt', { ascending: false });
      if (!error && data && data.length > 0) return data as Article[];
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local intel store:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        // Fallback to initial
      }
    }
  }

  return INITIAL_ARTICLES;
}

export async function getDailyBriefing(): Promise<DailyBriefing> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('briefings')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();
      if (!error && data) return data as DailyBriefing;
    } catch (err) {
      console.warn('Supabase briefing fetch failed, falling back:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.BRIEFING);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
  }

  return INITIAL_BRIEFING;
}

export async function getPracticeSuite(): Promise<PracticeSuite> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('practice_suites')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();
      if (!error && data) return data as PracticeSuite;
    } catch (err) {
      console.warn('Supabase practice fetch failed, falling back:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.PRACTICE);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }
  }

  return INITIAL_PRACTICE_SUITE;
}

/**
 * Stores AI fact-checked verified articles directly into Supabase database
 */
export async function storeVerifiedArticlesInSupabase(articles: Article[]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('articles')
        .upsert(articles, { onConflict: 'id' });
      if (error) {
        console.warn('Supabase articles upsert warning:', error.message);
      } else {
        console.log(`Successfully stored ${articles.length} AI fact-checked articles in Supabase.`);
        return true;
      }
    } catch (err) {
      console.warn('Supabase storeVerifiedArticlesInSupabase error:', err);
    }
  }

  // Backup in browser localStorage if in browser environment
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    } catch (e) {}
  }

  return false;
}
