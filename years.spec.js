import { test } from '@playwright/test'
    
test('test years', async ({ page }) => {
  await page.goto('https://www.smartcat.com/blog/lsps-guide-to-building-a-niche/')
  const element = await page.$('.gh-article-date');
  const value = await element.getAttribute('datetime');
  const years = value.substring(0,5);
  const todayYears = '2023';
  const textToFind = ["2023",'2022','2021','2020','2019','2018','2017','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'];
  const pageText = await page.innerText('section.gh-content');
  const titleBlog = await page.innerText('h1.gh-article-title');
  try {
    textToFind.forEach(function(entry) {
      if (pageText.includes(entry)) {
        console.log(`Страница содержит текст "${entry}"`);
      }
      if (titleBlog.includes(entry)) {
        console.log(`Title содержит текст "${entry}"`);
      }
    });
  
    if(todayYears>years) {
      console.log(`Год не совпадает с текущим ${todayYears}`);
    } else {
      console.log(`Год совпадает с текущим ${todayYears}`);
    }
  } catch (error) {
    console.log(`Год не совпадает с текущим ${todayYears}`);
    console.log(`Title содержит текст "${entry}"`);
    console.log(`Страница содержит текст "${entry}"`);
  }
});
