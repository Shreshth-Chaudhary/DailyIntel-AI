'use client';

import React, { useState } from 'react';
import { ChatMessage } from '@/lib/types';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  FileText, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface IntelAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_PROMPTS = [
  "Explain today's economy news.",
  "Give me all defence news this week.",
  "Generate UPSC notes from today's current affairs.",
  "Summarize AI news.",
  "Create revision notes."
];

export const IntelAiAssistant: React.FC<IntelAiAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: "Greeting Intelligence Officer! I am **Intel AI**, your personal UPSC & Defence research assistant. Ask me anything about today's news, economy, defence tests, or constitutional developments.",
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
        content: "Sorry, I encountered an error processing your intelligence query. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-bloomberg-card border-l border-bloomberg-border shadow-2xl flex flex-col justify-between animate-slideIn">
      {/* Assistant Header */}
      <div className="flex items-center justify-between p-4 border-b border-bloomberg-border bg-slate-900/90">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-intel-600 text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Intel AI Assistant
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-bloomberg-green/20 text-bloomberg-green font-mono">ACTIVE</span>
            </h3>
            <p className="text-[10px] text-slate-400">Contextual UPSC Research Assistant</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-intel-600 text-white">
                <Bot size={14} />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 ${
                msg.role === 'user'
                  ? 'bg-intel-600 text-white font-medium rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">{msg.content}</div>

              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                  <span className="font-semibold text-intel-400">Sources:</span>
                  <ul className="list-disc pl-3 pt-0.5 space-y-0.5">
                    {msg.sources.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <span className="block text-[9px] opacity-60 text-right font-mono">{msg.timestamp}</span>
            </div>

            {msg.role === 'user' && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300">
                <User size={14} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-intel-600 text-white animate-pulse">
              <Bot size={14} />
            </div>
            <div className="rounded-2xl p-3 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xs flex items-center gap-2">
              <Sparkles size={14} className="animate-spin text-intel-400" />
              Synthesizing intelligence feed...
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts & Input Area */}
      <div className="p-4 border-t border-bloomberg-border bg-slate-900/90 space-y-3">
        {/* Sample Prompt Chips */}
        <div className="flex overflow-x-auto gap-1.5 scrollbar-none pb-1">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-slate-300 hover:text-white hover:border-intel-500 transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Text Input Box */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask Intel AI (e.g. Explain today's economy news)..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full rounded-xl border border-bloomberg-border bg-slate-950 py-2.5 pl-3 pr-10 text-xs text-slate-100 placeholder-slate-500 focus:border-intel-500 focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim() || loading}
            className="absolute right-2 p-1.5 rounded-lg bg-intel-600 text-white disabled:opacity-40 hover:bg-intel-500 transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
