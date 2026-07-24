'use client';

import React from 'react';
import { Award, Target, Flame, TrendingUp, AlertTriangle, BookOpen, CheckCircle2, Clock, Zap, Shield, Sparkles } from 'lucide-react';
import { ExamReadinessMetrics } from '@/lib/types';

const METRICS: ExamReadinessMetrics = {
  overallReadinessScore: 86,
  upscCseReadiness: 84,
  cdsReadiness: 91,
  capfReadiness: 88,
  pyqsSolvedCount: 342,
  accuracyPercentage: 81.5,
  currentStreakDays: 14,
  studyHoursTotal: 68.5,
  weakSubjects: [
    { subject: 'Economy & Monetary Policy', accuracy: 64, recommendedTopic: 'Monetary Transmission & Liquidity Adjustment Facility' },
    { subject: 'Science & Space Technology', accuracy: 71, recommendedTopic: 'ISRO Gaganyaan Abort Trajectory & Scramjet Propulsion' },
    { subject: 'Constitutional Bodies & Articles', accuracy: 76, recommendedTopic: 'Article 361 Gubernatorial Immunity & Judicial Review' }
  ],
  strongSubjects: ['Defence Technology & MANPADS', 'International Bilateral Relations', 'Indo-Pacific Maritime Security']
};

export const ExamReadinessDashboard: React.FC = () => {
  return (
    <div className="space-y-6 text-xs animate-fade-up">
      {/* Top Banner */}
      <div className="p-6 rounded-xl bg-white border border-stone-200 text-stone-900 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-100 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 uppercase tracking-wider">
              DailyIntel AI Mentor Engine
            </span>
            <span className="text-stone-500 dark:text-stone-400 text-xs">Architect: Shreshth Chaudhary</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Exam Readiness &amp; 15-Year PYQ Intelligence Dashboard
          </h2>
          <p className="text-stone-400 max-w-xl text-xs leading-relaxed">
            Adaptive AI tracking weak areas, 15-year PYQ repetition probability, and target readiness for UPSC CSE, CDS, and CAPF AC.
          </p>
        </div>

        {/* Overall Score Badge */}
        <div className="flex items-center gap-4 bg-stone-800/80 p-4 rounded-xl border border-stone-700 shrink-0">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-blue-400">{METRICS.overallReadinessScore}%</div>
            <div className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Overall Readiness</div>
          </div>
          <div className="h-10 w-px bg-stone-700" />
          <div className="flex items-center gap-2">
            <Flame className="text-amber-500 animate-bounce" size={24} />
            <div>
              <div className="text-lg font-bold text-white">{METRICS.currentStreakDays} Days</div>
              <div className="text-[10px] text-stone-400 font-medium">Daily Study Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Target Exam Readiness Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card space-y-2 border-l-4 border-l-blue-600">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">UPSC CSE (Prelims &amp; Mains)</span>
            <span className="font-extrabold text-blue-600 text-base">{METRICS.upscCseReadiness}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${METRICS.upscCseReadiness}%` }} />
          </div>
          <p className="text-stone-500 text-[11px]">Strong in GS-3 Security &amp; Tech. Focus on GS-2 Polity Articles.</p>
        </div>

        <div className="card space-y-2 border-l-4 border-l-emerald-600">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">CDS (Defence &amp; General Knowledge)</span>
            <span className="font-extrabold text-emerald-600 text-base">{METRICS.cdsReadiness}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${METRICS.cdsReadiness}%` }} />
          </div>
          <p className="text-stone-500 text-[11px]">High accuracy on missile propulsion and military exercises.</p>
        </div>

        <div className="card space-y-2 border-l-4 border-l-amber-600">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">CAPF AC (Paper-I &amp; Paper-II)</span>
            <span className="font-extrabold text-amber-600 text-base">{METRICS.capfReadiness}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div className="h-full bg-amber-600 rounded-full" style={{ width: `${METRICS.capfReadiness}%` }} />
          </div>
          <p className="text-stone-500 text-[11px]">Essay and Internal Security report writing framework active.</p>
        </div>
      </div>

      {/* Analytics Grid: 15-Year PYQ Intelligence & Weak Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weak Subjects & AI Revision Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          <div className="card space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <AlertTriangle size={15} className="text-amber-600" />
                Adaptive Weak Area Analysis &amp; Recommended Revision
              </h3>
              <span className="text-[11px] text-stone-400 font-medium">Auto-analyzed from PYQ tests</span>
            </div>

            <div className="space-y-3">
              {METRICS.weakSubjects.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 dark:text-stone-100">{item.subject}</span>
                    <span className="font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded text-[10px]">
                      {item.accuracy}% Accuracy (Weak)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600 dark:text-stone-300">
                    <Zap size={13} className="text-amber-500 shrink-0" />
                    <span><strong>AI Target Revision:</strong> {item.recommendedTopic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High Probability Current Affairs Topics */}
          <div className="card space-y-3">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Sparkles size={15} className="text-blue-600" />
              High Probability Upcoming Exam Topics (Based on 15-Yr Trends)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase">94% Repetition Chance</span>
                <h4 className="font-bold text-stone-900 dark:text-stone-100">VSHORADS vs Igla-S Propulsion</h4>
                <p className="text-stone-500 text-[11px]">Solid dual-thrust motor &amp; Reaction Control System details.</p>
              </div>

              <div className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">91% Repetition Chance</span>
                <h4 className="font-bold text-stone-900 dark:text-stone-100">Article 361 Gubernatorial Immunity</h4>
                <p className="text-stone-500 text-[11px]">5-Judge Bench ruling on post-tenure criminal inquiries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: PYQ Metrics Card */}
        <div className="space-y-4">
          <div className="card space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
              <Award size={15} className="text-emerald-600" />
              15-Year PYQ Performance
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500 font-medium">Total PYQs Solved</span>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{METRICS.pyqsSolvedCount} Questions</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500 font-medium">Overall Accuracy Rate</span>
                <span className="font-bold text-emerald-600 text-sm">{METRICS.accuracyPercentage}%</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-500 font-medium">Total Study Hours</span>
                <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">{METRICS.studyHoursTotal} Hours</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="font-bold text-blue-700 dark:text-blue-300">Strong Mastery Sectors:</span>
              <ul className="list-disc pl-4 text-stone-600 dark:text-stone-300 space-y-0.5">
                {METRICS.strongSubjects.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
