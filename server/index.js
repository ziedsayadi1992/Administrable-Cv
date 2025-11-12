import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initCacheDir } from './services/cacheService.js';
import cvRoutes from './routes/cvroutes.js';
import translationRoutes from './routes/Translationroutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors({ 
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" 
}));
app.use(express.json({ limit: "50mb" }));
app.use(requestLogger);

// ============================================
// ROUTES
// ============================================
app.use('/api', healthRoutes);
app.use('/api', cvRoutes);
app.use('/api', translationRoutes);

// ============================================
// ERROR HANDLING
// ============================================
app.use(errorHandler);

// ============================================
// SERVER INITIALIZATION
// ============================================
initCacheDir().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================
process.on('SIGTERM', async () => {
  console.log('👋 SIGTERM received, cleaning up...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('👋 SIGINT received, cleaning up...');
  process.exit(0);
});

export default app;