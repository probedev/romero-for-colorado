const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto('https://romeroforcolorado.com/', { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.elementor-location-popup{display:none!important}' });
  await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,20));} });
  await page.waitForTimeout(500);
  const tree = await page.evaluate(() => {
    const root = document.querySelector('.elementor-element-c94c371');
    const out = [];
    const walk = (el, depth) => {
      if (depth > 4) return;
      const b = el.getBoundingClientRect();
      const cls = [...el.classList].filter(c => /elementor-element-|e-con|widget-|heading|icon-list|inner/.test(c)).slice(0,3).join(' ');
      const cs = getComputedStyle(el);
      out.push(`${' '.repeat(depth*2)}${el.tagName.toLowerCase()}.${cls} h=${Math.round(b.height)} w=${Math.round(b.width)} mt=${cs.marginTop} mb=${cs.marginBottom} pt=${cs.paddingTop} pb=${cs.paddingBottom} gap=${cs.rowGap} lh=${cs.lineHeight} fs=${cs.fontSize}`);
      for (const c of el.children) walk(c, depth + 1);
    };
    walk(root, 0);
    return out.join('\n');
  });
  console.log(tree);
  // also social icon internals
  const social = await page.evaluate(() => {
    const w = document.querySelector('.elementor-element-5ddf659');
    const out = [];
    let el = w;
    for (let i = 0; i < 4 && el; i++) {
      const b = el.getBoundingClientRect();
      out.push(`${el.tagName}.${el.className.toString().slice(0,60)} h=${Math.round(b.height)}`);
      el = el.firstElementChild;
    }
    return out.join('\n');
  });
  console.log('--- social widget ---\n' + social);
  await browser.close();
})();
