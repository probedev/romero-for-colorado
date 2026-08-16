const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const width of [1280, 375]) {
    const page = await (await browser.newContext({ viewport: { width, height: 900 } })).newPage();
    await page.goto('https://romeroforcolorado.com/issues/', { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const out = {};
      for (const [n, sel] of [['home-btn', '.elementor-element-19ee4b1 .elementor-button'], ['donate', '.elementor-element-f08ac22 .jet-button__instance']]) {
        const el = document.querySelector(sel);
        if (!el) { out[n] = null; continue; }
        const b = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        out[n] = { h: Math.round(b.height), w: Math.round(b.width), lh: cs.lineHeight, fs: cs.fontSize, pad: cs.padding };
      }
      return out;
    });
    console.log(width, JSON.stringify(r));
    await page.close();
  }
  await browser.close();
})();
