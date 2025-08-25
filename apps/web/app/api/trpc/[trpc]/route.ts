import { appRouter } from '@/server/routers';
import { createContext } from '@/server/context';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

/**
 * tRPC route handler. It maps all requests under `/api/trpc/*` to the
 * appropriate procedure in the `appRouter`. Both GET and POST methods
 * are supported; batching is automatically handled by the fetch adapter.
 */
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
