-- DailyIntel AI - Supabase Database Schema
-- Paste this script into your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- Force session to read-write mode
SET TRANSACTION READ WRITE;

-- 1. Create Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT,
    source TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT,
    url TEXT UNIQUE NOT NULL,
    publishedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    strategicRating INTEGER CHECK (strategicRating >= 1 AND strategicRating <= 10),
    isClickbait BOOLEAN DEFAULT FALSE,
    examTags TEXT[] DEFAULT '{}',
    keyPoints TEXT[] DEFAULT '{}',
    contextBackground TEXT,
    upscSignificance TEXT,
    entities JSONB DEFAULT '{"facts":[],"dates":[],"organizations":[],"personalities":[]}'::jsonb,
    impactAnalysis JSONB DEFAULT '{"sovereignty":"","nationalSecurity":"","economicGrowth":"","globalStanding":""}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for high performance queries
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(publishedAt DESC);
CREATE INDEX IF NOT EXISTS idx_articles_rating ON public.articles(strategicRating DESC);

-- 2. Create Briefings Table
CREATE TABLE IF NOT EXISTS public.briefings (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    executiveSummary TEXT NOT NULL,
    topHeadlines TEXT[] DEFAULT '{}',
    policyChanges TEXT[] DEFAULT '{}',
    geopoliticalShifts TEXT[] DEFAULT '{}',
    upscDigest JSONB DEFAULT '{"prelimsHighlights":[],"mainsTopics":[],"essayPointers":[]}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Practice Suites Table
CREATE TABLE IF NOT EXISTS public.practice_suites (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    prelimsMcqs JSONB DEFAULT '[]'::jsonb,
    cdsMcqs JSONB DEFAULT '[]'::jsonb,
    capfMcqs JSONB DEFAULT '[]'::jsonb,
    mainsFrameworks JSONB DEFAULT '[]'::jsonb,
    ssbTopics JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_suites ENABLE ROW LEVEL SECURITY;

-- 5. Policies for Public Read & Service Key / Anon Insert
DROP POLICY IF EXISTS "Public Read Articles" ON public.articles;
DROP POLICY IF EXISTS "Public Insert Articles" ON public.articles;
DROP POLICY IF EXISTS "Public Read Briefings" ON public.briefings;
DROP POLICY IF EXISTS "Public Insert Briefings" ON public.briefings;
DROP POLICY IF EXISTS "Public Read Practice" ON public.practice_suites;
DROP POLICY IF EXISTS "Public Insert Practice" ON public.practice_suites;

CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public Insert Articles" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Briefings" ON public.briefings FOR SELECT USING (true);
CREATE POLICY "Public Insert Briefings" ON public.briefings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Practice" ON public.practice_suites FOR SELECT USING (true);
CREATE POLICY "Public Insert Practice" ON public.practice_suites FOR INSERT WITH CHECK (true);
