// app/api/conversations/route.ts
import { NextResponse } from 'next/server';

// In-memory storage (use Redis or DB in production)
export const activeConversations = new Set<string>();      // Numbers receiving auto-replies
export const agentRequests = new Set<string>();            // Numbers that have requested an agent

export async function GET() {
  return NextResponse.json({
    active: Array.from(activeConversations),
    agentRequests: Array.from(agentRequests),
  });
}