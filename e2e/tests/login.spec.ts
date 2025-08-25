import { test, expect } from '@playwright/test';

test.describe('Authentication flow', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/sign in/i);
  });
});
