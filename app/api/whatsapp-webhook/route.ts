// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📩 Webhook received:', JSON.stringify(body, null, 2));

    // Send a test reply
    await fetch(`${process.env.OPENWA_API_URL}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.OPENWA_API_KEY,
      },
      body: JSON.stringify({
        number: body.from,
        text: '✅ Webhook is working! Your VisaBits AI is connected.',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}