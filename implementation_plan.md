# Implementation Plan: DailyIntel AI Platform

DailyIntel AI is a personalized Daily Intelligence Platform that automatically collects, filters, deduplicates, ranks, summarizes, categorizes, and delivers high-signal news relevant for **UPSC CSE, CDS, CAPF, Defence, Economy, AI & Tech, Science, and Indian Current Affairs**.

---

## User Review Required

> [!IMPORTANT]
> - **Environment & API Keys**: The platform integrates with Gemini / OpenAI API for AI processing, and real RSS feeds (PIB, The Hindu, Indian Express, LiveMint, DRDO, ISRO, PRS India, RBI). Out-of-the-box local fallback mode is built-in so it functions immediately with simulated/cached live intelligence even if API keys are not supplied.
> - **Design System**: Bloomberg Terminal meets Linear / Perplexity - a clean, high-density dark-mode visual aesthetic with rich glassmorphism, category heatmaps, daily timelines, calendar views, reading progress, and interactive AI chat sidebar.

---

## Proposed System Architecture & Core Features

### 1. Data Ingestion & Processing Pipeline (`src/lib/news-ingestion/`)
- **RSS & Source Ingestor**: Fetches real-time feeds from:
  - **Press Information Bureau (PIB)**, **PRS India**, **RBI Releases**, **DRDO**, **ISRO**
  - **The Hindu**, **Indian Express**, **LiveMint** RSS feeds
  - **Fallback / NewsAPI** connectors
- **AI Processing Pipeline**:
  - Deduplication & Clustering (merge duplicate stories into single comprehensive intel node)
  - Quality & Credibility Filtering (detect fake/clickbait/low-quality content)
  - Topic & Category Tagging (India, International, Defence, Economy, AI & Tech, Science & Environment, UPSC)
  - **UPSC/CDS/CAPF Exam Tagging**:
    - Why it matters
    - Exam relevance (UPSC CSE / CDS / CAPF / AFCAT / NDA / SSB)
    - Prelims MCQ angle & Mains Question angle
    - Key Terminology & Keywords
  - Structured Entity Extraction: Key Facts, Dates, Key Personalities, Organizations, Timelines

### 2. Morning Intelligence Brief Generator (`src/lib/briefing/`)
- **Automated Morning Briefing**:
  - Top 10 High-Impact Headlines
  - Categorized Sections: Defence, Economy, International Relations, AI & Technology, Science & Environment, UPSC Current Affairs
  - Key Facts, Keywords, Revision Notes, Editorial Analysis
  - Deep-dive impact analysis: Why it matters, Impact on India, Impact on Economy, Impact on Defence, Future Implications

### 3. UPSC / Defence Exam Practice Engine (`src/components/practice/`)
- **Auto-generated Daily Practice Suite**:
  - **10 UPSC Prelims MCQs** with full explanations and options
  - **5 CDS MCQs** & **5 CAPF MCQs**
  - **2 Mains Questions** with structured model answers & key points
  - **1 Essay Topic** with analytical outline
  - **1 SSB Group Discussion Topic** with pro/con arguments & background context

### 4. Interactive AI Research Assistant ("Intel AI") (`src/components/ai/`)
- Floating / Sidebar Conversational AI Assistant
- Context-aware capabilities:
  - *"Explain today's economy news"*
  - *"Give me all defence news this week"*
  - *"Generate UPSC revision notes from today's current affairs"*
  - *"Summarize AI developments"*
  - Custom user prompt execution with streaming/instant intelligence

### 5. High-Density Dashboard & Modern UI (`src/app/` & `src/components/`)
- Inspired by **Linear**, **Notion**, **Perplexity**, and **Bloomberg Terminal**:
  - **Header & Navigation**: Global search, date selector, category switches, dark/light theme toggle, notifications dropdown.
  - **Intelligence Feeds View**: Filterable list/grid of processed stories with exam badges, key facts, and deep analysis modal.
  - **Category Heatmap & Analytics**: Visual matrix of coverage volume and priority across sectors.
  - **Interactive Daily Timeline**: Chronological event flow of the day.
  - **Calendar View**: Historical briefing archive navigation.
  - **Bookmark & Saved Intel Manager**: Personal reading list and progress tracker.
  - **Multi-channel Export & Notification Suite**: Export briefing to Email, Telegram, Discord, Notion, WhatsApp.

---

## File Structure Plan

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Main Intelligence Dashboard)
│   ├── briefing/page.tsx (Morning Briefing View)
│   ├── practice/page.tsx (UPSC/CDS/CAPF Practice Engine)
│   ├── timeline/page.tsx (Interactive Timeline)
│   ├── analytics/page.tsx (Heatmaps & Sector Trends)
│   ├── bookmarks/page.tsx (Saved Intel & Reading Progress)
│   └── api/
│       ├── news/route.ts (Fetch & Filter Articles API)
│       ├── briefing/route.ts (Daily Briefing API)
│       ├── practice/route.ts (MCQs & Mains Questions API)
│       ├── chat/route.ts (AI Assistant API)
│       ├── export/route.ts (Notion / Email / Telegram Export API)
│       └── fetch-rss/route.ts (Trigger Live Ingestion)
├── components/
│   ├── ui/ (Button, Card, Badge, Modal, Tabs, Select, Input, Tooltip)
│   ├── dashboard/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TrendingBar.tsx
│   │   ├── CategoryHeatmap.tsx
│   │   ├── NewsTimeline.tsx
│   │   ├── ArticleCard.tsx
│   │   └── ArticleDetailModal.tsx
│   ├── briefing/
│   │   └── MorningBriefingView.tsx
│   ├── practice/
│   │   └── PracticeQuizSuite.tsx
│   ├── ai/
│   │   └── IntelAiAssistant.tsx
│   └── export/
│       └── ExportModal.tsx
├── lib/
│   ├── types.ts (TypeScript interfaces for Article, Briefing, Quiz, Categories)
│   ├── news-ingestion/
│   │   ├── feed-sources.ts (RSS Feed URLs & API Configs)
│   │   ├── parser.ts (Feed Fetcher & Normalizer)
│   │   └── ai-processor.ts (Deduplication, Summarization, Exam Tagging)
│   ├── briefing/
│   │   └── briefing-generator.ts
│   ├── practice/
│   │   └── practice-generator.ts
│   └── storage/
│       ├── supabase-client.ts
│       └── mock-db.ts (Robust initial data seed & localStorage fallback)
```

---

## Verification Plan

### Automated Build & Lint Check
- Run `npm run build` to verify zero TypeScript or syntax errors.

### Functional Verification
1. **News Aggregation & Tagging**: Verify article filtering by categories (India, International, Defence, Economy, AI & Tech, Science, UPSC) and search functionality.
2. **Exam Analysis View**: Check that articles contain "Why it matters", Exam relevance, Prelims MCQ hints, Mains question hints, and Keywords.
3. **Morning Briefing Generator**: Verify generation of Top 10 headlines, sector breakdowns, editorial analysis, and 4-way impact assessment.
4. **Practice Suite**: Test interactive MCQs (UPSC, CDS, CAPF), Mains question structure display, Essay outline, and SSB GD topics.
5. **AI Chat Assistant**: Test queries like "Explain today's economy news", "Summarize AI news", and custom questions.
6. **Dashboard UX**: Test Dark mode, Heatmap, Daily Timeline, Calendar picker, Bookmarking, and Export options.
