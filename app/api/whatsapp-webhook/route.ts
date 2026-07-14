// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { activeConversations, agentRequests, humanHandled } from '@/app/lib/store';

const AGENT_KEYWORDS = [
  'agent', 'human', 'speak to someone', 'talk to agent', 'real person',
  'help me with agent', 'i need to talk to a human', 'transfer to agent', 'can i talk to someone',
];

// Helper: Send a WhatsApp message with detailed logging
async function sendMessage(to: string, text: string): Promise<boolean> {
  try {
    const url = `${process.env.OPENWA_API_URL}/api/send`;
    const apiKey = process.env.OPENWA_API_KEY;
    const payload = { number: to, text };

    console.log(`📤 Sending to ${to}:`, { url, apiKey: apiKey ? 'present' : 'MISSING', payload });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey!,
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log(`📤 OpenWA send response (${response.status}):`, responseText);

    if (!response.ok) {
      console.error(`❌ Failed to send message to ${to}:`, responseText);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`❌ Error sending message to ${to}:`, error);
    return false;
  }
}

// Helper: Get AI reply with fallback
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
    console.log('📩 Full webhook body:', JSON.stringify(body, null, 2));

    // Extract fields – OpenWA might use different key names
    const from = body.from || body.sender || body.number;
    const messageText = body.text || body.body || body.message || '';
    const isGroup = body.isGroup || false;
    const isFromMe = body.fromMe || false;

    if (!from) {
      console.error('❌ No sender number found in webhook payload');
      return NextResponse.json({ error: 'Missing sender' }, { status: 400 });
    }

    const message = messageText.toLowerCase().trim();

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

    // ❌ 4. Ignore if client has requested an agent
    if (agentRequests.has(from)) {
      console.log(`⏭️ ${from} is in agent-requested state, ignoring.`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Agent requested' });
    }

    // ✅ 5. Check if client wants an agent
    const wantsAgent = AGENT_KEYWORDS.some(keyword => message.includes(keyword));

    if (wantsAgent) {
      agentRequests.add(from);
      activeConversations.delete(from);

      const finalReply = "I'll connect you with a human agent shortly. Please wait while we transfer you. Thank you! 😊";
      await sendMessage(from, finalReply);

      console.log(`📌 ${from} requested an agent.`);
      return NextResponse.json({ success: true, transferred: true });
    }

    // ✅ 6. If new client, add to active conversations
    if (!activeConversations.has(from)) {
      activeConversations.add(from);
      console.log(`🆕 New client: ${from}`);
    }

    // ✅ 7. Generate AI reply
    let aiReply = await getAIReply(messageText);

    // ✅ 8. If AI reply is empty or a fallback, ensure we still send something
    if (!aiReply || aiReply.trim() === '') {
      aiReply = "Thank you for your message! Our team will get back to you shortly.";
      console.log(`⚠️ AI returned empty, using fallback.`);
    }

    // ✅ 9. Send the reply
    const sent = await sendMessage(from, aiReply);
    if (sent) {
      console.log(`🤖 Sent AI reply to ${from}: ${aiReply}`);
    } else {
      console.error(`❌ Failed to send message to ${from} even after AI reply.`);
    }

    return NextResponse.json({ success: sent });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}