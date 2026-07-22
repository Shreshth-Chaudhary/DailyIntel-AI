'use client';

import React, { useState } from 'react';
import { Article } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import { 
  X, 
  Bookmark, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle2, 
  ShieldAlert, 
  FileText,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
  isBookmarked: boolean;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onToggleBookmark,
  isBookmarked,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'exam' | 'impact' | 'timeline'>('overview');

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-bloomberg-border bg-bloomberg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-bloomberg-border bg-slate-900/90">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-intel-600/20 text-intel-400 font-semibold border border-intel-500/30 text-xs">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">Source: {article.source}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-2 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-amber-400' : ''} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Article Title & Published Date */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">
              {article.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
              <span suppressHydrationWarning>Published: {formatDateTime(article.publishedAt)}</span>
              <span>•</span>
              <span className="text-bloomberg-amber font-bold">Importance Score: {article.importanceScore}/10</span>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-intel-400 hover:underline"
              >
                Original Source <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Navigation Tabs inside Modal */}
          <div className="flex border-b border-slate-800 gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === 'overview' ? 'border-intel-500 text-intel-400' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Summary & Facts
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === 'exam' ? 'border-intel-500 text-intel-400' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              UPSC / Exam Analysis
            </button>
            <button
              onClick={() => setActiveTab('impact')}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === 'impact' ? 'border-intel-500 text-intel-400' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              4-Way Impact Assessment
            </button>
            {article.timeline && article.timeline.length > 0 && (
              <button
                onClick={() => setActiveTab('timeline')}
                className={`pb-2 border-b-2 transition-all ${
                  activeTab === 'timeline' ? 'border-intel-500 text-intel-400' : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Event Timeline
              </button>
            )}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-5 text-sm">
              {/* Full Text Content */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line">
                {article.content}
              </div>

              {/* Key Facts */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-200 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-bloomberg-green" />
                  Key Extracted Facts
                </h4>
                <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-300">
                  {article.keyFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>

              {/* Entities & Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 space-y-1">
                  <span className="font-semibold text-slate-400 block font-mono">ORGANIZATIONS & AGENCIES</span>
                  <div className="flex gap-1.5 flex-wrap pt-1">
                    {article.organizations.map(org => (
                      <span key={org} className="px-2 py-0.5 rounded bg-slate-800 text-intel-300 font-mono text-[11px]">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50 space-y-1">
                  <span className="font-semibold text-slate-400 block font-mono">KEY TERMINOLOGY TO REMEMBER</span>
                  <div className="flex gap-1.5 flex-wrap pt-1">
                    {article.keywords.map(kw => (
                      <span key={kw} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono text-[11px]">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'exam' && (
            <div className="space-y-5 text-xs">
              {/* Exam Badges */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-upsc-saffron font-mono block">RELEVANT COMPETITIVE EXAMS:</span>
                <div className="flex gap-2 flex-wrap">
                  {article.examRelevance.exams.map(e => (
                    <span key={e} className="px-2.5 py-1 rounded bg-upsc-saffron/20 text-upsc-saffron font-semibold border border-upsc-saffron/30">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why it Matters */}
              <div className="p-4 rounded-xl bg-slate-900 border border-intel-500/30 space-y-1">
                <h4 className="font-bold text-intel-400 flex items-center gap-1.5 text-sm">
                  <Sparkles size={16} />
                  Why it matters for competitive exams:
                </h4>
                <p className="text-slate-300 leading-relaxed">{article.examRelevance.whyItMatters}</p>
              </div>

              {/* Possible Prelims Question */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-1.5">
                  <HelpCircle size={15} />
                  Possible Prelims Question Angle:
                </h4>
                <div className="p-3 rounded bg-slate-950 font-mono text-slate-300 leading-relaxed whitespace-pre-line border border-slate-800">
                  {article.examRelevance.prelimsQuestion}
                </div>
              </div>

              {/* Possible Mains Question */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <FileText size={15} />
                  Possible Mains Descriptive Question Angle:
                </h4>
                <div className="p-3 rounded bg-slate-950 font-mono text-slate-300 leading-relaxed border border-slate-800">
                  {article.examRelevance.mainsQuestion}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-intel-400 block font-mono">1. OVERALL STRATEGIC IMPACT</span>
                <p className="text-slate-300 leading-relaxed">{article.impactAnalysis.overallImpact}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-rose-400 block font-mono">2. IMPACT ON INDIA</span>
                <p className="text-slate-300 leading-relaxed">{article.impactAnalysis.indiaImpact}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 block font-mono">3. IMPACT ON ECONOMY</span>
                <p className="text-slate-300 leading-relaxed">{article.impactAnalysis.economyImpact}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block font-mono">4. IMPACT ON DEFENCE</span>
                <p className="text-slate-300 leading-relaxed">{article.impactAnalysis.defenceImpact}</p>
              </div>

              <div className="md:col-span-2 p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-1">
                <span className="font-bold text-purple-400 block font-mono">5. FUTURE IMPLICATIONS</span>
                <p className="text-slate-300 leading-relaxed">{article.impactAnalysis.futureImplications}</p>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && article.timeline && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-200 font-mono">EVENT DEVELOPMENT TIMELINE:</h4>
              <div className="border-l-2 border-intel-500 ml-2 pl-4 space-y-4">
                {article.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-intel-500" />
                    <span className="font-mono text-intel-400 font-bold">{item.date}</span>
                    <p className="text-slate-300 text-xs mt-0.5">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
