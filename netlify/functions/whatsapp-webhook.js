// Netlify Function: WhatsApp Webhook (Wapfly)
// Receives WhatsApp messages via Wapfly, calls AI, sends reply

// --- CONFIGURATION (from environment variables) ---
const WAPPFLY_API_URL = process.env.WAPPFLY_API_URL || 'https://wappfly.com/api';
const WAPPFLY_API_KEY = process.env.WAPPFLY_API_KEY || '';
const WAPPFLY_INSTANCE = process.env.WAPPFLY_INSTANCE || 'default';

// Your existing AI endpoint - use Netlify function instead of Railway
const AI_API_URL = process.env.AI_API_URL || 'https://visabitsconsultants.netlify.app/.netlify/functions/chat';
// --------------------

exports.handler = async (event) => {
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

    // ✅ Step 2: Send reply via Wapfly
    const sendUrl = `${WAPPFLY_API_URL}/${WAPPFLY_INSTANCE}/sendText`;
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
      console.error(`❌ Failed to send message via Wapfly: ${errorText}`);
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
