const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto('https://romero-for-colorado.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  console.log('fund popup open:', await page.locator('.pp-fund.pp-open').count());
  // close via the X like a user
  await page.locator('.pp-fund .pp-close').click();
  await page.waitForTimeout(500);
  console.log('fund closed:', (await page.locator('.pp-fund.pp-open').count()) === 0);
  // wheel-scroll like a user
  for (let i = 0; i < 60; i++) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(1500);
  console.log('scrollY:', await page.evaluate(() => window.scrollY), '/', await page.evaluate(() => document.documentElement.scrollHeight - innerHeight));
  console.log('scroll popup open:', await page.locator('.pp-scroll.pp-open').count());
  await page.screenshot({ path: '/tmp/user-test.png' });
  await browser.close();
})();
