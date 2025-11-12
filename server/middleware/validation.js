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
 * Validate translation request
 */
export const validateTranslationRequest = (req, res, next) => {
  const { targetLang, data } = req.body;

  if (!targetLang || typeof targetLang !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid target language',
      details: 'targetLang field is required and must be a string'
    });
  }

  if (!data || typeof data !== 'object') {
    return res.status(400).json({ 
      error: 'Invalid data',
      details: 'data field is required and must be an object'
    });
  }

  const validLanguages = ['English', 'French', 'Spanish', 'German', 'Arabic', 'Chinese', 'Japanese'];
  if (!validLanguages.includes(targetLang)) {
    return res.status(400).json({ 
      error: 'Unsupported language',
      details: `Supported languages: ${validLanguages.join(', ')}`
    });
  }

  next();
};