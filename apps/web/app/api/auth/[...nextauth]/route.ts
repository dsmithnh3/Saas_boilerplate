import NextAuth from 'next-auth/next';
import { authOptions } from '@/server/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
