import { describe, expect, it, vi } from 'vitest';

// Ensure each test gets a fresh module instance
vi.resetModules();

describe('env schema', () => {
  it('parses required variables including API key', async () => {
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
    process.env.NEXTAUTH_SECRET = '12345678901234567890123456789012';
    process.env.NEXTAUTH_URL = 'http://localhost:3000';
    process.env.OPENAI_API_KEY = 'test-key';
    const { env } = await import('../env');
    expect(env.OPENAI_API_KEY).toBe('test-key');
  });
});
