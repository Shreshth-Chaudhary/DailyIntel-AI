'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article, DailyBriefing, PracticeSuite } from '@/lib/types';
import { Header } from '@/components/dashboard/Header';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TrendingBar } from '@/components/dashboard/TrendingBar';
import { CategoryHeatmap } from '@/components/dashboard/CategoryHeatmap';
import { NewsTimeline } from '@/components/dashboard/NewsTimeline';
import { ArticleCard } from '@/components/dashboard/ArticleCard';
import { ArticleDetailModal } from '@/components/dashboard/ArticleDetailModal';
import { MorningBriefingView } from '@/components/briefing/MorningBriefingView';
import { PracticeQuizSuite } from '@/components/practice/PracticeQuizSuite';
import { IntelAiAssistant } from '@/components/ai/IntelAiAssistant';
import { ExportModal } from '@/components/export/ExportModal';
import { TodayHistoryWidget } from '@/components/dashboard/TodayHistoryWidget';
import { ExamReadinessDashboard } from '@/components/dashboard/ExamReadinessDashboard';
import { MonthlyDigestView } from '@/components/briefing/MonthlyDigestView';
import { INITIAL_ARTICLES, INITIAL_BRIEFING, INITIAL_PRACTICE_SUITE } from '@/lib/storage/mock-db';
import { browserCache } from '@/lib/cache/browser-cache';
import { RefreshCw, ShieldAlert, FileText, Layers, Clock, Sparkles, X, Calendar, Filter } from 'lucide-react';

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [briefing, setBriefing] = useState<DailyBriefing>(INITIAL_BRIEFING);
  const [practiceSuite, setPracticeSuite] = useState<PracticeSuite>(INITIAL_PRACTICE_SUITE);

  const [currentTab, setCurrentTab] = useState<string>('feed'); // 'feed' | 'briefing' | 'practice' | 'mentor' | 'digest' | 'analytics' | 'timeline' | 'bookmarks'
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeExam, setActiveExam] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Date Filter & Custom Range states
  const [dateFilterPreset, setDateFilterPreset] = useState<string>('all'); // 'all' | 'today' | 'yesterday' | '7days' | '30days' | 'month' | 'custom'
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('All');
  const [importanceFilter, setImportanceFilter] = useState<string>('All');

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['intel-def-001', 'intel-ir-003', 'intel-sci-005']);
  const [readIds, setReadIds] = useState<string[]>(['intel-def-001', 'intel-eco-002']);

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);
  const [showWelcomeToast, setShowWelcomeToast] = useState<boolean>(false);
  const [showAvgScoreTooltip, setShowAvgScoreTooltip] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Real-time Auto Refresh & Skeleton Loading state
  const [isLoadingFeed, setIsLoadingFeed] = useState<boolean>(false);
  const [newArticlesCount, setNewArticlesCount] = useState<number>(0);
  const [showLiveUpdateToast, setShowLiveUpdateToast] = useState<boolean>(false);

  // 1. Instant Warm-Start Hydration from Browser Storage (<10ms)
  useEffect(() => {
    try {
      const cached = browserCache.getCachedArticles();
      if (cached && cached.length > 0) {
        setArticles(cached);
      }
      const cachedBookmarks = browserCache.getCachedBookmarks();
      if (cachedBookmarks) {
        setBookmarkedIds(cachedBookmarks);
      }
      const cachedRead = browserCache.getCachedReadIds();
      if (cachedRead) {
        setReadIds(cachedRead);
      }
      const prefs = browserCache.getUserPreferences();
      if (prefs) {
        if (typeof prefs.darkMode === 'boolean') setDarkMode(prefs.darkMode);
        if (prefs.currentTab) setCurrentTab(prefs.currentTab);
        if (prefs.activeCategory) setActiveCategory(prefs.activeCategory);
        if (prefs.activeExam) setActiveExam(prefs.activeExam);
      }
    } catch (e) {
      console.warn('Hydration cache load error:', e);
    }
  }, []);

  // Sync Preferences to Browser Cache
  useEffect(() => {
    browserCache.setUserPreferences({ darkMode, currentTab, activeCategory, activeExam });
  }, [darkMode, currentTab, activeCategory, activeExam]);

  // Sync Bookmarks to Browser Cache
  useEffect(() => {
    browserCache.setCachedBookmarks(bookmarkedIds);
  }, [bookmarkedIds]);

  // Sync Read IDs to Browser Cache
  useEffect(() => {
    browserCache.setCachedReadIds(readIds);
  }, [readIds]);

  // Check if welcome message was already shown in this session
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem('dailyintel_welcome_shown');
      if (!alreadyShown) {
        setShowWelcomeToast(true);
        sessionStorage.setItem('dailyintel_welcome_shown', 'true');
        const timer = setTimeout(() => {
          setShowWelcomeToast(false);
        }, 8000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  // Dynamic Theme Switching (Light / Dark Mode Toggle)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch initial articles & live RSS
  useEffect(() => {
    fetchNews(false);
  }, []);

  // 60-Second Auto Refresh Background Polling (Filter-Aware)
  useEffect(() => {
    const autoRefreshInterval = setInterval(() => {
      fetchNews(true, true); // Background fetch
    }, 60000); // 60 seconds

    return () => clearInterval(autoRefreshInterval);
  }, [dateFilterPreset, activeCategory, activeExam, searchQuery]);

  // Instant Filter Switcher with Skeleton Loading
  const handleDatePresetChange = (preset: string) => {
    setIsLoadingFeed(true);
    setDateFilterPreset(preset);
    setTimeout(() => setIsLoadingFeed(false), 200);
  };

  const handleCategoryChange = (cat: string) => {
    setIsLoadingFeed(true);
    setActiveCategory(cat);
    // Clear search query on category switch to prevent zero-match cross-filter conflicts
    setSearchQuery('');
    setTimeout(() => setIsLoadingFeed(false), 200);
  };

  const handleExamChange = (exam: string) => {
    setIsLoadingFeed(true);
    setActiveExam(exam);
    setTimeout(() => setIsLoadingFeed(false), 200);
  };

  const handleSearchChange = (query: string) => {
    setIsLoadingFeed(true);
    setSearchQuery(query);
    setTimeout(() => setIsLoadingFeed(false), 150);
  };

  const fetchNews = async (fetchLive = false, isBackground = false) => {
    if (!isBackground) setIsFetchingLive(true);
    try {
      const url = `/api/news${fetchLive ? '?live=true' : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.articles.length > 0) {
        // Cache fetched dataset locally for instant subsequent reloads
        browserCache.setCachedArticles(data.articles);

        if (isBackground) {
          // Check if there are new articles not present in current list
          const existingIds = new Set(articles.map(a => a.id));
          const newCount = data.articles.filter((a: Article) => !existingIds.has(a.id)).length;
          if (newCount > 0) {
            setNewArticlesCount(newCount);
            setShowLiveUpdateToast(true);
            setArticles(data.articles);
          }
        } else {
          setArticles(data.articles);
        }
      }
    } catch (err) {
      console.warn('News API fetch error, using local dataset:', err);
    } finally {
      if (!isBackground) setIsFetchingLive(false);
    }
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    if (!readIds.includes(article.id)) {
      setReadIds(prev => [...prev, article.id]);
    }
  };

  // Filtered Articles Computation with Date Archive & Robust Category Normalization
  const filteredArticles = articles.filter(a => {
    // Robust Category Normalization
    if (activeCategory !== 'All') {
      const targetCat = activeCategory.toLowerCase();
      const artCat = a.category.toLowerCase();
      const artSubcat = (a.subcategory || '').toLowerCase();

      const isSci = (targetCat.includes('sci') || targetCat.includes('env')) && (artCat.includes('sci') || artCat.includes('env') || artCat.includes('space') || artSubcat.includes('space'));
      const isAi = (targetCat.includes('ai') || targetCat.includes('tech')) && (artCat.includes('ai') || artCat.includes('tech') || artSubcat.includes('ai') || artSubcat.includes('tech'));
      const isDef = (targetCat.includes('def') || targetCat.includes('milit')) && (artCat.includes('def') || artCat.includes('milit') || artSubcat.includes('missile'));
      const isEco = (targetCat.includes('eco') || targetCat.includes('finan') || targetCat.includes('bank')) && (artCat.includes('eco') || artCat.includes('finan') || artCat.includes('bank'));
      const isIr = (targetCat.includes('internat') || targetCat.includes('ir')) && (artCat.includes('internat') || artCat.includes('ir') || artCat.includes('diplomacy'));
      const isPol = (targetCat.includes('upsc') || targetCat.includes('polit') || targetCat.includes('law')) && (artCat.includes('upsc') || artCat.includes('polit') || artCat.includes('law'));

      const matchCategory =
        artCat.includes(targetCat) ||
        targetCat.includes(artCat) ||
        isSci || isAi || isDef || isEco || isIr || isPol;

      if (!matchCategory) return false;
    }

    // Exam filter
    if (activeExam !== 'All' && !a.examRelevance.exams.some(e => e.toLowerCase().includes(activeExam.toLowerCase()))) {
      return false;
    }
    // Source filter
    if (sourceFilter !== 'All' && !a.source.toLowerCase().includes(sourceFilter.toLowerCase())) {
      return false;
    }
    // Importance filter
    if (importanceFilter === 'High' && a.importanceScore < 8.5) return false;
    if (importanceFilter === 'Medium' && (a.importanceScore < 7.0 || a.importanceScore >= 8.5)) return false;

    // Smart Strict Date Archive Presets
    const pubDateStr = a.publishedAt.slice(0, 10); // YYYY-MM-DD
    const pubTime = new Date(a.publishedAt).getTime();
    
    // Find latest published date in current dataset to handle timezone/mock dates cleanly
    const maxDatasetTime = articles.length > 0
      ? Math.max(...articles.map(art => new Date(art.publishedAt).getTime()))
      : new Date().getTime();
    
    const maxDateObj = new Date(maxDatasetTime);
    const latestDateStr = maxDateObj.toISOString().slice(0, 10);
    
    const yestObj = new Date(maxDatasetTime);
    yestObj.setDate(maxDateObj.getDate() - 1);
    const yesterdayDateStr = yestObj.toISOString().slice(0, 10);

    const daysDiffFromLatest = (maxDatasetTime - pubTime) / (1000 * 60 * 60 * 24);

    if (dateFilterPreset === 'today') {
      // Strictly match today's YYYY-MM-DD date
      if (pubDateStr !== latestDateStr && pubDateStr !== new Date().toISOString().slice(0, 10)) {
        return false;
      }
    } else if (dateFilterPreset === 'yesterday') {
      // Strictly match yesterday's YYYY-MM-DD date
      if (pubDateStr !== yesterdayDateStr) {
        return false;
      }
    } else if (dateFilterPreset === '7days') {
      // Allow articles within 7 days window
      if (daysDiffFromLatest > 7.5) {
        return false;
      }
    } else if (dateFilterPreset === '30days') {
      // Allow articles within 30 days window
      if (daysDiffFromLatest > 30.5) {
        return false;
      }
    } else if (dateFilterPreset === 'custom' && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      end.setHours(23, 59, 59);
      if (pubTime < start.getTime() || pubTime > end.getTime()) return false;
    }

    // Smart Tokenized & Fuzzy Search Query matching across all archived fields
    if (searchQuery) {
      const queryRaw = searchQuery.trim().toLowerCase();
      // Synonyms and number normalization
      const queryNorm = queryRaw
        .replace(/10k/g, '10000')
        .replace(/repo rate/g, 'repo')
        .replace(/tot/g, 'transfer of technology');

      const tokens = queryNorm.split(/\s+/).filter(t => t.length > 1);

      const targetText = (
        a.title + ' ' +
        a.summary + ' ' +
        a.content + ' ' +
        a.category + ' ' +
        (a.subcategory || '') + ' ' +
        a.source + ' ' +
        a.keywords.join(' ') + ' ' +
        a.organizations.join(' ') + ' ' +
        a.personalities.join(' ')
      ).toLowerCase();

      // Check if exact phrase or any significant token matches target text
      const matchesExact = targetText.includes(queryRaw) || targetText.includes(queryNorm);
      const matchesTokens = tokens.some(t => targetText.includes(t));

      if (!matchesExact && !matchesTokens) {
        return false;
      }
    }

    // Bookmarks Tab
    if (currentTab === 'bookmarks' && !bookmarkedIds.includes(a.id)) {
      return false;
    }
    return true;
  });

  // Stats for the metrics row
  const todayStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const avgScore = articles.length > 0
    ? (articles.reduce((sum, a) => sum + (a.importanceScore || 0), 0) / articles.length).toFixed(1)
    : '0.0';

  // Count-up animation
  const [dispArticles, setDispArticles] = React.useState(0);
  React.useEffect(() => {
    const target = articles.length;
    if (target === 0) return;
    let current = 0;
    const step = Math.ceil(target / 20);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      setDispArticles(current);
      if (current >= target) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [articles.length]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--di-bg)', color: 'var(--di-text)' }}>

      {/* Top Header */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        activeExam={activeExam}
        setActiveExam={handleExamChange}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        savedCount={bookmarkedIds.length}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Floating Welcome Toast on Initial Visit / Long Return */}
      {showWelcomeToast && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15 }}
          className="fixed top-16 right-6 z-50 max-w-sm p-4 rounded-xl bg-white dark:bg-stone-900 border border-blue-200 dark:border-blue-800 shadow-xl flex items-start gap-3 animate-fade-up"
        >
          <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
            🇮🇳
          </div>
          <div className="flex-1 text-xs">
            <p className="font-semibold text-stone-900 dark:text-stone-100">
              Jai Hind!
            </p>
            <p className="text-stone-600 dark:text-stone-300 mt-0.5 leading-snug">
              Welcome to <strong>DailyIntel AI</strong> - your elite research assistant engineered by <strong>Shreshth Chaudhary</strong>.
            </p>
          </div>
          <button
            onClick={() => setShowWelcomeToast(false)}
            className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-0.5"
            title="Dismiss"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}

      {/* Floating 60-Second Auto Refresh Live Notification Toast */}
      {showLiveUpdateToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border border-blue-500/50 shadow-2xl flex items-center gap-3 animate-fade-up text-xs font-semibold"
        >
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>🟢 {newArticlesCount} New Intelligence Articles Available</span>
          <button
            onClick={() => {
              setShowLiveUpdateToast(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition-colors"
          >
            Refresh Feed
          </button>
          <button
            onClick={() => setShowLiveUpdateToast(false)}
            className="text-stone-400 hover:text-white p-0.5"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}

      {/* Trending Topics Ticker */}
      <TrendingBar onSelectTopic={(topic) => setSearchQuery(topic)} articles={articles} />

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 z-50 lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {[
                  { id: 'feed', label: "Today's Feed", emoji: '📰' },
                  { id: 'timeline', label: 'Date Archive', emoji: '📅' },
                  { id: 'briefing', label: 'Morning Briefing', emoji: '📖' },
                  { id: 'practice', label: 'Practice Quiz', emoji: '❓' },
                  { id: 'mentor', label: 'AI Mentor', emoji: '🏅' },
                  { id: 'digest', label: 'Monthly Digest', emoji: '📄' },
                  { id: 'analytics', label: 'Sector Heatmap', emoji: '📈' },
                  { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrentTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      currentTab === item.id
                        ? 'bg-[#7a5c48]/10 text-[#7a5c48] dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{item.emoji}</span><span>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-stone-500 font-medium">Reading Progress</span>
                  <span className="font-bold text-[#7a5c48] dark:text-[#d8c6ba]">{Math.round((readIds.length / Math.max(articles.length, 1)) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-stone-200 dark:bg-stone-700">
                  <motion.div
                    className="h-full bg-[#7a5c48] dark:bg-[#d8c6ba] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round((readIds.length / Math.max(articles.length, 1)) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="h-7 w-7 rounded-full bg-[#7a5c48] text-white text-xs font-bold flex items-center justify-center shrink-0">SC</div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Shreshth Chaudhary</p>
                    <p className="text-[10px] text-stone-400 font-mono">Chief Architect</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Body Grid */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          savedCount={bookmarkedIds.length}
          readCount={readIds.length}
          totalCount={articles.length}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Main Content Area */}
        <main className="main-content">

          {/* Page Title & Controls Header */}
          {(currentTab === 'feed' || currentTab === 'bookmarks') && (
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                    {currentTab === 'bookmarks' ? 'Saved Intelligence' : "Today's Intelligence Feed"}
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Curated current affairs mapped to UPSC CSE &amp; Defence blueprints · 22 July 2026
                  </p>
                </div>

                <button
                  onClick={() => fetchNews(true)}
                  disabled={isFetchingLive}
                  className="btn btn-secondary btn-sm"
                >
                  <RefreshCw size={13} className={isFetchingLive ? 'animate-spin' : ''} />
                  <span>{isFetchingLive ? 'Updating...' : 'Refresh'}</span>
                </button>
              </div>

              {/* 4 Stat Cards & Today in History Widget Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <motion.div className="stat-card" whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.15 }}>
                    <div className="label">Articles</div>
                    <div className="value">{dispArticles}</div>
                  </motion.div>
                  <motion.div className="stat-card" whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.15 }}>
                    <div className="label">Categories</div>
                    <div className="value">6</div>
                  </motion.div>
                  <motion.div className="stat-card" whileHover={{ y: -2, scale: 1.02 }} transition={{ duration: 0.15 }}>
                    <div className="label">Last Updated</div>
                    <div className="value">{todayStr}</div>
                  </motion.div>
                  <div 
                    className="stat-card relative cursor-pointer group hover:border-blue-500/50 transition-colors"
                    onClick={() => setShowAvgScoreTooltip(!showAvgScoreTooltip)}
                    title="Click to view AI Importance Rating legend"
                  >
                    <div className="label flex items-center justify-between gap-1">
                      <span>Avg Score</span>
                      <span className="text-[10px] text-blue-500 bg-blue-50 dark:bg-blue-950 px-1 py-0.2 rounded font-bold">
                        ?
                      </span>
                    </div>
                    <div className="value flex items-baseline gap-1">
                      <span>{avgScore}</span>
                      <span className="text-[10px] text-stone-400 font-normal">/10</span>
                    </div>

                    {/* Popover Legend Tooltip */}
                    {showAvgScoreTooltip && (
                      <div 
                        className="absolute left-0 top-full mt-2 z-50 w-72 p-3 rounded-xl bg-white dark:bg-stone-900 border border-blue-200 dark:border-blue-800 shadow-2xl text-xs space-y-2 animate-fade-up text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-1.5 font-bold text-stone-900 dark:text-stone-100">
                          <span className="flex items-center gap-1 text-blue-600">
                            💡 What is Avg Score ({avgScore})?
                          </span>
                          <button 
                            onClick={() => setShowAvgScoreTooltip(false)} 
                            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                          >
                            ×
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug">
                          Average AI Strategic Importance rating of all active articles in your current feed (1.0 to 10.0 scale).
                        </p>
                        <div className="space-y-1 pt-1 text-[11px]">
                          <div className="flex items-center justify-between p-1.5 rounded bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-medium">
                            <span>🔥 9.0 – 10.0</span>
                            <span className="font-bold">Critical / High Priority</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium">
                            <span>🟠 7.5 – 8.9</span>
                            <span className="font-bold">High / Medium Priority</span>
                          </div>
                          <div className="flex items-center justify-between p-1.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium">
                            <span>🟡 Below 7.5</span>
                            <span className="font-bold">Low Priority</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-stone-400 italic pt-0.5">
                          Higher scores indicate must-read topics for UPSC &amp; Defence exams.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Corner Live Self-Updating Clock & Today in History Widget */}
                <div className="lg:col-span-1">
                  <TodayHistoryWidget />
                </div>
              </div>

              {/* Top Date Preset & Exam Filter Chips Row */}
              <div className="p-3 mb-4 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 dark:text-stone-100">
                    <Calendar size={14} className="text-blue-600" />
                    <span>Historical Archive &amp; Date Presets:</span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap">
                    {[
                      { id: 'all', label: 'All Dates' },
                      { id: 'today', label: 'Today' },
                      { id: 'yesterday', label: 'Yesterday' },
                      { id: '7days', label: '7 Days' },
                      { id: '30days', label: '30 Days' },
                      { id: 'custom', label: 'Custom Range' },
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleDatePresetChange(p.id)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                          dateFilterPreset === p.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Date Range Picker */}
                {dateFilterPreset === 'custom' && (
                  <div className="flex items-center gap-3 pt-2 border-t border-stone-200 dark:border-stone-700 animate-fade-up">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-600 dark:text-stone-300">From:</span>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        className="px-2 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-600 dark:text-stone-300">To:</span>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        className="px-2 py-1 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs"
                      />
                    </div>
                    {(customStartDate || customEndDate) && (
                      <button
                        onClick={() => { setCustomStartDate(''); setCustomEndDate(''); }}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Clear Range
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Category Filter Pills Row */}
              <div className="filter-tabs">
                {[
                  { id: 'All', label: 'All Categories' },
                  { id: 'Defence', label: 'Defence' },
                  { id: 'Economy', label: 'Economy' },
                  { id: 'International', label: 'International' },
                  { id: 'AI & Tech', label: 'AI & Tech' },
                  { id: 'Science & Environment', label: 'Science' },
                  { id: 'UPSC', label: 'UPSC Polity' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Tab Nav */}
          <div className="flex lg:hidden overflow-x-auto gap-1 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800 scrollbar-none">
            {[
              { id: 'feed', label: 'Feed' },
              { id: 'briefing', label: 'Briefing' },
              { id: 'practice', label: 'Practice' },
              { id: 'analytics', label: 'Heatmap' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'bookmarks', label: 'Saved' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap ${
                  currentTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-stone-500 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
          {/* VIEW 1: Morning Briefing */}
          {currentTab === 'briefing' && (
            <motion.div key="briefing" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <MorningBriefingView briefing={briefing} onOpenExportModal={() => setIsExportModalOpen(true)} />
            </motion.div>
          )}

          {/* VIEW 2: Practice Suite */}
          {currentTab === 'practice' && (
            <motion.div key="practice" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <PracticeQuizSuite practiceSuite={practiceSuite} />
            </motion.div>
          )}

          {/* VIEW 2.5: AI Mentor */}
          {currentTab === 'mentor' && (
            <motion.div key="mentor" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <ExamReadinessDashboard />
            </motion.div>
          )}

          {/* VIEW 2.6: Monthly Digest */}
          {currentTab === 'digest' && (
            <motion.div key="digest" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <MonthlyDigestView articles={articles} />
            </motion.div>
          )}

          {/* VIEW 3: Sector Heatmap */}
          {currentTab === 'analytics' && (
            <motion.div key="analytics" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }} className="space-y-6">
              <CategoryHeatmap articles={articles} onSelectCategory={(cat) => { setActiveCategory(cat); setCurrentTab('feed'); }} />
              <NewsTimeline articles={articles} onSelectArticle={handleSelectArticle} />
            </motion.div>
          )}

          {/* VIEW 4: News Timeline */}
          {currentTab === 'timeline' && (
            <motion.div key="timeline" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22 }}>
              <NewsTimeline articles={articles} onSelectArticle={handleSelectArticle} />
            </motion.div>
          )}

          {/* VIEW 5: Feed & Bookmarks Grid */}
          {(currentTab === 'feed' || currentTab === 'bookmarks') && (
            <motion.div key="feed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {isLoadingFeed ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <div key={n} className="card p-5 space-y-4 animate-pulse">
                      <div className="flex items-center justify-between">
                        <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800 rounded"></div>
                        <div className="h-4 w-16 bg-stone-200 dark:bg-stone-800 rounded"></div>
                      </div>
                      <div className="h-5 w-3/4 bg-stone-300 dark:bg-stone-700 rounded"></div>
                      <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded"></div>
                      <div className="h-16 bg-stone-200 dark:bg-stone-800 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredArticles.map(article => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onSelectArticle={handleSelectArticle}
                      onToggleBookmark={handleToggleBookmark}
                      isBookmarked={bookmarkedIds.includes(article.id)}
                      isRead={readIds.includes(article.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="card text-center py-16 space-y-3">
                  <ShieldAlert size={32} className="mx-auto text-stone-400" />
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">No Articles Found</h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    No articles match your current filters. Try resetting the category or search query.
                  </p>
                  <button
                    onClick={() => { handleCategoryChange('All'); handleExamChange('All'); handleSearchChange(''); handleDatePresetChange('all'); }}
                    className="btn btn-primary btn-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
          </AnimatePresence>
        </main>
      </div>

      {/* Clean Minimal Footer */}
      <footer className="app-footer">
        <div className="flex items-center gap-3">
          <span className="font-medium text-stone-700 dark:text-stone-300">DailyIntel AI</span>
          <span>•</span>
          <span>Created by Shreshth Chaudhary</span>
        </div>
        <div>
          <span>UPSC CSE · CDS · CAPF · Defence Intelligence</span>
        </div>
      </footer>

      {/* Article Detail Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={selectedArticle ? bookmarkedIds.includes(selectedArticle.id) : false}
      />

      {/* AI Assistant Drawer */}
      <IntelAiAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
