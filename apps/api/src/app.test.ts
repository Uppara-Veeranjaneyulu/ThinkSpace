import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './app.js';

describe('ThinkSpace API', () => {
  it('should respond to GET /api/health', async () => {
    const response = await request(app).get('/api/health');
    expect([200, 503]).toContain(response.status);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('services');
  });

  it('should return 404 for unknown endpoints', async () => {
    const response = await request(app).get('/api/unknown-route-test');
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
