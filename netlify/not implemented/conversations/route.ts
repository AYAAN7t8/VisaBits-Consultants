// app/api/conversations/route.ts
import { NextResponse } from 'next/server';
import { activeConversations, agentRequests } from '@/app/lib/store';

export async function GET() {
  return NextResponse.json({
    active: Array.from(activeConversations),
    agentRequests: Array.from(agentRequests),
  });
}