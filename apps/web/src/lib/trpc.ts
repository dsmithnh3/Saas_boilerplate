'use client';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/server/routers';

/**
 * Returns the base URL for the tRPC client based on the execution context.
 * In the browser the origin of the current window is used; on the server
 * (during SSR) we fallback to an environment variable. This helper
 * centralises URL construction and avoids duplication.
 */
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  // During server rendering you can set NEXTAUTH_URL or VERCEL_URL
  return process.env.NEXTAUTH_URL ?? 'http://localhost:3000';
};

/**
 * tRPC proxy client. The client exposes the router methods as a typed
 * interface that can be called from React components or server actions.
 */
export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
