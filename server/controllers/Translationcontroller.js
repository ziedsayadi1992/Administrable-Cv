import { 
  generateCacheKey, 
  getCachedTranslation, 
  saveCachedTranslation,
  loadCacheIndex 
} from '../services/cacheService.js';
import { 
  translateChunk, 
  smartSplitChunks, 
  stripAvatarFromCV, 
  restoreAvatarToCV, 
  healJSON 
} from '../services/translationService.js';
import { CACHE_DIR } from '../config/constants.js';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Stream translate CV data
 */
export const translateStream = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  
  try {
    const { targetLang, data } = req.body;
    
    if (!targetLang || !data) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: "Missing parameters" })}\n\n`);
      res.end();
      return;
    }
    
    // Strip avatar before translation
    const avatarUrl = data.personalInfo?.avatarUrl || "";
    const dataToTranslate = stripAvatarFromCV(data);
    
    // Check cache first
    const cacheKey = generateCacheKey(dataToTranslate, targetLang);
    const cached = await getCachedTranslation(cacheKey);
    
    if (cached) {
      // Restore avatar to cached result
      const withAvatar = restoreAvatarToCV(cached, data);
      res.write(`event: start\ndata: ${JSON.stringify({ chunks: 1, cached: true })}\n\n`);
      res.write(`event: chunk\ndata: ${JSON.stringify({ 
        index: 0, 
        text: JSON.stringify(withAvatar), 
        progress: 100 
      })}\n\n`);
      res.write(`event: done\ndata: ${JSON.stringify({ cached: true })}\n\n`);
      res.end();
      return;
    }
    
    // Translate the stripped data
    const jsonStr = JSON.stringify(dataToTranslate);
    const chunks = smartSplitChunks(jsonStr, 800);
    
    console.log(`📦 Translating ${chunks.length} chunks to ${targetLang}`);
    
    res.write(`event: start\ndata: ${JSON.stringify({ 
      chunks: chunks.length, 
      cached: false 
    })}\n\n`);
    
    const translatedChunks = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const translated = await translateChunk(chunk, targetLang);
      translatedChunks.push(translated);
      
      const progress = Math.round(((i + 1) / chunks.length) * 100);
      
      res.write(`event: chunk\ndata: ${JSON.stringify({
        index: i,
        text: translated,
        progress: progress
      })}\n\n`);
      
      console.log(`✅ Chunk ${i + 1}/${chunks.length} translated (${progress}%)`);
    }
    
    // Combine and heal JSON
    const combined = translatedChunks.join('');
    const healed = healJSON(combined);
    const finalData = JSON.parse(healed);
    
    // Restore avatar
    const withAvatar = restoreAvatarToCV(finalData, data);
    
    // Cache the result (without avatar)
    await saveCachedTranslation(cacheKey, finalData, targetLang);
    
    // Send final complete data
    res.write(`event: chunk\ndata: ${JSON.stringify({
      index: chunks.length,
      text: JSON.stringify(withAvatar),
      progress: 100
    })}\n\n`);
    
    res.write(`event: done\ndata: ${JSON.stringify({ cached: false })}\n\n`);
    res.end();
    
  } catch (error) {
    console.error('Translation stream error:', error);
    res.write(`event: error\ndata: ${JSON.stringify({ 
      error: error.message 
    })}\n\n`);
    res.end();
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async (req, res, next) => {
  try {
    const cacheIndex = await loadCacheIndex();
    const stats = {
      totalTranslations: Object.keys(cacheIndex).length,
      languages: {},
      cacheSize: 0
    };
    
    for (const key in cacheIndex) {
      const lang = cacheIndex[key].language;
      stats.languages[lang] = (stats.languages[lang] || 0) + 1;
    }
    
    const files = await fs.readdir(CACHE_DIR);
    for (const file of files) {
      const stat = await fs.stat(path.join(CACHE_DIR, file));
      stats.cacheSize += stat.size;
    }
    
    res.json(stats);
  } catch (error) {
    next(error);
  }
};