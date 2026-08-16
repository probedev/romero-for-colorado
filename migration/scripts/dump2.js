const { chromium } = require('playwright');
const [,, base, sel] = process.argv;
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.elementor-location-popup,.pp-modal{display:none!important}' });
  await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,20));} });
  await page.waitForTimeout(500);
  const tree = await page.evaluate((s) => {
    const root = document.querySelector(s);
    if (!root) return 'NOT FOUND';
    const out = [];
    const walk = (el, depth) => {
      if (depth > 5) return;
      const b = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      out.push(`${' '.repeat(depth*2)}${el.tagName.toLowerCase()}.${el.className.toString().slice(0,50)} h=${Math.round(b.height)} w=${Math.round(b.width)} lh=${cs.lineHeight} fs=${cs.fontSize} disp=${cs.display} mb=${cs.marginBottom}`);
      for (const c of el.children) walk(c, depth + 1);
    };
    walk(root, 0);
    return out.join('\n');
  }, sel);
  console.log(tree);
  await browser.close();
})();
