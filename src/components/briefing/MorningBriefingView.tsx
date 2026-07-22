'use client';

import React, { useState } from 'react';
import { DailyBriefing } from '@/lib/types';
import { 
  BookOpen, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Printer,
  Download,
  Flame,
  Award
} from 'lucide-react';

interface MorningBriefingViewProps {
  briefing: DailyBriefing;
  onOpenExportModal: () => void;
}

export const MorningBriefingView: React.FC<MorningBriefingViewProps> = ({
  briefing,
  onOpenExportModal,
}) => {
  const [activeSection, setActiveSection] = useState<'top' | 'defence' | 'economy' | 'ir' | 'ai' | 'notes'>('top');

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl border border-bloomberg-border bg-gradient-to-r from-bloomberg-card via-slate-900 to-indigo-950/40 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-bloomberg-amber/20 text-bloomberg-amber font-mono font-bold text-xs border border-bloomberg-amber/30">
                DAILY BRIEFING EDITION
              </span>
              <span className="text-xs text-slate-400 font-mono">22 JULY 2026</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {briefing.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {briefing.summary}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenExportModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-intel-600 text-white text-xs font-semibold hover:bg-intel-500 shadow-lg shadow-intel-600/30 transition-all"
            >
              <Share2 size={16} />
              Export Brief
            </button>
          </div>
        </div>
      </div>

      {/* High-Yield Revision Notes Banner */}
      <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-upsc-saffron font-mono flex items-center gap-2">
            <Award size={18} />
            HIGH-YIELD UPSC REVISION NOTES (MUST READ TODAY)
          </h3>
          <span className="text-[10px] font-mono text-slate-400">6 QUICK BULLETS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {briefing.revisionNotes.map((note, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 leading-relaxed flex items-start gap-2">
              <span className="font-mono font-bold text-intel-400 shrink-0">{idx + 1}.</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Analysis Box */}
      <div className="rounded-xl border border-intel-500/30 bg-slate-900/80 p-5 space-y-3">
        <h3 className="text-sm font-bold text-intel-400 font-mono flex items-center gap-2">
          <Sparkles size={16} />
          EDITORIAL & STRATEGIC ANALYSIS
        </h3>
        <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans italic border-l-2 border-intel-500 pl-4 py-1">
          "{briefing.editorialAnalysis}"
        </p>
      </div>

      {/* Sector Navigation & Articles */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <BookOpen size={18} className="text-intel-400" />
          SECTOR-BY-SECTOR BRIEFING BREAKDOWN
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {briefing.topHeadlines.map((article, idx) => (
            <div key={article.id} className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-intel-400">#{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">{article.category}</span>
                  <span className="text-slate-400">• {article.source}</span>
                </div>
                <span className="text-bloomberg-amber font-mono font-bold">Importance: {article.importanceScore}/10</span>
              </div>

              <h4 className="text-base font-bold text-slate-100">{article.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{article.summary}</p>

              {/* Exam relevance box */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-400 font-mono block">UPSC / Defence Exam Angle:</span>
                <p className="text-slate-300">{article.examRelevance.whyItMatters}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
