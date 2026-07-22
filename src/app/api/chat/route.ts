import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_ARTICLES, INITIAL_BRIEFING } from '@/lib/storage/mock-db';
import { isGeminiConfigured, askGeminiCopilot } from '@/lib/ai/gemini';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const query = message ? message.trim() : '';

    if (!query) {
      return NextResponse.json({ success: false, error: 'Empty message' }, { status: 400 });
    }

    let responseText = '';
    let sources: string[] = [];

    // 1. If Gemini API Key is configured, execute real-time Gemini LLM call
    if (isGeminiConfigured) {
      try {
        const articleContext = INITIAL_ARTICLES.slice(0, 5)
          .map(a => `[${a.category}] ${a.title}: ${a.summary}`)
          .join('\n');
        
        responseText = await askGeminiCopilot(query, articleContext);
        sources = ['Google Gemini 1.5 Flash AI Engine', 'DailyIntel Real-Time Feed'];
      } catch (err: any) {
        console.warn('Gemini chat failed, using contextual fallback:', err);
      }
    }

    // 2. Contextual Intelligence Fallback Engine
    if (!responseText) {
      const qLower = query.toLowerCase();
      if (qLower.includes('economy') || qLower.includes('rbi') || qLower.includes('repo')) {
        const eco = INITIAL_ARTICLES.find(a => a.category === 'Economy');
        sources = [eco?.title || 'RBI Monetary Policy Release'];
        responseText = `**Today's Economy Intelligence Overview:**\n\n` +
          `• **RBI Repo Rate Unchanged (6.50%):** The Monetary Policy Committee (MPC) kept policy repo rate steady for 9th consecutive meeting.\n` +
          `• **GDP Projection (7.2%):** Real GDP growth for FY26-27 is projected at 7.2%.\n` +
          `• **Inflation Trajectory (4.1%):** CPI Inflation forecast revised to 4.1%.\n` +
          `• **Forex Reserves:** India's foreign exchange reserves hit **$710 Billion**.\n\n` +
          `**Key UPSC Angle:** Focus on Monetary Transmission Mechanism and Section 45ZB of RBI Act 1934.`;
      } else if (qLower.includes('defence') || qLower.includes('defense') || qLower.includes('drdo')) {
        const def = INITIAL_ARTICLES.filter(a => a.category === 'Defence');
        sources = def.map(a => a.title);
        responseText = `**Defence & Military Intelligence Briefing:**\n\n` +
          `1. **DRDO VSHORADS Test Flight:** 4th-Gen Very Short Range Air Defence System off Odisha coast.\n` +
          `2. **India-France 110kN Engine Co-development:** Milestone deal between GTRE & Safran with 100% ToT.\n` +
          `3. **Gaganyaan TV-D2 Abort Mission:** High-altitude abort test executed at Mach 1.3 at 17 km.\n\n` +
          `**SSB GD & Mains Note:** Focus on Aatmanirbharta in Defence and Joint Theatre Command integration.`;
      } else {
        responseText = `**DailyIntel Assistant:** I have analyzed today's intelligence feed across 6 categories (Defence, Economy, International, AI & Tech, Science, UPSC Polity).\n\n` +
          `• **Top Headline:** DRDO VSHORADS flight test & India-France 110kN Engine ToT.\n` +
          `• **Economy:** RBI Repo Rate held at 6.50%, GDP growth 7.2%, Forex reserves $710B.\n` +
          `• **Constitutional Law:** SC verdict on Article 361 Gubernatorial Immunity.\n\n` +
          `*Ask me specific questions like "Explain today's economy news", "Give me all defence news", or "Generate UPSC notes".*`;
        sources = ['Daily Intelligence Platform Feed'];
      }
    }

    return NextResponse.json({
      success: true,
      role: 'assistant',
      content: responseText,
      sources,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
