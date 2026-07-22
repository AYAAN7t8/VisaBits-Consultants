// Netlify Function: WhatsApp Webhook (Wapfly)
// Receives WhatsApp messages via Wapfly, calls AI, sends reply
// Features: 5-message limit per conversation, handoff, shorter prompts

// --- CONFIGURATION (from environment variables) ---
const WAPPFLY_API_URL = process.env.WAPPFLY_API_URL || 'https://wappfly.com/api';
const WAPPFLY_API_KEY = process.env.WAPPFLY_API_KEY || '';
const WAPPFLY_INSTANCE = process.env.WAPPFLY_INSTANCE || 'default';

// Your existing AI endpoint - use Netlify function instead of Railway
const AI_API_URL = process.env.AI_API_URL || 'https://visabitsconsultants.netlify.app/.netlify/functions/chat';

// Conversation limits
const MAX_MESSAGES_PER_CONVERSATION = 5;

// In-memory conversation store (resets on cold start - acceptable for low volume)
const conversations = new Map();

// --- SYSTEM PROMPT FOR SHORTER, MORE INFORMATIVE REPLIES ---
const AI_SYSTEM_PROMPT = `You are VisaBits Consultants AI Assistant. Answer visa questions based on your knowledge.

REPLY RULES:
- Keep replies SHORT (1-2 sentences max)
- Be direct and informative
- Include key info: price, documents, timeline
- End with ONE relevant question
- No fluff, no marketing language

EXAMPLES:
User: "Germany visa cost?"
You: "Germany visa is £150 from London, £180 from Manchester/Edinburgh. Biometric fee extra. Which city are you in?"

User: "What documents for France?"
You: "France visa needs passport, form, photos, bank statements (£2k min), travel insurance, hotel/flight bookings. Are you employed, student, or self-employed?"

User: "How long for Spain visa?"
You: "Spain visa takes 3-5 weeks. We handle docs, appointments, insurance. Where are you applying from?"

HANDOFF: If user needs complex help, say "I'll connect you with our team for detailed help."`;

// In-memory conversation store

function getConversation(phone) {
  if (!conversations.has(phone)) {
    conversations.set(phone, { count: 0, messages: [] });
  }
  return conversations.get(phone);
}

function incrementConversation(phone) {
  const conv = getConversation(phone);
  conv.count++;
  return conv.count;
}

function shouldHandoff(phone) {
  const conv = conversations.get(phone);
  return conv && conv.count > 5;
}

function getHandoffMessage() {
  return "You've reached the automated limit. Our team will contact you shortly for detailed assistance. You can also WhatsApp us directly at +44 7427 881393 or email info@visabitsconsultants.co.uk";
}

// --- MAIN HANDLER ---
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

    // Normalize phone number (remove + if present)
    const cleanPhone = from.replace(/^\+/, '');
    console.log(`📩 Received from ${cleanPhone}: "${messageText}"`);

    // Check conversation limit
    const msgCount = incrementConversation(cleanPhone);
    console.log(`📊 Conversation count for ${cleanPhone}: ${msgCount}/5`);

    // Check if we should handoff to human
    if (msgCount > 5) {
      console.log(`🔄 Handoff triggered for ${cleanPhone}`);
      
      const handoffMsg = getHandoffMessage();
      const sendUrl = `${process.env.WAPPFLY_API_URL || 'https://wappfly.com/api'}/messages/send`;
      
      try {
        const response = await fetch(sendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Token': process.env.WAPPFLY_API_KEY || '',
          },
          body: JSON.stringify({
            to: cleanPhone,
            text: getHandoffMessage(),
          }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Handoff send failed: ${errorText}`);
        } else {
          console.log(`✅ Handoff message sent to ${cleanPhone}`);
        }
      } catch (sendError) {
        console.error('❌ Handoff send error:', sendError);
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, handoff: true }),
      };
    }

    // ✅ Step 1: Call AI API with shorter prompt
    let aiReply = "I'll connect you with our team for detailed help.";

    try {
      const systemPrompt = `${AI_SYSTEM_PROMPT}

Current question: ${messageText}

Reply in 1-2 sentences with key info + 1 question.`;

      const aiResponse = await fetch(process.env.AI_API_URL || 'https://visabitsconsultants.netlify.app/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          system: systemPrompt
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        aiReply = aiData.reply || aiData.response || aiData.message || "I'll connect you with our team for detailed help.";
      } else {
        console.error('❌ AI API error:', aiResponse.status);
        const errorText = await aiResponse.text();
        console.error('❌ AI API error details:', errorText);
      }
    } catch (aiError) {
      console.error('❌ AI API call failed:', aiError);
    }

    // ✅ Step 2: Send reply via Wapfly
    const sendUrl = `${process.env.WAPPFLY_API_URL || 'https://wappfly.com/api'}/messages/send`;
    console.log(`📤 Sending to ${cleanPhone}: "${aiReply}"`);

    const response = await fetch(sendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Token': process.env.WAPPFLY_API_KEY || '',
      },
      body: JSON.stringify({
        to: cleanPhone,
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

    console.log(`✅ Sent AI reply to ${cleanPhone}: ${aiReply}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageCount: msgCount }),
    };
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
