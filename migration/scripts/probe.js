const { chromium } = require('playwright');
const PAIRS = [
  ['vid-icon', '.elementor-element-98bd121', '.vid-icon'],
  ['vid-title', '.elementor-element-d5537ac', '.vid-title'],
  ['meet-star', '.elementor-element-618ee0d', '.meet-star'],
  ['meet-kicker', '.elementor-element-471a462', '.meet-kicker'],
  ['meet-text', '.elementor-element-4523fc8', '.meet-text'],
  ['ft-logo', '.elementor-element-bcc810e', '.ft-logo'],
  ['ft-nav', '.elementor-element-268262f', '.ft-nav'],
  ['ft-social', '.elementor-element-9724c96', '.ft-social'],
  ['ft-contact', '.elementor-element-bd2b781', '.ft-contact'],
  ['ft-address', '.elementor-element-6b7c004', '.ft-address'],
  ['ft-links', '.elementor-element-3ab94bd', '.ft-links'],
  ['ft-paidfor', '.elementor-element-7a11596', '.ft-paidfor'],
  ['ft-legal', '.elementor-element-471334b', '.ft-legal'],
  ['ft-disclaimer', '.elementor-element-7c686bb', '.ft-disclaimer'],
  ['ft-apollo', '.elementor-element-fb27e76', '.ft-apollo'],
];
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  async function probe(base, idx) {
    const page = await ctx.newPage();
    await page.goto(base + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
    await page.addStyleTag({ content: '.elementor-location-popup,.elementor-popup-modal,.pp-modal{display:none!important}html,body{overflow:auto!important}' });
    await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,20));} scrollTo(0,0); });
    await page.waitForTimeout(600);
    const out = {};
    for (const [n, l, r] of PAIRS) {
      const sel = idx === 1 ? l : r;
      out[n] = await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { h: Math.round(b.height), w: Math.round(b.width) };
      }, sel);
    }
    await page.close();
    return out;
  }
  const live = await probe('https://romeroforcolorado.com', 1);
  const rebuilt = await probe('http://localhost:8347', 2);
  for (const [n] of PAIRS) {
    const f = (o) => (o ? `${o.h}h/${o.w}w` : 'MISSING');
    console.log(n.padEnd(14), f(live[n]).padEnd(14), f(rebuilt[n]).padEnd(14), live[n]&&rebuilt[n] ? rebuilt[n].h-live[n].h : '');
  }
  await browser.close();
})();
