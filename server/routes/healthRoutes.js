import express from 'express';
import { testModel } from '../controllers/healthController.js';

const router = express.Router();

/**
 * @route   GET /api/test-model
 * @desc    Test if AI model is working
 * @access  Public
 */
router.get('/test-model', testModel);

export default router;