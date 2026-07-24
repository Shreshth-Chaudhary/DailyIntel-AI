'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Article } from '@/lib/types';

interface TrendingBarProps {
  onSelectTopic: (topic: string) => void;
  articles?: Article[];
}

const DEFAULT_TRENDING = [
  { label: 'DRDO VSHORADS Air Defence Test', query: 'VSHORADS' },
  { label: 'RBI Keeps Repo Rate at 6.50%', query: 'Repo Rate' },
  { label: 'Safran 110kN Jet Engine ToT Pact', query: 'Safran' },
  { label: 'IndiaAI 10k GPU Cloud Outlay Approved', query: 'IndiaAI' },
  { label: 'ISRO Gaganyaan TV-D2 Test Abort', query: 'Gaganyaan' },
  { label: 'Article 361 Supreme Court Bench Verdict', query: 'Article 361' },
  { label: 'BIMSTEC Defence Conclave', query: 'BIMSTEC' },
  { label: 'Income Tax Day July 24 Savings Report', query: 'Income Tax' },
];

export const TrendingBar: React.FC<TrendingBarProps> = ({ onSelectTopic, articles }) => {
  const liveTopics = (articles && articles.length > 0)
    ? articles.slice(0, 10).map(a => ({
        label: `${a.title.slice(0, 52)}${a.title.length > 52 ? '...' : ''}`,
        query: a.keywords?.[0] || a.title.split(' ')[0] || a.category,
      }))
    : DEFAULT_TRENDING;

  // Triple-duplicate for truly seamless infinite scroll
  const tickerItems = [...liveTopics, ...liveTopics, ...liveTopics];
  const totalItems = liveTopics.length;

  return (
    <div className="trending-bar overflow-hidden">
      <div className="trending-badge shrink-0">
        <Flame size={13} className="text-[#7a5c48] dark:text-[#d8c6ba]" />
        <span className="hidden xs:inline">Trending</span>
      </div>

      {/* Framer Motion infinite scroll marquee */}
      <div className="flex-1 overflow-hidden relative">
        {/* Left fade mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-white dark:from-stone-950 to-transparent" />
        {/* Right fade mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white dark:from-stone-950 to-transparent" />

        <motion.div
          className="flex items-center gap-0 whitespace-nowrap"
          animate={{ x: ['0%', `-${(100 / 3)}%`] }}
          transition={{
            duration: totalItems * 3.5,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          {tickerItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.button
                whileHover={{ scale: 1.05, color: '#7a5c48' }}
                onClick={() => onSelectTopic(item.query)}
                className="trending-item text-stone-700 dark:text-stone-300 hover:text-[#7a5c48] dark:hover:text-[#d8c6ba] shrink-0 transition-colors"
                title={`Search: ${item.label}`}
              >
                ↗ {item.label}
              </motion.button>
              <span className="trending-separator font-mono text-stone-300 dark:text-stone-700 mx-3">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
