import { promises as fs } from 'fs';
import path from 'path';
import { CACHE_DIR, CACHE_INDEX_FILE } from '../config/constants.js';

/**
 * Initialize cache directory
 */
export async function initCacheDir() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    console.log("✅ Translation cache directory initialized");
    console.log(`📁 Cache directory: ${CACHE_DIR}`);
  } catch (err) {
    console.error("❌ Failed to create cache directory:", err);
  }
}

/**
 * Load cache index
 */
export async function loadCacheIndex() {
  try {
    const data = await fs.readFile(CACHE_INDEX_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

/**
 * Save cache index
 */
export async function saveCacheIndex(index) {
  try {
    await fs.writeFile(CACHE_INDEX_FILE, JSON.stringify(index, null, 2));
  } catch (err) {
    console.error("❌ Failed to save cache index:", err);
  }
}

/**
 * Generate cache key from CV data
 */
export function generateCacheKey(data, targetLang) {
  const content = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `${targetLang}:${hash}`;
}

/**
 * Get cached translation
 */
export async function getCachedTranslation(cacheKey) {
  try {
    const cacheIndex = await loadCacheIndex();
    const cacheEntry = cacheIndex[cacheKey];
    
    if (!cacheEntry) {
      return null;
    }
    
    const cacheFile = path.join(CACHE_DIR, `${cacheEntry.filename}.json`);
    const data = await fs.readFile(cacheFile, "utf-8");
    
    console.log(`💾 Cache hit for ${cacheKey}`);
    return JSON.parse(data);
  } catch (error) {
    console.log(`❌ Cache miss for ${cacheKey}`);
    return null;
  }
}

/**
 * Save cached translation
 */
export async function saveCachedTranslation(cacheKey, data, language) {
  try {
    const cacheIndex = await loadCacheIndex();
    const filename = `translation-${Date.now()}`;
    const cacheFile = path.join(CACHE_DIR, `${filename}.json`);
    
    await fs.writeFile(cacheFile, JSON.stringify(data, null, 2));
    
    cacheIndex[cacheKey] = {
      filename,
      language,
      timestamp: new Date().toISOString()
    };
    
    await saveCacheIndex(cacheIndex);
    console.log(`💾 Cached translation: ${cacheKey}`);
  } catch (error) {
    console.error("❌ Failed to cache translation:", error);
  }
}

export { CACHE_DIR };