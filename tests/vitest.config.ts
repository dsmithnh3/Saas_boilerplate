import { defineConfig } from 'vitest/config';

/**
 * Vitest configuration for all unit tests in the monorepo. Individual
 * packages can override this config by placing their own config files.
 */
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
