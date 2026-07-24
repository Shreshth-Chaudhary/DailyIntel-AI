# DailyIntel AI — Comprehensive Technical Project Architecture & Master Documentation

> **Platform Name:** DailyIntel AI  
> **Engineered By:** Shreshth Chaudhary  
> **Target Examinations:** UPSC CSE (Prelims & Mains), CDS, CAPF AC, AFCAT, State PCS  
> **Document Version:** 3.0.0 (Production Release Architecture)  
> **Target Audience:** Technical Lead, Senior Architect, Junior Developers, System Integrators  

---

## 1. Project Overview

### What is DailyIntel AI?
**DailyIntel AI** is an elite, military-grade, AI-powered current affairs research engine and strategic exam preparation platform. Unlike conventional news aggregation websites or superficial summary blogs, DailyIntel AI functions as a 24/7 personal research mentor, intelligence analyst, static topic mapper, examiner, and Mains answer evaluator.

### What Problem Does It Solve?
1. **Information Overload & Noise:** Competitive exam candidates waste 3–4 hours daily reading 20-page newspapers containing political gossip, clickbait, and irrelevant local news.
2. **Superficial Summaries:** Standard coaching websites provide superficial 2-line bullets that lack connection to the **UPSC Syllabus**, **15-Year PYQ Trends**, **Constitutional Provisions**, or **Mains Answer Frameworks**.
3. **Hallucination & Unverified Media News:** Unverified news reports often spread rumors about protests, government bills, or court cases. DailyIntel AI enforces a **Strict 3-Tier Source Verification Pipeline** backed by official primary sources (PIB, Gazette of India, Supreme Court Reports, RBI, DRDO, ISRO).
4. **Lack of Retrospective Historical Archive:** Candidates struggle to revise current affairs chronologically by specific dates, custom date ranges, or categories.

### Target Users
- **UPSC CSE Aspirants** (Prelims Paper-I & Mains GS-1, GS-2, GS-3, GS-4, Essay)
- **Defence Candidates** (CDS, CAPF AC Paper-I & Paper-II, AFCAT, SSB Officer Intelligence Rating & Group Discussions)
- **State PCS Candidates** (State Public Service Commissions requiring verified state & national intelligence)

### Core Features
- 🛡 **Bloomberg/Linear-Style Intelligence Dashboard**: Visual 5-second decision cards with Exam Probability bars (UPSC, CDS, CAPF, SSB), Priority badges (🔥 Critical, 🟠 High, 🟡 Medium, 🟢 Low), and AI Verification badges.
- 📂 **10-Tab Deep Intelligence Workspace**:
  1. *Overview* (Context & Key High-Yield Facts)
  2. *History & Origin* (Evolutionary Background)
  3. *Timeline* (Chronological Milestones)
  4. *Static Concepts* (Polity/Economy/Tech Syllabus Integration)
  5. *15-Yr PYQs & MCQs* (Actual Past Questions & Elimination Logic)
  6. *Mains Answer* (Structured GS Paper Intro, Body, Committee Recommendations, Way Forward)
  7. *Essay Points* (Multi-Dimensional Quotes & Arguments)
  8. *Flashcards* (High-Yield Active Recall)
  9. *Mind Map* (Mermaid.js System Visualizer)
  10. *Sources* (Official Direct Links & Gazette IDs)
- 📅 **Strict Historical Archive & Date Presets**: Filter news instantly by `Today`, `Yesterday`, `7 Days`, `30 Days`, `All Dates`, or `Custom Calendar Range`.
- 🤖 **3-Tier Verified AI Copilot**: Retrieval-Augmented Generation (RAG) assistant with **Recognized Entity Card**, **Per-Claim Source Attribution**, and **Anti-Substitution Faithfulness Guard**.
- 📑 **Monthly Digest & PDF Exporter**: Instant compilation of monthly intelligence dossiers with professional PDF download capabilities.
- 🏆 **AI Mentor Readiness Dashboard**: Real-time exam readiness metrics, syllabus coverage heatmaps, and streak tracking.

---

## 2. Technology Stack

| Technology | Domain | Why Chosen | Problem Solved | Where Used | Alternative Considered |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Full-Stack Framework | Hybrid SSG/SSR, Server Actions, Route Handlers, automatic code splitting. | Blazing fast page loads, SEO optimization, and unified API backend. | Entire project structure (`src/app/`) | Vite + Express, React Router |
| **React 18** | UI Library | Component-driven architecture, Hooks (`useState`, `useEffect`, `useCallback`, `useMemo`), Concurrent Rendering. | Dynamic UI state management, modal handling, and live feed updates. | All dashboard components (`src/components/`) | Vue.js, Svelte |
| **TypeScript 5** | Programming Language | Strict type safety, interface enforcement, early compile-time error detection. | Eliminates runtime crashes, undefined props, and null reference exceptions. | Entire codebase (`.ts`, `.tsx`) | Vanilla JavaScript |
| **Tailwind CSS** | Styling Engine | Utility-first CSS, dark mode support via HSL variables, responsive breakpoints. | Eliminates CSS clutter, enables Bloomberg/Linear dark aesthetics. | `tailwind.config.js`, `globals.css` | Styled Components, CSS Modules |
| **Lucide React** | UI Icons | Lightweight SVG vector icon suite with consistent stroke weights. | Crisp visual indicators for categories, priority levels, and navigation. | Header, Sidebar, Cards, Tabs | FontAwesome, Heroicons |
| **Google Gemini 1.5 Flash** | AI LLM Engine | Fast inference speed, 1M+ token context window, JSON mode capability. | RAG intelligence generation, article analysis, MCQ synthesis, and AI Copilot. | `src/lib/ai/gemini.ts`, `/api/chat` | OpenAI GPT-4o, Anthropic Claude |
| **Supabase (PostgreSQL)** | Database & Backend | Relational SQL database, Row-Level Security (RLS), real-time subscriptions, client SDK. | Structured storage for news articles, PYQs, user bookmarks, and reading progress. | `supabase_schema.sql`, `supabase-client.ts` | Firebase, MongoDB |
| **rss-parser** | Data Ingestion | Lightweight Node.js RSS feed parser for XML/ATOM streams. | Automated fetching of news from PIB, Gazette, DRDO, RBI, and Supreme Court. | `src/lib/news-ingestion/parser.ts` | Axios + Cheerio |
| **jsPDF & html2canvas** | PDF Generation | Client-side HTML element rendering to multi-page PDF documents. | Enables candidates to export Monthly Briefings and Articles as offline PDFs. | `src/components/export/ExportModal.tsx` | PDFKit, Puppeteer |
| **Vercel** | Cloud Deployment | Native Next.js hosting, Edge Functions, automated CI/CD from GitHub main branch. | Zero-downtime deployment, global CDN edge caching, and serverless API execution. | Vercel Platform | AWS EC2, Render, Railway |

---

## 3. Folder Structure

```
DailyIntel-AI/
├── public/                     # Static assets (favicons, logos, manifests)
├── src/
│   ├── app/                    # Next.js App Router Pages & API Endpoints
│   │   ├── api/                # Backend Serverless API Routes
│   │   │   ├── briefing/       # Morning Briefing API
│   │   │   ├── chat/           # AI Copilot RAG API (Gemini 1.5 Flash)
│   │   │   ├── cron/           # Automated RSS Feed Ingestion Cron Job
│   │   │   ├── export/         # PDF Compilation Export Endpoint
│   │   │   ├── news/           # News Query & Date Filtering Endpoint
│   │   │   └── practice/       # Practice Quiz & PYQ Endpoint
│   │   ├── icon.svg/           # Dynamic SVG Favicon Route
│   │   ├── globals.css         # Master Tailwind CSS & Design System Tokens
│   │   ├── layout.tsx          # Root Layout & Metadata Configuration
│   │   └── page.tsx            # Main Intelligence Dashboard & Feed Architecture
│   ├── components/             # Modular React Components
│   │   ├── ai/                 # Intellex AI Assistant Drawer Component
│   │   ├── briefing/           # Morning Briefing & Monthly Digest Views
│   │   ├── dashboard/          # Feed Cards, Modals, Header, Sidebar, Widgets
│   │   ├── export/             # PDF Export Modal Component
│   │   └── practice/           # Interactive MCQ & PYQ Practice Suite
│   └── lib/                    # Core Business Logic, Storage & AI Engine
│       ├── ai/                 # Gemini API Integration (`gemini.ts`)
│       ├── news-ingestion/     # RSS Feed Parser & Data Normalizer
│       ├── storage/            # Supabase Client & High-Yield Mock DB
│       ├── types.ts            # TypeScript Definitions & Interfaces
│       └── utils.ts            # Utility Helper Functions
├── supabase_schema.sql         # Production PostgreSQL Database Schema & RLS Policies
├── tailwind.config.js          # Tailwind Utility & Color Palette Extension
├── tsconfig.json               # TypeScript Compiler Configuration
├── next.config.mjs             # Next.js Production Configuration
└── package.json                # Project Dependencies & NPM Scripts
```

---

## 4. File-by-File Explanation

### App & Core Layout
1. `src/app/layout.tsx`: Root layout file. Sets up Google Inter font, page title metadata (*"DailyIntel AI — UPSC CSE & Defence AI Ecosystem"*), and dark mode shell.
2. `src/app/page.tsx`: **Central Dashboard Orchestrator**. Manages active tabs (`feed`, `timeline`, `briefing`, `practice`, `mentor`, `digest`, `analytics`, `bookmarks`), date filters (`today`, `yesterday`, `7days`, `30days`, `custom`), category selection, search queries, 60-second background auto-refresh polling, and modal states.
3. `src/app/globals.css`: Defines CSS variables, HSL color tokens, dark mode glassmorphism classes (`.glass-card`, `.trending-bar`), military-inspired dark aesthetics, and scrollbar styling.

### UI Components (`src/components/dashboard/`)
4. `ArticleCard.tsx`: **Linear/Bloomberg Style Intelligence Card**. Renders category badge, source, time, priority rating (Critical/High/Medium/Low), exam probability progress bars (UPSC, CDS, CAPF, SSB), 1-line executive summary, *Why It Matters* callout box, PYQ link badge, and quick action bar.
5. `ArticleDetailModal.tsx`: **10-Tab Deep Intelligence Workspace**. Renders full article details across 10 specialized sub-tabs (Overview, History, Timeline, Static Concepts, PYQs, Mains Framework, Essay Points, Flashcards, Mind Map, Sources).
6. `Sidebar.tsx`: Left navigation panel. Controls tab switching (`feed`, `timeline`, `briefing`, etc.), category filtering (`Defence`, `Economy`, `International`, `AI & Tech`, `Science`, `UPSC Polity`), candidate reading progress meter, and permanent author branding (*Shreshth Chaudhary*).
7. `Header.tsx`: Top application navigation bar. Includes DailyIntel AI logo, exam target selector (UPSC CSE, CDS, CAPF, AFCAT, NDA, SSB), global search bar, AI Assistant toggle button, Export PDF button, theme toggle, and session greeting modal trigger.
8. `TrendingBar.tsx`: Top breaking news ticker. Renders live trending topics (`VSHORADS Air Defence Test`, `RBI Repo Rate 6.50%`, `Safran 110kN Engine`, `IndiaAI 10k GPU Cloud`, `Gaganyaan TV-D2`, `Article 361 SC Verdict`). Clicking any item filters the feed immediately.
9. `TodayHistoryWidget.tsx`: Renders *"Today in History"* static background widget (e.g. Birth anniversary of Shaheed Chandrashekhar Azad & Lokmanya Bal Gangadhar Tilak).
10. `NewsTimeline.tsx`: Renders chronological vertical news timeline view categorized by published date buckets.
11. `CategoryHeatmap.tsx`: Renders Sector Heatmap visualizer displaying article volume distribution across Defence, Economy, International, Technology, Science, and Polity.
12. `ExamReadinessDashboard.tsx`: Mounted under `AI Mentor & PYQs` tab. Displays exam target countdown timers, GS paper coverage percentages, PYQ accuracy stats, and weak area alerts.
13. `TacticalWatermark.tsx`: Renders subtle military tactical background grid watermark.

### Feature Views (`src/components/briefing/`, `src/components/practice/`, `src/components/ai/`, `src/components/export/`)
14. `MorningBriefingView.tsx`: Displays curated daily morning briefing compilation categorized into Executive Strategic Overview, High-Yield Prelims Pointers, and Mains Thesis.
15. `MonthlyDigestView.tsx`: Monthly compilation workspace for July, June, May 2026 with 1-click PDF compilation download.
16. `PracticeQuizSuite.tsx`: Interactive Prelims MCQ & Mains Answer Practice Suite. Features 4-option MCQs with instant answer feedback, elimination logic explanations, and Mains model answers.
17. `IntelAiAssistant.tsx`: **AI Research Assistant Drawer**. Renders chat interface with 3-tier verification badges, recognized entity cards, per-claim source citations, confidence meters, and quick prompt chips.
18. `ExportModal.tsx`: Controls PDF and text export settings (selecting date range, categories, paper formats).

### Business Logic & Services (`src/lib/`)
19. `src/lib/ai/gemini.ts`: **Google Gemini 1.5 Flash API Service**. Implements `generateWithGemini()`, `analyzeArticleWithGemini()`, and `askGeminiCopilot()` with system prompts enforcing zero-hallucination, anti-substitution entity rules, and 4,096 max token windows.
20. `src/lib/news-ingestion/parser.ts`: Parses raw RSS XML feeds from official portals (PIB, Gazette, RBI, DRDO) and converts raw text into DailyIntel `Article` objects.
21. `src/lib/news-ingestion/feed-sources.ts`: Maintains verified RSS URL registries for PIB, DRDO, RBI, Supreme Court, and Ministry feeds.
22. `src/lib/storage/mock-db.ts`: High-yield historical offline dataset populated with comprehensive multi-date articles, morning briefings, and PYQ practice suites.
23. `src/lib/storage/supabase-client.ts`: Supabase browser & server client instance initialization.
24. `src/lib/types.ts`: Master TypeScript interface definitions (`Article`, `ExamRelevance`, `ImpactAnalysis`, `HistoricalContext`, `PYQIntelligence`, `Category`, `PriorityLevel`).
25. `src/lib/utils.ts`: Helper utility functions (`cn` for Tailwind class merging, date formatting, score calculations).

### Backend Serverless API Routes (`src/app/api/`)
26. `src/app/api/chat/route.ts`: **AI Copilot Serverless Endpoint**. Implements RAG pipeline, Bare Acronym Disambiguation Map (`CJP`, `CAA`, `MSP`, `OPS`, `NFSA`, `PMAY`), Unverified Entity Guard (`Cockroach Janta Party`), 3-Tier Verification Header generator, and dynamic answer synthesis.
27. `src/app/api/news/route.ts`: Returns filtered article lists based on category, date preset, and search query params.
28. `src/app/api/briefing/route.ts`: Fetches or synthesizes Morning Briefing dossiers.
29. `src/app/api/practice/route.ts`: Returns Prelims MCQs and Mains practice questions.
30. `src/app/api/cron/route.ts`: Vercel Cron Job endpoint triggered every 60 seconds to fetch new RSS feeds and upsert into Supabase database.

---

## 5. Database Schema & ER Diagram

The database architecture is implemented using **PostgreSQL on Supabase** with Row-Level Security (RLS) enabled.

### ER Diagram Text Visualization

```
+------------------------+           +------------------------+
|      NEWS_SOURCES      |           |        ARTICLES        |
+------------------------+           +------------------------+
| id (PK, UUID)          | 1       N | id (PK, UUID)          |
| name (VARCHAR)         |----------<| source_id (FK)         |
| url (TEXT)             |           | title (TEXT)           |
| category (VARCHAR)     |           | content (TEXT)         |
| is_verified (BOOLEAN)  |           | summary (TEXT)         |
+------------------------+           | importance_score (NUM) |
                                     | published_at (TIMESTAMPTZ)
                                     | category (VARCHAR)     |
                                     +------------------------+
                                                 |
                                                 | 1
                                                 |
                                                 | N
                                     +------------------------+
                                     |    USER_BOOKMARKS      |
                                     +------------------------+
                                     | id (PK, UUID)          |
                                     | user_id (FK, UUID)     |
                                     | article_id (FK, UUID)  |
                                     | created_at (TIMESTAMPTZ)|
                                     +------------------------+
```

### Table Definitions

#### 1. `articles` Table
Stores raw and AI-enriched intelligence articles.
```sql
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  subcategory VARCHAR(50),
  importance_score NUMERIC(3,1) NOT NULL DEFAULT 8.0,
  published_at TIMESTAMPTZ NOT NULL,
  fetched_at TIMESTAMPTZ DEFAULT now(),
  key_facts TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  organizations TEXT[] DEFAULT '{}',
  upsc_probability INTEGER DEFAULT 85,
  cds_probability INTEGER DEFAULT 80,
  capf_probability INTEGER DEFAULT 80,
  ssb_probability INTEGER DEFAULT 75,
  exam_relevance JSONB NOT NULL DEFAULT '{}'::jsonb,
  impact_analysis JSONB NOT NULL DEFAULT '{}'::jsonb,
  historical_context JSONB DEFAULT '{}'::jsonb,
  pyq_intelligence JSONB DEFAULT '{}'::jsonb,
  mains_framework JSONB DEFAULT '{}'::jsonb,
  essay_points TEXT[] DEFAULT '{}',
  flashcards JSONB DEFAULT '[]'::jsonb
);
```

#### 2. `news_sources` Table
Registry of verified official news feeds.
```sql
CREATE TABLE public.news_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  url TEXT UNIQUE NOT NULL,
  feed_type VARCHAR(20) DEFAULT 'rss',
  category VARCHAR(50) NOT NULL,
  reliability_score NUMERIC(3,1) DEFAULT 9.5,
  is_verified BOOLEAN DEFAULT true
);
```

#### 3. `user_bookmarks` Table
Tracks candidate saved articles.
```sql
CREATE TABLE public.user_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 6. API Flow (End-to-End Pipeline)

```
[ Official Feeds ] (PIB, Gazette, RBI, DRDO, SC)
       │
       ▼ (60s Automated Vercel Cron Job)
[ /api/cron ] ──► [ Feed Parser & Normalizer ] (parser.ts)
       │
       ▼
[ Google Gemini 1.5 Flash ] (Article Analysis & High-Yield Extraction)
       │
       ▼
[ Supabase PostgreSQL DB ] (Upsert & Archival Storage)
       │
       ▼
[ Next.js Serverless API ] (/api/news, /api/chat)
       │
       ▼
[ Next.js React Dashboard ] (page.tsx & ArticleCard.tsx)
       │
       ▼
[ Candidate Workspace ] (10-Tab Modal & AI Copilot Drawer)
```

1. **Ingestion Step**: Vercel Cron triggers `/api/cron` every 60 seconds. `parser.ts` fetches raw XML feeds from PIB, DRDO, RBI, and Gazette of India.
2. **AI Enrichment Step**: New articles pass through `analyzeArticleWithGemini()`, extracting keywords, PYQ tags, exam probabilities, and Mains frameworks.
3. **Database Storage Step**: Articles are stored in Supabase `articles` table with full JSONB metadata.
4. **Retrieval & Feed Rendering Step**: Candidate opens dashboard. `page.tsx` queries articles using strict `YYYY-MM-DD` date filtering.
5. **AI Interaction Step**: Candidate asks AI Copilot a question. `/api/chat` retrieves top 8 matching articles from database, builds context, and invokes Gemini 1.5 Flash to output verified 3-tier responses.

---

## 7. AI Pipeline & RAG System

### Model Architecture
- **Primary LLM**: Google Gemini 1.5 Flash (`models/gemini-flash-latest`).
- **Fallback Chain**: `gemini-3.1-flash-lite` → `gemini-2.0-flash` → `gemini-pro-latest`.

### Retrieval-Augmented Generation (RAG) Architecture
1. **Query Inspection**: User query is evaluated by the Intent Recognition Pipeline in `route.ts`.
2. **Database Context Fetch**: Active stored articles matching query keywords are retrieved and concatenated into `articleContext` (Title, Summary, Key Facts, Published Date).
3. **Prompt Injection**: System instruction in `gemini.ts` injects strict rules:
   - *Zero-Hallucination & Anti-Substitution Guard*
   - *3-Tier Verification Protocol (Level 1, Level 2, Level 3)*
   - *Per-Claim Source Attribution requirement*
4. **LLM Generation**: Gemini generates response with `temperature: 0.2` and `maxOutputTokens: 4096`.

### 3-Tier Verification Matrix

| Tier Level | Evidence Strength | Confidence Score | Header Badge | Mandatory Disclaimer |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1 — Fully Verified** | Verified by 4+ official sources (PIB, Gazette, SC, Reuters) | **98%** | `✅ Verified from 4+ Trusted Sources` | Full verified report |
| **Level 2 — Partially Verified** | Verified by 1–3 official sources or developing story | **82%** | `🟡 Partially Verified (Developing Intelligence)` | *"This information is based on currently available official reports and developing news, and may evolve..."* |
| **Level 3 — Contextual Guidance** | No direct database match, historical context retrieved | **65% / 68%** | `⚠️ Limited Verified Reporting` | *"This information is based on limited verified reporting and may change as further official updates are released."* |

### Recognized Entity & Anti-Substitution Guard
If a user asks about an entity that does NOT exist in verified sources (e.g. `"Cockroach Janta Party"`):
- The system **NEVER** silently substitutes it with *Citizens for Justice and Peace (CJP)*, *BJP*, or *Congress*.
- It returns the **Recognized Entity Block**:
  ```markdown
  🏷️ **Recognized Entity**
  • **Organization / Topic:** Cockroach Janta Party
  • **Verified:** No
  • **Status:** No verified entity found in trusted sources.

  ⚠️ **Unverified Entity Notice**
  I couldn't find any verified organization, political party, or protest named "Cockroach Janta Party" in trusted or official sources.
  ```

---

## 8. Authentication & Security Architecture

- **Auth Provider**: Supabase Auth (Supporting Email/Password and Passwordless Magic Links).
- **Session Persistence**: Stored via HTTP-only cookies and browser `sessionStorage` for lightweight client states.
- **Row-Level Security (RLS)**:
  - `articles`: Public Read (`SELECT`), Service Role Write (`INSERT/UPDATE`).
  - `user_bookmarks`: Authenticated User Read/Write (`user_id = auth.uid()`).
- **Route Protection**: Protected routes verify authorization tokens via Next.js Server Middleware.

---

## 9. News Pipeline & Archival Strategy

### Permanent News Storage
Articles are never deleted from the database. Every article contains `published_at` (timestamptz) and `fetched_at` (timestamptz).

### Strict YYYY-MM-DD Date Filtering Algorithm
To prevent date bleeding (e.g., older articles showing when selecting `Today`):
1. Extract `latestDateStr` = `YYYY-MM-DD` of the most recent article in dataset.
2. `Today` preset: Matches strictly `pubDateStr === latestDateStr`. Older articles are 100% excluded.
3. `Yesterday` preset: Matches strictly `pubDateStr === yesterdayDateStr`.
4. `7 Days` preset: Matches `daysDiffFromLatest <= 7.5`.
5. `30 Days` preset: Matches `daysDiffFromLatest <= 30.5`.
6. `All Dates`: Returns full historical archive.

---

## 10. State Management & Auto-Refresh Strategy

### React State Flow (`page.tsx`)
- `articles`: Primary array of active intelligence articles.
- `activeCategory`: Active category filter string (`All`, `Defence`, `Economy`, `International`, `AI & Tech`, `Science`, `UPSC`).
- `dateFilterPreset`: Active date filter preset (`today`, `yesterday`, `7days`, `30days`, `all`, `custom`).
- `searchQuery`: Active search query string.
- `selectedArticle`: Active article opened in 10-Tab Detail Modal.

### 60-Second Auto-Refresh Polling
`page.tsx` initializes a background `setInterval` every 60 seconds:
```ts
useEffect(() => {
  const interval = setInterval(() => {
    fetchLatestArticlesSilently();
  }, 60000);
  return () => clearInterval(interval);
}, []);
```
When new articles are detected, a non-intrusive toast banner appears:  
`🟢 X New Intelligence Articles Available [Refresh Feed]`.

---

## 11. UI Architecture & Design Aesthetics

DailyIntel AI follows a **Bloomberg Terminal + Linear + Vercel Dark Aesthetics System**.

### Design Tokens
- **Background**: Deep obsidian dark mode (`#0c0a09` / `stone-950`).
- **Card Styling**: Dark glassmorphic panels (`bg-stone-900/80`, `border-stone-800`).
- **Typography**: Inter / System Sans-serif with crisp hierarchy.
- **Priority Badge Palette**:
  - 🔥 **Critical Priority**: `bg-red-500/10 text-red-400 border-red-500/20` (Score 9.0–10.0)
  - 🟠 **High Priority**: `bg-amber-500/10 text-amber-400 border-amber-500/20` (Score 7.5–8.9)
  - 🟡 **Medium Priority**: `bg-yellow-500/10 text-yellow-400 border-yellow-500/20` (Score 6.0–7.4)
  - 🟢 **Low Priority**: `bg-emerald-500/10 text-emerald-400 border-emerald-500/20` (Score <6.0)

---

## 12. Security & Input Sanitization

1. **API Key Secrecy**: `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are stored strictly in server-side `.env.local` environment variables and never exposed to the client bundle.
2. **Parameterized Queries**: All database operations use Supabase client parameterized calls, eliminating SQL Injection vulnerabilities.
3. **Query Sanitization**: Search input strings are trimmed and normalized using RegExp replacement before matching.

---

## 13. Deployment Architecture

- **Platform**: Vercel Cloud Platform.
- **CI/CD Pipeline**: Automated GitHub Webhook Integration on `main` branch push.
- **Build Command**: `npx next build`
- **Output**: Next.js Serverless Functions + Static Assets on Vercel Global Edge CDN.

---

## 14. Performance & Optimization Strategy

1. **Lazy Modal Rendering**: `ArticleDetailModal` and `ExportModal` mount conditionally only when active.
2. **Tokenized Search Indexing**: Fast in-memory array searching across concatenated article text strings (`title + summary + content + keywords + organizations`).
3. **Skeleton Loading Feedback**: Feed displays smooth skeleton card loaders during preset filter switches to eliminate layout shifts.

---

## 15. Every Major Change Made & Evolution History

| Commit | Category | Description & Fix Applied | Problem Solved | Files Changed |
| :--- | :--- | :--- | :--- | :--- |
| `e37d0b1` | Build Fix | Added `'UPSC Polity'` to `Category` type union and expanded `HighScoringMainsFramework`. | Resolved Vercel production build TypeScript compilation error. | `types.ts`, `mock-db.ts` |
| `7d0ebb2` | Date Logic | Implemented strict `YYYY-MM-DD` date classification for `Today`, `Yesterday`, `7 Days`, `30 Days`. | Eliminated date bleeding where 7-day articles appeared under `Today`. | `page.tsx` |
| `33fa484` | Search Engine | Implemented smart tokenized fuzzy search and shorthand synonym resolution (`10k` → `10000`). | Fixed "No Articles Found" error when clicking Trending Bar items (`IndiaAI 10k GPU`). | `TrendingBar.tsx`, `page.tsx` |
| `d1d8aea` | Category Filter | Implemented automatic search query reset on category selection + category alias matcher. | Fixed zero-match error when clicking `Science & Env` or `AI & Tech` in Sidebar. | `page.tsx`, `Sidebar.tsx` |
| `f27b75f` | AI Copilot | Increased Gemini `maxOutputTokens` to 4096 and added sentence completion guards. | Resolved AI Assistant response cutoff mid-sentence (`"major defence technological..."`). | `gemini.ts`, `/api/chat/route.ts` |
| `8a168b3` | Verification | Implemented Unverified Event Guard, 4+ Source Verification Header, and 98% confidence rating. | Prevented AI from guessing causes of unverified protests or rumors. | `gemini.ts`, `/api/chat/route.ts` |
| `f732bdc` | 3-Tier AI | Implemented 3-Tier Verification Engine (Level 1 Fully Verified, Level 2 Partially Verified, Level 3 Contextual). | Guaranteed AI is always helpful and never replies with ONLY "Unable to verify". | `gemini.ts`, `/api/chat/route.ts` |
| `bde03c1` | Disambiguation | Implemented Bare Acronym Disambiguation Guard (`CJP`, `CAA`, `MSP`, `OPS`, `NFSA`) and per-claim sources. | Prevented AI from guessing multi-meaning acronyms by presenting a 3-choice menu. | `gemini.ts`, `/api/chat/route.ts` |
| `d8e8f1f` | Intent Engine | Implemented Intent Recognition Pipeline & Confidence Decision Matrix (Case A ≥90%, Case B 60-89%, Case C <60%). | Prevented premature clarification when query contained context clues (`Delhi protest`). | `gemini.ts`, `/api/chat/route.ts` |
| `3566368` | Entity Faithfulness | Implemented Recognized Entity Card and Anti-Substitution Guard for unverified entities (`Cockroach Janta Party`). | Stopped AI from silently replacing unknown entities with CJP, BJP, or Congress. | `gemini.ts`, `/api/chat/route.ts` |
| `bb1633c` & `0c7a32c` | Scope & Syntax | Fixed string concatenation syntax error and variable redefinition of `level3Header` in `route.ts`. | Fixed Vercel production build deployment failure. | `/api/chat/route.ts` |

---

## 16. Feature-to-Code Mapping

| Visible UI Feature | Frontend Component | Serverless API Route | Core Logic File | Database Table |
| :--- | :--- | :--- | :--- | :--- |
| **Intelligence News Feed Cards** | `ArticleCard.tsx` | `/api/news/route.ts` | `page.tsx` | `public.articles` |
| **10-Tab Detail Workspace** | `ArticleDetailModal.tsx` | `/api/news/route.ts` | `mock-db.ts` | `public.articles` |
| **Date Archive & Timeline** | `NewsTimeline.tsx` | `/api/news/route.ts` | `page.tsx` | `public.articles` |
| **Morning Briefing View** | `MorningBriefingView.tsx` | `/api/briefing/route.ts` | `mock-db.ts` | `public.articles` |
| **Practice Quiz & PYQ Suite** | `PracticeQuizSuite.tsx` | `/api/practice/route.ts` | `mock-db.ts` | `public.pyq_bank` |
| **AI Mentor Readiness** | `ExamReadinessDashboard.tsx`| `/api/news/route.ts` | `page.tsx` | `public.user_bookmarks` |
| **Monthly Digest & PDF Export**| `MonthlyDigestView.tsx` | `/api/export/route.ts` | `ExportModal.tsx` | `public.articles` |
| **AI Research Assistant** | `IntelAiAssistant.tsx` | `/api/chat/route.ts` | `gemini.ts` | `public.articles` |
| **Trending Ticker Bar** | `TrendingBar.tsx` | `/api/news/route.ts` | `page.tsx` | `public.articles` |
| **Avg Score Tooltip Legend** | `page.tsx` | N/A | `page.tsx` | N/A |

---

## 17. Complete User Journey

```
1. USER OPENS WEBSITE
   └► Next.js loads root layout (`layout.tsx`) & main page (`page.tsx`)
   └► Session greeting toast displays: "Jai Hind! Welcome to DailyIntel AI..."
   └► Initial article dataset loaded into React state.

2. USER FILTERS BY DATE (e.g. Clicks "Today")
   └► `dateFilterPreset` state set to 'today'
   └► `page.tsx` computes `latestDateStr` (YYYY-MM-DD)
   └► Non-matching older articles strictly filtered out without page refresh.

3. USER CLICKS A CATEGORY (e.g. Clicks "Defence & Military")
   └► `handleCategoryChange('Defence')` triggered
   └► Stale `searchQuery` automatically reset to '' to avoid 0-match conflicts
   └► Feed displays DRDO VSHORADS missile test & Safran jet engine pact cards.

4. USER OPENS ARTICLE CARD
   └► `selectedArticle` state populated
   └► `ArticleDetailModal` renders with 10 interactive tabs
   └► Candidate reviews PYQs, Mains Model Answer, and Flashcards.

5. USER ASKS AI COPILOT ("Tell me about Cockroach Janta Party protest")
   └► Input sent to `/api/chat/route.ts`
   └► Unverified Entity Interceptor detects unknown organization
   └► AI responds with Recognized Entity Card (Verified: No) + Unverified Entity Notice without substituting entities.

6. USER EXPORTS MONTHLY DOSSIER
   └► User navigates to "Monthly Digest & PDF" tab
   └► Clicks "Download PDF" -> `ExportModal.tsx` generates offline PDF dossier via jsPDF.
```

---

## 18. Technical Interview Preparation (Q&A)

### Q1: Why did you choose Next.js 14 App Router for this architecture?
**Answer:** Next.js 14 App Router provides unified serverless API routes (`/api/chat`, `/api/news`) alongside server-side rendering (SSR) and static generation (SSG). This eliminates the overhead of managing a separate Express backend server while delivering sub-second page loads essential for competitive exam candidates.

### Q2: How does the AI Copilot prevent hallucinations and entity substitutions?
**Answer:** We enforce a **Retrieval-Augmented Generation (RAG) Architecture** combined with a strict **Entity Faithfulness & Anti-Substitution Guard** in `gemini.ts` and `route.ts`. The system searches the database first before passing article context to Google Gemini 1.5 Flash. If a user asks about an entity not verified in official sources (e.g. *Cockroach Janta Party*), the system marks `Verified: No` and returns an explicit Unverified Entity Notice instead of silently substituting it with CJP or BJP.

### Q3: How did you solve the date filtering bug where older news bled into "Today's" feed?
**Answer:** The original code evaluated relative millisecond differences (`daysDiff > 1.5`), which allowed 1.3-day-old articles to pass when the client date changed. We refactored `page.tsx` to use **Strict YYYY-MM-DD Date Bucketing**. We extract the exact ISO date string of the latest article in the dataset and enforce strict string equality (`pubDateStr === latestDateStr`), guaranteeing zero date bleeding without requiring a page refresh.

### Q4: Why did you choose PostgreSQL on Supabase over a NoSQL database like MongoDB?
**Answer:** Current affairs intelligence for UPSC and Defence requires strong relational constraints between **Articles**, **News Sources**, **15-Year PYQs**, and **Mains Answer Frameworks**. PostgreSQL provides JSONB columns for semi-structured metadata (impact analysis, flashcards) while maintaining relational foreign-key integrity and Row-Level Security (RLS).

---

## 19. Learning Notes

### Key Concepts Learned
- **Retrieval-Augmented Generation (RAG)**: Technique where relevant context is retrieved from a database and injected into an LLM system prompt before generating responses.
- **Disambiguation Guard**: Pattern where ambiguous short queries trigger a multi-choice clarification menu to prevent LLM guessing.
- **Strict Date Bucketing**: Comparing normalized `YYYY-MM-DD` strings instead of floating-point timestamps to prevent timezone boundary bugs.

### Official Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [React 18 Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment Documentation](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 20. Strategic Improvement Suggestions & Future Roadmap

### Current Strengths
- Military-grade Bloomberg/Linear dark UI aesthetics.
- Strict 3-Tier AI Verification Engine & Zero-Hallucination Anti-Substitution Guard.
- Robust multi-date archival with strict YYYY-MM-DD date filtering.

### Recommended Next Improvements
1. **Vector Embedding Search (pgvector)**: Upgrade keyword search in `route.ts` to cosine similarity semantic vector search using OpenAI/Gemini text embeddings (`text-embedding-004`).
2. **WebSockets / Supabase Realtime**: Upgrade 60-second polling to instant WebSocket streaming for real-time breaking news notifications.
3. **Voice AI Mentor Integration**: Integrate Web Speech API to enable hands-free voice Q&A during revision.
4. **Mobile Native App (React Native / Expo)**: Cross-platform mobile deployment for iOS & Android candidates.

---

> **DailyIntel AI Platform Architecture Document**  
> *Engineered by Shreshth Chaudhary • DailyIntel AI Ecosystem*
