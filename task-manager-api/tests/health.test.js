const request = require('supertest');
const app = require('../server');

describe('GET /health', () => {
  test('returns a healthy status without requiring MongoDB', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
