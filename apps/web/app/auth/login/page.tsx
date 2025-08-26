'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@acme/ui';

/**
 * Authentication page. Users can sign in using OAuth providers such as
 * GitHub or Google. The page also reserves a section for passkey
 * authentication (WebAuthn) which would be implemented with the
 * appropriate JavaScript APIs and server actions. For simplicity only
 * the GitHub login button is wired up in this demo.
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
        <div className="space-y-4">
          {/* OAuth sign‑in button */}
          <Button className="w-full" onClick={() => signIn('github')}>
            Sign in with GitHub
          </Button>
          {/* Placeholder for passkey sign‑in. In a real implementation this would
              invoke the WebAuthn API and call a server action to verify
              credentials. */}
          <Button variant="secondary" className="w-full" disabled>
            Sign in with Passkey (coming soon)
          </Button>
        </div>
      </div>
    </div>
  );
}
