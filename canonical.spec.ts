import { test, expect } from '@playwright/test'

test('basic test canonical', async ({ page }) => {
    let path = 'https://www.smartcat.com';
    await page.goto('https://www.smartcat.com')
    
    
    try {
        const canonical = page.locator('link[rel="canonical"]')
        await expect(canonical).toHaveAttribute('rel', 'canonical')
        console.log(`Присутствие тега canonical ${true}`);
        try {
            const noindex = page.locator('meta[content="noindex"]')
            await expect(noindex).toHaveAttribute('content', 'noindex')
            console.log(`Присутствие тега noindex ${true}`);
        } catch (error) {
            console.log(`Присутствие тега noindex ${false}`);
        }

        let hrefLink = await canonical.getAttribute('href');

        if(path === hrefLink){
            console.log(`${hrefLink} сответствует Url page ${path}`);
        } else {
            console.log(`${hrefLink} НЕ сответствует Url page ${path}`);
        }
    } catch (error) {
        console.log(`Присутствие тега canonical ${false}`);
    }
});
