import express from 'express';
import { 
  translateStream, 
  getCacheStats 
} from '../controllers/translationController.js';
import { validateTranslationRequest } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route   POST /api/translate-stream
 * @desc    Stream translate CV data
 * @access  Public
 */
router.post('/translate-stream', validateTranslationRequest, translateStream);

/**
 * @route   GET /api/cache-stats
 * @desc    Get translation cache statistics
 * @access  Public
 */
router.get('/cache-stats', getCacheStats);

export default router;