import { chromium,test } from "@playwright/test";
 
 
test('Launch the Selectors hub test page',async()=>{
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.smartcat.com/");
    const links = await page.$$eval('a', links => links.map(link => 
            {
                return {
                    link: link.href,
                    text: link.textContent,
                    land: link.href.includes("land=") ? link.href.split("land=")?.[1].split('')?.[0] : false
                }
            }
        ).filter(item => !(!!item.land && typeof Number(item.land) === "number"))
    );
    const filtr = links.filter(item=>(item.link.startsWith("https://www.smartcat.com/" || "https://ea.smartcat.com" || "https://us.smartcat.com")));
    console.log(filtr);
    console.log(`There are ${links.length} links text on the page`);
    console.log(`There are ${filtr.length} links text on the page`);
});
