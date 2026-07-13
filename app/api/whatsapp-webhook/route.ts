// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { activeConversations, agentRequests, humanHandled } from '@/app/lib/store';

// Keywords that trigger agent handover
const AGENT_KEYWORDS = [
  'agent',
  'human',
  'speak to someone',
  'talk to agent',
  'real person',
  'help me with agent',
  'i need to talk to a human',
  'transfer to agent',
  'can i talk to someone',
];

// Helper: Send a WhatsApp message
async function sendMessage(to: string, text: string) {
  try {
    const response = await fetch(`${process.env.OPENWA_API_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.OPENWA_API_KEY!,
      },
      body: JSON.stringify({ number: to, text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to send message to ${to}:`, errorText);
    }
  } catch (error) {
    console.error(`❌ Error sending message to ${to}:`, error);
  }
}

// Helper: Get AI reply
async function getAIReply(message: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error('❌ AI API error:', response.status);
      return "I'm having trouble connecting to my knowledge base. Please try again later or contact our team directly.";
    }

    const data = await response.json();
    return data.reply || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('❌ Error calling AI:', error);
    return "I'm having trouble processing your request. Please contact our team directly.";
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const from = body.from;
    const message = body.text?.toLowerCase()?.trim() || '';
    const isGroup = body.isGroup || false;
    const isFromMe = body.fromMe || false;

    console.log(`📩 Received from ${from}: "${message}"`);

    // ❌ 1. Ignore group messages
    if (isGroup) {
      console.log(`⏭️ Ignoring group message from ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Group message' });
    }

    // ❌ 2. Ignore messages from yourself (agent's outgoing messages)
    if (isFromMe) {
      console.log(`⏭️ Ignoring self-message from ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Self message' });
    }

    // ❌ 3. Ignore if this client is handled by human
    if (humanHandled.has(from)) {
      console.log(`⏭️ ${from} is handled by human, ignoring.`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Human handled' });
    }

    // ❌ 4. Ignore if client has requested an agent and is waiting
    if (agentRequests.has(from)) {
      console.log(`⏭️ ${from} is in agent-requested state, ignoring.`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Agent requested' });
    }

    // ✅ 5. Check if client wants an agent
    const wantsAgent = AGENT_KEYWORDS.some(keyword => message.includes(keyword));

    if (wantsAgent) {
      agentRequests.add(from);
      activeConversations.delete(from);

      const finalReply =
        "I'll connect you with a human agent shortly. Please wait while we transfer you. Thank you! 😊";
      await sendMessage(from, finalReply);

      console.log(`📌 ${from} requested an agent.`);
      return NextResponse.json({ success: true, transferred: true });
    }

    // ✅ 6. If new client, add to active conversations
    if (!activeConversations.has(from)) {
      activeConversations.add(from);
      console.log(`🆕 New client: ${from}`);
    }

    // ✅ 7. Generate AI reply and send
    const aiReply = await getAIReply(message);
    await sendMessage(from, aiReply);

    console.log(`🤖 Sent AI reply to ${from}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}