import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for end‑to‑end tests. Tests will run against
 * whatever server is available at `E2E_BASE_URL`, defaulting to
 * `http://localhost:3000`. Additional projects (browsers, devices) can
 * easily be added to this configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
