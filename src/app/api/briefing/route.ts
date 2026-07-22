import { NextResponse } from 'next/server';
import { getDailyBriefing } from '@/lib/storage/supabase-client';

export async function GET() {
  try {
    const briefing = await getDailyBriefing();
    return NextResponse.json({ success: true, briefing });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
