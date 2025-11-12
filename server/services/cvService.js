import { primaryModel } from '../config/gemini.js';
import { RETRY_CONFIG } from '../config/constants.js';
import { ensureSectionTitles } from '../utils/cvUtils.js';
import { sleep } from '../utils/helpers.js';

/**
 * Check if error is a rate limit error
 */
export function isRateLimitError(error) {
  const errorMessage = error.message || error.toString();
  return errorMessage.includes('429') || 
         errorMessage.includes('Too Many Requests') || 
         errorMessage.includes('Resource exhausted') ||
         errorMessage.includes('quota');
}

/**
 * Calculate exponential backoff delay
 */
function getBackoffDelay(retryCount) {
  const delay = Math.min(
    RETRY_CONFIG.baseDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, retryCount),
    RETRY_CONFIG.maxDelay
  );
  // Add jitter (random 0-25% variation) to prevent thundering herd
  const jitter = delay * 0.25 * Math.random();
  return Math.floor(delay + jitter);
}

/**
 * Extract CV data from text using AI
 */
export async function extractCVData(text, retryCount = 0) {
  const prompt = `
You are a professional CV parser. Your task is to intelligently read the following raw CV text, **infer its sectional structure (headings, lists, paragraphs)**, and then accurately map and extract all relevant information into a valid JSON object matching the **EXACT** provided schema.

**CRITICAL INSTRUCTIONS:**
1. This is CV (Curriculum Vitae) data. Use appropriate professional terminology.
2. Carefully read and understand the CV structure (sections, subsections, list items)
3. Extract ALL information accurately - names, dates, descriptions, skills, etc.
4. Infer missing section titles if not explicitly stated
5. **Language Detection**: Automatically detect the CV's primary language and use appropriate section titles:
   - If CV is in English → use English titles (Skills, Technical Environment, Professional Experience, etc.)
   - If CV is in French → use French titles (Compétences, Environnements Techniques, Expériences Professionnelles, etc.)
   - If CV is in Arabic → use Arabic titles (المهارات, البيئات التقنية, الخبرات المهنية, etc.)
6. **ALL Section Titles are REQUIRED**: Every field in sectionTitles MUST have a value - NEVER use null or empty strings
7. **String Formatting**: Keep each string on a SINGLE LINE
8. **Output Format**: Return ONLY valid JSON

**JSON Schema:**
{
  "personalInfo": {
    "fullName": "string",
    "professionalTitle": "string",
    "avatarUrl": ""
  },
  "profile": "string",
  "contact": {
    "email": "string",
    "phone": "string",
    "location": "string",
    "github": "string",
    "linkedin": "string"
  },
  "skills": ["string"],
  "technologies": [
    {
      "id": "tech-X",
      "title": "Category Name",
      "items": "comma-separated list"
    }
  ],
  "experiences": [
    {
      "id": "exp-X",
      "jobTitle": "string",
      "company": "string",
      "missions": ["string"]
    }
  ],
  "certifications": [
    {
      "id": "cert-X",
      "title": "string",
      "date": "string"
    }
  ],
  "languages": [
    {
      "id": "lang-X",
      "name": "string",
      "level": "string"
    }
  ],
  "sectionTitles": {
    "profile": "Professional Profile or Profil Professionnel etc.",
    "skills": "Skills or Compétences etc.",
    "technologies": "Technical Environment or Environnements Techniques etc.",
    "experiences": "Professional Experience or Expériences Professionnelles etc.",
    "certifications": "Certifications",
    "languages": "Languages or Langues etc."
  },
  "sectionOrder": ["personal", "profile", "skills", "technologies", "experiences", "certifications", "languages"],
  "customSections": []
}

CV TEXT to parse:
${text}

Return ONLY the JSON object:
`;

  try {
    console.log(`📄 Attempting CV extraction (attempt ${retryCount + 1}/${RETRY_CONFIG.maxRetries + 1})`);
    
    const result = await primaryModel.generateContent(prompt);
    let rawText = result.response.text().trim();
    
    console.log("✅ Raw response received, length:", rawText.length);

    // Remove markdown code blocks
    rawText = rawText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Parse JSON
    let jsonData = JSON.parse(rawText);
    
    // Apply fallback titles if any are missing
    jsonData = ensureSectionTitles(jsonData);
    
    console.log("✅ CV extraction successful!");
    return jsonData;
    
  } catch (error) {
    console.error(`❌ Extraction error (attempt ${retryCount + 1}):`, error.message);
    
    // Retry on rate limit errors
    if (isRateLimitError(error) && retryCount < RETRY_CONFIG.maxRetries) {
      const delay = getBackoffDelay(retryCount);
      console.log(`⏳ Rate limit hit. Retrying in ${delay}ms...`);
      await sleep(delay);
      return extractCVData(text, retryCount + 1);
    }
    
    // If all retries failed, throw error
    throw new Error(`CV extraction failed: ${error.message}`);
  }
}