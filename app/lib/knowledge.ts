// app/lib/knowledge.ts
import fs from 'fs';
import path from 'path';

const knowledgeDir = path.join(process.cwd(), 'public', 'knowledge');

export async function loadKnowledge(): Promise<string> {
  // Check if directory exists
  if (!fs.existsSync(knowledgeDir)) {
    console.warn('⚠️ Knowledge directory not found:', knowledgeDir);
    return '';
  }

  const files = fs.readdirSync(knowledgeDir);
  console.log(`📁 Found ${files.length} files in knowledge directory`);

  let fullText = '';

  for (const file of files) {
    // Only process .txt files
    if (!file.endsWith('.txt')) {
      console.log(`⏭️ Skipping non-txt file: ${file}`);
      continue;
    }

    const filePath = path.join(knowledgeDir, file);
    try {
      const text = fs.readFileSync(filePath, 'utf8');
      fullText += `\n\n--- ${file.replace('.txt', '')} ---\n${text}`;
      console.log(`✅ Loaded: ${file} (${text.length} characters)`);
    } catch (error) {
      console.error(`❌ Failed to read ${file}:`, error);
    }
  }

  console.log(`📚 Total knowledge text length: ${fullText.length} characters`);
  
  if (fullText.length === 0) {
    // Fallback: hardcoded knowledge if no files found
    return getFallbackKnowledge();
  }
  
  return fullText;
}

// Fallback hardcoded knowledge (in case files are missing)
function getFallbackKnowledge(): string {
  return `
=== VISABITS CONSULTANTS - KNOWLEDGE BASE ===

CONTACT:
WhatsApp: +44 7427 881393
Email: info@visabitsconsultants.co.uk
Location: London, United Kingdom

SERVICES:
Germany Visit Visa: £150-£180
France Visit Visa: £150-£180
Spain Visit Visa: £150-£180
Italy Visit Visa: £150-£180
USA Visit Visa: £250-£300
Canada Visit Visa: £250-£300
Australia Visit Visa: £250-£300

SCHENGEN COUNTRIES:
Germany, France, Spain, Italy, Netherlands, Portugal, Greece, Switzerland, Austria, Belgium, Croatia, Czech Republic, Denmark, Estonia, Finland, Hungary, Iceland, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Norway, Poland, Slovakia, Slovenia, Sweden.

SUCCESS RATE: 98%
APPROVED VISAS: 500+
`;
}