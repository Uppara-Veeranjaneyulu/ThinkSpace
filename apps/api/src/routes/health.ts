import { Router, type IRouter } from 'express';
import type { Request, Response } from 'express';
import { prisma } from '../config/database.js';

export const healthRouter: IRouter = Router();

healthRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: 'ThinkSpace API is running',
      version: '0.1.0',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      services: {
        database: 'connected',
      },
    });
  } catch (_error) {
    res.status(503).json({
      success: false,
      message: 'ThinkSpace API is running but some services are unavailable',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected',
      },
    });
  }
});
