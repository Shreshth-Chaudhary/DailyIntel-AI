'use client';

import React from 'react';
import { DailyBriefing } from '@/lib/types';
import { Share2, BookOpen, CheckCircle2, Flame, Award } from 'lucide-react';

interface MorningBriefingViewProps {
  briefing: DailyBriefing;
  onOpenExportModal: () => void;
}

export const MorningBriefingView: React.FC<MorningBriefingViewProps> = ({
  briefing,
  onOpenExportModal,
}) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fade-up">
      {/* Clean Header Card */}
      <div className="card bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">Daily Briefing</span>
              <span className="text-xs text-stone-400">
                {briefing.date ? new Date(briefing.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '22 July 2026'}
              </span>
              <span className="text-xs text-stone-400">• By Shreshth Chaudhary</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {briefing.title}
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-2xl leading-relaxed">
              {briefing.summary}
            </p>
          </div>

          <button
            onClick={onOpenExportModal}
            className="btn btn-primary btn-sm shrink-0"
          >
            <Share2 size={15} />
            <span>Export Briefing</span>
          </button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Top 5 Headlines */}
          <div className="card space-y-4">
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Flame size={18} className="text-amber-500" />
              Top Strategic Headlines
            </h3>

            <div className="space-y-3">
              {(briefing.topHeadlines || []).map((headline, idx) => (
                <div key={idx} className="flex gap-3 p-3.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-bold">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{headline.title}</p>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">{headline.summary}</p>
                    <span className="inline-block text-xs text-stone-400">Category: {headline.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Takeaways & Editorial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card space-y-3">
              <h4 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                Key Strategic Takeaways
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                {(briefing.keyTakeaways || []).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card space-y-3">
              <h4 className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Award size={16} />
                Editorial Analysis
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {briefing.editorialAnalysis}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="card space-y-4">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <BookOpen size={16} className="text-blue-600" />
              High-Yield Revision Notes
            </h3>
            <p className="text-xs text-stone-400">Curated one-liners for quick Prelims revision.</p>

            <div className="space-y-2.5">
              {(briefing.revisionNotes || []).map((note, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/50 text-xs text-stone-700 dark:text-stone-200 leading-relaxed border border-stone-100 dark:border-stone-800">
                  <span className="font-semibold text-blue-600 mr-1.5">#{idx + 1}</span>
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
