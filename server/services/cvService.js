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
 * ✅ FIXED: Schema now matches frontend expectations with IDs
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
8. **Generate IDs**: Every item MUST have a unique ID field (use format: "skill-1", "tech-1", "exp-1", etc.)
9. **Contact Fields**: Populate the contact.fields array with structured contact information
10. **Output Format**: Return ONLY valid JSON

**JSON Schema (✅ UPDATED TO MATCH FRONTEND):**
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
    "github": "string or null",
    "linkedin": "string or null",
    "fields": [
      {
        "id": "contact-1",
        "type": "email",
        "label": "Email",
        "value": "user@example.com"
      },
      {
        "id": "contact-2",
        "type": "phone",
        "label": "Phone",
        "value": "+1234567890"
      }
    ]
  },
  "skills": [
    {
      "id": "skill-1",
      "value": "Skill description"
    }
  ],
  "technologies": [
    {
      "id": "tech-1",
      "title": "Category Name",
      "items": "comma-separated list of technologies"
    }
  ],
  "experiences": [
    {
      "id": "exp-1",
      "jobTitle": "string",
      "company": "string",
      "missions": ["mission 1", "mission 2"]
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "Certification name",
      "issuer": "Issuing organization"
    }
  ],
  "languages": [
    {
      "id": "lang-1",
      "name": "Language name",
      "level": "Proficiency level"
    }
  ],
  "sectionTitles": {
    "profile": "Professional Profile (or translated equivalent)",
    "skills": "Skills (or translated equivalent)",
    "technologies": "Technical Environment (or translated equivalent)",
    "experiences": "Professional Experience (or translated equivalent)",
    "certifications": "Certifications (or translated equivalent)",
    "languages": "Languages (or translated equivalent)"
  },
  "sectionOrder": ["personal", "profile", "skills", "technologies", "experiences", "certifications", "languages"],
  "customSections": []
}

**IMPORTANT NOTES:**
- EVERY array item MUST have an "id" field with a unique identifier
- contact.fields should contain all contact information as structured objects
- ALL sectionTitles must have non-null, non-empty values in the detected language
- Return ONLY the JSON object with no additional text

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
    
    // ✅ Ensure all items have IDs (fallback)
    if (jsonData.skills) {
      jsonData.skills = jsonData.skills.map((skill, idx) => {
        if (typeof skill === 'string') {
          return { id: `skill-${idx + 1}`, value: skill };
        }
        return skill.id ? skill : { ...skill, id: `skill-${idx + 1}` };
      });
    }
    
    if (jsonData.certifications) {
      jsonData.certifications = jsonData.certifications.map((cert, idx) => {
        return cert.id ? cert : { ...cert, id: `cert-${idx + 1}` };
      });
    }
    
    if (jsonData.languages) {
      jsonData.languages = jsonData.languages.map((lang, idx) => {
        return lang.id ? lang : { ...lang, id: `lang-${idx + 1}` };
      });
    }
    
    // ✅ Ensure contact.fields exists
    if (jsonData.contact && !jsonData.contact.fields) {
      jsonData.contact.fields = [];
      let fieldId = 1;
      
      if (jsonData.contact.email) {
        jsonData.contact.fields.push({
          id: `contact-${fieldId++}`,
          type: 'email',
          label: 'Email',
          value: jsonData.contact.email
        });
      }
      
      if (jsonData.contact.phone) {
        jsonData.contact.fields.push({
          id: `contact-${fieldId++}`,
          type: 'phone',
          label: 'Phone',
          value: jsonData.contact.phone
        });
      }
      
      if (jsonData.contact.location) {
        jsonData.contact.fields.push({
          id: `contact-${fieldId++}`,
          type: 'location',
          label: 'Location',
          value: jsonData.contact.location
        });
      }
      
      if (jsonData.contact.github) {
        jsonData.contact.fields.push({
          id: `contact-${fieldId++}`,
          type: 'github',
          label: 'GitHub',
          value: jsonData.contact.github
        });
      }
      
      if (jsonData.contact.linkedin) {
        jsonData.contact.fields.push({
          id: `contact-${fieldId++}`,
          type: 'linkedin',
          label: 'LinkedIn',
          value: jsonData.contact.linkedin
        });
      }
    }
    
    // Apply fallback titles if any are missing
    jsonData = ensureSectionTitles(jsonData);
    
    console.log("✅ CV extraction successful with proper structure!");
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