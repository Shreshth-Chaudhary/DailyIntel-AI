'use client';

import React from 'react';
import { 
  Newspaper, 
  BookOpen, 
  HelpCircle, 
  TrendingUp, 
  Clock, 
  Bookmark, 
  Award,
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  savedCount: number;
  readCount: number;
  totalCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  savedCount,
  readCount,
  totalCount,
}) => {
  const readPercentage = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  const NAV_ITEMS = [
    { id: 'feed', label: 'Intelligence Feed', icon: Newspaper, count: totalCount },
    { id: 'briefing', label: 'Morning Briefing', icon: BookOpen, badge: 'DAILY' },
    { id: 'practice', label: 'UPSC & Defence Practice', icon: HelpCircle, badge: 'QUIZ' },
    { id: 'analytics', label: 'Sector Heatmap', icon: TrendingUp },
    { id: 'timeline', label: 'News Timeline', icon: Clock },
    { id: 'bookmarks', label: 'Saved Intel', icon: Bookmark, count: savedCount },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-bloomberg-border bg-bloomberg-bg p-4 flex flex-col justify-between hidden lg:flex min-h-[calc(100vh-6.5rem)]">
      <div className="space-y-6">
        {/* Navigation Items */}
        <div>
          <h3 className="px-3 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Intelligence Hub
          </h3>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-intel-600/20 text-intel-400 border border-intel-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? 'text-intel-400' : 'text-slate-500'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-bloomberg-amber/20 text-bloomberg-amber border border-bloomberg-amber/30">
                      {item.badge}
                    </span>
                  )}
                  {typeof item.count === 'number' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Reading Progress Widget */}
        <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-bloomberg-green" />
              Reading Progress
            </span>
            <span className="font-mono text-bloomberg-green font-bold">{readPercentage}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-intel-500 to-bloomberg-green transition-all duration-500"
              style={{ width: `${readPercentage}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">
            {readCount} of {totalCount} high-priority intelligence briefs completed today.
          </p>
        </div>

        {/* Target Exams Info */}
        <div className="rounded-xl border border-bloomberg-border bg-slate-900/40 p-3 space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-upsc-saffron text-[11px]">
            <Award size={14} />
            Targeted Competitive Exams
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Curated coverage mapped directly to syllabus blueprints for UPSC CSE (GS 1-4), CDS (GS), CAPF AC, AFCAT & SSB Interviews.
          </p>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-4 border-t border-bloomberg-border/50 text-[10px] text-slate-500 font-mono flex items-center justify-between">
        <span>DailyIntel AI v2.4</span>
        <span className="text-bloomberg-green">● Online</span>
      </div>
    </aside>
  );
};
