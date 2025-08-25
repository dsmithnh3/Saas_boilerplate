import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { semanticSearch } from '@acme/ai';

/**
 * Router exposing semantic document search based on vector similarity.
 */
export const searchRouter = router({
  /**
   * Perform a semantic search over stored document embeddings.
   */
  semantic: publicProcedure
    .input(
      z.object({
        query: z.string().min(1, 'query is required'),
        limit: z.number().int().min(1).max(20).optional(),
      }),
    )
    .query(async ({ input }) => {
      return semanticSearch(input.query, input.limit);
    }),
});
