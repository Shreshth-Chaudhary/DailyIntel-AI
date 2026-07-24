'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const DailyIntelLogo: React.FC<LogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const dimensions = {
    sm: { box: 28, svg: 28 },
    md: { box: 36, svg: 36 },
    lg: { box: 44, svg: 44 },
    xl: { box: 56, svg: 56 },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        style={{ width: `${dimensions.box}px`, height: `${dimensions.box}px` }}
        className="relative flex items-center justify-center shrink-0 group transition-transform duration-300 hover:scale-105"
      >
        <svg
          width={dimensions.svg}
          height={dimensions.svg}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Light Mode Metallic Gold/Bronze Gradient */}
            <linearGradient id="logoGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7a5c48" />
              <stop offset="50%" stopColor="#8b4e6d" />
              <stop offset="100%" stopColor="#4a362c" />
            </linearGradient>

            {/* Dark Mode Silk Sand/Champagne Gold Gradient */}
            <linearGradient id="logoGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3ece7" />
              <stop offset="40%" stopColor="#d8c6ba" />
              <stop offset="100%" stopColor="#c09bac" />
            </linearGradient>

            {/* Core Glow Filter */}
            <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Rounded Diamond Hexagon Badge */}
          <rect
            x="4"
            y="4"
            width="36"
            height="36"
            rx="11"
            className="fill-[url(#logoGradLight)] dark:fill-[url(#logoGradDark)]"
          />

          {/* Inner Protective Tactical Inset Border */}
          <rect
            x="6.5"
            y="6.5"
            width="31"
            height="31"
            rx="8.5"
            fill="none"
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="1.2"
          />

          {/* Central Precision Crest: Abstract 'D' + 'I' + Defense Wings */}
          {/* Outer 'D' Arc Wing */}
          <path
            d="M14 13H22C26.5 13 30 16.5 30 21C30 25.5 26.5 29 22 29H14V13Z"
            fill="none"
            className="stroke-white dark:stroke-[#121210]"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Central Vertical 'I' Core Pillar */}
          <path
            d="M19 13V29"
            fill="none"
            className="stroke-white dark:stroke-[#121210]"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Floating AI Intelligence Diamond Star Spark */}
          <g filter="url(#coreGlow)">
            {/* Center Star Core */}
            <path
              d="M22 17L23.2 20.2L26.4 21.4L23.2 22.6L22 25.8L20.8 22.6L17.6 21.4L20.8 20.2L22 17Z"
              className="fill-white dark:fill-[#121210]"
            />
          </g>

          {/* Corner Radar Pulse Dots */}
          <circle cx="11" cy="11" r="1.2" className="fill-white/60 dark:fill-[#121210]/60" />
          <circle cx="33" cy="11" r="1.2" className="fill-white/60 dark:fill-[#121210]/60" />
          <circle cx="33" cy="33" r="1.2" className="fill-white/60 dark:fill-[#121210]/60" />
          <circle cx="11" cy="33" r="1.2" className="fill-white/60 dark:fill-[#121210]/60" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-none">
            DailyIntel AI
          </h1>
          <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
            Defense &amp; Intelligence Ecosystem
          </span>
        </div>
      )}
    </div>
  );
};
