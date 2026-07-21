#!/usr/bin/env node
/**
 * Build script: reads knowledge files from public/knowledge and injects into netlify/functions/chat.ts
 * Run with: node scripts/build-knowledge.js
 */

const fs = require('fs');
const path = require('path');

const knowledgeDir = path.join(process.cwd(), 'public', 'knowledge');
const chatFunctionPath = path.join(process.cwd(), 'netlify', 'functions', 'chat.ts');

function loadKnowledgeFiles() {
  if (!fs.existsSync(knowledgeDir)) {
    console.error('❌ Knowledge directory not found:', knowledgeDir);
    process.exit(1);
  }

  const files = fs.readdirSync(knowledgeDir);
  const txtFiles = files.filter(f => f.endsWith('.txt'));

  if (txtFiles.length === 0) {
    console.error('❌ No .txt files found in knowledge directory');
    process.exit(1);
  }

  let fullText = '';
  for (const file of txtFiles) {
    const filePath = path.join(knowledgeDir, file);
    const text = fs.readFileSync(filePath, 'utf8');
    const name = file.replace('.txt', '');
    fullText += `\n\n--- ${name} ---\n${text}`;
    console.log(`✅ Loaded: ${file} (${text.length} chars)`);
  }

  console.log(`📚 Total knowledge: ${fullText.length} characters`);
  return fullText.trim();
}

function updateChatFunction(knowledgeText) {
  if (!fs.existsSync(chatFunctionPath)) {
    console.error('❌ Chat function not found:', chatFunctionPath);
    process.exit(1);
  }

  let content = fs.readFileSync(chatFunctionPath, 'utf8');

  // Find the KNOWLEDGE constant and replace its content
  const knowledgeStart = content.indexOf('const KNOWLEDGE = `');
  if (knowledgeStart === -1) {
    console.error('❌ Could not find KNOWLEDGE constant in chat.ts');
    process.exit(1);
  }

  const backtickStart = content.indexOf('`', knowledgeStart + 19);
  const backtickEnd = content.indexOf('`;\n', backtickStart + 1);
  if (backtickEnd === -1) {
    console.error('❌ Could not find end of KNOWLEDGE constant');
    process.exit(1);
  }

  const newContent =
    content.slice(0, backtickStart + 1) +
    knowledgeText +
    content.slice(backtickEnd);

  fs.writeFileSync(chatFunctionPath, newContent);
  console.log('✅ Updated netlify/functions/chat.ts with fresh knowledge');
}

// Main
console.log('🔨 Building knowledge base for Netlify function...\n');
const knowledge = loadKnowledgeFiles();
updateChatFunction(knowledge);
console.log('\n✅ Build complete!');