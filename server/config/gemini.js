import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

// Initialize Gemini
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Models
export const primaryModel = genAI.getGenerativeModel({ 
  model: "models/gemini-2.5-flash" 
});

export const fallbackModel = genAI.getGenerativeModel({ 
  model: "models/gemini-2.5-flash" 
});

console.log('✅ Gemini AI initialized');