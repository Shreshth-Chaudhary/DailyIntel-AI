'use client';

import React from 'react';
import { Category, Article } from '@/lib/types';
import { TrendingUp, ShieldAlert, BarChart3 } from 'lucide-react';

interface CategoryHeatmapProps {
  articles: Article[];
  onSelectCategory: (cat: string) => void;
}

const CATEGORY_META: { category: Category; icon: string; color: string; bgClass: string }[] = [
  { category: 'Defence', icon: '🪖', color: 'emerald', bgClass: 'from-emerald-950/40 to-slate-900 border-emerald-500/30 text-emerald-400' },
  { category: 'Economy', icon: '💹', color: 'amber', bgClass: 'from-amber-950/40 to-slate-900 border-amber-500/30 text-amber-400' },
  { category: 'International', icon: '🌍', color: 'blue', bgClass: 'from-blue-950/40 to-slate-900 border-blue-500/30 text-blue-400' },
  { category: 'AI & Tech', icon: '🤖', color: 'purple', bgClass: 'from-purple-950/40 to-slate-900 border-purple-500/30 text-purple-400' },
  { category: 'Science & Environment', icon: '🛰', color: 'cyan', bgClass: 'from-cyan-950/40 to-slate-900 border-cyan-500/30 text-cyan-400' },
  { category: 'India', icon: '🇮🇳', color: 'rose', bgClass: 'from-rose-950/40 to-slate-900 border-rose-500/30 text-rose-400' },
  { category: 'UPSC', icon: '📚', color: 'orange', bgClass: 'from-orange-950/40 to-slate-900 border-orange-500/30 text-orange-400' },
];

export const CategoryHeatmap: React.FC<CategoryHeatmapProps> = ({ articles, onSelectCategory }) => {
  return (
    <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white flex items-center gap-2 font-mono">
          <BarChart3 size={16} className="text-intel-400" />
          SECTOR INTELLIGENCE HEATMAP
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">INTENSITY BY IMPORTANCE SCORE</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {CATEGORY_META.map(item => {
          const categoryArticles = articles.filter(a => a.category === item.category);
          const avgScore = categoryArticles.length > 0
            ? (categoryArticles.reduce((acc, curr) => acc + curr.importanceScore, 0) / categoryArticles.length).toFixed(1)
            : '0.0';

          return (
            <button
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className={`p-3 rounded-lg border bg-gradient-to-b transition-all hover:scale-105 text-left space-y-2 ${item.bgClass}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-mono font-bold">{avgScore} ★</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 truncate">{item.category}</h4>
                <p className="text-[10px] opacity-80">{categoryArticles.length} Briefs Today</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
