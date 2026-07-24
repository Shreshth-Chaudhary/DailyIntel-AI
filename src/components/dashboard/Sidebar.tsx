'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Award,
  Calendar,
  FileCheck,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  savedCount: number;
  readCount: number;
  totalCount: number;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const NAV_ITEMS = [
  { id: 'feed',      label: "Today's Feed",          icon: Newspaper },
  { id: 'timeline',  label: 'Date Archive & Timeline', icon: Calendar },
  { id: 'briefing',  label: 'Morning Briefing',       icon: BookOpen },
  { id: 'practice',  label: 'Practice Quiz & PYQ',    icon: HelpCircle },
  { id: 'mentor',    label: 'AI Mentor & PYQs',       icon: Award },
  { id: 'digest',    label: 'Monthly Digest & PDF',   icon: FileCheck },
  { id: 'analytics', label: 'Sector Heatmap',         icon: TrendingUp },
  { id: 'bookmarks', label: 'Bookmarks',              icon: Bookmark },
];

const CATEGORIES = [
  { id: 'All',                   label: 'All Categories',   dot: 'bg-stone-400 dark:bg-stone-500' },
  { id: 'Defence',               label: 'Defence & Military', dot: 'bg-red-500' },
  { id: 'Economy',               label: 'Economy & Finance', dot: 'bg-emerald-500' },
  { id: 'International',         label: 'International',    dot: 'bg-blue-500' },
  { id: 'AI & Tech',             label: 'AI & Tech',        dot: 'bg-purple-500' },
  { id: 'Science & Environment', label: 'Science & Env',   dot: 'bg-teal-500' },
  { id: 'UPSC',                  label: 'UPSC Polity',      dot: 'bg-amber-500' },
];

// Stagger animation for nav items
const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show:   { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  savedCount,
  readCount,
  totalCount,
  activeCategory,
  setActiveCategory,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const readPct = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 52 : 230, minWidth: isCollapsed ? 52 : 230 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="hidden lg:flex flex-col border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 sticky top-[56px] h-[calc(100vh-56px)] shrink-0 overflow-hidden"
    >
      {/* ── Collapse Toggle ──────────────────────────────────────── */}
      <div className={`py-3 border-b border-stone-200 dark:border-stone-800 flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-3.5'}`}>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              key="workspace-label"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="text-xs font-mono font-semibold uppercase text-stone-400 tracking-wider"
            >
              Workspace
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.12, rotate: isCollapsed ? 5 : -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-[#d8c6ba] transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Retract Sidebar'}
        >
          {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </motion.button>
      </div>

      {/* ── Scrollable Nav Area ───────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-4 scrollbar-none">

        {/* Primary Navigation */}
        <div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                key="nav-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="nav-section-label px-3.5"
              >
                Navigation
              </motion.div>
            )}
          </AnimatePresence>

          <motion.nav
            variants={listVariants}
            initial="hidden"
            animate="show"
            className={`space-y-0.5 ${isCollapsed ? 'px-0' : 'px-2'}`}
          >
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ x: isCollapsed ? 0 : 3, transition: { duration: 0.15 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`nav-item relative flex items-center gap-2.5 rounded-lg text-xs font-medium transition-colors w-full ${
                    isCollapsed ? 'justify-center py-2.5 px-0' : 'px-3 py-2'
                  } ${
                    isActive
                      ? 'bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[#7a5c48] dark:bg-[#d8c6ba]"
                    />
                  )}
                  <Icon size={18} className={isActive ? 'text-[#7a5c48] dark:text-[#d8c6ba]' : 'text-stone-400'} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        key={`label-${item.id}`}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex-1 text-left truncate overflow-hidden"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {item.id === 'bookmarks' && savedCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-1.5 rounded text-[10px] font-mono bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold ${
                        isCollapsed ? 'absolute top-1 right-1 text-[8px]' : ''
                      }`}
                    >
                      {savedCount}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </motion.nav>
        </div>

        {/* Category Filters */}
        <div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                key="cat-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="nav-section-label px-3.5"
              >
                Categories
              </motion.div>
            )}
          </AnimatePresence>

          <nav className={`space-y-0.5 ${isCollapsed ? 'px-0' : 'px-2'}`}>
            {CATEGORIES.map((cat, i) => {
              const isSelected = activeCategory === cat.id && currentTab === 'feed';
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ x: isCollapsed ? 0 : 3, transition: { duration: 0.12 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (currentTab !== 'feed') setCurrentTab('feed');
                  }}
                  title={isCollapsed ? cat.label : undefined}
                  className={`nav-item flex items-center gap-2.5 rounded-lg text-xs transition-colors w-full ${
                    isCollapsed ? 'justify-center py-2 px-0' : 'px-3 py-1.5'
                  } ${
                    isSelected
                      ? 'bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30 font-bold'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 ${isSelected ? 'bg-[#7a5c48] dark:bg-[#d8c6ba]' : cat.dot}`} />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        key={`cat-label-${cat.id}`}
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.16 }}
                        className="truncate overflow-hidden"
                      >
                        {cat.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ── Pinned: Reading Progress ──────────────────────────────── */}
      <div className={`px-3 pt-3 pb-2 border-t border-stone-200 dark:border-stone-800 ${isCollapsed ? 'flex justify-center' : ''}`}>
        {!isCollapsed ? (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 font-medium">
                <CheckCircle2 size={12} className="text-[#7a5c48] dark:text-[#d8c6ba]" />
                Reading Progress
              </span>
              <span className="font-bold text-[#7a5c48] dark:text-[#d8c6ba]">{readPct}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
              <motion.div
                className="h-full bg-[#7a5c48] dark:bg-[#d8c6ba] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${readPct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
            <div className="text-[10px] text-stone-400 font-mono">
              {readCount} of {totalCount} articles read
            </div>
          </div>
        ) : (
          <div title={`Reading Progress: ${readPct}%`}>
            <CheckCircle2 size={18} className="text-[#7a5c48] dark:text-[#d8c6ba]" />
          </div>
        )}
      </div>

      {/* ── Pinned: User Footer ───────────────────────────────────── */}
      <motion.div
        whileHover={{ backgroundColor: 'rgba(120,92,72,0.06)' }}
        transition={{ duration: 0.2 }}
        className={`px-3 py-3 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2.5 cursor-pointer ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="h-7 w-7 rounded-full bg-[#7a5c48] text-white dark:bg-[#d8c6ba] dark:text-[#121210] text-xs font-bold flex items-center justify-center shrink-0 shadow-md"
        >
          SC
        </motion.div>
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              key="user-info"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="min-w-0"
            >
              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">Shreshth Chaudhary</p>
              <p className="text-[10px] font-mono text-stone-500 dark:text-stone-400 truncate">Chief Architect</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.aside>
  );
};
