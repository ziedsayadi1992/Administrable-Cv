import express from 'express';
import { extractCV, checkRateLimitStatus } from '../controllers/Cvcontroller.js';
import { validateExtractRequest } from '../middleware/validation.js';

const router = express.Router();

/**
 * @route   POST /api/extract-cv
 * @desc    Extract CV data from text using AI
 * @access  Public
 */
router.post('/extract-cv', validateExtractRequest, extractCV);

/**
 * @route   GET /api/rate-limit-status
 * @desc    Check if API is rate limited
 * @access  Public
 */
router.get('/rate-limit-status', checkRateLimitStatus);

export default router;