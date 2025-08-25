import { PrismaClient } from '@prisma/client';
import pRetry, { AbortError } from 'p-retry';

/**
 * Singleton Prisma client.
 *
 * Prisma instantiates a new client by default which can lead to connection
 * storms in serverless environments. Exporting a single instance prevents
 * exhausting the database connection pool. In development the instance is
 * attached to the global scope to preserve hot reload semantics.
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Executes a Prisma operation with retry logic and optional abort support.
 *
 * @param fn The callback that receives the Prisma client and returns a promise.
 * @param abortSignal Optional AbortSignal to cancel the operation.
 * @returns The result of the provided callback.
 */
export async function execute<T>(
  fn: (client: PrismaClient) => Promise<T>,
  abortSignal?: AbortSignal,
): Promise<T> {
  return pRetry(
    async () => {
      if (abortSignal?.aborted) {
        // AbortError causes p-retry to stop retrying
        throw new AbortError('Operation aborted');
      }
      return fn(prisma);
    },
    {
      retries: 2,
      factor: 2,
    },
  );
}

export * from '@prisma/client';
