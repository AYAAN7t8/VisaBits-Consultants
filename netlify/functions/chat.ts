import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message } = JSON.parse(event.body || '{}');
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error('❌ OPENROUTER_API_KEY is missing');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' }),
      };
    }

    console.log('📩 Chat request:', message);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://visabitsconsultants.co.uk',
        'X-Title': 'VisaBits Consultants',
      },
      body: JSON.stringify({
        // Try a different model that is definitely available
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant for VisaBits Consultants. Provide clear, friendly answers about visa services.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    console.log('📦 OpenRouter response:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      console.error('❌ OpenRouter error:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error?.message || 'AI service error' }),
      };
    }

    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error('❌ Chat function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};