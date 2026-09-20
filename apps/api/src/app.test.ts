import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './app.js';

describe('ThinkSpace API', () => {
  it('should respond to GET /api/health', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.services.database).toBe('connected');
  });

  it('should return 404 for unknown endpoints', async () => {
    const response = await request(app).get('/api/unknown-route-test');
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('should authenticate seeded test user via POST /api/auth/login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@thinkspace.app',
        password: 'User@12345',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('alice@thinkspace.app');
    expect(res.body.data.accessToken).toBeDefined();

    // Verify GET /api/auth/me with Bearer token
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${res.body.data.accessToken}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.success).toBe(true);
    expect(meRes.body.data.email).toBe('alice@thinkspace.app');
  });

  it('should reject login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'alice@thinkspace.app',
        password: 'WrongPassword123',
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should register a new user via POST /api/auth/register', async () => {
    const uniqueEmail = `testuser_${Date.now()}@thinkspace.app`;
    const uniqueUsername = `user_${Date.now().toString().slice(-8)}`;

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        displayName: 'Test User',
        username: uniqueUsername,
        email: uniqueEmail,
        password: 'Password@123',
        confirmPassword: 'Password@123',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.username).toBe(uniqueUsername);
    expect(res.body.data.accessToken).toBeDefined();
  });
});
