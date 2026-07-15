import { Handler } from '@netlify/functions';

// --- CONFIGURATION ---
// Replace with your actual Wappfly credentials
const WAPPFLY_API_URL = 'https://api.wappfly.com';
const WAPPFLY_API_KEY = '6fb1f0613f16a1756385f4c403b948c792d29381885a7a0594ac932f24e86aca';
const WAPPFLY_INSTANCE = 'default';

// Your existing AI endpoint (Railway or Netlify)
const AI_API_URL = 'https://visabits-consultants-production.up.railway.app/api/chat';
// --------------------

export const handler: Handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    console.log('📩 Webhook received:', JSON.stringify(body, null, 2));

    // Handle Wappfly test events
    if (body.event === 'test' || body.type === 'test') {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: 'Webhook is working!' }),
      };
    }

    // Extract sender and message
    const from = body.from || body.sender || body.number || body.phone;
    const messageText = body.text || body.body || body.message || body.content || '';

    if (!from) {
      console.error('❌ No sender found in webhook body');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing sender' }),
      };
    }

    console.log(`📩 Received from ${from}: "${messageText}"`);

    // ✅ Step 1: Call your existing AI API
    let aiReply = "I'm sorry, I couldn't generate a response. Please try again later.";

    try {
      const aiResponse = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        aiReply = aiData.reply || aiData.response || aiData.message || aiReply;
      } else {
        console.error('❌ AI API error:', aiResponse.status);
        const errorText = await aiResponse.text();
        console.error('❌ AI API error details:', errorText);
      }
    } catch (aiError) {
      console.error('❌ AI API call failed:', aiError);
    }

    // ✅ Step 2: Send reply via Wappfly
    const sendUrl = `${WAPPFLY_API_URL}/api/${WAPPFLY_INSTANCE}/sendText`;
    console.log(`📤 Sending to ${from}: "${aiReply}"`);

    const response = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': WAPPFLY_API_KEY,
      },
      body: JSON.stringify({
        number: from,
        text: aiReply,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to send message via Wappfly: ${errorText}`);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send reply' }),
      };
    }

    console.log(`🤖 Sent AI reply to ${from}: ${aiReply}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};