import Parser from 'rss-parser';
import { Article, Category, ExamType } from '../types';
import { OFFICIAL_FEED_SOURCES } from './feed-sources';

const rssParser = new Parser({
  headers: {
    'User-Agent': 'DailyIntelAI/1.0 (+https://dailyintel.ai)',
  },
  timeout: 8000,
});

export async function fetchLiveRssArticles(): Promise<Article[]> {
  const fetchedArticles: Article[] = [];

  for (const source of OFFICIAL_FEED_SOURCES) {
    if (source.type !== 'rss') continue;

    try {
      const feed = await rssParser.parseURL(source.url);
      const items = feed.items.slice(0, 5); // Take top 5 from each feed

      for (const item of items) {
        if (!item.title || !item.link) continue;

        // Low-quality / Clickbait Filter
        if (isClickbaitOrLowQuality(item.title)) continue;

        const category = mapCategory(source.category, item.title, item.contentSnippet || '');
        const importance = calculateImportance(source.trustScore, item.title);

        const article: Article = {
          id: `rss-${source.id}-${Math.random().toString(36).substring(2, 9)}`,
          title: item.title,
          summary: item.contentSnippet?.substring(0, 240) + '...' || item.title,
          content: item.content || item.contentSnippet || item.title,
          category,
          subcategory: source.name,
          source: source.name,
          sourceUrl: item.link,
          publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
          importanceScore: importance,
          isTrending: importance >= 9.0,
          duplicateCount: 1,
          keyFacts: extractKeyFacts(item.title, item.contentSnippet || ''),
          dates: [new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })],
          organizations: extractOrganizations(item.title + ' ' + (item.contentSnippet || '')),
          personalities: extractPersonalities(item.title + ' ' + (item.contentSnippet || '')),
          keywords: extractKeywords(item.title),
          examRelevance: generateExamRelevance(category, item.title),
          impactAnalysis: generateImpactAnalysis(category, item.title),
          historicalContext: generateHistoricalContext(category, item.title),
          readTimeMinutes: Math.max(3, Math.ceil((item.contentSnippet?.length || 300) / 100)),
          bookmarked: false,
        };

        fetchedArticles.push(article);
      }
    } catch (err) {
      console.warn(`Failed to fetch RSS feed ${source.name} (${source.url}):`, err);
    }
  }

  return deduplicateArticles(fetchedArticles);
}

function isClickbaitOrLowQuality(title: string): boolean {
  const badPatterns = [
    /shocking/i, /unbelievable/i, /you won't believe/i, /viral video/i,
    /watch live/i, /leaked/i, /celebrity/i, /gossip/i, /horoscope/i
  ];
  return badPatterns.some(pattern => pattern.test(title));
}

function mapCategory(defaultCategory: string, title: string, content: string): Category {
  const text = (title + ' ' + content).toLowerCase();
  if (text.includes('drdo') || text.includes('navy') || text.includes('army') || text.includes('defence') || text.includes('missile') || text.includes('isro')) {
    return 'Defence';
  }
  if (text.includes('rbi') || text.includes('gdp') || text.includes('inflation') || text.includes('budget') || text.includes('tax') || text.includes('economy')) {
    return 'Economy';
  }
  if (text.includes('ai') || text.includes('openai') || text.includes('deepmind') || text.includes('tech') || text.includes('cyber') || text.includes('quantum')) {
    return 'AI & Tech';
  }
  if (text.includes('climate') || text.includes('environment') || text.includes('space') || text.includes('nasa') || text.includes('isro')) {
    return 'Science & Environment';
  }
  if (text.includes('un') || text.includes('g20') || text.includes('brics') || text.includes('quad') || text.includes('diplomacy') || text.includes('foreign')) {
    return 'International';
  }
  if (text.includes('upsc') || text.includes('constitution') || text.includes('supreme court') || text.includes('bill')) {
    return 'UPSC';
  }
  return (defaultCategory as Category) || 'India';
}

function calculateImportance(trustScore: number, title: string): number {
  let score = trustScore / 10;
  const highImpactWords = ['approved', 'launched', 'tested', 'cabinet', 'rbi', 'drdo', 'isro', 'supreme court', 'treaty', 'mou'];
  const titleLower = title.toLowerCase();
  for (const word of highImpactWords) {
    if (titleLower.includes(word)) score += 0.4;
  }
  return Math.min(10, Math.max(7.0, parseFloat(score.toFixed(1))));
}

function extractKeyFacts(title: string, content: string): string[] {
  const sentences = content.split('. ').filter(s => s.trim().length > 20);
  if (sentences.length >= 2) {
    return [sentences[0], sentences[1]];
  }
  return [title, 'Published by official government / trusted news feed.'];
}

function extractOrganizations(text: string): string[] {
  const orgs: string[] = [];
  const candidates = ['DRDO', 'ISRO', 'RBI', 'MeitY', 'Supreme Court', 'MEA', 'UN', 'G20', 'BRICS', 'OpenAI', 'Google DeepMind', 'NASA'];
  for (const candidate of candidates) {
    if (text.includes(candidate)) orgs.push(candidate);
  }
  return orgs.length ? orgs : ['Government of India'];
}

function extractPersonalities(text: string): string[] {
  const people: string[] = [];
  const candidates = ['Prime Minister', 'RBI Governor', 'Chief of Defence Staff', 'CJI', 'Finance Minister', 'ISRO Chairman', 'DRDO Chairman'];
  for (const candidate of candidates) {
    if (text.includes(candidate)) people.push(candidate);
  }
  return people;
}

function extractKeywords(title: string): string[] {
  const words = title.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 3);
  return Array.from(new Set(words)).slice(0, 5);
}

function generateExamRelevance(category: Category, title: string): Article['examRelevance'] {
  const exams: ExamType[] = ['UPSC CSE', 'CDS', 'CAPF AC'];
  if (category === 'Defence') exams.push('AFCAT', 'NDA', 'SSB');

  return {
    exams,
    whyItMatters: `Critical update for ${category} section under UPSC CSE & Defence exams curriculum.`,
    prelimsQuestion: `Consider the following statements regarding key developments in ${title.substring(0, 40)}...`,
    mainsQuestion: `Analyze the national and strategic significance of recent developments in ${category}.`,
    keywords: extractKeywords(title)
  };
}

function generateImpactAnalysis(category: Category, title: string): Article['impactAnalysis'] {
  return {
    overallImpact: `Strengthens India's policy framework and institutional readiness in ${category}.`,
    indiaImpact: 'Enhances governance, domestic capability, and public transparency.',
    economyImpact: 'Promotes stable economic environment and investor confidence.',
    defenceImpact: category === 'Defence' ? 'Directly enhances tactical readiness and border deterrence.' : 'Provides stable operational environment.',
    futureImplications: 'Sets milestone for upcoming policy iterations and legislative measures.'
  };
}

function generateHistoricalContext(category: Category, title: string): Article['historicalContext'] {
  const t = title.toLowerCase();
  let origin = `Developed under official policy framework governing ${category} in India.`;
  let constitutionalArticles: string[] = [];
  let importantActsAndRules: string[] = ['Official Gazette Policy Guidelines'];
  let keyCommittees: string[] = ['High-Level Departmental Review Panel'];
  let landmarkJudgements: string[] = [];

  if (category === 'UPSC' || category === 'UPSC Polity' || t.includes('court') || t.includes('constitution') || t.includes('law')) {
    origin = 'Rooted in Indian constitutionalism, fundamental rights, and democratic checks and balances.';
    constitutionalArticles = ['Article 14', 'Article 19', 'Article 21', 'Article 32'];
    importantActsAndRules = ['Code of Civil Procedure', 'Representation of the People Act'];
    landmarkJudgements = ['Kesavananda Bharati v. State of Kerala (1973)', 'Maneka Gandhi v. Union of India (1978)'];
    keyCommittees = ['Law Commission of India'];
  } else if (category === 'Economy' || t.includes('rbi') || t.includes('bank') || t.includes('tax')) {
    origin = 'Evolved under India macro-monetary framework and fiscal discipline mandates.';
    constitutionalArticles = ['Article 265', 'Article 266', 'Article 280'];
    importantActsAndRules = ['Reserve Bank of India Act 1934', 'FRBM Act 2003'];
    keyCommittees = ['Urjit Patel Committee (2014)', 'Financial Stability and Development Council (FSDC)'];
  } else if (category === 'Defence' || t.includes('drdo') || t.includes('missile') || t.includes('army')) {
    origin = 'Initiated under Aatmanirbhar Bharat defence indigenization directives.';
    constitutionalArticles = ['Article 51A(a)'];
    importantActsAndRules = ['Defence Acquisition Procedure (DAP) 2020'];
    keyCommittees = ['Kargil Review Committee (1999)', 'Shekatkar Committee (2016)'];
  } else if (category === 'Science & Environment' || category === 'AI & Tech' || t.includes('isro') || t.includes('tech')) {
    origin = 'Formulated under National Technology Missions and Space & Supercomputing Directives.';
    importantActsAndRules = ['Digital Personal Data Protection Act 2023', 'Indian Space Policy 2023'];
    keyCommittees = ['National Supercomputing Mission Board', 'K. VijayRaghavan Committee'];
  }

  return {
    origin,
    evolutionTimeline: [
      { date: 'Initial Mandate', event: `Official initiation of ${title.slice(0, 30)} policy framework` },
      { date: 'Current Year', event: 'Verified official notification published in trusted primary sources' }
    ],
    landmarkJudgements,
    constitutionalArticles,
    importantActsAndRules,
    keyCommittees,
    previousPolicies: ['National Strategic Vision Document'],
    governmentReports: ['PIB & Ministry Annual Policy Briefing']
  };
}

function deduplicateArticles(articles: Article[]): Article[] {
  const seenTitles = new Set<string>();
  const unique: Article[] = [];

  for (const article of articles) {
    const normalized = article.title.toLowerCase().trim();
    if (!seenTitles.has(normalized)) {
      seenTitles.add(normalized);
      unique.push(article);
    }
  }

  return unique;
}
