// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📩 Webhook payload:', JSON.stringify(body, null, 2));

    // ✅ Handle OpenWA test webhook requests
    if (body.event === 'test') {
      console.log('✅ Test webhook received – returning success.');
      return NextResponse.json({ 
        success: true, 
        message: 'Webhook is working!',
        received: body 
      });
    }

    // ✅ Extract fields from real WhatsApp message
    // OpenWA sends real messages with: { from, text, isGroup, fromMe, ... }
    const from = body.from || body.sender || body.number || body.phone;
    const messageText = body.text || body.body || body.message || body.content || '';

    if (!from) {
      console.error('❌ No sender found in webhook body');
      return NextResponse.json({ error: 'Missing sender' }, { status: 400 });
    }

    console.log(`📩 Received from ${from}: "${messageText}"`);

    // Send a simple reply to confirm it's working
    await fetch(`${process.env.OPENWA_API_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.OPENWA_API_KEY!,
      },
      body: JSON.stringify({
        number: from,
        text: '✅ Webhook is working! Your VisaBits AI is now connected.',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}