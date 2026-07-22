export interface FeedSource {
  id: string;
  name: string;
  category: string;
  url: string;
  type: 'rss' | 'api' | 'official';
  trustScore: number; // 0 - 100
}

export const OFFICIAL_FEED_SOURCES: FeedSource[] = [
  {
    id: 'pib-india',
    name: 'Press Information Bureau (PIB)',
    category: 'India',
    url: 'https://pib.gov.in/RssMain.aspx?ModId=6',
    type: 'rss',
    trustScore: 98,
  },
  {
    id: 'prs-india',
    name: 'PRS Legislative Research',
    category: 'India',
    url: 'https://prsindia.org/rss.xml',
    type: 'rss',
    trustScore: 96,
  },
  {
    id: 'rbi-releases',
    name: 'Reserve Bank of India (RBI)',
    category: 'Economy',
    url: 'https://rbi.org.in/rssfeed/pressrelease.xml',
    type: 'rss',
    trustScore: 99,
  },
  {
    id: 'drdo-news',
    name: 'DRDO Defence Research',
    category: 'Defence',
    url: 'https://drdo.gov.in/rss.xml',
    type: 'official',
    trustScore: 99,
  },
  {
    id: 'isro-updates',
    name: 'ISRO Space Missions',
    category: 'Science & Environment',
    url: 'https://isro.gov.in/rss.xml',
    type: 'official',
    trustScore: 99,
  },
  {
    id: 'the-hindu-national',
    name: 'The Hindu National',
    category: 'India',
    url: 'https://www.thehindu.com/news/national/feeder/default.rss',
    type: 'rss',
    trustScore: 92,
  },
  {
    id: 'the-hindu-opinion',
    name: 'The Hindu Editorial & Opinion',
    category: 'UPSC',
    url: 'https://www.thehindu.com/opinion/editorial/feeder/default.rss',
    type: 'rss',
    trustScore: 94,
  },
  {
    id: 'indian-express-print',
    name: 'Indian Express Explained & National',
    category: 'India',
    url: 'https://indianexpress.com/section/india/feed/',
    type: 'rss',
    trustScore: 90,
  },
  {
    id: 'livemint-economy',
    name: 'LiveMint Markets & Economy',
    category: 'Economy',
    url: 'https://www.livemint.com/rss/economy',
    type: 'rss',
    trustScore: 88,
  },
  {
    id: 'deepmind-ai',
    name: 'Google DeepMind AI Blog',
    category: 'AI & Tech',
    url: 'https://deepmind.google/blog/rss.xml',
    type: 'rss',
    trustScore: 97,
  },
  {
    id: 'openai-research',
    name: 'OpenAI News & Research',
    category: 'AI & Tech',
    url: 'https://openai.com/blog/rss.xml',
    type: 'rss',
    trustScore: 97,
  },
];
