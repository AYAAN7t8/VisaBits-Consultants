// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Store active conversations (you can use a database instead)
const activeConversations = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const from = body.from;           // Sender's number
    const message = body.text;        // Message text
    const isGroup = body.isGroup || false; // Check if it's a group message
    const isFromMe = body.fromMe || false; // Check if message is from you (to avoid loops)

    // ❌ IGNORE GROUP MESSAGES
    if (isGroup) {
      console.log(`⏭️ Ignoring group message from ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Group message' });
    }

    // ❌ IGNORE MESSAGES FROM YOURSELF (to avoid loops)
    if (isFromMe) {
      console.log(`⏭️ Ignoring message from self: ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Self message' });
    }

    // ❌ IGNORE EXISTING CONVERSATIONS
    if (activeConversations.has(from)) {
      console.log(`⏭️ Ignoring existing conversation with ${from}`);
      return NextResponse.json({ success: true, ignored: true, reason: 'Existing conversation' });
    }

    // ✅ NEW CLIENT – Add to active conversations
    activeConversations.add(from);

    console.log(`📩 New client ${from}: ${message}`);

    // Call your AI
    const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const aiData = await aiResponse.json();
    const reply = aiData.reply || "I'm sorry, I couldn't process that.";

    // Send reply via OpenWA
    await fetch(`${process.env.OPENWA_API_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.OPENWA_API_KEY,
      },
      body: JSON.stringify({
        number: from,
        text: reply,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}