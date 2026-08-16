// Dump popup internals with an external referrer so popups fire.
const { chromium } = require('playwright');
const [,, base, sel, width] = process.argv;
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: parseInt(width||'375'), height: 900 } })).newPage();
  await page.goto(base, { waitUntil: 'networkidle', referer: 'https://www.google.com/' });
  await page.waitForTimeout(1500);
  if (sel.includes('scroll') || sel.includes('7857')) {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.85));
    await page.waitForTimeout(2000);
  }
  const tree = await page.evaluate((s) => {
    const root = document.querySelector(s);
    if (!root) return 'NOT FOUND';
    const out = [];
    const walk = (el, depth) => {
      if (depth > 4) return;
      const b = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      out.push(`${' '.repeat(depth*2)}${el.tagName.toLowerCase()}.${el.className.toString().slice(0,44)} h=${Math.round(b.height)} w=${Math.round(b.width)} y=${Math.round(b.y)} x=${Math.round(b.x)} pt=${cs.paddingTop} pb=${cs.paddingBottom} gap=${cs.rowGap} fs=${cs.fontSize}`);
      for (const c of el.children) walk(c, depth + 1);
    };
    walk(root, 0);
    return out.join('\n');
  }, sel);
  console.log(tree);
  await browser.close();
})();
