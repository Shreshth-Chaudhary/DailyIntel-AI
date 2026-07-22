'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { Bookmark, ExternalLink, ChevronRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
  isRead: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  isRead,
}) => {
  return (
    <div 
      onClick={() => onSelectArticle(article)}
      className={`group relative rounded-xl border p-5 transition-all duration-200 cursor-pointer ${
        isRead 
          ? 'bg-bloomberg-card/50 border-bloomberg-border/50 opacity-90' 
          : 'bg-bloomberg-card border-bloomberg-border hover:border-intel-500/40 hover:bg-slate-900/80 shadow-lg'
      }`}
    >
      {/* Top Header Meta */}
      <div className="flex items-center justify-between gap-2 mb-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-md bg-intel-600/20 text-intel-400 font-semibold border border-intel-500/30 text-[11px]">
            {article.category}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">{article.source}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500 text-[11px]" suppressHydrationWarning>
            {formatTime(article.publishedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Importance Badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[11px] font-bold">
            <span>Score:</span>
            <span>{article.importanceScore}</span>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => onToggleBookmark(article.id, e)}
            className={`p-1.5 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark intel'}
          >
            <Bookmark size={15} className={isBookmarked ? 'fill-amber-400' : ''} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-slate-100 group-hover:text-intel-400 transition-colors leading-snug mb-2">
        {article.title}
      </h3>

      {/* Summary */}
      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
        {article.summary}
      </p>

      {/* Exam Relevance & Key Facts Preview */}
      <div className="space-y-3 pt-3 border-t border-bloomberg-border/60 text-xs">
        {/* Exam Relevance Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">EXAM RELEVANCE:</span>
          {article.examRelevance.exams.map(exam => (
            <span key={exam} className="px-2 py-0.5 rounded bg-slate-800 text-upsc-saffron font-medium text-[10px]">
              {exam}
            </span>
          ))}
        </div>

        {/* Why it Matters snippet */}
        <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300 text-xs leading-relaxed">
          <span className="font-bold text-intel-300 block mb-0.5">Why this matters:</span>
          {article.examRelevance.whyItMatters}
        </div>

        {/* Bottom Footer Actions */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <div className="flex items-center gap-3 text-slate-400">
            <span>⏱ {article.readTimeMinutes || 4} min read</span>
            {article.duplicateCount > 1 && (
              <span className="text-emerald-400 font-mono">Merged {article.duplicateCount} sources</span>
            )}
          </div>
          <span className="flex items-center gap-1 font-semibold text-intel-400 group-hover:translate-x-1 transition-transform">
            Detailed Analysis <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </div>
  );
};
