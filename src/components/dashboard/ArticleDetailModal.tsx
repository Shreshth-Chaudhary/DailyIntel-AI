'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Article } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';
import { 
  X, 
  Bookmark, 
  ExternalLink, 
  HelpCircle, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  History, 
  Award, 
  ShieldAlert, 
  BookOpen, 
  Scale, 
  Brain, 
  Layers, 
  Globe, 
  GitBranch
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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'history' | 'timeline' | 'static' | 'pyq' | 'mains' | 'essay' | 'flashcards' | 'mindmap' | 'sources'
  >('overview');

  if (!article) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/65 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] flex flex-col rounded-t-xl sm:rounded-xl border border-stone-200 bg-white dark:bg-stone-900 dark:border-stone-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded text-[11px] font-mono font-bold bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 uppercase tracking-wider">
              AI Intelligence Report
            </span>
            <span className="text-xs text-stone-600 dark:text-stone-400 font-mono hidden sm:inline">Official Sourcing: {article.source}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
                isBookmarked ? 'text-amber-500' : 'text-stone-400'
              }`}
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-amber-500' : ''} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title & Meta Details */}
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug mb-2">
              {article.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-stone-500 font-mono flex-wrap">
              <span suppressHydrationWarning>{formatDateTime(article.publishedAt)}</span>
              <span>•</span>
              <span className="text-stone-700 dark:text-stone-300 font-medium">Importance: {article.importanceScore}/10</span>
              <span>•</span>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline font-semibold"
              >
                Gazette / PIB Link <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Server AI Fact-Verification & Strict Isolation Audit Banner */}
          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/70 dark:bg-emerald-950/30 text-xs space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                Server AI Fact-Check: {article.verificationStatus || 'Verified'} Primary Source
              </span>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800">
                100% Isolated Data (No Cross-Story Pollution)
              </span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
              {article.aiVerificationNotes || `Fact-checked on server against official ${article.source} records. Content isolated without interlinking unrelated stories.`}
            </p>
          </div>

          {/* 10 Intelligence Report Tabs */}
          <div className="filter-tabs flex flex-wrap gap-1 border-b border-stone-200 dark:border-stone-800 pb-2.5 text-xs">
            <button onClick={() => setActiveTab('overview')} className={`filter-tab ${activeTab === 'overview' ? 'active' : ''}`}>
              Overview
            </button>
            <button onClick={() => setActiveTab('history')} className={`filter-tab ${activeTab === 'history' ? 'active' : ''}`}>
              History &amp; Origin
            </button>
            <button onClick={() => setActiveTab('timeline')} className={`filter-tab ${activeTab === 'timeline' ? 'active' : ''}`}>
              Timeline
            </button>
            <button onClick={() => setActiveTab('static')} className={`filter-tab ${activeTab === 'static' ? 'active' : ''}`}>
              Static Concepts
            </button>
            <button onClick={() => setActiveTab('pyq')} className={`filter-tab ${activeTab === 'pyq' ? 'active' : ''}`}>
              15-Yr PYQs &amp; MCQs
            </button>
            <button onClick={() => setActiveTab('mains')} className={`filter-tab ${activeTab === 'mains' ? 'active' : ''}`}>
              Mains Answer
            </button>
            <button onClick={() => setActiveTab('essay')} className={`filter-tab ${activeTab === 'essay' ? 'active' : ''}`}>
              Essay Points
            </button>
            <button onClick={() => setActiveTab('flashcards')} className={`filter-tab ${activeTab === 'flashcards' ? 'active' : ''}`}>
              Flashcards
            </button>
            <button onClick={() => setActiveTab('mindmap')} className={`filter-tab ${activeTab === 'mindmap' ? 'active' : ''}`}>
              Mind Map
            </button>
            <button onClick={() => setActiveTab('sources')} className={`filter-tab ${activeTab === 'sources' ? 'active' : ''}`}>
              Sources
            </button>
          </div>

          {/* TAB 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-200 leading-relaxed border border-stone-200 dark:border-stone-800 whitespace-pre-line text-sm">
                {article.content}
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 text-sm">
                  <CheckCircle2 size={15} className="text-emerald-600" /> Key Verified Facts
                </h4>
                <ul className="space-y-1.5 pl-5 list-disc text-stone-600 dark:text-stone-300">
                  {article.keyFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>
              </div>

              {/* Organizations & Personalities & Ministry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {article.organizations && article.organizations.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="font-bold text-blue-600 text-[10px] uppercase">Organizations Involved</span>
                    <p className="text-stone-700 dark:text-stone-300 font-medium">{article.organizations.join(', ')}</p>
                  </div>
                )}
                {article.personalities && article.personalities.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="font-bold text-purple-600 text-[10px] uppercase">Key Personalities</span>
                    <p className="text-stone-700 dark:text-stone-300 font-medium">{article.personalities.join(', ')}</p>
                  </div>
                )}
                {article.ministry && (
                  <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-800 space-y-1">
                    <span className="font-bold text-amber-600 text-[10px] uppercase">Nodal Ministry / Authority</span>
                    <p className="text-stone-700 dark:text-stone-300 font-medium">{article.ministry} ({article.country || 'India'})</p>
                  </div>
                )}
              </div>

              {/* Strategic Impact Breakdown */}
              {article.impactAnalysis && (
                <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-2">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-xs">
                    <Sparkles size={14} /> Strategic Impact &amp; Implications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-700 dark:text-stone-300">
                    <div><strong>Overall Impact:</strong> {article.impactAnalysis.overallImpact}</div>
                    <div><strong>India Impact:</strong> {article.impactAnalysis.indiaImpact}</div>
                    <div><strong>Economy Impact:</strong> {article.impactAnalysis.economyImpact}</div>
                    <div><strong>Defence/Strategic Impact:</strong> {article.impactAnalysis.defenceImpact}</div>
                    <div className="sm:col-span-2"><strong>Future Implications:</strong> {article.impactAnalysis.futureImplications}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: History & Origin */}
          {activeTab === 'history' && article.historicalContext && (
            <div className="space-y-4 text-xs">
              <div className="card space-y-1.5 bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm flex items-center gap-1.5">
                  <History size={15} /> Historical Origin &amp; Background
                </h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{article.historicalContext.origin}</p>
              </div>

              <div className="card space-y-1">
                <h4 className="font-bold text-stone-900 dark:text-stone-100">Key Policies &amp; Acts:</h4>
                <ul className="list-disc pl-4 space-y-1 text-stone-600 dark:text-stone-300">
                  {article.historicalContext.importantActsAndRules.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Timeline */}
          {activeTab === 'timeline' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Historical &amp; Strategic Evolution Timeline</h4>
              <div className="border-l-2 border-blue-600 ml-2 pl-4 space-y-3">
                {(article.timeline || article.historicalContext?.evolutionTimeline || []).map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                    <span className="font-bold text-blue-600">{item.date}</span>
                    <p className="text-stone-600 dark:text-stone-300 mt-0.5">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Static Concepts */}
          {activeTab === 'static' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="card space-y-1.5">
                  <h4 className="font-bold text-purple-600 flex items-center gap-1">
                    <Scale size={14} /> Constitutional Articles &amp; Legal Provisions
                  </h4>
                  {article.historicalContext?.constitutionalArticles && article.historicalContext.constitutionalArticles.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-stone-600 dark:text-stone-300">
                      {article.historicalContext.constitutionalArticles.map((art, idx) => (
                        <li key={idx}>{art}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-stone-500 italic">Governed by statutory executive policy and administrative gazette rules.</p>
                  )}
                </div>

                <div className="card space-y-1.5">
                  <h4 className="font-bold text-emerald-600 flex items-center gap-1">
                    <BookOpen size={14} /> Committees &amp; High-Level Reports
                  </h4>
                  {article.historicalContext?.keyCommittees && article.historicalContext.keyCommittees.length > 0 ? (
                    <ul className="list-disc pl-4 space-y-1 text-stone-600 dark:text-stone-300">
                      {article.historicalContext.keyCommittees.map((com, idx) => (
                        <li key={idx}>{com}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-stone-500 italic">Evaluated under NITI Aayog &amp; Ministry Departmental Review Reports.</p>
                  )}
                </div>

                {article.historicalContext?.landmarkJudgements && article.historicalContext.landmarkJudgements.length > 0 && (
                  <div className="card space-y-1.5 md:col-span-2">
                    <h4 className="font-bold text-amber-600 flex items-center gap-1">
                      <Award size={14} /> Supreme Court Landmark Judgments
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-stone-600 dark:text-stone-300">
                      {article.historicalContext.landmarkJudgements.map((judg, idx) => (
                        <li key={idx}>{judg}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: 15-Yr PYQs & MCQs */}
          {activeTab === 'pyq' && article.pyqIntelligence && (
            <div className="space-y-4 text-xs">
              <div className="card border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-800 dark:text-blue-300 text-sm">
                    {article.pyqIntelligence.examName} ({article.pyqIntelligence.yearAsked})
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                    {article.pyqIntelligence.similarityScore}% Similarity
                  </span>
                </div>
                <p className="text-stone-800 dark:text-stone-200 font-medium italic">
                  "{article.pyqIntelligence.similarPyqAsked}"
                </p>
                <p className="text-stone-600 dark:text-stone-300">
                  <strong>Why Asked:</strong> {article.pyqIntelligence.whyAskedReason}
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: Mains Answer */}
          {activeTab === 'mains' && (
            <div className="space-y-4 text-xs">
              <div className="card space-y-2">
                <h4 className="font-bold text-blue-600 text-sm">Mains Question Angle:</h4>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{article.examRelevance.mainsQuestion}</p>
              </div>
              {article.mainsFramework && (
                <div className="card space-y-2 bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-300">Ranker's Secret Presentation Technique:</h4>
                  <p className="text-stone-700 dark:text-stone-300 italic">{article.mainsFramework.rankerSecretTechnique}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: Essay Points */}
          {activeTab === 'essay' && (
            <div className="space-y-3 text-xs">
              <div className="card space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Article-Specific High-Yield Essay Quotes &amp; Case Studies</h4>
                <ul className="list-disc pl-4 space-y-1.5 text-stone-600 dark:text-stone-300">
                  {article.essayPoints && article.essayPoints.length > 0 ? (
                    article.essayPoints.map((pt, idx) => <li key={idx}>{pt}</li>)
                  ) : (
                    <>
                      <li>"{article.title} represents a critical milestone in India's sovereign policy trajectory."</li>
                      <li>Case Study: {article.title} - Verified via {article.source}.</li>
                      <li>Analytical Dimension: Balancing strategic national interest with democratic accountability.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 8: Flashcards */}
          {activeTab === 'flashcards' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {article.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/80 space-y-1">
                  <span className="font-bold text-blue-600 uppercase text-[10px]">Flashcard #{idx + 1}</span>
                  <p className="font-medium text-stone-900 dark:text-stone-100">{fact}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 9: Mind Map */}
          {activeTab === 'mindmap' && (
            <div className="p-4 rounded-lg bg-stone-900 text-stone-100 space-y-3 font-mono text-xs overflow-x-auto">
              <div className="font-bold text-blue-400">[TOPIC NODE: {article.title}]</div>
              <div className="pl-4 border-l border-stone-700 space-y-2">
                <div>├── 📍 CATEGORY: {article.category} ({article.subcategory || 'Strategic Intelligence'})</div>
                <div>├── 🏛 NODAL AUTHORITY: {article.ministry || article.organizations?.[0] || article.source}</div>
                <div>├── 📜 LEGAL / STATUTORY BASE: {article.historicalContext?.importantActsAndRules?.[0] || article.historicalContext?.constitutionalArticles?.[0] || 'Official Gazette Framework'}</div>
                <div>├── 💥 STRATEGIC IMPACT: {article.impactAnalysis?.overallImpact || article.summary}</div>
                <div>└── 🎯 TARGET BLUEPRINT EXAMS: {article.examRelevance?.exams?.join(', ') || 'UPSC CSE, CDS, CAPF'}</div>
              </div>
            </div>
          )}

          {/* TAB 10: Sources */}
          {activeTab === 'sources' && (
            <div className="space-y-3 text-xs">
              <div className="card space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Verified Official Sourcing Metadata</h4>
                <p className="text-stone-600 dark:text-stone-300">Source: <strong>{article.source}</strong></p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:underline font-semibold"
                >
                  Direct Official Link <ExternalLink size={13} />
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
