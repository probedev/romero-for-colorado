// Acceptance checks: link check, ActBlue URL parity, metadata parity,
// form payload parity. Writes migration/data/verify-report.md.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const LOCAL = process.argv[2] || 'http://localhost:8347';
const LIVE = 'https://romeroforcolorado.com';
const PAGES = ['/', '/issues/', '/privacy-policy/'];
const out = [];
const log = (s) => {
  out.push(s);
  console.log(s);
};

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  // ---------- 1. Link check + old-origin reference scan ----------
  log('## 1. Link check (rebuilt site)');
  let badLinks = 0;
  const checked = new Map();
  for (const p of PAGES) {
    const page = await ctx.newPage();
    const requests = [];
    page.on('request', (r) => requests.push(r.url()));
    await page.goto(LOCAL + p, { waitUntil: 'networkidle' });
    // all hrefs/srcs in the BODY (head canonical/og intentionally point at
    // the production domain; mailto addresses are plain email links)
    const refs = await page.evaluate(() => {
      const urls = new Set();
      for (const el of document.body.querySelectorAll('[href], [src]')) {
        const u = el.getAttribute('href') || el.getAttribute('src');
        if (u) urls.add(u);
      }
      return [...urls];
    });
    const oldOrigin = [...new Set([...requests, ...refs])].filter(
      (u) =>
        !u.startsWith('mailto:') &&
        (/wp-content|wp-includes|wp-json/.test(u) || /https?:\/\/(www\.)?romeroforcolorado\.com/.test(u))
    );
    if (oldOrigin.length) {
      log(`- ${p}: OLD-ORIGIN refs in DOM/network: ${oldOrigin.join(', ')}`);
      badLinks += oldOrigin.length;
    }
    // check internal links resolve
    for (const u of refs) {
      if (u.startsWith('mailto:') || u.startsWith('#') || u.startsWith('http') || u.startsWith('//')) continue;
      const full = LOCAL + (u.startsWith('/') ? u : '/' + u);
      if (checked.has(full)) continue;
      const res = await page.request.get(full, { maxRedirects: 0 }).catch(() => null);
      const status = res ? res.status() : 0;
      checked.set(full, status);
      if (status >= 400 || status === 0) {
        // /signup, /volunteer, social paths are vercel.json redirects (not
        // served by the plain static server) — note separately
        if (/^\/(signup|volunteer|facebook|twitter|instagram|youtube|bluesky|threads|tiktok)\/?$/.test(u)) {
          log(`- ${p}: ${u} → handled by vercel.json redirect (404 on bare static server, OK)`);
        } else {
          log(`- ${p}: BROKEN internal link ${u} (${status})`);
          badLinks++;
        }
      }
    }
    await page.close();
  }
  log(`Result: ${badLinks === 0 ? 'PASS — no broken links, no old-origin/wp-content references' : badLinks + ' problems found'}`);

  // Head-meta references to romeroforcolorado.com (expected: canonical/og)
  log('\nHead references to romeroforcolorado.com (expected — canonical domain):');
  for (const p of PAGES) {
    const page = await ctx.newPage();
    await page.goto(LOCAL + p, { waitUntil: 'domcontentloaded' });
    const metas = await page.evaluate(() =>
      [...document.querySelectorAll('head [href], head [content]')]
        .map((el) => el.getAttribute('href') || el.getAttribute('content'))
        .filter((v) => v && v.includes('romeroforcolorado.com'))
    );
    log(`- ${p}: ${metas.join(' | ')}`);
    await page.close();
  }

  // ---------- 2. ActBlue URL parity ----------
  log('\n## 2. ActBlue URL parity (document order, incl. popups)');
  const abRegex = /href="(https:\/\/secure\.actblue\.com[^"]*)"/g;
  for (const p of PAGES) {
    const [liveHtml, localHtml] = await Promise.all([
      fetch(LIVE + p).then((r) => r.text()),
      fetch(LOCAL + p).then((r) => r.text()),
    ]);
    const norm = (h) => [...h.matchAll(abRegex)].map((m) => m[1].replace(/&#038;|&amp;/g, '&'));
    const a = norm(liveHtml);
    const b = norm(localHtml);
    const sameSet = JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
    const sameSeq = JSON.stringify(a) === JSON.stringify(b);
    log(`- ${p}: live ${a.length} urls, rebuilt ${b.length} urls — set ${sameSet ? 'MATCH' : 'DIFFER'}, order ${sameSeq ? 'MATCH' : 'DIFFERS'}`);
    if (!sameSet) {
      const missing = a.filter((x) => !b.includes(x));
      const extra = b.filter((x) => !a.includes(x));
      if (missing.length) log(`    missing: ${[...new Set(missing)].join(', ')}`);
      if (extra.length) log(`    extra: ${[...new Set(extra)].join(', ')}`);
    }
    if (sameSet && !sameSeq) {
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if (a[i] !== b[i]) log(`    @${i}: live=${a[i]} rebuilt=${b[i]}`);
      }
    }
  }

  // ---------- 3. Metadata parity ----------
  log('\n## 3. Metadata parity (live vs rebuilt)');
  const KEYS = [
    ['title', null],
    ['meta[name=description]', 'content'],
    ['meta[name=robots]', 'content'],
    ['link[rel=canonical]', 'href'],
    ['meta[property="og:locale"]', 'content'],
    ['meta[property="og:type"]', 'content'],
    ['meta[property="og:title"]', 'content'],
    ['meta[property="og:description"]', 'content'],
    ['meta[property="og:url"]', 'content'],
    ['meta[property="og:site_name"]', 'content'],
    ['meta[property="article:modified_time"]', 'content'],
    ['meta[property="og:image"]', 'content'],
    ['meta[property="og:image:width"]', 'content'],
    ['meta[property="og:image:height"]', 'content'],
    ['meta[name="twitter:card"]', 'content'],
    ['meta[name="twitter:image"]', 'content'],
  ];
  for (const p of PAGES) {
    log(`\n### ${p}`);
    const grab = async (base) => {
      const page = await ctx.newPage();
      await page.goto(base + p, { waitUntil: 'domcontentloaded' });
      const vals = await page.evaluate((keys) => {
        const o = {};
        for (const [sel, attr] of keys) {
          const el = document.querySelector(sel === 'title' ? 'title' : `head ${sel}`);
          o[sel] = el ? (attr ? el.getAttribute(attr) : el.textContent) : null;
        }
        return o;
      }, KEYS);
      await page.close();
      return vals;
    };
    const [lv, rb] = [await grab(LIVE), await grab(LOCAL)];
    for (const [sel] of KEYS) {
      const a = lv[sel];
      const b = rb[sel];
      if (a === b) log(`- ✅ ${sel}: "${a}"`.slice(0, 160));
      else log(`- ⚠️ ${sel}:\n    live:    ${a}\n    rebuilt: ${b}`);
    }
  }

  // ---------- 4. Form payload parity ----------
  log('\n## 4. Form payload parity (submissions blocked, never sent)');
  const capture = async (base) => {
    const c = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const urls = [];
    await c.route('**/secure.numero.ai/**', (route) => {
      urls.push(route.request().method() + ' ' + route.request().url());
      route.abort();
    });
    const page = await c.newPage();
    const n = await (async () => {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: '.elementor-location-popup,.pp-modal{display:none!important}html,body{overflow:auto!important}' });
      return page.locator('form[name="signup"]').count();
    })();
    for (let i = 0; i < n; i++) {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: '.elementor-location-popup,.pp-modal{display:none!important}html,body{overflow:auto!important}' });
      const form = page.locator('form[name="signup"]').nth(i);
      if (!(await form.locator('input[type="email"]').isVisible())) {
        urls.push(`(form ${i} hidden at this viewport — skipped)`);
        continue;
      }
      await form.locator('input[type="email"]').fill('migration-test@example.com');
      await form.locator('input[name="zip"]').fill('80001');
      await form.locator('input[name="phone"]').fill('3035550100');
      // Enter-submit: same GET serialization (submit button has name=""),
      // immune to overlay/animation click interception
      await form.locator('input[name="phone"]').press('Enter').catch(() => {});
      await page.waitForTimeout(1200);
    }
    await c.close();
    return urls;
  };
  const [liveForms, localForms] = [await capture(LIVE), await capture(LOCAL)];
  log('live:');
  liveForms.forEach((u) => log(`  ${u}`));
  log('rebuilt:');
  localForms.forEach((u) => log(`  ${u}`));
  const real = (a) => a.filter((u) => u.startsWith('GET') || u.startsWith('POST'));
  const [lr, rr] = [real(liveForms), real(localForms)];
  const match =
    lr.length > 0 &&
    lr.length === rr.length &&
    lr.every((u, i) => u === rr[i]);
  log(`Result: ${match ? 'PASS — identical payload on every visible instance' : 'CHECK ABOVE'}`);

  await browser.close();
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'verify-report.md'), out.join('\n'));
})();
