export type Category = 
  | 'India'
  | 'International'
  | 'Defence'
  | 'Economy'
  | 'AI & Tech'
  | 'Science & Environment'
  | 'UPSC';

export type ExamType = 'UPSC CSE' | 'CDS' | 'CAPF AC' | 'AFCAT' | 'NDA' | 'SSB';

export interface ExamAnalysis {
  exams: ExamType[];
  whyItMatters: string;
  prelimsQuestion: string;
  mainsQuestion: string;
  keywords: string[];
}

export interface ImpactAnalysis {
  overallImpact: string;
  indiaImpact: string;
  economyImpact: string;
  defenceImpact: string;
  futureImplications: string;
}

export interface EventTimelineNode {
  date: string;
  event: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  subcategory: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  importanceScore: number; // 1 - 10
  isTrending: boolean;
  duplicateCount: number;
  keyFacts: string[];
  dates: string[];
  organizations: string[];
  personalities: string[];
  keywords: string[];
  ministry?: string;
  country?: string;
  examRelevance: ExamAnalysis;
  impactAnalysis: ImpactAnalysis;
  timeline?: EventTimelineNode[];
  readTimeMinutes?: number;
  bookmarked?: boolean;
}

export interface DailyBriefing {
  id: string;
  date: string;
  title: string;
  summary: string;
  topHeadlines: Article[];
  defenceUpdates: Article[];
  economyUpdates: Article[];
  internationalUpdates: Article[];
  aiTechUpdates: Article[];
  scienceUpdates: Article[];
  upscUpdates: Article[];
  editorialAnalysis: string;
  revisionNotes: string[];
  keyTakeaways: string[];
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  examType: ExamType;
  category: Category;
}

export interface MainsQuestion {
  id: string;
  question: string;
  paper: string; // e.g., GS Paper 2, GS Paper 3
  wordLimit: number;
  answerFramework: string[];
  keyPoints: string[];
}

export interface EssayTopic {
  id: string;
  topic: string;
  category: string;
  dimensions: string[];
  quotes: string[];
}

export interface SsbGdTopic {
  id: string;
  topic: string;
  overview: string;
  argumentsFor: string[];
  argumentsAgainst: string[];
  strategicContext: string;
}

export interface PracticeSuite {
  id: string;
  date: string;
  upscPrelimsMcqs: MCQQuestion[];
  cdsMcqs: MCQQuestion[];
  capfMcqs: MCQQuestion[];
  mainsQuestions: MainsQuestion[];
  essayTopic: EssayTopic;
  ssbGdTopic: SsbGdTopic;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}
