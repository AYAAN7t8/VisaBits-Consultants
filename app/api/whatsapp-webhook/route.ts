// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const from = body.from;       // Sender's WhatsApp number
    const message = body.text;    // Message text

    console.log(`📩 Received from ${from}: ${message}`);

    // Call your existing AI chat endpoint
    const aiResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const aiData = await aiResponse.json();
    const reply = aiData.reply || "I'm sorry, I couldn't process that.";

    console.log(`🤖 AI reply: ${reply}`);

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