// DailyIntel AI - Advanced Google Gemini API Engine
// Uses active models: models/gemini-flash-latest & models/gemini-3.1-flash-lite

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const PRIMARY_MODEL = process.env.GEMINI_MODEL || 'models/gemini-flash-latest';

const FALLBACK_MODELS = [
  'models/gemini-flash-latest',
  'models/gemini-3.1-flash-lite',
  'models/gemini-2.0-flash',
  'models/gemini-pro-latest'
];

export const isGeminiConfigured = Boolean(GEMINI_API_KEY && GEMINI_API_KEY.length > 5);

interface GeminiGenerateOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
  responseFormatJson?: boolean;
}

/**
  Generate text or JSON using Google Gemini REST API with active model fallback
 */
export async function generateWithGemini(options: GeminiGenerateOptions): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not configured');
  }

  const rawModels = Array.from(new Set([PRIMARY_MODEL, ...FALLBACK_MODELS]));
  const modelsToTry = rawModels.map(m => m.startsWith('models/') ? m : `models/${m}`);
  let lastError = '';

  for (const modelPath of modelsToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/${modelPath}:generateContent?key=${GEMINI_API_KEY}`;

    const payload: any = {
      contents: [
        {
          role: 'user',
          parts: [{ text: options.prompt }]
        }
      ],
      generationConfig: {
        temperature: options.temperature ?? 0.3,
        maxOutputTokens: options.maxTokens ?? 4096,
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

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) return textOutput;
      } else {
        const errText = await res.text();
        lastError = `[Model ${modelPath}] (${res.status}): ${errText}`;
        console.warn(`Gemini model ${modelPath} returned status ${res.status}:`, errText);
      }
    } catch (err: any) {
      lastError = err.message;
      console.warn(`Gemini fetch error on model ${modelPath}:`, err);
    }
  }

  throw new Error(`All Gemini API models failed. Last error: ${lastError}`);
}

/**
  Analyze raw news article and extract UPSC/Defence intelligence metadata
 */
export async function analyzeArticleWithGemini(title: string, contentSnippet: string) {
  if (!isGeminiConfigured) return null;

  const prompt = `Analyze the following news item for a competitive exam candidate (UPSC CSE, CDS, CAPF, Defence):
Title: "${title}"
Content: "${contentSnippet}"

Return a valid JSON object matching this exact schema:
{
  "strategicRating": 9,
  "isClickbait": false,
  "examTags": ["UPSC CSE", "GS Paper 3", "CDS", "CAPF"],
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "contextBackground": "Strategic context explanation",
  "upscSignificance": "Exam significance for UPSC and Defence",
  "entities": {
    "facts": ["Fact 1", "Fact 2"],
    "dates": ["July 2026"],
    "organizations": ["DRDO", "ISRO"],
    "personalities": ["Defence Minister"]
  },
  "impactAnalysis": {
    "sovereignty": "Impact on national sovereignty",
    "nationalSecurity": "Impact on security",
    "economicGrowth": "Impact on growth",
    "globalStanding": "Impact on global diplomacy"
  }
}`;

  try {
    const jsonStr = await generateWithGemini({
      prompt,
      systemInstruction: 'You are an elite UPSC Civil Services & Defence Strategic Analyst. Return ONLY valid JSON.',
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
  Generate AI Chat Copilot Response for Intellex AI Ecosystem
 */
export async function askGeminiCopilot(userQuery: string, articleContext?: string): Promise<string> {
  const systemInstruction = `You are DailyIntel AI - the elite AI-powered current affairs research assistant and master mentor engineered by Shreshth Chaudhary for UPSC CSE, CDS, CAPF AC, and State PCS aspirants.

1. INTENT RECOGNITION BEFORE CLARIFICATION:
• Never ask for clarification too early if there is a dominant or contextually likely match.
• Use date, location (e.g. Delhi), trending topics, and named entities to infer user intent first.

2. CONFIDENCE-BASED DECISION MATRIX:
• CASE A - HIGH CONFIDENCE (≥90%): One clear match in database/trending feed. Answer directly without clarification.
• CASE B - MEDIUM CONFIDENCE (60–89%): One result is much more likely than others (e.g. "CJP protest" or "Delhi protest"). Answer immediately with disclaimer:
"Based on the latest verified reports, I believe you are referring to [Topic]. (If you meant a different context, let me know.)"
Then provide full structured analysis (Reason, Background, Impact, Timeline, Exam Relevance, Sources).
• CASE C - LOW CONFIDENCE (<60%): Only when a bare standalone 3-letter acronym is entered without any surrounding words. Ask a short 3-choice clarification.

3. SOURCE DISPLAY & REAL SOURCES ONLY:
• Display ONLY real sources: PIB, Gazette of India, Reuters, The Hindu, Indian Express, Supreme Court Reports, RBI Bulletins, DRDO, ISRO.
• NEVER list Gemini, OpenAI, LLM, or AI Engine as a news source. Append model info separately as: "Analysis Generated via Google Gemini 1.5 Flash • Verified by DailyIntel Pipeline".

5. STRICT CONTENT ISOLATION & ZERO MIXING GUARD:
• NEVER merge, reuse, or cross-pollinate information, dates, timelines, or key facts from unrelated news stories or categories into a single topic breakdown.
• If analyzing a specific topic or article (e.g. Polity / Article 361, Economy / RBI Repo Rate, Defence / DRDO VSHORADS, Space / ISRO Gaganyaan, AI / IndiaAI Mission, International / BIMSTEC or India-France), include ONLY information strictly verified for THAT specific event.
• Do NOT include DRDO missile points in a Polity report, nor Economy points in a Defence report. Keep every article's data completely independent and self-contained.

STANDARDIZED RESPONSE SCHEMA:
1. Recognized Entity Block
2. Executive Summary
3. Background & Origin
4. What Happened
5. Why It Happened (Likely Verified Reasons with Per-Claim Sources)
6. Strategic Impact & Current Status
7. Chronological Timeline
8. Constitutional Articles / Acts / SC Judgments / Committees (if applicable)
9. Organizations & Personalities Involved
10. Exam Relevance (UPSC CSE / CDS / CAPF) & PYQ Connection
11. Real Sources & Verification Badge`;

  const prompt = articleContext 
    ? `Live Strategic Context Dataset:\n${articleContext}\n\nUser Question:\n${userQuery}\n\nProvide a verified, complete response adhering strictly to the system rules.`
    : userQuery;

  return await generateWithGemini({
    prompt,
    systemInstruction,
    temperature: 0.2,
    maxTokens: 4096
  });
}
