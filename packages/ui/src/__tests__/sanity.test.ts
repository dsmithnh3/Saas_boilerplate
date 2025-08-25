import { describe, expect, it } from 'vitest';

// Basic sanity check to ensure Vitest runs in this package
// Ensures test suite passes even when no component tests exist

describe('sanity', () => {
  it('runs', () => {
    expect(true).toBe(true);
  });
});
