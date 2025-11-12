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
 * ✅ FIXED: Translate a single chunk with proper handling of new CV structure
 */
export async function translateChunk(text, targetLang, model = primaryModel) {
  const prompt = `
You are a professional translator specializing in CV/Resume translations. Translate the following JSON fragment to ${targetLang}.

**IMPORTANT RULES:**
    1. This is CV (Curriculum Vitae) data. Use appropriate professional terminology.
    
    2. **DO NOT translate (keep original)**:
      - JSON keys (personalInfo, fullName, jobTitle, skills, etc.)
      - Field names ("id", "type", "label", "value", "name", "level", etc.)
      - ID values (skill-1, tech-2, exp-3, etc.)
      - URLs and email addresses
      - The "type" field values in contact.fields (email, phone, location, github, linkedin, website)
    
    3. **DO translate (all content values)**:
      - personalInfo.fullName
      - personalInfo.professionalTitle
      - profile text
      - contact.fields[].label (Email → Email/Courriel/البريد الإلكتروني)
      - contact.fields[].value (only if it's not email/URL)
      - skills[].value (the actual skill description)
      - technologies[].title (category names)
      - technologies[].items (technology names - translate if they're descriptive terms)
      - experiences[].jobTitle
      - experiences[].company
      - experiences[].missions[] (all mission descriptions)
      - certifications[].name
      - certifications[].issuer
      - languages[].name (language names)
      - languages[].level (proficiency levels)
      - **ALL section titles in sectionTitles** - CRITICAL: These MUST be translated professionally
    
    4. **Structure preservation**:
      - Preserve the EXACT JSON structure
      - Keep all arrays the same length
      - Keep all object keys unchanged
      - Keep all IDs unchanged
      - Keep all special characters and formatting
    
    5. **Professional terminology for ${targetLang}**:
      - sectionTitles.profile → Professional Profile / Profil Professionnel / الملف المهني / etc.
      - sectionTitles.skills → Skills / Compétences / المهارات / etc.
      - sectionTitles.technologies → Technical Environment / Environnement Technique / البيئة التقنية / etc.
      - sectionTitles.experiences → Professional Experience / Expérience Professionnelle / الخبرة المهنية / etc.
      - sectionTitles.certifications → Certifications / Certifications / الشهادات / etc.
      - sectionTitles.languages → Languages / Langues / اللغات / etc.
    
    6. **Output format**:
      - Return ONLY valid JSON
      - No markdown code blocks
      - No comments or explanations
      - No additional text

**Example structure you might receive:**
{
  "skills": [
    { "id": "skill-1", "value": "Project Management" }
  ],
  "contact": {
    "fields": [
      { "id": "contact-1", "type": "email", "label": "Email", "value": "user@example.com" }
    ]
  }
}

**JSON fragment to translate:**
${text}

**Return ONLY the translated JSON (no markdown blocks):**`;

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