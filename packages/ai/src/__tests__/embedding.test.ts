import { describe, expect, it, vi } from 'vitest';

// Mock configuration module to supply API key without loading real env parser.
vi.mock('@acme/config', () => ({ env: { OPENAI_API_KEY: 'test-key' } }));

// Mock database layer to avoid Prisma initialization during tests.
vi.mock('@acme/db', () => ({ execute: vi.fn() }));

// Mock OpenAI client to avoid network calls.
vi.mock('openai', () => ({
  default: vi.fn().mockImplementation(() => ({
    embeddings: {
      create: () => Promise.resolve({ data: [{ embedding: [1, 2, 3] }] }),
    },
  })),
}));

import { generateEmbedding } from '../embedding';

describe('generateEmbedding', () => {
  it('returns an embedding vector', async () => {
    const vec = await generateEmbedding('hello');
    expect(vec).toEqual([1, 2, 3]);
  });
});
