'use client';

import React, { useState } from 'react';
import { PracticeSuite, MCQQuestion } from '@/lib/types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  FileText, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeQuizSuiteProps {
  practiceSuite: PracticeSuite;
}

export const PracticeQuizSuite: React.FC<PracticeQuizSuiteProps> = ({ practiceSuite }) => {
  const [activeTab, setActiveTab] = useState<'upsc' | 'cds' | 'capf' | 'mains' | 'essay' | 'ssb'>('upsc');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleOptionClick = (questionId: string, optionIndex: number, correctIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered

    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations(prev => ({ ...prev, [questionId]: true }));

    if (optionIndex === correctIndex) {
      try {
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }
  };

  const getScore = (questions: MCQQuestion[]) => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.answerIndex) score += 1;
    });
    return score;
  };

  const renderMcqList = (questions: MCQQuestion[], title: string) => {
    const answeredCount = questions.filter(q => selectedAnswers[q.id] !== undefined).length;
    const score = getScore(questions);

    return (
      <div className="space-y-6">
        {/* Score Header */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-bloomberg-border bg-bloomberg-card">
          <div>
            <h3 className="text-sm font-bold text-white font-mono">{title}</h3>
            <p className="text-xs text-slate-400">Interactive practice with immediate evaluation & explanations.</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-400">Answered: {answeredCount}/{questions.length}</span>
            <span className="px-3 py-1 rounded bg-intel-600/20 text-intel-400 font-bold border border-intel-500/30">
              Score: {score}/{questions.length}
            </span>
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {questions.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.answerIndex;

            return (
              <div key={q.id} className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="text-intel-400 font-bold">QUESTION {qIdx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">{q.category}</span>
                </div>

                <p className="text-xs md:text-sm font-semibold text-slate-100 whitespace-pre-line leading-relaxed">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    let optionStyle = 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700';
                    if (isAnswered) {
                      if (optIdx === q.answerIndex) {
                        optionStyle = 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 font-semibold';
                      } else if (optIdx === selectedOpt) {
                        optionStyle = 'border-rose-500/50 bg-rose-950/40 text-rose-300 font-semibold';
                      } else {
                        optionStyle = 'border-slate-800 bg-slate-900/40 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(q.id, optIdx, q.answerIndex)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </span>
                        {isAnswered && optIdx === q.answerIndex && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                        {isAnswered && optIdx === selectedOpt && optIdx !== q.answerIndex && <XCircle size={16} className="text-rose-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-intel-500/30 text-xs text-slate-200 leading-relaxed space-y-1">
                    <span className="font-bold text-intel-400 block font-mono">EXPLANATION:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="rounded-2xl border border-bloomberg-border bg-bloomberg-card p-6 space-y-2">
        <div className="flex items-center gap-2 text-upsc-saffron font-mono text-xs font-semibold">
          <Award size={18} />
          DAILY PRACTICE & EVALUATION SUITE
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          UPSC CSE • CDS • CAPF AC Daily Question Generator
        </h1>
        <p className="text-xs text-slate-400">
          Targeted MCQs, Mains Answer Writing Frameworks, Essay Outlines, and SSB GD Discussion Cards derived from today's intelligence.
        </p>
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-bloomberg-border gap-2 overflow-x-auto scrollbar-none pb-1">
        <button
          onClick={() => setActiveTab('upsc')}
          className={`px-4 py-2 rounded-t-lg text-xs font-semibold transition-all ${
            activeTab === 'upsc' ? 'bg-intel-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          10 UPSC Prelims MCQs
        </button>
        <button
          onClick={() => setActiveTab('cds')}
          className={`px-4 py-2 rounded-t-lg text-xs font-semibold transition-all ${
            activeTab === 'cds' ? 'bg-intel-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          5 CDS MCQs
        </button>
        <button
          onClick={() => setActiveTab('capf')}
          className={`px-4 py-2 rounded-t-lg text-xs font-semibold transition-all ${
            activeTab === 'capf' ? 'bg-intel-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          5 CAPF MCQs
        </button>
        <button
          onClick={() => setActiveTab('mains')}
          className={`px-4 py-2 rounded-t-lg text-xs font-semibold transition-all ${
            activeTab === 'mains' ? 'bg-intel-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          2 Mains Questions
        </button>
        <button
          onClick={() => setActiveTab('essay')}
          className={`px-4 py-2 rounded-t-lg text-xs font-semibold transition-all ${
            activeTab === 'essay' ? 'bg-intel-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          Essay Topic
        </button>
        <button
          onClick={() => setActiveTab('ssb')}
          className={`px-4 py-2 rounded-t-lg text-xs font-semibold transition-all ${
            activeTab === 'ssb' ? 'bg-intel-600 text-white' : 'text-slate-400 hover:text-white bg-slate-900/50'
          }`}
        >
          SSB GD Topic
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'upsc' && renderMcqList(practiceSuite.upscPrelimsMcqs, 'UPSC Civil Services Prelims MCQs')}
      {activeTab === 'cds' && renderMcqList(practiceSuite.cdsMcqs, 'Combined Defence Services (CDS) MCQs')}
      {activeTab === 'capf' && renderMcqList(practiceSuite.capfMcqs, 'CAPF Assistant Commandant MCQs')}

      {activeTab === 'mains' && (
        <div className="space-y-6">
          {practiceSuite.mainsQuestions.map((m, idx) => (
            <div key={m.id} className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-upsc-saffron font-bold">MAINS QUESTION {idx + 1}</span>
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">{m.paper} • {m.wordLimit} Words</span>
              </div>

              <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                {m.question}
              </h3>

              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <h4 className="font-bold text-intel-400 font-mono">MODEL ANSWER STRUCTURE & FRAMEWORK:</h4>
                <div className="space-y-2">
                  {m.answerFramework.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'essay' && (
        <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-purple-400 font-bold">UPSC ESSAY PAPER TOPIC</span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">1000 - 1200 Words</span>
          </div>

          <h3 className="text-lg font-bold text-white leading-snug">
            "{practiceSuite.essayTopic.topic}"
          </h3>

          <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
            <h4 className="font-bold text-purple-400 font-mono">SUGGESTED MULTI-DIMENSIONAL BRAINSTORMING:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {practiceSuite.essayTopic.dimensions.map((dim, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  <span className="font-mono text-purple-400 font-bold">Dim {idx + 1}:</span> {dim}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-slate-900/90 border border-purple-500/30 text-slate-200 italic space-y-1">
              <span className="font-bold text-purple-400 not-italic block font-mono">KEY QUOTES TO WEAVE IN:</span>
              {practiceSuite.essayTopic.quotes.map((q, idx) => (
                <p key={idx}>{q}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ssb' && (
        <div className="rounded-xl border border-bloomberg-border bg-bloomberg-card p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold">SSB INTERVIEW GROUP DISCUSSION (GD) CARD</span>
            <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">CDS / AFCAT / NDA / SSB</span>
          </div>

          <h3 className="text-lg font-bold text-white leading-snug">
            {practiceSuite.ssbGdTopic.topic}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            {practiceSuite.ssbGdTopic.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30 space-y-2">
              <span className="font-bold text-emerald-400 font-mono block">ARGUMENTS FOR INTEGRATION:</span>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                {practiceSuite.ssbGdTopic.argumentsFor.map((arg, idx) => (
                  <li key={idx}>{arg}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
              <span className="font-bold text-rose-400 font-mono block">ARGUMENTS FOR SERVICE AUTONOMY:</span>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                {practiceSuite.ssbGdTopic.argumentsAgainst.map((arg, idx) => (
                  <li key={idx}>{arg}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
