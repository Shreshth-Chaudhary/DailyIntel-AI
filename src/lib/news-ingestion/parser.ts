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
