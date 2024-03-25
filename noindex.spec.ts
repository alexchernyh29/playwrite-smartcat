import { test, expect } from '@playwright/test'
    
test('test noindex', async ({ page }) => {
  await page.goto('https://www.smartcat.com/lp/cat-tool/')
  try {
    const element = page.locator('meta[content="noindex"]')
    await expect(element).toHaveAttribute('content', 'noindex')
    console.log(`Присутствие тега noindex ${true}`);
  } catch (error) {
    console.log(`Присутствие тега noindex ${false}`)
  }
});
