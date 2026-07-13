// app/api/human-handled/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { humanHandled, activeConversations, agentRequests } from '@/app/lib/store';

// Mark a number as handled by human (AI stops replying)
export async function POST(request: NextRequest) {
  const { number } = await request.json();
  if (!number) return NextResponse.json({ error: 'Number required' }, { status: 400 });

  humanHandled.add(number);
  activeConversations.delete(number);   // Remove from AI active
  agentRequests.delete(number);         // Remove from agent requests (if any)

  console.log(`👤 Marked ${number} as human-handled.`);
  return NextResponse.json({ success: true, humanHandled: Array.from(humanHandled) });
}
export async function GET() {
  return NextResponse.json({ humanHandled: Array.from(humanHandled) });
}

// Remove a number from human-handled (reactivate AI)
export async function DELETE(request: NextRequest) {
  const { number } = await request.json();
  if (!number) return NextResponse.json({ error: 'Number required' }, { status: 400 });

  humanHandled.delete(number);
  // Optionally add back to activeConversations? Only if you want AI to resume.
  // We'll leave it as is; the next message from that number will be treated as new.

  console.log(`🔄 Removed ${number} from human-handled.`);
  return NextResponse.json({ success: true });
}