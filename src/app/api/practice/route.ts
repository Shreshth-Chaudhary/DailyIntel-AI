import { NextResponse } from 'next/server';
import { getPracticeSuite } from '@/lib/storage/supabase-client';

export async function GET() {
  try {
    const practiceSuite = await getPracticeSuite();
    return NextResponse.json({ success: true, practiceSuite });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
