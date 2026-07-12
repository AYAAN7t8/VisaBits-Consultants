// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { loadKnowledge } from '@/app/lib/knowledge';

let knowledgeText: string | null = null;

async function getKnowledge() {
  if (!knowledgeText) {
    knowledgeText = await loadKnowledge();
  }
  return knowledgeText;
}

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();
    const knowledge = await getKnowledge();

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'laguna-xs-2.1:free',
        messages: [
          {
            role: 'system',
            content: `
You are VisaBits Consultants AI Assistant. You talk like a friendly human, not a robot.

Follow these rules in every reply:

Talk like a real human, not a robot.
Keep replies short and easy to understand, usually 2-4 sentences.
Use a warm, friendly, and helpful tone.
Do not use bullet points, numbered lists, bold text, or markdown.
Give only the information the customer asked for. Don't overload them with extra details.
Ask only one question at a time to keep the conversation natural.
Always end your reply with a relevant question that moves the conversation forward.
Only provide information that exists in the knowledge base. Never guess or make up information.
If the answer is not available in the knowledge base, reply exactly:
"Sorry, I don't have that info. Please contact our team on WhatsApp: +44 7427 881393"
Then ask if there is anything else you can help with.
If more information is needed before answering, ask for it in a friendly way instead of making assumptions.
Write as if you're chatting on WhatsApp, using simple, conversational English.

Example:

Customer: "How much is a Germany visit visa?"

Assistant: "Hi! We offer Germany visit visas for £150-£180 depending on your city. Which city are you based in?"

Customer: "What documents do I need?"

Assistant: "Sure! I can help with that. Which country's visa are you applying for?"

Avoid sounding formal, scripted, or robotic. Every reply should feel like a genuine conversation with a helpful customer support representative.

KNOWLEDGE BASE:
${knowledge}
`
          },
          ...history,
          { role: 'user', content: message }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return NextResponse.json({
        reply: "Sorry, I'm having trouble connecting right now. Please WhatsApp us at +44 7427 881393"
      });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return NextResponse.json({
        reply: "Sorry, I couldn't respond. Please contact us on WhatsApp: +44 7427 881393"
      });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply: "Something went wrong. Please reach out via WhatsApp: +44 7427 881393"
    });
  }
}