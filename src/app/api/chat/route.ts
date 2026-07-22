import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_ARTICLES, INITIAL_BRIEFING } from '@/lib/storage/mock-db';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const query = message ? message.toLowerCase() : '';

    // Smart contextual responses built from live intelligence dataset
    let responseText = '';
    let sources: string[] = [];

    if (query.includes('economy') || query.includes('rbi') || query.includes('repo')) {
      const eco = INITIAL_ARTICLES.find(a => a.category === 'Economy');
      sources = [eco?.title || 'RBI Monetary Policy Release'];
      responseText = `**Today's Economy Intelligence Overview:**\n\n` +
        `• **RBI Repo Rate Unchanged (6.50%):** The Monetary Policy Committee (MPC) kept the policy repo rate steady for the 9th consecutive meeting. Standing Deposit Facility (SDF) remains at 6.25%.\n` +
        `• **GDP Projection (7.2%):** Real GDP growth for FY26-27 is projected at 7.2%, driven by resilient domestic consumption and private investment.\n` +
        `• **Inflation Trajectory (4.1%):** CPI Inflation forecast revised down to 4.1%.\n` +
        `• **Historic Forex Reserves:** India's foreign exchange reserves hit a record **$710 Billion**.\n\n` +
        `**Key UPSC Prelims/Mains Angle:** Focus on the Monetary Transmission Mechanism, Liquidity Adjustment Facility (LAF), and the statutory composition of MPC under Section 45ZB of the RBI Act 1934.`;
    } else if (query.includes('defence') || query.includes('defense') || query.includes('drdo') || query.includes('missile') || query.includes('vshorads')) {
      const def = INITIAL_ARTICLES.filter(a => a.category === 'Defence');
      sources = def.map(a => a.title);
      responseText = `**Defence & Military Intelligence Briefing:**\n\n` +
        `1. **DRDO VSHORADS Test Flight:** DRDO successfully tested the 4th-Gen Very Short Range Air Defence System off Odisha coast. Features miniaturized Reaction Control System (RCS) and dual-thrust solid motor for neutralizing low-altitude aerial threats.\n` +
        `2. **India-France 110kN Engine Co-development:** Milestone deal between GTRE (DRDO) & Safran for 100% Transfer of Technology (ToT) to power India's 5th-gen AMCA fighter.\n` +
        `3. **Gaganyaan TV-D2 Abort Mission:** High-altitude abort test executed at Mach 1.3 at 17 km with Navy splashdown recovery in Bay of Bengal.\n\n` +
        `**SSB GD & Mains Note:** Focus on Aatmanirbharta in Defence, Joint Theatre Command integration, and Indo-Pacific Blue Horizon initiative.`;
    } else if (query.includes('ai') || query.includes('tech') || query.includes('gpu')) {
      const aiArt = INITIAL_ARTICLES.find(a => a.category === 'AI & Tech');
      sources = [aiArt?.title || 'IndiaAI Mission Cabinet Approval'];
      responseText = `**AI & Tech Intelligence Update:**\n\n` +
        `• **IndiaAI Mission (Rs 10,372 Crore Outlay):** Cabinet approved public-private partnership deployment of **10,000+ GPU supercomputing cloud**.\n` +
        `• **Sovereign LLMs:** Focus on indigenous foundational AI models trained across 22 official Indian languages.\n` +
        `• **Data Sovereignty:** Establishment of IndiaAI Datasets Platform for anonymized governance data.\n\n` +
        `**Revision Note:** Highlight the contrast between sovereign public compute infrastructure and monopolistic global cloud lock-in.`;
    } else if (query.includes('note') || query.includes('revision') || query.includes('upsc')) {
      responseText = `**Daily UPSC High-Yield Revision Notes (22 July 2026):**\n\n` +
        `1. **Art. 361 Immunity:** SC 5-judge bench holds post-tenure criminal inquiries against Governors permissible; mala fide official acts remain subject to Judicial Review.\n` +
        `2. **VSHORADS:** MANPADS with Reaction Control System (RCS) developed by RCI Hyderabad & DRDO.\n` +
        `3. **AMCA Propulsion:** 110kN engine co-development between DRDO GTRE and Safran (France) with 100% ToT.\n` +
        `4. **RBI MPC:** 6 members (3 RBI + 3 Govt), Governor casting vote, Repo 6.50%, Forex $710B.\n` +
        `5. **Gaganyaan TV-D2:** CES abort test at Mach 1.3 at 17km altitude. Humanoid robot: Vyommitra.`;
      sources = INITIAL_BRIEFING.revisionNotes;
    } else {
      responseText = `**DailyIntel Assistant:** I have analyzed today's intelligence feed across 6 categories (Defence, Economy, International, AI & Tech, Science, UPSC Polity).\n\n` +
        `Here is the executive summary:\n` +
        `• **Top Headline:** DRDO VSHORADS flight test & India-France 110kN Engine ToT.\n` +
        `• **Economy:** RBI Repo Rate held at 6.50%, GDP growth 7.2%, Forex reserves $710B.\n` +
        `• **Constitutional Law:** SC verdict on Article 361 Gubernatorial Immunity.\n\n` +
        `*You can ask me specific questions like "Explain today's economy news", "Give me all defence news this week", or "Generate UPSC notes from today's current affairs".*`;
      sources = ['Daily Intelligence Platform Feed'];
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
