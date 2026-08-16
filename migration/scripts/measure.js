// Measure section offsets/heights on live vs rebuilt to localize layout
// deltas. Usage: node measure.js <page> <width>
const { chromium } = require('playwright');

const PAGE = process.argv[2] || 'home';
const WIDTH = parseInt(process.argv[3] || '1280', 10);

const MAPS = {
  home: {
    url: '/',
    sections: [
      ['banner', '.elementor-element-ce8d215', '.tb'],
      ['hdr-mobile', '.elementor-element-75e89a5', '.hh-mobile'],
      ['hdr-desktop', '.elementor-element-966e0f2', '.hh-desktop'],
      ['hero', '.elementor-element-567ea19', '.hero'],
      ['hero-inner', '.elementor-element-094c38f', '.hero-inner'],
      ['hero-h2', '.elementor-element-91cf673', '.hero-title-1'],
      ['hero-form', '.form-hd', '.form-hd'],
      ['mhero', '.elementor-element-4d37f2c', '.mhero'],
      ['vid', '.elementor-element-fd22e49', '.vid'],
      ['vid-card', '.elementor-element-46e61eb', '.vid-card'],
      ['meet', '.elementor-element-b914417', '.meet'],
      ['meet-card', '.elementor-element-1c1d02a', '.meet-card'],
      ['meet-title', '.elementor-element-2bcc5e0', '.meet-title'],
      ['meet-btns', '.elementor-element-9a64742', '.meet-buttons'],
      ['chip', '.elementor-element-84c4781', '.chip'],
      ['chip-grid', '.elementor-element-cefac18', '.chip-grid'],
      ['join', '.elementor-element-7bdc004', '.join'],
      ['join-photo', '.elementor-element-df5a2f1', '.join-photo'],
      ['join-content', '.elementor-element-f10b7f9', '.join-content'],
      ['ft-cta', '.elementor-element-df4901d', '.ft-cta'],
      ['ft', '.elementor-element-c94c371', '.ft'],
    ],
  },
  issues: {
    url: '/issues/',
    sections: [
      ['banner', '.elementor-element-332db3f', '.tb'],
      ['hero', '.elementor-element-9eff487', '.iss-hero'],
      ['hdr', '.elementor-element-b9666ff', '.ih'],
      ['hero-band', '.elementor-element-0c34a11', '.iss-hero-band'],
      ['hero-title', '.elementor-element-a6b33f2', '.iss-hero-title'],
      ['platform', '.elementor-element-32b1a01', '.iss-platform'],
      ['platform-band', '.elementor-element-c9873ff', '.iss-platform-band'],
      ['acc', '.elementor-element-41c507e', '.iss-acc'],
      ['acc-widget', '.elementor-element-80cf27c', '.iss-acc-card'],
      ['chip', '.elementor-element-f05ec70', '.chip'],
      ['join', '.elementor-element-2b2c505', '.join'],
      ['ft', '.elementor-element-c94c371', '.ft'],
    ],
  },
  'privacy-policy': {
    url: '/privacy-policy/',
    sections: [
      ['page', '.elementor-element-d014eb4', '.priv'],
      ['logo', '.elementor-element-49ec042', '.priv-logo'],
      ['inner', '.elementor-element-09b42d3', '.priv-inner'],
      ['title', '.elementor-element-51c88c2', '.priv-title'],
      ['text1', '.elementor-element-af84d83', '.priv-text'],
      ['divider', '.elementor-element-056ab9f', '.priv-divider'],
      ['return', '.elementor-element-eab7142', '.btn-return'],
      ['ft', '.elementor-element-c94c371', '.ft'],
    ],
  },
};

(async () => {
  const map = MAPS[PAGE];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: WIDTH, height: 900 }, deviceScaleFactor: 1 });

  async function measure(base, selIdx) {
    const page = await ctx.newPage();
    await page.goto(base + map.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.addStyleTag({
      content:
        '.elementor-location-popup,.elementor-popup-modal,.pp-modal{display:none!important}html,body{overflow:auto!important}',
    });
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const out = {};
    for (const [name, liveSel, rebuiltSel] of map.sections) {
      const sel = selIdx === 1 ? liveSel : rebuiltSel;
      const r = await page.evaluate((s) => {
        const el = document.querySelector(s);
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: Math.round(b.top + scrollY), h: Math.round(b.height), w: Math.round(b.width), x: Math.round(b.x) };
      }, sel);
      out[name] = r;
    }
    out.__total = await page.evaluate(() => document.body.scrollHeight);
    await page.close();
    return out;
  }

  const live = await measure('https://romeroforcolorado.com', 1);
  const rebuilt = await measure('http://localhost:8347', 2);

  console.log(`${PAGE} @ ${WIDTH}px — live vs rebuilt`);
  console.log('section'.padEnd(15), 'live top/h/w'.padEnd(24), 'rebuilt top/h/w'.padEnd(24), 'Δh');
  for (const [name] of map.sections) {
    const l = live[name];
    const r = rebuilt[name];
    const fmt = (o) => (o ? `${o.top}/${o.h}/${o.w}(x${o.x})` : 'MISSING');
    const dh = l && r ? r.h - l.h : '';
    console.log(name.padEnd(15), fmt(l).padEnd(24), fmt(r).padEnd(24), String(dh));
  }
  console.log('total'.padEnd(15), String(live.__total).padEnd(24), String(rebuilt.__total).padEnd(24), rebuilt.__total - live.__total);
  await browser.close();
})();
