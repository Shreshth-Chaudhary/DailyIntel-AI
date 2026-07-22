// DailyIntel AI - Google Gemini API Client
// Uses gemini-2.5-flash / gemini-1.5-flash model via Google AI Studio API

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

export const isGeminiConfigured = Boolean(GEMINI_API_KEY);

interface GeminiGenerateOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormatJson?: boolean;
}

/**
  Generate text or JSON using Google Gemini REST API
 */
export async function generateWithGemini(options: GeminiGenerateOptions): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not configured');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const payload: any = {
    contents: [
      {
        role: 'user',
        parts: [{ text: options.prompt }]
      }
    ],
    generationConfig: {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.maxTokens ?? 2048,
    }
  };

  if (options.systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: options.systemInstruction }]
    };
  }

  if (options.responseFormatJson) {
    payload.generationConfig.responseMimeType = 'application/json';
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini API error [${res.status}]: ${errorText}`);
  }

  const data = await res.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textOutput) {
    throw new Error('Gemini API returned empty output');
  }

  return textOutput;
}

/**
  Analyze raw news article and extract UPSC/Defence intelligence metadata
 */
export async function analyzeArticleWithGemini(title: string, contentSnippet: string) {
  if (!isGeminiConfigured) return null;

  const prompt = `Analyze the following news item for a competitive exam candidate (UPSC CSE, CDS, CAPF, Defence):
Title: "${title}"
Content: "${contentSnippet}"

Return a valid JSON object matching this schema:
{
  "strategicRating": number (1 to 10),
  "isClickbait": boolean,
  "examTags": string[] (e.g. ["UPSC Prelims", "GS Paper 2", "CDS", "CAPF"]),
  "keyPoints": string[] (3 bullet points),
  "contextBackground": string (2-3 sentences),
  "upscSignificance": string (UPSC relevance),
  "entities": {
    "facts": string[],
    "dates": string[],
    "organizations": string[],
    "personalities": string[]
  },
  "impactAnalysis": {
    "sovereignty": string,
    "nationalSecurity": string,
    "economicGrowth": string,
    "globalStanding": string
  }
}`;

  try {
    const jsonStr = await generateWithGemini({
      prompt,
      systemInstruction: 'You are an elite UPSC Civil Services & Defence Strategic Analyst. Return ONLY JSON.',
      temperature: 0.2,
      responseFormatJson: true
    });
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Gemini Article Analysis Error:', err);
    return null;
  }
}

/**
  Generate AI Chat Copilot Response for DailyIntel
 */
export async function askGeminiCopilot(userQuery: string, articleContext?: string): Promise<string> {
  const systemInstruction = `You are DailyIntel AI, a strategic intelligence assistant specialized in UPSC CSE, CDS, CAPF, Defence, Indian Polity, Economy, and International Relations.
Provide crisp, structured, exam-oriented responses. Use bullet points, bold key terms, and map relevant topics to GS Paper 1, 2, 3, 4 where appropriate.`;

  const prompt = articleContext 
    ? `Context Article:\n${articleContext}\n\nUser Question:\n${userQuery}`
    : userQuery;

  return await generateWithGemini({
    prompt,
    systemInstruction,
    temperature: 0.4
  });
}
