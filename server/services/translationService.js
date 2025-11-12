import { primaryModel } from '../config/gemini.js';

/**
 * Strip avatar from CV data before translation
 */
export function stripAvatarFromCV(cvData) {
  const stripped = JSON.parse(JSON.stringify(cvData)); // Deep clone
  if (stripped.personalInfo?.avatarUrl) {
    stripped.personalInfo.avatarUrl = ""; // Remove base64 image
  }
  return stripped;
}

/**
 * Restore avatar to translated CV data
 */
export function restoreAvatarToCV(translatedData, originalData) {
  if (originalData.personalInfo?.avatarUrl) {
    translatedData.personalInfo.avatarUrl = originalData.personalInfo.avatarUrl;
  }
  return translatedData;
}

/**
 * Smart split JSON into chunks for translation
 */
export function smartSplitChunks(jsonString, targetSize = 800) {
  const chunks = [];
  let currentChunk = '';
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString[i];
    
    if (escape) {
      currentChunk += char;
      escape = false;
      continue;
    }

    if (char === '\\') {
      escape = true;
      currentChunk += char;
      continue;
    }

    if (char === '"') {
      inString = !inString;
    }

    if (!inString) {
      if (char === '{' || char === '[') depth++;
      if (char === '}' || char === ']') depth--;
    }

    currentChunk += char;

    // Split at object/array boundaries when size threshold reached
    if (!inString && depth === 1 && (char === '}' || char === ']') && currentChunk.length >= targetSize) {
      chunks.push(currentChunk);
      currentChunk = '';
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk);
  }

  return chunks;
}

/**
 * Translate a single chunk
 */
export async function translateChunk(text, targetLang, model = primaryModel) {
  const prompt = `
You are a professional translator specializing in CV/Resume translations. Translate the following JSON fragment to ${targetLang}.

IMPORTANT RULES:
    1. This is CV (Curriculum Vitae) data. Use appropriate professional terminology.
    2. DO NOT translate:
      - JSON keys (personalInfo, fullName, jobTitle, etc.)
      - Field names
      - IDs
      - URLs
      - Email addresses
    3. DO translate:
      - All text content values
      - Job titles
      - Company descriptions
      - Skills
      - Mission descriptions
      - **ALL section titles in sectionTitles** - CRITICAL: These MUST be translated
    4. Preserve the EXACT JSON structure
    5. Return ONLY valid JSON - no markdown, no comments, no explanations
    6. Keep all arrays the same length
    7. Keep all special characters and formatting
    8. CRITICAL: sectionTitles must use professional ${targetLang} terms:
       - profile → Professional Profile / Profil Professionnel / etc.
       - skills → Skills / Compétences / etc.
       - technologies → Technical Environment / Environnements Techniques / etc.
       - experiences → Professional Experience / Expériences Professionnelles / etc.
       - certifications → Certifications / Certifications / etc.
       - languages → Languages / Langues / etc.

    JSON to translate:
    ${text}

    Return ONLY the translated JSON (no markdown blocks):`;

  const result = await model.generateContent(prompt);
  let translated = result.response.text();
  
  // Clean up the response
  translated = healJSON(translated);
  
  return translated;
}

/**
 * Heal JSON by removing markdown and fixing common issues
 */
export function healJSON(text) {
  let healed = text.trim();
  
  // Remove markdown code blocks
  healed = healed.replace(/```json\s*/g, '').replace(/```\s*/g, '');
  
  // Only remove trailing commas before closing brackets
  healed = healed.replace(/,(\s*[}\]])/g, '$1');
  
  // Add missing closing brackets if needed
  const openBraces = (healed.match(/{/g) || []).length;
  const closeBraces = (healed.match(/}/g) || []).length;
  const openBrackets = (healed.match(/\[/g) || []).length;
  const closeBrackets = (healed.match(/\]/g) || []).length;
  
  if (openBraces > closeBraces) {
    healed += '}'.repeat(openBraces - closeBraces);
  }
  if (openBrackets > closeBrackets) {
    healed += ']'.repeat(openBrackets - closeBrackets);
  }
  
  return healed;
}