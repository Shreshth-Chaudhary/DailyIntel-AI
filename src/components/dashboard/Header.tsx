'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Sun, Moon, Bell, Share2, X, Menu } from 'lucide-react';
import { ExamType } from '@/lib/types';
import { DailyIntelLogo } from '@/components/brand/DailyIntelLogo';

interface HeaderProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeExam: string;
  setActiveExam: (exam: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAiAssistant: () => void;
  onOpenExportModal: () => void;
  savedCount: number;
  onOpenMobileMenu?: () => void;
}

const EXAMS: ExamType[] = ['UPSC CSE', 'CDS', 'CAPF AC', 'AFCAT', 'NDA', 'SSB'];

export const Header: React.FC<HeaderProps> = ({
  activeExam,
  setActiveExam,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
  onOpenAiAssistant,
  onOpenExportModal,
  savedCount,
  onOpenMobileMenu,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 40], ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']);
  const headerBgDark = useTransform(scrollY, [0, 40], ['rgba(12,12,10,0)', 'rgba(12,12,10,1)']);
  const headerShadow = useTransform(scrollY, [0, 40], ['0 0 0 rgba(0,0,0,0)', '0 1px 12px rgba(0,0,0,0.08)']);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showMobileSearch) inputRef.current?.focus();
  }, [showMobileSearch]);

  return (
    <motion.header
      className="app-header sticky top-0 z-40 backdrop-blur-md border-b border-stone-200 dark:border-stone-800"
      style={{
        background: darkMode ? headerBgDark : headerBg,
        boxShadow: headerShadow,
      }}
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onOpenMobileMenu}
        className="lg:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors mr-1"
        title="Open navigation"
      >
        <Menu size={20} />
      </button>

      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 shrink-0">
        <DailyIntelLogo size="md" />
        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold tracking-tight text-stone-900 dark:text-stone-100 leading-none">
              DailyIntel AI
            </h1>
            <span className="hidden md:inline px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30">
              Shreshth Chaudhary
            </span>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight hidden md:block">
            UPSC CSE, CDS &amp; CAPF AI Exam Ecosystem
          </p>
        </div>
      </div>

      {/* Exam Filter Pills - Desktop Only */}
      <div className="hidden xl:flex items-center gap-1 ml-4 shrink-0">
        <span className="text-xs text-stone-400 mr-1 font-medium">Exam:</span>
        {EXAMS.map(exam => (
          <motion.button
            key={exam}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveExam(activeExam === exam ? 'All' : exam)}
            className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-colors ${
              activeExam === exam
                ? 'bg-[#7a5c48] text-white dark:bg-[#d8c6ba] dark:text-[#121210]'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {exam}
          </motion.button>
        ))}
      </div>

      {/* Search Input - Desktop */}
      <div className="search-input mx-auto hidden md:block relative">
        <Search className="search-icon" size={15} />
        <input
          type="text"
          placeholder="Search articles, topics, ministries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 ml-auto shrink-0">
        {/* Mobile Search Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowMobileSearch(v => !v)}
          className="md:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <Search size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenAiAssistant}
          className="btn btn-primary btn-sm"
        >
          <Sparkles size={14} />
          <span className="hidden sm:inline">AI Assistant</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenExportModal}
          className="btn btn-secondary btn-sm hidden sm:inline-flex"
        >
          <Share2 size={13} />
          <span>Export</span>
        </motion.button>

        {/* Theme Toggle with smooth icon swap */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          title="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Sun size={16} className="text-amber-400" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Moon size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Notifications */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
          >
            <Bell size={16} />
            <span className="notif-dot" />
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="absolute right-0 mt-2 w-72 rounded-lg border border-stone-200 bg-white dark:bg-stone-900 dark:border-stone-800 p-4 shadow-lg z-50"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100 dark:border-stone-800">
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">Daily Dispatch</span>
                  <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">Active</span>
                </div>
                <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex justify-between py-1 border-b border-stone-50 dark:border-stone-800">
                    <span>Morning Digest</span>
                    <span className="text-emerald-600 text-[11px]">07:00 AM Sent</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-50 dark:border-stone-800">
                    <span>Telegram Channel</span>
                    <span className="text-emerald-600 text-[11px]">Synced</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Notion Export</span>
                    <span className="text-amber-600 text-[11px]">Ready</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Pill */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 ml-1">
          <div className="h-6 w-6 rounded-full bg-[#7a5c48] text-white font-semibold text-[10px] flex items-center justify-center shrink-0">
            SC
          </div>
          <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 hidden lg:inline">
            Shreshth Chaudhary
          </span>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      <AnimatePresence>
        {showMobileSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-3 md:hidden z-50"
          >
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-stone-400" size={15} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search articles, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-stone-400">
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
