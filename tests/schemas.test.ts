import { describe, expect, it } from 'vitest';
import { createProjectSchema, createTaskSchema } from '@acme/db/schemas';

describe('Zod schemas', () => {
  it('validates a correct project payload', () => {
    const input = { name: 'Test Project', description: 'A sample project' };
    const result = createProjectSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects a project without a name', () => {
    const input = { description: 'Missing name' } as any;
    const result = createProjectSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('validates a correct task payload', () => {
    const input = { title: 'Do something', status: 'todo' };
    const result = createTaskSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
