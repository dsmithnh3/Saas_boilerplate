import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@acme/db';
import { env } from '@acme/config';

/**
 * NextAuth configuration. This file exports the handlers used by the
 * API routes as well as helper functions (`auth`, `signIn`, `signOut`)
 * consumed throughout the application. Providers can be added here to
 * support additional OAuth services; in this example we include GitHub
 * and leave room for passkey/WebAuthn providers.
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    // Minimal credentials provider to allow build-time initialization
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        // Return null to deny by default; real auth handled via OAuth
        return null;
      },
    }),
    // Only add GitHub provider if credentials are configured
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
    // Additional providers (e.g. WebAuthn passkeys, Google) can be added here.
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
