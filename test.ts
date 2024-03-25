import { chromium, test, expect } from "@playwright/test";
 
test('Test pages',async()=>{
    let result = false;
    const urls = [{path:process.env?.TEST_URL + '/',title:"Translation & Localization Platform Powered by AI",noindex:false},{path:process.env?.TEST_URL + '/',title:"Translation & Localization Platform Powered by AI",noindex:false},{path:process.env?.TEST_URL + '/',title:"Translation & Localization Platform Powered by AI",noindex:false}];
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    for(const key in urls) {
        const title = urls[key]?.title;
        const path = urls[key]?.path;
        const noindexs = urls[key]?.noindex;
        await testTitle(path,title,browser,context,page);
        await testLinks(path,browser,context,page);
        if(noindexs === true){
            await testNoIndex(path,noindexs);
            await testCanonical(path);
        }
        
    }
    await browser.close();
    test.fail(result === true);

    async function testTitle(path,title,browser,context,page) {
        try {
            await page.goto(path);
            const title = await page.title();
            // console.log(`Title ${title} на странице ${path}`);
        } catch (error) {
            console.log(`Необнаружен Title на странице ${path}`);
            result = true;
        }
    }

    async function testLinks(path,browser,context,page) {
        try {
            await page.goto(path);
            const links = await page.$$eval('a', links => links.map(link => 
                    {
                        return{
                            link:link.href,
                            text:link.textContent,
                            land: link.href.includes("land=") ? link.href.split("land=")?.[1].split('')?.[0] : false
                        }
                    }
                ).filter(item => !(!!item.land && typeof Number(item.land) === "number"))
            );
            // console.log(`Общее количество ссылок ${links.length} на странице ${path}`);
            const filtr = links.filter(item=>(item.link.startsWith("https://www.smartcat.com/" || "https://ea.smartcat.com" || "https://us.smartcat.com")));
            // console.log(`Количество ссылок ${filtr.length} без land=, удовлетворяющих условие`);
            if (filtr.length > 1){
                result = true;
                console.log(`Количество ссылок ${filtr.length} без land=`)
                filtr.forEach(element => {
                    console.log(element)
                });
            }
        } catch (error) {
            console.log(`Проблема с Links на странице ${path}`)
            result = true;
        }
    }

    async function testNoIndex(path,noindexs) {
        try {
            await page.goto(path);
            const element = page.locator('meta[content="noindex"]')
            await expect(element).toHaveAttribute('content', 'noindex')
            // console.log(`Присутствие тега noindex ${true}`);
        } catch (error) {
            console.log(`Присутствие тега noindex ${false} на странице ${path}`)
            result = true;
        }
    }  

    async function testCanonical(path,noindexs) {
        try {
            await page.goto(path);
            const canonical = page.locator('link[rel="canonical"]')
            await expect(canonical).toHaveAttribute('rel', 'canonical')
            // console.log(`Присутствие тега canonical ${true}`);
            try {
                const noindex = page.locator('meta[content="noindex"]')
                await expect(noindexs).toHaveAttribute('content', 'noindex')
                // console.log(`Присутствие тега noindex ${true}`);
            } catch (error) {
                console.log(`Присутствие тега noindex ${false}`);
            }

            let hrefLink = await canonical.getAttribute('href');

            if(path = hrefLink){
                // console.log(`${hrefLink} сответствует Url page ${path}`);
            } else {
                console.log(`${hrefLink} НЕ сответствует Url page ${path}`);
            }
        } catch (error) {
            console.log(`Присутствие тега canonical ${false}`);
            result = true;
        }
    }  
});
