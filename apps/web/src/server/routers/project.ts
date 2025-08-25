import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { createProjectSchema } from '@acme/db/schemas';
import { TRPCError } from '@trpc/server';

/**
 * Router handling project management operations. The procedures defined here
 * wrap Prisma calls and enforce input validation via Zod schemas. Protected
 * procedures require an authenticated session.
 */
export const projectRouter = router({
  /**
   * List all projects visible to the current user. Soft‑deleted records are
   * filtered out by default.
   */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }),
  /**
   * Create a new project. Only authenticated users may perform this action.
   */
  create: protectedProcedure.input(createProjectSchema).mutation(async ({ ctx, input }) => {
    try {
      // Delegate creation to Prisma while propagating typed errors
      return await ctx.prisma.project.create({ data: input });
    } catch (error) {
      console.error('Failed to create project', error);
      // Normalize Prisma exceptions into tRPC errors for clients
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: error as Error,
      });
    }
  }),
  /**
   * Soft delete a project by setting the `deletedAt` timestamp. This keeps
   * historical data intact for audit purposes.
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Soft delete by timestamp to retain historical data
        return await ctx.prisma.project.update({
          where: { id: input.id },
          data: { deletedAt: new Date() },
        });
      } catch (error) {
        console.error('Failed to delete project', error);
        if (error instanceof Error && (error as { code?: string }).code === 'P2025') {
          // P2025 signals missing record; surface a 404
          throw new TRPCError({ code: 'NOT_FOUND', cause: error });
        }
        // Unknown failures surface as 500s
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          cause: error as Error,
        });
      }
    }),
  /**
   * Retrieve a single project by its ID. Returns `null` if not found.
   */
  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    return ctx.prisma.project.findUnique({
      where: { id: input.id },
      include: {
        equipment: true,
        documents: true,
        tasks: true,
        estimates: true,
      },
    });
  }),
});
