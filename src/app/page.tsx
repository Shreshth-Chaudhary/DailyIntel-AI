'use client';

import React, { useState, useEffect } from 'react';
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
import { INITIAL_ARTICLES, INITIAL_BRIEFING, INITIAL_PRACTICE_SUITE } from '@/lib/storage/mock-db';
import { RefreshCw, Filter, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [briefing, setBriefing] = useState<DailyBriefing>(INITIAL_BRIEFING);
  const [practiceSuite, setPracticeSuite] = useState<PracticeSuite>(INITIAL_PRACTICE_SUITE);

  const [currentTab, setCurrentTab] = useState<string>('feed'); // 'feed' | 'briefing' | 'practice' | 'analytics' | 'timeline' | 'bookmarks'
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeExam, setActiveExam] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['intel-def-001', 'intel-ir-003', 'intel-sci-005']);
  const [readIds, setReadIds] = useState<string[]>(['intel-def-001', 'intel-eco-002']);

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);

  // Fetch initial articles & live RSS
  useEffect(() => {
    fetchNews(false);
  }, []);

  const fetchNews = async (fetchLive = false) => {
    setIsFetchingLive(true);
    try {
      const url = `/api/news${fetchLive ? '?live=true' : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.articles.length > 0) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.warn('News API fetch error, using local dataset:', err);
    } finally {
      setIsFetchingLive(false);
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

  // Filtered Articles Computation
  const filteredArticles = articles.filter(a => {
    // Category filter
    if (activeCategory !== 'All' && a.category.toLowerCase() !== activeCategory.toLowerCase()) {
      return false;
    }
    // Exam filter
    if (activeExam !== 'All' && !a.examRelevance.exams.some(e => e.toLowerCase() === activeExam.toLowerCase())) {
      return false;
    }
    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSummary = a.summary.toLowerCase().includes(q);
      const matchKeywords = a.keywords.some(k => k.toLowerCase().includes(q));
      const matchOrg = a.organizations.some(o => o.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchKeywords && !matchOrg) return false;
    }
    // Tab specific
    if (currentTab === 'bookmarks' && !bookmarkedIds.includes(a.id)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-bloomberg-bg text-slate-100 flex flex-col">
      {/* Top Header */}
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeExam={activeExam}
        setActiveExam={setActiveExam}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        savedCount={bookmarkedIds.length}
      />

      {/* Trending Topics Ticker */}
      <TrendingBar onSelectTopic={(topic) => setSearchQuery(topic)} />

      {/* Main Body Grid */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          savedCount={bookmarkedIds.length}
          readCount={readIds.length}
          totalCount={articles.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
          {/* Main Navigation Tab Header for Mobile */}
          <div className="flex lg:hidden overflow-x-auto gap-2 border-b border-bloomberg-border pb-2 scrollbar-none">
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
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  currentTab === tab.id
                    ? 'bg-intel-600 text-white'
                    : 'bg-slate-900 text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* VIEW 1: Morning Briefing */}
          {currentTab === 'briefing' && (
            <MorningBriefingView
              briefing={briefing}
              onOpenExportModal={() => setIsExportModalOpen(true)}
            />
          )}

          {/* VIEW 2: UPSC & Defence Practice Suite */}
          {currentTab === 'practice' && (
            <PracticeQuizSuite practiceSuite={practiceSuite} />
          )}

          {/* VIEW 3: Sector Heatmap Analytics */}
          {currentTab === 'analytics' && (
            <div className="space-y-6">
              <CategoryHeatmap
                articles={articles}
                onSelectCategory={(cat) => {
                  setActiveCategory(cat);
                  setCurrentTab('feed');
                }}
              />
              <NewsTimeline
                articles={articles}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          )}

          {/* VIEW 4: News Timeline */}
          {currentTab === 'timeline' && (
            <NewsTimeline
              articles={articles}
              onSelectArticle={handleSelectArticle}
            />
          )}

          {/* VIEW 5: Feed & Bookmarks */}
          {(currentTab === 'feed' || currentTab === 'bookmarks') && (
            <div className="space-y-6">
              {/* Category Heatmap Banner on Feed View */}
              {currentTab === 'feed' && activeCategory === 'All' && !searchQuery && (
                <CategoryHeatmap
                  articles={articles}
                  onSelectCategory={(cat) => setActiveCategory(cat)}
                />
              )}

              {/* Feed Control Bar */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                    {currentTab === 'bookmarks' ? 'BOOKMARKED INTELLIGENCE' : 'REAL-TIME INTELLIGENCE FEED'}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-intel-400">
                      {filteredArticles.length} Briefs
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    {activeCategory !== 'All' ? `Filtered by ${activeCategory}` : 'Curated intelligence stream ranked by strategic importance.'}
                  </p>
                </div>

                <button
                  onClick={() => fetchNews(true)}
                  disabled={isFetchingLive}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-bloomberg-border bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  <RefreshCw size={14} className={isFetchingLive ? 'animate-spin text-intel-400' : ''} />
                  <span>{isFetchingLive ? 'Fetching Feeds...' : 'Fetch Live RSS'}</span>
                </button>
              </div>

              {/* Article Cards Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-12 text-center space-y-3">
                  <ShieldAlert size={36} className="mx-auto text-slate-600" />
                  <h3 className="text-base font-bold text-slate-200">No Intelligence Briefs Found</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    No articles match your current search query or category filter. Try clearing filters.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory('All');
                      setActiveExam('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-lg bg-intel-600 text-white text-xs font-semibold hover:bg-intel-500 transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

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
