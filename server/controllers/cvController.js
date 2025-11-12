import { extractCVData, isRateLimitError } from '../services/cvService.js';
import { genAI } from '../config/gemini.js';

/**
 * Extract CV data from text
 */
export const extractCV = async (req, res, next) => {
  const { text } = req.body;

  try {
    console.log('📥 Received CV extraction request, text length:', text.length);
    
    const cvData = await extractCVData(text);
    
    res.json(cvData);
  } catch (error) {
    console.error('Extract CV endpoint error:', error);
    
    // Handle rate limit errors specially
    if (isRateLimitError(error)) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please wait a few minutes before trying again.',
        retryAfter: 60,
        details: error.message
      });
    }
    
    next(error);
  }
};

/**
 * Check rate limit status
 */
export const checkRateLimitStatus = async (req, res, next) => {
  try {
    // Try a minimal API call
    const testModel = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" });
    await testModel.generateContent("Test");
    
    res.json({
      status: 'ok',
      message: 'API is responsive',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    if (isRateLimitError(error)) {
      return res.status(429).json({
        status: 'rate_limited',
        message: 'API is currently rate limited',
        suggestedWaitTime: 60,
        timestamp: new Date().toISOString()
      });
    }
    
    next(error);
  }
};