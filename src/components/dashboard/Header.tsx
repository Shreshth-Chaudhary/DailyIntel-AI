'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Sun, 
  Moon, 
  Bell, 
  Share2, 
  ShieldCheck, 
  Layers,
  Filter,
  Bookmark,
  BookOpen
} from 'lucide-react';
import { Category, ExamType } from '@/lib/types';

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeExam: string;
  setActiveExam: (exam: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAiAssistant: () => void;
  onOpenExportModal: () => void;
  savedCount: number;
}

const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'All', label: 'All Intelligence', icon: '🌐' },
  { id: 'India', label: '🇮🇳 India', icon: '🇮🇳' },
  { id: 'International', label: '🌍 International', icon: '🌍' },
  { id: 'Defence', label: '🪖 Defence', icon: '🪖' },
  { id: 'Economy', label: '💹 Economy', icon: '💹' },
  { id: 'AI & Tech', label: '🤖 AI & Tech', icon: '🤖' },
  { id: 'Science & Environment', label: '🛰 Science', icon: '🛰' },
  { id: 'UPSC', label: '📚 UPSC Polity', icon: '📚' },
];

const EXAMS: ExamType[] = ['UPSC CSE', 'CDS', 'CAPF AC', 'AFCAT', 'NDA', 'SSB'];

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  setActiveCategory,
  activeExam,
  setActiveExam,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onOpenAiAssistant,
  onOpenExportModal,
  savedCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-bloomberg-border bg-bloomberg-bg/95 backdrop-blur-md">
      {/* Top Bloomberg Terminal Bar */}
      <div className="flex h-10 items-center justify-between px-4 text-xs font-mono text-slate-400 border-b border-bloomberg-border/50 bg-bloomberg-card/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-bloomberg-amber">
            <span className="h-2 w-2 rounded-full bg-bloomberg-green animate-pulse"></span>
            DAILYINTEL TERMINAL
          </div>
          <span className="text-slate-600">|</span>
          <span className="hidden md:inline text-slate-300">LIVE FEED: PIB • DRDO • ISRO • RBI • THE HINDU</span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-bloomberg-green font-mono">STATUS: 100% OPERATIONAL</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-400">TARGET EXAMS:</span>
            {EXAMS.map(exam => (
              <button
                key={exam}
                onClick={() => setActiveExam(activeExam === exam ? 'All' : exam)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-all ${
                  activeExam === exam
                    ? 'bg-intel-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
          </button>
        </div>
      </div>

      {/* Main Navigation & Search Row */}
      <div className="flex h-16 items-center justify-between px-4 gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-intel-600 to-indigo-700 text-white font-bold shadow-lg shadow-intel-600/20">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              DailyIntel <span className="text-xs px-1.5 py-0.5 rounded bg-intel-500/20 text-intel-400 font-mono border border-intel-500/30">AI PLATFORM</span>
            </h1>
            <p className="text-[11px] text-slate-400">Personal UPSC & Defence Research Assistant</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, date, ministry (e.g., DRDO, Repo Rate, Art 361)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-bloomberg-border bg-slate-900/90 py-2 pl-9 pr-10 text-xs text-slate-200 placeholder-slate-500 focus:border-intel-500 focus:outline-none focus:ring-1 focus:ring-intel-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-intel-600 px-3 py-2 text-xs font-semibold text-white shadow-md hover:from-indigo-500 hover:to-intel-500 transition-all border border-indigo-400/30"
          >
            <Sparkles size={15} className="text-amber-300 animate-spin-slow" />
            <span>Ask Intel AI</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 rounded-lg border border-bloomberg-border bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Share2 size={14} />
            <span className="hidden sm:inline">Export Brief</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg border border-bloomberg-border bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              title="Daily Briefing Notifications"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-bloomberg-amber"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-bloomberg-border bg-slate-900 p-4 shadow-2xl z-50 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <span className="font-semibold text-white">Daily Dispatch Status</span>
                  <span className="text-[10px] text-bloomberg-green font-mono">ACTIVE</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-800/60">
                    <span>📧 Morning Brief Email</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Delivered (07:00 AM)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-800/60">
                    <span>📱 Telegram Channel</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Synced</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-800/60">
                    <span>📓 Notion Workspace</span>
                    <span className="text-intel-400 font-mono text-[10px]">Ready to Sync</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs Scrollbar */}
      <div className="flex overflow-x-auto border-t border-bloomberg-border/70 px-4 py-2 gap-1.5 scrollbar-none">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-intel-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </header>
  );
};
