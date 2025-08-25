import { describe, expect, it, vi } from 'vitest';
import { projectRouter } from './project';
import type { Context } from '../context';

// Helper to build a caller with injected prisma stub and authenticated session
function createCaller(prismaMock: Pick<Context['prisma'], 'project'>) {
  return projectRouter.createCaller({
    prisma: prismaMock as unknown as Context['prisma'],
    session: { user: { id: 'user-1' } },
  });
}

describe('project router error handling', () => {
  it('maps prisma errors to INTERNAL_SERVER_ERROR on create', async () => {
    const error = Object.assign(new Error('fail'), { code: 'P2002' });
    const prismaMock = { project: { create: vi.fn().mockRejectedValue(error) } };
    const caller = createCaller(prismaMock);

    await expect(caller.create({ name: 'n', description: 'd' })).rejects.toMatchObject({
      code: 'INTERNAL_SERVER_ERROR',
    });
  });

  it('translates P2025 to NOT_FOUND on delete', async () => {
    const error = Object.assign(new Error('missing'), { code: 'P2025' });
    const prismaMock = { project: { update: vi.fn().mockRejectedValue(error) } };
    const caller = createCaller(prismaMock);

    await expect(caller.delete({ id: '123' })).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });
});
