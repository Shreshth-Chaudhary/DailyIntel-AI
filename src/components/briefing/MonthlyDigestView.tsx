'use client';

import React, { useState } from 'react';
import { Article } from '@/lib/types';
import { Download, FileText, Sparkles, BookOpen, Scale, Shield, Award, CheckCircle2, Filter, Printer } from 'lucide-react';

interface MonthlyDigestViewProps {
  articles: Article[];
}

export const MonthlyDigestView: React.FC<MonthlyDigestViewProps> = ({ articles }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-07');
  const [targetExamFilter, setTargetExamFilter] = useState<string>('UPSC CSE');

  const monthLabel = selectedMonth === '2026-07' ? 'July 2026' : selectedMonth === '2026-06' ? 'June 2026' : 'May 2026';

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-xs animate-fade-up">
      {/* Top Header */}
      <div className="p-6 rounded-xl bg-white border border-stone-200 text-stone-900 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 uppercase tracking-wider">
              Monthly Current Affairs Digest &amp; Compilation
            </span>
            <span className="text-stone-500 dark:text-stone-400 text-xs">Architect: Shreshth Chaudhary</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {monthLabel} Current Affairs Intelligence Compilation
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-xs max-w-xl">
            Curated high-yield notes, Supreme Court judgements, defence ToT pacts, and 15-year PYQ mappings for {targetExamFilter}.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrintPdf}
            className="btn btn-primary btn-sm"
          >
            <Printer size={14} />
            <span>Generate PDF Digest</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Month Picker & Target Exam Filter */}
      <div className="card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-stone-700 dark:text-stone-300">Select Month:</span>
          {[
            { id: '2026-07', label: 'July 2026' },
            { id: '2026-06', label: 'June 2026' },
            { id: '2026-05', label: 'May 2026' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMonth(m.id)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                selectedMonth === m.id
                  ? 'bg-[#7a5c48] text-white dark:bg-[#d8c6ba] dark:text-stone-950 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-700 dark:text-stone-300">Target Exam:</span>
          {['UPSC CSE', 'CDS', 'CAPF AC'].map(exam => (
            <button
              key={exam}
              onClick={() => setTargetExamFilter(exam)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                targetExamFilter === exam
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Printable Digest Content */}
      <div className="space-y-6">
        {/* Section 1: Executive Summary */}
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 border-b border-stone-100 dark:border-stone-800 pb-2">
            <Sparkles size={15} className="text-blue-600" />
            {monthLabel} Strategic Summary &amp; Core Trends ({targetExamFilter})
          </h3>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
            During {monthLabel}, India's strategic policy pivoted around three core pillars: (1) Defense Indigenization via DRDO VSHORADS MANPADS testing and GTRE-Safran 110kN jet engine Transfer of Technology, (2) Electoral &amp; Constitutional Reform via the 129th Constitutional Amendment Bill (One Nation One Election), and (3) Monetary Stability with RBI maintaining Repo Rate at 6.50% while projecting 7.2% GDP growth.
          </p>
        </div>

        {/* Section 2: Important Bills & Constitutional Amendments */}
        <div className="card space-y-3 border-l-4 border-l-purple-600">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Scale size={15} className="text-purple-600" />
            Landmark Bills, Articles &amp; Supreme Court Judgments
          </h3>
          <div className="space-y-2 text-stone-700 dark:text-stone-300">
            <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-xs">129th Constitutional Amendment Bill (One Nation One Election)</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">
                Amends Articles 83 &amp; 172 to align Lok Sabha and Assembly tenures; amends Article 325 for unified ECI voter roll.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-xs">Article 361 Supreme Court 5-Judge Constitution Bench Verdict</span>
              <p className="text-[11px] text-stone-600 dark:text-stone-400">
                Clarified gubernatorial personal immunity: post-tenure criminal inquiries permissible; official acts subject to judicial review if mala fide.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: High-Yield Defence & Space Updates */}
        <div className="card space-y-3 border-l-4 border-l-amber-600">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <Shield size={15} className="text-amber-600" />
            Defence &amp; Space Technology Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400">DRDO VSHORADS Missile System</span>
              <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                4th-Gen MANPADS tested at ITR Chandipur using miniaturized Reaction Control System (RCS) and dual-thrust solid motor.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400">India-France 110kN AMCA Jet Engine Pact</span>
              <p className="text-stone-600 dark:text-stone-400 text-[11px]">
                DRDO GTRE and Safran (France) sign 100% Transfer of Technology for single-crystal turbine blades.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Top 100 News Articles List */}
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 border-b border-stone-100 dark:border-stone-800 pb-2">
            Top Archived Intelligence Articles for {monthLabel} ({articles.length} Selected)
          </h3>
          <div className="space-y-2">
            {articles.map((art, idx) => (
              <div key={art.id} className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-xs">
                    {idx + 1}. {art.title}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    Score: {art.importanceScore}/10
                  </span>
                </div>
                <p className="text-stone-600 dark:text-stone-300 text-[11px]">{art.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
