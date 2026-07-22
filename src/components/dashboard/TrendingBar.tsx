'use client';

import React from 'react';
import { Flame, ArrowUpRight } from 'lucide-react';

interface TrendingBarProps {
  onSelectTopic: (topic: string) => void;
}

const TRENDING_TOPICS = [
  { topic: 'VSHORADS Air Defence Test', category: 'Defence', score: '9.6' },
  { topic: 'RBI Repo Rate 6.50%', category: 'Economy', score: '9.8' },
  { topic: 'Safran 110kN Engine ToT', category: 'International', score: '9.5' },
  { topic: 'IndiaAI 10k GPU Cloud', category: 'AI & Tech', score: '9.4' },
  { topic: 'Gaganyaan TV-D2 Test', category: 'Science', score: '9.3' },
  { topic: 'Article 361 SC Verdict', category: 'UPSC Polity', score: '9.1' },
];

export const TrendingBar: React.FC<TrendingBarProps> = ({ onSelectTopic }) => {
  return (
    <div className="flex items-center gap-3 bg-bloomberg-card border-b border-bloomberg-border px-4 py-2 text-xs overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1.5 font-bold text-bloomberg-amber shrink-0 font-mono text-[11px]">
        <Flame size={14} className="text-orange-500 animate-bounce" />
        TRENDING TOPICS
      </div>
      <div className="flex items-center gap-2">
        {TRENDING_TOPICS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTopic(item.topic)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-intel-500/50 hover:bg-slate-800 transition-all shrink-0 text-slate-300 text-[11px]"
          >
            <span className="font-semibold text-slate-200">{item.topic}</span>
            <span className="text-[10px] font-mono text-intel-400">[{item.score}]</span>
            <ArrowUpRight size={12} className="text-slate-500" />
          </button>
        ))}
      </div>
    </div>
  );
};
