import { primaryModel } from '../config/gemini.js';

/**
 * Test if AI model is working
 */
export const testModel = async (req, res, next) => {
  try {
    const result = await primaryModel.generateContent("Say 'OK' if you're working");
    res.json({ 
      status: "ok", 
      response: result.response.text() 
    });
  } catch (error) {
    next(error);
  }
};