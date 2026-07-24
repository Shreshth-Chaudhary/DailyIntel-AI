'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

interface IntelAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PROMPTS = [
  "Explain today's economy news",
  "Give me all defence news this week",
  "Generate UPSC notes from today",
  "Summarize AI news",
];

/**
 * Robust inline markdown parser for **bold**, *italic*, _italic_, and `code`
 */
function parseInlineFormatting(text: string): React.ReactNode[] {
  if (!text) return [];

  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^[\s\S]*?(\*\*(.+?)\*\*)/);
    const codeMatch = remaining.match(/^[\s\S]*?(`([^`]+)`)/);
    const italicMatch = remaining.match(/^[\s\S]*?(\*([^\*]+)\*|_([^_]+)_)/);

    let closestIndex = Infinity;
    let matchType: 'bold' | 'italic' | 'code' | null = null;
    let fullMatchStr = '';
    let innerContent = '';

    if (boldMatch && boldMatch.index !== undefined) {
      const idx = remaining.indexOf(boldMatch[1]);
      if (idx < closestIndex) {
        closestIndex = idx;
        matchType = 'bold';
        fullMatchStr = boldMatch[1];
        innerContent = boldMatch[2];
      }
    }

    if (codeMatch && codeMatch.index !== undefined) {
      const idx = remaining.indexOf(codeMatch[1]);
      if (idx < closestIndex) {
        closestIndex = idx;
        matchType = 'code';
        fullMatchStr = codeMatch[1];
        innerContent = codeMatch[2];
      }
    }

    if (italicMatch && italicMatch.index !== undefined) {
      const idx = remaining.indexOf(italicMatch[1]);
      if (idx < closestIndex && (!fullMatchStr || !fullMatchStr.includes(italicMatch[1]))) {
        closestIndex = idx;
        matchType = 'italic';
        fullMatchStr = italicMatch[1];
        innerContent = italicMatch[2] || italicMatch[3];
      }
    }

    if (matchType === null || closestIndex === Infinity) {
      tokens.push(remaining);
      break;
    }

    if (closestIndex > 0) {
      tokens.push(remaining.slice(0, closestIndex));
    }

    if (matchType === 'bold') {
      tokens.push(
        <strong key={keyIdx++} className="font-bold text-stone-900 dark:text-stone-100">
          {parseInlineFormatting(innerContent)}
        </strong>
      );
    } else if (matchType === 'italic') {
      tokens.push(
        <em key={keyIdx++} className="italic text-stone-800 dark:text-stone-200">
          {innerContent}
        </em>
      );
    } else if (matchType === 'code') {
      tokens.push(
        <code key={keyIdx++} className="px-1 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-blue-600 dark:text-blue-400 font-mono text-[11px]">
          {innerContent}
        </code>
      );
    }

    remaining = remaining.slice(closestIndex + fullMatchStr.length);
  }

  return tokens;
}

/**
 * Complete block-level Markdown renderer for #, ##, ###, ####, ---, bullet points, & numbered lists
 */
function renderFormattedMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();

    // Horizontal Rule: --- or *** or ___
    if (/^(---|[*]{3,}|_{3,})$/.test(trimmed)) {
      return (
        <hr key={lineIdx} className="my-2 border-stone-200 dark:border-stone-800" />
      );
    }

    // Headings: #, ##, ###, ####
    const headerMatch = trimmed.match(/^(#{1,6})\s+(.*)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const titleText = headerMatch[2];
      const parsedTitle = parseInlineFormatting(titleText);

      if (level === 1) {
        return (
          <h2 key={lineIdx} className="font-bold text-stone-900 dark:text-stone-100 text-sm mt-3 mb-1 tracking-tight">
            {parsedTitle}
          </h2>
        );
      }
      if (level === 2) {
        return (
          <h3 key={lineIdx} className="font-bold text-stone-900 dark:text-stone-100 text-xs mt-2.5 mb-1 tracking-tight border-b border-stone-200 dark:border-stone-800 pb-0.5">
            {parsedTitle}
          </h3>
        );
      }
      return (
        <h4 key={lineIdx} className="font-bold text-stone-900 dark:text-stone-100 text-xs mt-2 mb-1">
          {parsedTitle}
        </h4>
      );
    }

    // Bullet points: •, *, -
    if (/^[•*-]\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[•*-]\s+/, '');
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 ml-1.5 my-0.5">
          <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">•</span>
          <div className="text-stone-700 dark:text-stone-300 leading-relaxed">
            {parseInlineFormatting(content)}
          </div>
        </div>
      );
    }

    // Numbered lists: 1. 2. 3.
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      return (
        <div key={lineIdx} className="flex items-start gap-1.5 ml-1.5 my-0.5">
          <span className="font-semibold text-blue-600 dark:text-blue-400 shrink-0 text-[11px]">{numMatch[1]}.</span>
          <div className="text-stone-700 dark:text-stone-300 leading-relaxed">
            {parseInlineFormatting(numMatch[2])}
          </div>
        </div>
      );
    }

    // Empty line
    if (trimmed === '') {
      return <div key={lineIdx} className="h-1.5" />;
    }

    // Standard Paragraph
    return (
      <p key={lineIdx} className="my-0.5 leading-relaxed text-stone-700 dark:text-stone-300">
        {parseInlineFormatting(line)}
      </p>
    );
  });
}

export const IntelAiAssistant: React.FC<IntelAiAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: "Hello! I am **DailyIntel AI**, your personal research assistant for UPSC CSE, CDS, CAPF AC, Defence, Polity, and Economy. Ask me any question about today's intelligence feed or exam preparation.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const text = queryText || inputQuery;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      if (data.success) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.content,
          timestamp: data.timestamp,
          sources: data.sources
        };
        setMessages(prev => [...prev, botMsg]);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between animate-fade-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <Sparkles size={15} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              AI Assistant
            </h3>
            <p className="text-[11px] text-stone-400">DailyIntel Research Copilot</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={13} />
              </div>
            )}

            <div
              className={`max-w-[88%] rounded-lg p-3 space-y-1.5 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <div className="leading-relaxed">
                {msg.role === 'user' ? msg.content : renderFormattedMarkdown(msg.content)}
              </div>

              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 text-[10px] text-stone-400">
                  <span className="font-medium text-stone-500">Sources:</span>
                  <ul className="list-disc pl-3 space-y-0.5">
                    {msg.sources.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <span className="block text-[9px] opacity-60 text-right">{msg.timestamp}</span>
            </div>

            {msg.role === 'user' && (
              <div className="h-6 w-6 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300 flex items-center justify-center shrink-0 mt-0.5">
                <User size={13} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Bot size={13} />
            </div>
            <div className="rounded-lg p-3 bg-stone-50 dark:bg-stone-800 text-stone-500 text-xs flex items-center gap-2 border border-stone-100 dark:border-stone-700">
              <Sparkles size={14} className="animate-spin text-blue-600" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts & Input */}
      <div className="p-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
        <div className="flex overflow-x-auto gap-1.5 scrollbar-none pb-1">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="filter-tab text-[11px] shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask AI a question..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 py-2 pl-3 pr-9 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-blue-600"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loading}
            className="absolute right-1.5 p-1 rounded bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
