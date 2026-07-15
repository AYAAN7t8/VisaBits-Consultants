import { Handler } from '@netlify/functions';

// Base URL for your site
const SITE_URL = 'https://visabitsconsultants.co.uk';

// Knowledge files to load
const KNOWLEDGE_FILES = [
  'About-VisaBits.txt',
  'Schengen-Visa-Service.txt',
  'Payment-Process.txt',
  '4-Step-Visa-Process.txt',
  'Required-Docs-Checklist.txt',
  'Non-Schengen-Visa-Services.txt',
  'FAQs.txt',
  'Style-Guide.txt'
];

async function loadKnowledge(): Promise<string> {
  let fullText = '';
  for (const file of KNOWLEDGE_FILES) {
    try {
      const url = `${SITE_URL}/knowledge/${file}`;
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        fullText += `\n\n--- ${file.replace('.txt', '')} ---\n${text}`;
        console.log(`✅ Loaded: ${file}`);
      } else {
        console.warn(`⚠️ Failed to load ${file}: ${response.status}`);
      }
    } catch (error) {
      console.error(`❌ Error loading ${file}:`, error);
    }
  }
  console.log(`📚 Total knowledge text length: ${fullText.length} characters`);
  return fullText;
}

// Cached knowledge (to avoid fetching every time)
let cachedKnowledge: string | null = null;
let lastFetch = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function getKnowledge(): Promise<string> {
  const now = Date.now();
  if (cachedKnowledge && (now - lastFetch) < CACHE_TTL) {
    return cachedKnowledge;
  }
  cachedKnowledge = await loadKnowledge();
  lastFetch = now;
  return cachedKnowledge;
}

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

    // ✅ Load knowledge base (cached)
    const knowledge = await getKnowledge();

    // Fallback knowledge
    const fallbackKnowledge = `
VisaBits Consultants is a visa consultancy agency based in the UK.
Services: Schengen visas, Germany visas, France visas, Spain visas.
Contact: WhatsApp +44 7427 881393, Email info@visabitsconsultants.co.uk.
Location: London, United Kingdom.
`;

    const systemPrompt = `
You are VisaBits Consultants AI Assistant. You help people with visa questions.

IMPORTANT: ONLY use the following knowledge base to answer questions.
If the answer is not in the knowledge base, say:
"I don't have that information. Please contact our team directly:
WhatsApp: +44 7427 881393
Email: info@visabitsconsultants.co.uk"

KNOWLEDGE BASE:
${knowledge || fallbackKnowledge}

RULES:
1. Answer ONLY from the knowledge above.
2. Be friendly, professional, and helpful.
3. Keep answers short and conversational.
4. Never make up information.
5. If unsure, refer to the team.
`;

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
        model: 'openai/gpt-oss-20b:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();

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