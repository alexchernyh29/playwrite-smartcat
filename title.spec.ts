import { test, chromium } from '@playwright/test'

test('Test title page', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.smartcat.com/");
    const title = await page.title();
    console.log(`Title ${title} на странице https://www.smartcat.com/`);
    await browser.close();
});
