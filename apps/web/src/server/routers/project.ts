import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { createProjectSchema } from '@acme/db/schemas';

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
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.project.create({ data: input });
    }),
  /**
   * Soft delete a project by setting the `deletedAt` timestamp. This keeps
   * historical data intact for audit purposes.
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.project.update({
        where: { id: input.id },
        data: { deletedAt: new Date() },
      });
    }),
  /**
   * Retrieve a single project by its ID. Returns `null` if not found.
   */
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
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
