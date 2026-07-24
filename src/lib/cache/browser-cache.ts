/**
 * DailyIntel AI - Browser Storage & Caching Layer
 * Provides high-speed instant warm-start hydration & local storage persistence
 * Author: Shreshth Chaudhary
 */

import { Article, DailyBriefing, PracticeSuite } from '@/lib/types';

const CACHE_KEYS = {
  ARTICLES: 'dailyintel_cached_articles_v3',
  ARTICLES_TIMESTAMP: 'dailyintel_articles_ts_v3',
  BOOKMARKS: 'dailyintel_bookmarked_ids_v3',
  READ_IDS: 'dailyintel_read_ids_v3',
  PREFERENCES: 'dailyintel_user_prefs_v3',
  BRIEFING: 'dailyintel_cached_briefing_v3',
  PRACTICE: 'dailyintel_cached_practice_v3',
};

// 10 Minutes Cache TTL for articles
const ARTICLES_TTL_MS = 10 * 60 * 1000;

export const browserCache = {
  /**
   * Get cached articles from localStorage or sessionStorage with TTL check
   */
  getCachedArticles: (): Article[] | null => {
    if (typeof window === 'undefined') return null;
    try {
      const ts = localStorage.getItem(CACHE_KEYS.ARTICLES_TIMESTAMP);
      const data = localStorage.getItem(CACHE_KEYS.ARTICLES);
      if (ts && data) {
        const age = Date.now() - parseInt(ts, 10);
        if (age < ARTICLES_TTL_MS) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('browserCache getCachedArticles error:', e);
    }
    return null;
  },

  /**
   * Save articles into browser localStorage with timestamp
   */
  setCachedArticles: (articles: Article[]): void => {
    if (typeof window === 'undefined') return;
    try {
      if (Array.isArray(articles) && articles.length > 0) {
        localStorage.setItem(CACHE_KEYS.ARTICLES, JSON.stringify(articles));
        localStorage.setItem(CACHE_KEYS.ARTICLES_TIMESTAMP, Date.now().toString());
      }
    } catch (e) {
      console.warn('browserCache setCachedArticles error:', e);
    }
  },

  /**
   * Get bookmarked article IDs from local storage
   */
  getCachedBookmarks: (): string[] | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(CACHE_KEYS.BOOKMARKS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // Fallback
    }
    return null;
  },

  /**
   * Save bookmarked article IDs
   */
  setCachedBookmarks: (ids: string[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CACHE_KEYS.BOOKMARKS, JSON.stringify(ids));
    } catch (e) {
      // Fallback
    }
  },

  /**
   * Get read article IDs
   */
  getCachedReadIds: (): string[] | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(CACHE_KEYS.READ_IDS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // Fallback
    }
    return null;
  },

  /**
   * Save read article IDs
   */
  setCachedReadIds: (ids: string[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CACHE_KEYS.READ_IDS, JSON.stringify(ids));
    } catch (e) {
      // Fallback
    }
  },

  /**
   * Save user dashboard preferences (dark mode, tab, category, exam)
   */
  getUserPreferences: (): { darkMode?: boolean; currentTab?: string; activeCategory?: string; activeExam?: string } | null => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(CACHE_KEYS.PREFERENCES);
      if (data) return JSON.parse(data);
    } catch (e) {
      // Fallback
    }
    return null;
  },

  setUserPreferences: (prefs: { darkMode?: boolean; currentTab?: string; activeCategory?: string; activeExam?: string }): void => {
    if (typeof window === 'undefined') return;
    try {
      const current = browserCache.getUserPreferences() || {};
      const updated = { ...current, ...prefs };
      localStorage.setItem(CACHE_KEYS.PREFERENCES, JSON.stringify(updated));
    } catch (e) {
      // Fallback
    }
  },

  /**
   * Clear all cache keys
   */
  clearCache: (): void => {
    if (typeof window === 'undefined') return;
    try {
      Object.values(CACHE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (e) {
      // Fallback
    }
  }
};
