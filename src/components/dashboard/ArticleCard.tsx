'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Article } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { 
  Bookmark, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  Brain, 
  Share2, 
  Zap, 
  History, 
  Layers,
  Award,
  ShieldCheck,
  Flame,
  Scale,
  Globe,
  DollarSign,
  Cpu,
  Shield
} from 'lucide-react';

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
  const [quickAiMessage, setQuickAiMessage] = useState<string | null>(null);

  // Category Icon & Label mapping
  const categoryIconMap: Record<string, { icon: string; name: string; color: string }> = {
    Defence: { icon: '🛡', name: 'Defence', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
    Economy: { icon: '💰', name: 'Economy', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
    International: { icon: '🌍', name: 'International', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
    'AI & Tech': { icon: '⚡', name: 'AI & Tech', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
    'Science & Environment': { icon: '🛰', name: 'Science & Space', color: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800' },
    UPSC: { icon: '⚖', name: 'Constitutional', color: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
    India: { icon: '🇮🇳', name: 'India Governance', color: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800' },
  };

  const catMeta = categoryIconMap[article.category] || categoryIconMap['Defence'];

  // Priority Badge based on importance score
  const getPriorityBadge = (score: number) => {
    if (score >= 9.5) return { label: 'Critical', bg: 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 border-rose-200 dark:border-rose-800', icon: '🔥' };
    if (score >= 8.5) return { label: 'High', bg: 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800', icon: '🟠' };
    if (score >= 7.0) return { label: 'Medium', bg: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800', icon: '🟡' };
    return { label: 'Low', bg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800', icon: '🟢' };
  };

  const priority = getPriorityBadge(article.importanceScore);

  // Dynamic Exam Probabilities
  const upscProb = Math.min(98, Math.round(article.importanceScore * 10 - 2));
  const cdsProb = Math.min(95, Math.round(article.importanceScore * 9.8 - 4));
  const capfProb = Math.min(96, Math.round(article.importanceScore * 9.7 - 3));
  const ssbProb = Math.min(88, Math.round(article.importanceScore * 8.2));

  // Handle Quick AI Action Toast
  const triggerAiAction = (actionName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickAiMessage(`AI Action Triggered: Generating ${actionName}... Opening report.`);
    setTimeout(() => {
      setQuickAiMessage(null);
      onSelectArticle(article);
    }, 800);
  };

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      onClick={() => onSelectArticle(article)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: isRead ? 0.9 : 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)', transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.985 }}
      className="card p-4 space-y-3 cursor-pointer group border border-stone-200 dark:border-stone-800 hover:border-[#7a5c48]/40 dark:hover:border-[#d8c6ba]/30 relative overflow-hidden bg-white dark:bg-stone-900 rounded-xl"
    >
      {/* Quick Action Notification Toast */}
      {quickAiMessage && (
        <div className="absolute inset-x-0 top-0 bg-blue-600 text-white text-[11px] font-semibold py-1 px-3 text-center z-20 animate-fade-up">
          {quickAiMessage}
        </div>
      )}

      {/* SECTION 1: Header (Category + Source + Time + Verification Badge + Priority Badge) */}
      <div className="flex items-center justify-between gap-2 text-xs border-b border-stone-200 dark:border-stone-800/80 pb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 flex items-center gap-1">
            <span>{catMeta.icon}</span>
            <span>{catMeta.name}</span>
          </span>

          <span className="text-stone-400 dark:text-stone-600">•</span>
          <span className="text-stone-700 dark:text-stone-300 font-semibold truncate max-w-[130px] font-mono text-[11px]">
            {article.source}
          </span>

          <span className="text-stone-400 dark:text-stone-600">•</span>
          <span className="font-mono font-bold text-[10px] bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 px-2 py-0.5 rounded flex items-center gap-0.5">
            <ShieldCheck size={11} /> Verified ✓
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center gap-1 ${
            article.importanceScore >= 9.5
              ? 'bg-[#8b4e6d]/15 text-[#8b4e6d] border-[#8b4e6d]/40 dark:bg-[#c09bac]/20 dark:text-[#c09bac] dark:border-[#c09bac]/40'
              : 'bg-[#7a5c48]/15 text-[#7a5c48] border-[#7a5c48]/40 dark:bg-[#d8c6ba]/20 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/40'
          }`}>
            <span>{priority.icon}</span>
            <span>{priority.label}</span>
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id, e);
            }}
            className={`p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${
              isBookmarked ? 'text-[#7a5c48] dark:text-[#d8c6ba]' : 'text-stone-400'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
          >
            <Bookmark size={14} className={isBookmarked ? 'fill-[#7a5c48] text-[#7a5c48] dark:fill-[#d8c6ba] dark:text-[#d8c6ba]' : ''} />
          </button>
        </div>
      </div>

      {/* SECTION 2: Article Title (PRIMARY VISUAL FOCUS) */}
      <h3 className="text-[15px] font-bold text-stone-900 dark:text-stone-100 leading-snug line-clamp-2 group-hover:text-[#7a5c48] dark:group-hover:text-[#d8c6ba] transition-colors">
        {article.title}
      </h3>

      {/* SECTION 3: Standardized Classy Badges Row (#8b4e6d / #7a5c48 in light mode, #c09bac / #d8c6ba in dark mode) */}
      <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
        <span className="bg-[#8b4e6d]/10 text-[#8b4e6d] border border-[#8b4e6d]/30 dark:bg-[#c09bac]/15 dark:text-[#c09bac] dark:border-[#c09bac]/30 px-2 py-0.5 rounded font-bold">
          🔥 High Probability
        </span>
        <span className="bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 px-2 py-0.5 rounded font-bold">
          🧠 Concept Based
        </span>
        <span className="bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 px-2 py-0.5 rounded font-bold">
          📖 Static Linked
        </span>
        {article.category === 'UPSC' && (
          <span className="bg-[#8b4e6d]/10 text-[#8b4e6d] border border-[#8b4e6d]/30 dark:bg-[#c09bac]/15 dark:text-[#c09bac] dark:border-[#c09bac]/30 px-2 py-0.5 rounded font-bold">
            ⚖ Constitutional
          </span>
        )}
        <span className="bg-[#8b4e6d]/10 text-[#8b4e6d] border border-[#8b4e6d]/30 dark:bg-[#c09bac]/15 dark:text-[#c09bac] dark:border-[#c09bac]/30 px-2 py-0.5 rounded font-bold">
          ⭐ Revision Must
        </span>
      </div>

      {/* SECTION 4: One-Line Summary */}
      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-normal line-clamp-2">
        {article.summary}
      </p>

      {/* SECTION 5: Exam Probability Breakdown (Dual Light/Dark Mode High-Contrast) */}
      <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 space-y-2.5 text-[10px]">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 font-mono uppercase tracking-wider text-[9px] font-bold">
          <span>EXAM PROBABILITY BREAKDOWN</span>
          <span className="text-[#7a5c48] dark:text-[#d8c6ba] font-bold">15-YR WEIGHTED</span>
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          <div>
            <div className="flex justify-between font-mono font-bold text-stone-900 dark:text-stone-100 text-[11px]">
              <span>UPSC</span>
              <span className="text-[#7a5c48] dark:text-[#d8c6ba]">{upscProb}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mt-1">
              <motion.div className="h-full bg-[#7a5c48] dark:bg-[#d8c6ba] rounded-full" initial={{ width: 0 }} animate={isInView ? { width: `${upscProb}%` } : { width: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono font-bold text-stone-900 dark:text-stone-100 text-[11px]">
              <span>CDS</span>
              <span className="text-[#7a5c48] dark:text-[#d8c6ba]">{cdsProb}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mt-1">
              <motion.div className="h-full bg-[#7a5c48] dark:bg-[#d8c6ba] rounded-full" initial={{ width: 0 }} animate={isInView ? { width: `${cdsProb}%` } : { width: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono font-bold text-stone-900 dark:text-stone-100 text-[11px]">
              <span>CAPF</span>
              <span className="text-[#7a5c48] dark:text-[#d8c6ba]">{capfProb}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mt-1">
              <motion.div className="h-full bg-[#7a5c48] dark:bg-[#d8c6ba] rounded-full" initial={{ width: 0 }} animate={isInView ? { width: `${capfProb}%` } : { width: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-mono font-bold text-stone-900 dark:text-stone-100 text-[11px]">
              <span>SSB</span>
              <span className="text-[#7a5c48] dark:text-[#d8c6ba]">{ssbProb}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mt-1">
              <motion.div className="h-full bg-[#7a5c48] dark:bg-[#d8c6ba] rounded-full" initial={{ width: 0 }} animate={isInView ? { width: `${ssbProb}%` } : { width: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Why It Matters Highlighted Container */}
      {article.examRelevance?.whyItMatters && (
        <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-950/80 border border-[#7a5c48]/30 dark:border-[#d8c6ba]/30 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#7a5c48] dark:text-[#d8c6ba]">
            <Sparkles size={13} className="text-[#7a5c48] dark:text-[#d8c6ba]" />
            <span>Why this matters for your exam:</span>
          </div>
          <p className="text-stone-800 dark:text-stone-200 text-[11px] leading-relaxed line-clamp-2">
            {article.examRelevance.whyItMatters}
          </p>
        </div>
      )}

      {/* SECTION 7: PYQ Intelligence & Static Topic Chips */}
      <div className="space-y-2">
        {/* PYQ Match Badge */}
        {article.pyqIntelligence && (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-stone-100 dark:bg-stone-950/80 border border-[#8b4e6d]/30 dark:border-[#c09bac]/30 text-[11px] font-mono">
            <span className="font-bold text-[#8b4e6d] dark:text-[#c09bac] flex items-center gap-1.5">
              <Award size={13} className="text-[#8b4e6d] dark:text-[#c09bac]" />
              PYQ Link: {article.pyqIntelligence.examName} ({article.pyqIntelligence.yearAsked})
            </span>
            <span className="font-bold text-[#8b4e6d] bg-[#8b4e6d]/10 border border-[#8b4e6d]/30 dark:text-[#c09bac] dark:bg-[#c09bac]/15 dark:border-[#c09bac]/30 px-2 py-0.5 rounded">
              {article.pyqIntelligence.similarityScore}% Match
            </span>
          </div>
        )}

        {/* Static Topic Chips */}
        <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono">
          <span className="text-stone-500 font-medium">Linked:</span>
          {article.keywords.slice(0, 4).map(kw => (
            <span key={kw} className="px-2 py-0.5 rounded bg-stone-100 text-[#7a5c48] border border-stone-200 dark:bg-stone-800/80 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 font-bold text-[10px]">
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 8: AI Revision Box */}
      <div className="grid grid-cols-4 gap-1.5 p-2.5 rounded-lg bg-stone-100 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 text-center text-[10px] font-mono">
        <div>
          <div className="text-stone-500 dark:text-stone-400 font-semibold uppercase text-[9px]">Revision</div>
          <div className="font-bold text-stone-900 dark:text-stone-100 text-[11px]">3 min</div>
        </div>
        <div>
          <div className="text-stone-500 dark:text-stone-400 font-semibold uppercase text-[9px]">Difficulty</div>
          <div className="font-bold text-[#7a5c48] dark:text-[#d8c6ba] text-[11px]">Level 4</div>
        </div>
        <div>
          <div className="text-stone-500 dark:text-stone-400 font-semibold uppercase text-[9px]">Retention</div>
          <div className="font-bold text-[#8b4e6d] dark:text-[#c09bac] text-[11px]">92%</div>
        </div>
        <div>
          <div className="text-stone-500 dark:text-stone-400 font-semibold uppercase text-[9px]">Priority</div>
          <div className="font-bold text-[#7a5c48] dark:text-[#d8c6ba] text-[11px]">High</div>
        </div>
      </div>

      {/* SECTION 9: Primary Intelligence Report Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelectArticle(article)}
        className="w-full py-2.5 px-3 rounded-lg bg-[#7a5c48] hover:bg-[#8b4e6d] text-white dark:bg-[#d8c6ba] dark:hover:bg-[#c09bac] dark:text-[#121210] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
      >
        <span>Open Intelligence Report</span>
        <ArrowRight size={14} />
      </motion.button>

      {/* SECTION 10: Quick AI Action Toolbar */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[10px] font-semibold text-stone-500 dark:text-stone-400 flex-wrap gap-1">
        <button
          onClick={(e) => triggerAiAction('Simple Summary', e)}
          className="hover:text-blue-600 flex items-center gap-0.5 p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
          title="Explain Simply"
        >
          <Zap size={11} /> Explain
        </button>

        <button
          onClick={(e) => triggerAiAction('MCQs', e)}
          className="hover:text-emerald-600 flex items-center gap-0.5 p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
          title="Generate MCQs"
        >
          <HelpCircle size={11} /> MCQs
        </button>

        <button
          onClick={(e) => triggerAiAction('Mains Answer', e)}
          className="hover:text-amber-600 flex items-center gap-0.5 p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
          title="Generate Mains Answer"
        >
          <FileText size={11} /> Mains
        </button>

        <button
          onClick={(e) => triggerAiAction('Flashcards', e)}
          className="hover:text-purple-600 flex items-center gap-0.5 p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
          title="Create Flashcards"
        >
          <Brain size={11} /> Cards
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (navigator.share) {
              navigator.share({ title: article.title, text: article.summary, url: window.location.href });
            } else {
              navigator.clipboard.writeText(article.title);
              setQuickAiMessage('Copied link to clipboard!');
              setTimeout(() => setQuickAiMessage(null), 1500);
            }
          }}
          className="hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-0.5 p-1 rounded hover:bg-stone-100 dark:hover:bg-stone-800"
          title="Share"
        >
          <Share2 size={11} /> Share
        </button>
      </div>
    </motion.div>
  );
};
