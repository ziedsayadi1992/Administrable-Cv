import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache configuration
export const CACHE_DIR = path.join(__dirname, "..", "translation-cache");
export const CACHE_INDEX_FILE = path.join(CACHE_DIR, "index.json");

// Retry configuration for rate limiting
export const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 2000,      // Start with 2 seconds
  maxDelay: 30000,      // Max 30 seconds
  backoffMultiplier: 2   // Double each time
};

// Stream configuration
export const STREAM_TIMEOUT = 300000; // 5 minutes