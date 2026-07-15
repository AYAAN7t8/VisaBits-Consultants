// app/api/reactivate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { activeConversations, agentRequests } from '@/app/lib/store';

export async function POST(request: NextRequest) {
  const { number } = await request.json();
  if (agentRequests.has(number)) {
    agentRequests.delete(number);
    activeConversations.add(number);
    console.log(`🔄 Reactivated AI for ${number}`);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Number not in agent requests' }, { status: 400 });
}