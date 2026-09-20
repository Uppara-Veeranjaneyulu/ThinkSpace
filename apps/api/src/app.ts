import 'dotenv/config';
import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import { env } from './config/env.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { router } from './routes/index.js';

const app: Express = express();

// ─── Security middleware ──────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Request processing ───────────────────────────────────
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ─── Logging ─────────────────────────────────────────────
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// ─── Rate limiting ────────────────────────────────────────
app.use('/api', rateLimiter);

// ─── Routes ──────────────────────────────────────────────
app.use('/api', router);

// ─── Error handling ───────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export { app };

// Start server only when not in test environment
if (env.NODE_ENV !== 'test') {
  app.listen(env.PORT, () => {
    console.info(`🚀 ThinkSpace API running on http://localhost:${env.PORT}`);
    console.info(`   Environment: ${env.NODE_ENV}`);
    console.info(`   Client URL: ${env.CLIENT_URL}`);
  });
}
