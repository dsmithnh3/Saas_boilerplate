import { prisma } from '@acme/db';
import { auth } from './auth';

/**
 * tRPC context. This object is available in all tRPC procedures and
 * contains the Prisma client and the currently authenticated user
 * (if any). It should be lightweight as it is created on every request.
 */
export async function createContext() {
  const session = await auth();
  return { prisma, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
