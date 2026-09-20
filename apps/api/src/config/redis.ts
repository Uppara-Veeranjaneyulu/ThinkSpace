import Redis from 'ioredis';
import { env } from './env.js';

declare global {
  // eslint-disable-next-line no-var
  var __redis: Redis | undefined;
}

function createRedisClient(): Redis {
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  });

  client.on('connect', () => {
    console.info('✅ Redis connected');
  });

  client.on('error', (error) => {
    console.error('❌ Redis error:', error);
  });

  return client;
}

export const redis = global.__redis ?? createRedisClient();

if (process.env.NODE_ENV !== 'production') {
  global.__redis = redis;
}
