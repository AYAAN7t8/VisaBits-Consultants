// app/api/whatsapp-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Log everything to see what's coming in
    const body = await request.json();
    console.log('📩 Webhook received:', JSON.stringify(body, null, 2));
    console.log('📩 Headers:', JSON.stringify(Object.fromEntries(request.headers), null, 2));

    // Send a test reply
    const openwaUrl = process.env.OPENWA_API_URL;
    const apiKey = process.env.OPENWA_API_KEY;

    console.log('🔑 OPENWA_API_URL:', openwaUrl);
    console.log('🔑 OPENWA_API_KEY:', apiKey);

    if (openwaUrl && apiKey) {
      await fetch(`${openwaUrl}/api/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          number: body.from,
          text: '✅ Webhook received! Your VisaBits AI is connected.',
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}