import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto(process.env?.TEST_URL + '/');
  await expect(page).toHaveTitle(/Smartcat/);
});
