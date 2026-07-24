'use client';

import React from 'react';
import { Article } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { Clock, ArrowRight } from 'lucide-react';

interface NewsTimelineProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const NewsTimeline: React.FC<NewsTimelineProps> = ({ articles, onSelectArticle }) => {
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-bloomberg-border pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
          <Clock size={16} className="text-bloomberg-amber" />
          DAILY NEWS CHRONOLOGICAL TIMELINE
        </h3>
        <span className="text-xs font-mono text-slate-400 font-semibold">
          {sortedArticles[0] ? new Date(sortedArticles[0].publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : 'LIVE CHRONOLOGY'}
        </span>
      </div>

      <div className="relative border-l-2 border-slate-800 ml-4 pl-6 space-y-6">
        {sortedArticles.map((article) => (
          <div key={article.id} className="relative group cursor-pointer" onClick={() => onSelectArticle(article)}>
            {/* Timeline dot */}
            <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bloomberg-bg bg-intel-500 group-hover:bg-bloomberg-green transition-all" />

            <div className="p-4 rounded-xl border border-bloomberg-border bg-slate-900/60 hover:bg-slate-800/80 hover:border-intel-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="text-intel-400 font-bold" suppressHydrationWarning>{formatTime(article.publishedAt)}</span>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{article.category}</span>
                  <span className="text-bloomberg-amber font-bold">[{article.importanceScore}]</span>
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-100 group-hover:text-intel-400 transition-colors">
                {article.title}
              </h4>

              <p className="text-xs text-slate-400 line-clamp-2">{article.summary}</p>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-500">
                <span>Source: {article.source}</span>
                <span className="flex items-center gap-1 text-intel-400 font-medium group-hover:translate-x-1 transition-transform">
                  Read Deep-Dive Analysis <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
