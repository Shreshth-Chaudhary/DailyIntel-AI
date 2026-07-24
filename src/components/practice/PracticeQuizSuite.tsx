'use client';

import React, { useState } from 'react';
import { PracticeSuite, MCQQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PracticeQuizSuiteProps {
  practiceSuite: PracticeSuite;
}

export const PracticeQuizSuite: React.FC<PracticeQuizSuiteProps> = ({ practiceSuite }) => {
  const [activeTab, setActiveTab] = useState<'upsc' | 'cds' | 'capf' | 'mains' | 'essay' | 'ssb'>('upsc');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const handleOptionClick = (questionId: string, optionIndex: number, correctIndex: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));

    if (optionIndex === correctIndex) {
      try { confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } }); } catch (e) {}
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
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
        {/* Clean Header Bar */}
        <div className="card flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
            <p className="text-xs text-stone-500">Instant evaluation with explanations</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-500">Answered: {answeredCount}/{questions.length}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
              Score: {score}/{questions.length}
            </span>
            <button
              onClick={handleResetQuiz}
              className="btn btn-secondary btn-sm"
              title="Reset answers"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {questions.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;

            return (
              <div key={q.id} className="card space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold text-blue-600">Question {qIdx + 1}</span>
                  <span className="tag">{q.category}</span>
                </div>

                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                  {q.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    let style = 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300';

                    if (isAnswered) {
                      if (optIdx === q.answerIndex) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium';
                      } else if (optIdx === selectedOpt) {
                        style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-medium';
                      } else {
                        style = 'bg-stone-50 dark:bg-stone-800/20 border-stone-100 dark:border-stone-800 text-stone-400 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(q.id, optIdx, q.answerIndex)}
                        disabled={isAnswered}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between cursor-pointer ${style}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-semibold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </span>
                        {isAnswered && optIdx === q.answerIndex && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                        {isAnswered && optIdx === selectedOpt && optIdx !== q.answerIndex && <XCircle size={16} className="text-rose-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isAnswered && (
                  <div className="p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-xs text-stone-700 dark:text-stone-200 space-y-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 block">Explanation:</span>
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
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fade-up">
      {/* Header */}
      <div className="card space-y-2">
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs">
          <Award size={16} />
          Practice &amp; Evaluation Suite
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Daily Exam Questions &amp; Answer Frameworks
        </h1>
        <p className="text-xs text-stone-500">
          Targeted MCQs, Mains Answer Writing Frameworks, Essay Outlines, and SSB GD Cards.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button
          onClick={() => setActiveTab('upsc')}
          className={`filter-tab ${activeTab === 'upsc' ? 'active' : ''}`}
        >
          10 UPSC Prelims MCQs
        </button>
        <button
          onClick={() => setActiveTab('cds')}
          className={`filter-tab ${activeTab === 'cds' ? 'active' : ''}`}
        >
          5 CDS MCQs
        </button>
        <button
          onClick={() => setActiveTab('capf')}
          className={`filter-tab ${activeTab === 'capf' ? 'active' : ''}`}
        >
          5 CAPF MCQs
        </button>
        <button
          onClick={() => setActiveTab('mains')}
          className={`filter-tab ${activeTab === 'mains' ? 'active' : ''}`}
        >
          2 Mains Questions
        </button>
        <button
          onClick={() => setActiveTab('essay')}
          className={`filter-tab ${activeTab === 'essay' ? 'active' : ''}`}
        >
          Essay Topic
        </button>
        <button
          onClick={() => setActiveTab('ssb')}
          className={`filter-tab ${activeTab === 'ssb' ? 'active' : ''}`}
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
            <div key={m.id} className="card space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-600">Mains Question {idx + 1}</span>
                <span className="tag">{m.paper} • {m.wordLimit} Words</span>
              </div>

              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {m.question}
              </h3>

              <div className="space-y-3 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs">
                <h4 className="font-semibold text-blue-600">Model Answer Framework:</h4>
                <div className="space-y-2">
                  {m.answerFramework.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-200 leading-relaxed border border-stone-100 dark:border-stone-800">
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
        <div className="card space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-purple-600">UPSC Essay Paper Topic</span>
            <span className="tag">1000 - 1200 Words</span>
          </div>

          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 leading-snug">
            "{practiceSuite.essayTopic.topic}"
          </h3>

          <div className="space-y-3 pt-3 border-t border-stone-200 dark:border-stone-800 text-xs">
            <h4 className="font-semibold text-purple-600">Brainstorming Dimensions:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {practiceSuite.essayTopic.dimensions.map((dim, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-200 border border-stone-100 dark:border-stone-800">
                  <span className="font-semibold text-purple-600">Dimension {idx + 1}:</span> {dim}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900 text-stone-700 dark:text-stone-200 italic space-y-1">
              <span className="font-semibold text-purple-600 not-italic block">Key Quotes:</span>
              {practiceSuite.essayTopic.quotes.map((q, idx) => (
                <p key={idx}>{q}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ssb' && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-600">SSB Interview Group Discussion Card</span>
            <span className="tag">Defence Services</span>
          </div>

          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 leading-snug">
            {practiceSuite.ssbGdTopic.topic}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {practiceSuite.ssbGdTopic.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 space-y-2">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 block">Arguments For Integration:</span>
              <ul className="space-y-1.5 list-disc pl-4 text-stone-700 dark:text-stone-300">
                {practiceSuite.ssbGdTopic.argumentsFor.map((arg, idx) => (
                  <li key={idx}>{arg}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 space-y-2">
              <span className="font-semibold text-rose-700 dark:text-rose-400 block">Arguments For Service Autonomy:</span>
              <ul className="space-y-1.5 list-disc pl-4 text-stone-700 dark:text-stone-300">
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
