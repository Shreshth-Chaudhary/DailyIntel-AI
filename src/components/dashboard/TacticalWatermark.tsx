'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const TacticalWatermark: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Organic Fluid Gradient Mesh Orbs */}
      <motion.div 
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-indigo-900/40 via-intel-900/25 to-sky-900/10 blur-[100px]"
      />

      <motion.div 
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute -bottom-32 -right-32 h-[650px] w-[650px] rounded-full bg-gradient-to-tl from-emerald-900/25 via-blue-900/20 to-purple-900/15 blur-[120px]"
      />

      {/* 2. Soft Ambient Center Glow */}
      <motion.div 
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [0.9, 1.05, 0.9]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-indigo-500/10 blur-[90px]"
      />

      {/* 3. Army Soldier & Gun Emoji Soft Floating Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] space-x-12">
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="text-[200px] md:text-[280px] leading-none filter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        >
          🪖 ⚔️
        </motion.div>
      </div>

      {/* 4. Elegant Repeating Diagonal Watermark: SHRESHTH CHAUDHARY */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-[0.02] dark:opacity-[0.03] rotate-[-12deg] scale-125 font-mono font-bold text-xs text-slate-200 tracking-[0.35em] uppercase pointer-events-none leading-relaxed">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="whitespace-nowrap flex gap-16">
            <span>SHRESHTH CHAUDHARY • DAILYINTEL AI ARCHITECT</span>
            <span>🪖 UPSC & DEFENCE RESEARCH ASSISTANT</span>
            <span>SHRESHTH CHAUDHARY • INTEL PLATFORM</span>
            <span>🎖️ SOVEREIGN DEFENCE AI</span>
          </div>
        ))}
      </div>

      {/* 5. Minimal Tactical Corner Markers */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-intel-500/30 tracking-widest hidden md:block">
        ARCHITECT // SHRESHTH CHAUDHARY // INTEL_V2.5
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-intel-500/30 tracking-widest hidden md:block">
        SOVEREIGN INTELLIGENCE PLATFORM • BY SHRESHTH CHAUDHARY
      </div>
    </div>
  );
};
