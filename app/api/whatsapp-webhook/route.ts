// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { activeConversations, agentRequests } from '@/app/lib/store';

// Keywords that trigger agent handover
const AGENT_KEYWORDS = ['agent', 'human', 'speak to someone', 'talk to agent', 'real person', 'help me with agent'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const from = body.from;
    const message = body.text?.toLowerCase() || '';
    const isGroup = body.isGroup || false;
    const isFromMe = body.fromMe || false;

    console.log(`📩 Received from ${from}: ${message}`);

    // ❌ IGNORE GROUP MESSAGES
    if (isGroup) {
      console.log(`⏭️ Ignoring group message from ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Group message' });
    }

    // ❌ IGNORE MESSAGES FROM YOURSELF
    if (isFromMe) {
      console.log(`⏭️ Ignoring self-message from ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Self message' });
    }

    // ✅ CHECK IF CLIENT HAS REQUESTED AN AGENT
    if (agentRequests.has(from)) {
      console.log(`⏭️ ${from} is in agent-requested state, ignoring.`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Agent requested' });
    }

    // ✅ CHECK FOR AGENT KEYWORD
    const wantsAgent = AGENT_KEYWORDS.some(keyword => message.includes(keyword));

    if (wantsAgent) {
      agentRequests.add(from);
      activeConversations.delete(from);

      const finalReply = "I'll connect you with a human agent shortly. Please wait while we transfer you. Thank you! 😊";
      await sendMessage(from, finalReply);

      console.log(`📌 ${from} requested an agent.`);
      return NextResponse.json({ success: true, transferred: true });
    }

    // ✅ IF NEW CLIENT, ADD TO ACTIVE CONVERSATIONS
    if (!activeConversations.has(from)) {
      activeConversations.add(from);
      console.log(`📩 New client ${from}`);
    }

    // ✅ GENERATE AI REPLY
    const aiReply = await getAIReply(message);
    await sendMessage(from, aiReply);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// Helper functions
async function sendMessage(to: string, text: string) {
  await fetch(`${process.env.OPENWA_API_URL}/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.OPENWA_API_KEY!,
    },
    body: JSON.stringify({ number: to, text }),
  });
}

async function getAIReply(message: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  return data.reply || "Sorry, I couldn't generate a response. Please try again.";
}