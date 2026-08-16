const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1280, 768, 375]) {
    const page = await (await browser.newContext({ viewport: { width, height: 900 } })).newPage();
    await page.goto(process.argv[2] || 'https://romeroforcolorado.com/', { waitUntil: 'networkidle' });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const c = page.locator('.dialog-close-button:visible').first();
    if (await c.count()) await c.click().catch(()=>{});
    await page.waitForTimeout(300);
    const rm = page.locator('a[href*="popup%3Aopen"], [data-open-about]').first();
    await rm.scrollIntoViewIfNeeded().catch(()=>{});
    await rm.click().catch(()=>{});
    await page.waitForTimeout(1200);
    const SEL = process.argv[3] || '#elementor-popup-modal-6127 .elementor-element-cf9f47f';
    const r = await page.evaluate((SEL) => {
      const row = document.querySelector(SEL);
      if (!row) return null;
      const inner = row.querySelector('.e-con-inner') || row;
      const kids = [...inner.children].map(k => {
        const b = k.getBoundingClientRect();
        const img = k.querySelector('img');
        const ib = img ? img.getBoundingClientRect() : null;
        return `kid ${Math.round(b.width)}x${Math.round(b.height)} img ${ib?Math.round(ib.width)+'x'+Math.round(ib.height):'-'}`;
      });
      const rb = row.getBoundingClientRect();
      const cs = getComputedStyle(row);
      return { row: `${Math.round(rb.width)}x${Math.round(rb.height)} pad=${cs.padding} gap=${cs.gap}`, inner: `${Math.round(inner.getBoundingClientRect().width)}`, kids };
    }, SEL);
    console.log(width, JSON.stringify(r, null, 1));
    await page.close();
  }
  await browser.close();
})();
