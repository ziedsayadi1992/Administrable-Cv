/**
 * Validate CV extraction request
 */
export const validateExtractRequest = (req, res, next) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Invalid or empty text provided',
      details: 'Text field is required and must be a non-empty string'
    });
  }

  if (text.length > 100000) {
    return res.status(400).json({ 
      error: 'Text too long',
      details: 'Maximum text length is 100,000 characters'
    });
  }

  next();
};

/**
 * ✅ IMPROVED: Validate translation request with detailed error messages
 */
export const validateTranslationRequest = (req, res, next) => {
  console.log('🔍 Validating translation request...');
  console.log('Request body keys:', Object.keys(req.body || {}));
  console.log('Target language:', req.body?.targetLang);
  console.log('Data type:', typeof req.body?.data);
  
  const { targetLang, data } = req.body;

  // Check targetLang
  if (!targetLang || typeof targetLang !== 'string') {
    console.error('❌ Validation failed: Invalid target language');
    return res.status(400).json({ 
      error: 'Invalid target language',
      details: 'targetLang field is required and must be a string',
      received: {
        targetLang: targetLang,
        type: typeof targetLang
      }
    });
  }

  // Check data object
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    console.error('❌ Validation failed: Invalid data object');
    return res.status(400).json({ 
      error: 'Invalid data',
      details: 'data field is required and must be an object (not array)',
      received: {
        hasData: !!data,
        type: typeof data,
        isArray: Array.isArray(data)
      }
    });
  }

  // Check valid language
  const validLanguages = ['English', 'Français', 'French', 'Spanish', 'German', 'Arabic', 'العربية', 'Chinese', 'Japanese', 'Deutsch', 'Español'];
  if (!validLanguages.includes(targetLang)) {
    console.error('❌ Validation failed: Unsupported language:', targetLang);
    return res.status(400).json({ 
      error: 'Unsupported language',
      details: `Supported languages: ${validLanguages.join(', ')}`,
      received: targetLang
    });
  }

  // ✅ Validate data structure (check required fields)
  if (!data.personalInfo || typeof data.personalInfo !== 'object') {
    console.error('❌ Validation failed: Missing or invalid personalInfo');
    return res.status(400).json({
      error: 'Invalid CV data structure',
      details: 'data.personalInfo is required and must be an object',
      received: {
        hasPersonalInfo: !!data.personalInfo,
        type: typeof data.personalInfo
      }
    });
  }

  if (!data.contact || typeof data.contact !== 'object') {
    console.error('❌ Validation failed: Missing or invalid contact');
    return res.status(400).json({
      error: 'Invalid CV data structure',
      details: 'data.contact is required and must be an object',
      received: {
        hasContact: !!data.contact,
        type: typeof data.contact
      }
    });
  }

  // ✅ Check for circular references
  try {
    JSON.stringify(data);
  } catch (error) {
    console.error('❌ Validation failed: Circular reference in data');
    return res.status(400).json({
      error: 'Invalid data structure',
      details: 'Data contains circular references and cannot be serialized',
      hint: 'This usually happens with improperly cloned objects'
    });
  }

  console.log('✅ Validation passed');
  next();
};