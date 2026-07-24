export type Category = 
  | 'India'
  | 'International'
  | 'Defence'
  | 'Economy'
  | 'AI & Tech'
  | 'Science & Environment'
  | 'UPSC'
  | 'UPSC Polity';

export type ExamType = 'UPSC CSE' | 'CDS' | 'CAPF AC' | 'AFCAT' | 'State PCS' | 'NDA' | 'SSB';

export interface PYQAnalysis {
  similarPyqAsked: string;
  yearAsked: number;
  examName: 'UPSC CSE' | 'CDS' | 'CAPF AC';
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'UPSC Ranker Level';
  patternUsed: string; // e.g., 'Multi-statement elimination', 'Assertion-Reason', 'Conceptual pairing'
  similarityScore: number; // e.g. 92%
  whyAskedReason: string;
  probabilityOfRepetition: string; // e.g. 'Very High (88%)'
}

export interface HistoricalContext {
  origin: string;
  evolutionTimeline: { date: string; event: string }[];
  landmarkJudgements: string[];
  constitutionalArticles: string[];
  importantActsAndRules: string[];
  keyCommittees: string[];
  previousPolicies: string[];
  governmentReports: string[]; // e.g. NITI Aayog, ARC Reports, PIB, PRS
}

export interface HighScoringMainsFramework {
  maxMarksPotential: number; // e.g. 15 / 250
  idealWordCount: number; // e.g. 250
  timeRequiredMinutes: number; // e.g. 9
  introductionContext: string;
  corePerspectives: {
    constitutional?: string;
    economic?: string;
    security?: string;
    environmental?: string;
    socialEthical?: string;
    international?: string;
    legal?: string;
    federal?: string;
    [key: string]: string | undefined;
  };
  keyExaminerExpectations: string[];
  commonStudentMistakes: string[];
  rankerSecretTechnique: string;
  wayForward: string;
}

export interface ExaminersPerspective {
  whyUpscMayAsk: string;
  whyCdsMayAsk: string;
  whyCapfMayAsk: string;
  likelyFramingStyle: string;
  trapAreasToAvoid: string[];
  missedConcepts: string[];
}

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
  source: string; // e.g., 'PIB / DRDO / Official Gazette'
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
  pyqIntelligence?: PYQAnalysis;
  historicalContext?: HistoricalContext;
  mainsFramework?: HighScoringMainsFramework;
  examinersPerspective?: ExaminersPerspective;
  timeline?: EventTimelineNode[];
  essayPoints?: string[];
  flashcards?: any[];
  readTimeMinutes?: number;
  bookmarked?: boolean;
  isFactChecked?: boolean;
  verificationStatus?: 'Verified' | 'Unverified' | 'Needs Review';
  aiVerificationNotes?: string;
  strictIsolatedFacts?: string[];
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
  pyqConnection?: string;
  eliminationTrick?: string;
  staticTopicLink?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Hard' | 'UPSC Ranker Level';
  repetitionProbability?: string;
}

export interface MainsQuestion {
  id: string;
  question: string;
  paper: string; // e.g., GS Paper 2, GS Paper 3, CAPF Paper II
  wordLimit: number;
  answerFramework: string[];
  keyPoints: string[];
  mainsFrameworkDetails?: HighScoringMainsFramework;
}

export interface EssayTopic {
  id: string;
  topic: string;
  category: string;
  dimensions: string[];
  quotes: string[];
  caseStudies?: string[];
  supremeCourtJudgements?: string[];
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

export interface ExamReadinessMetrics {
  overallReadinessScore: number; // e.g. 84%
  upscCseReadiness: number;
  cdsReadiness: number;
  capfReadiness: number;
  pyqsSolvedCount: number;
  accuracyPercentage: number;
  currentStreakDays: number;
  studyHoursTotal: number;
  weakSubjects: { subject: string; accuracy: number; recommendedTopic: string }[];
  strongSubjects: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}
