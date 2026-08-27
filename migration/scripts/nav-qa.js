// Nav QA for the Events + Shop additions: link parity, external-tab
// attributes, breakpoint behaviour, and mobile-menu fit on short viewports.
const { chromium } = require('playwright');

const LOCAL = process.argv[2] || 'http://localhost:8347';
const EXPECTED = [
  ['Meet Dwayne', '/meet-dwayne/'],
  ['Issues', '/issues/'],
  ['Endorsements', '/endorsements/'],
  ['News', '/news/'],
  ['Volunteer', '/volunteer'],
  ['Events', 'https://www.mobilize.us/romeroforcolorado/'],
  ['Shop', 'https://romero-for-colorado.bonfire.com'],
];
let fails = 0;
const ok = (c, m) => {
  console.log(`${c ? '  PASS' : '  FAIL'}  ${m}`);
  if (!c) fails++;
};

// The fundraising popup auto-opens on load and covers the nav; dismiss it
// before driving any nav interaction.
const dismissPopups = async (page) => {
  for (let i = 0; i < 6; i++) {
    const open = await page.$('.pp-modal.pp-open');
    if (!open) return;
    const btn = await page.$('.pp-modal.pp-open .pp-close');
    if (btn) await btn.click({ force: true }).catch(() => {});
    else await page.keyboard.press('Escape');
    await page.waitForTimeout(450);
  }
};

(async () => {
  const browser = await chromium.launch();

  // ---------- 1. Desktop link row ----------
  console.log('## 1. Desktop nav row (1920)');
  let ctx = await browser.newContext({ viewport: { width: 1920, height: 1000 } });
  let page = await ctx.newPage();
  await page.goto(LOCAL + '/', { waitUntil: 'networkidle' });
  await dismissPopups(page);

  const links = await page.$$eval('.tn-links a', (els) =>
    els.map((e) => ({
      label: e.textContent.trim(),
      href: e.getAttribute('href'),
      target: e.getAttribute('target'),
      rel: e.getAttribute('rel'),
      visible: e.getBoundingClientRect().width > 0,
    }))
  );
  ok(links.length === EXPECTED.length, `${links.length} links rendered (expected ${EXPECTED.length})`);
  EXPECTED.forEach(([label, href], i) => {
    const l = links[i];
    ok(l && l.label === label && l.href === href, `link ${i + 1}: ${label} -> ${href}` + (l ? ` (got "${l.label}" -> ${l.href})` : ' (missing)'));
    if (l) ok(l.visible, `${label} is visible`);
  });
  for (const l of links.filter((x) => x.href.startsWith('http'))) {
    ok(l.target === '_blank', `${l.label} opens in new tab`);
    ok((l.rel || '').includes('noopener'), `${l.label} has rel=noopener`);
  }
  for (const l of links.filter((x) => !x.href.startsWith('http'))) {
    ok(!l.target, `${l.label} stays in-tab (no target)`);
  }

  // ---------- 2. No overlap with Donate at the breakpoint edge ----------
  console.log('\n## 2. Row fit across widths');
  for (const w of [1920, 1600, 1440, 1401, 1300, 1201]) {
    await page.setViewportSize({ width: w, height: 1000 });
    await page.waitForTimeout(120);
    const r = await page.evaluate(() => {
      const row = document.querySelector('.tn-links');
      const right = document.querySelector('.tn-right');
      if (!row || !right) return null;
      const a = row.getBoundingClientRect();
      const b = right.getBoundingClientRect();
      const rowVisible = getComputedStyle(row).display !== 'none';
      const social = document.querySelector('.tn-social');
      return {
        rowVisible,
        overlap: a.right > b.left + 0.5,
        gap: Math.round(b.left - a.right),
        socialShown: social ? getComputedStyle(social).display !== 'none' : false,
      };
    });
    ok(r && r.rowVisible, `${w}px: link row still shown`);
    ok(r && !r.overlap, `${w}px: no overlap with Donate (gap ${r ? r.gap : '?'}px)`);
    ok(r && (w > 1400 ? r.socialShown : !r.socialShown), `${w}px: socials ${w > 1400 ? 'shown' : 'hidden'}`);
  }

  // ---------- 3. Burger collapse ----------
  console.log('\n## 3. Burger collapse (<=1200)');
  for (const w of [1200, 1024, 768, 375]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(120);
    const r = await page.evaluate(() => {
      const row = document.querySelector('.tn-links');
      const burger = document.querySelector('.tn-burger');
      return {
        rowHidden: !row || getComputedStyle(row).display === 'none',
        burgerShown: burger ? getComputedStyle(burger).display !== 'none' : false,
      };
    });
    ok(r.rowHidden, `${w}px: desktop row hidden`);
    ok(r.burgerShown, `${w}px: burger shown`);
  }
  await ctx.close();

  // ---------- 4. Mobile menu contents + short-viewport fit ----------
  console.log('\n## 4. Mobile menu (375x667, short viewport)');
  ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
  page = await ctx.newPage();
  await page.goto(LOCAL + '/', { waitUntil: 'networkidle' });
  await dismissPopups(page);
  await page.click('.tn-burger');
  await page.waitForTimeout(400);

  const menu = await page.$$eval('.tn-menu-links a', (els) =>
    els.map((e) => {
      const r = e.getBoundingClientRect();
      return {
        label: e.textContent.trim(),
        href: e.getAttribute('href'),
        target: e.getAttribute('target'),
        rel: e.getAttribute('rel'),
        top: r.top,
        bottom: r.bottom,
      };
    })
  );
  // The menu ends with the Donate CTA, which -- like every ActBlue link on the
  // site (footer, desktop nav) -- intentionally stays in-tab.
  const navItems = menu.slice(0, EXPECTED.length);
  const donate = menu[EXPECTED.length];
  ok(menu.length === EXPECTED.length + 1, `${menu.length} menu links (${EXPECTED.length} nav + Donate CTA)`);
  ok(donate && donate.label === 'Donate', `menu ends with Donate CTA`);
  ok(donate && donate.href.includes('secure.actblue.com'), `Donate CTA -> ActBlue (${donate ? donate.href : 'missing'})`);
  ok(donate && !donate.target, 'Donate CTA stays in-tab (matches footer/desktop convention)');
  EXPECTED.forEach(([label, href], i) => {
    const l = menu[i];
    ok(l && l.label === label && l.href === href, `menu ${i + 1}: ${label} -> ${href}` + (l ? ` (got "${l.label}")` : ''));
  });
  for (const l of navItems.filter((x) => x.href.startsWith('http'))) {
    ok(l.target === '_blank', `menu ${l.label} opens in new tab`);
    ok((l.rel || '').includes('noopener'), `menu ${l.label} has rel=noopener`);
  }
  for (const l of navItems.filter((x) => !x.href.startsWith('http'))) {
    ok(!l.target, `menu ${l.label} stays in-tab`);
  }
  const offscreen = menu.filter((l) => l.top < 0 || l.bottom > 667);
  ok(offscreen.length === 0, `all menu items within 667px viewport${offscreen.length ? ' — offscreen: ' + offscreen.map((o) => o.label).join(', ') : ''}`);

  // close button must not be covered / must close
  await page.click('.tn-menu-close');
  await page.waitForTimeout(400);
  const closed = await page.evaluate(() => {
    const m = document.querySelector('.tn-menu');
    if (!m) return true;
    const s = getComputedStyle(m);
    return s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0' || !m.classList.contains('tn-menu-open');
  });
  ok(closed, 'menu closes via close button');
  await ctx.close();

  // ---------- 4b. Menu fit across phone heights ----------
  // The compact rule is max-height:720px, so the risky band sits just above it:
  // 8 rows plus the social strip at full size on mid-height Androids.
  console.log('\n## 4b. Menu fit across phone heights');
  for (const [w, h, name] of [[375, 667, 'iPhone SE'], [360, 740, 'Android 360x740'], [412, 732, 'Pixel 412x732'], [390, 844, 'iPhone 14'], [414, 896, 'iPhone 11']]) {
    const c = await browser.newContext({ viewport: { width: w, height: h } });
    const pg = await c.newPage();
    await pg.goto(LOCAL + '/', { waitUntil: 'networkidle' });
    await dismissPopups(pg);
    await pg.click('.tn-burger');
    await pg.waitForTimeout(500);
    const r = await pg.evaluate(() => {
      const vh = window.innerHeight;
      const items = [...document.querySelectorAll('.tn-menu-links a')].map((e) => {
        const b = e.getBoundingClientRect();
        return { label: e.textContent.trim(), top: b.top, bottom: b.bottom };
      });
      const social = document.querySelector('.tn-menu-social');
      const menuEl = document.querySelector('.tn-menu');
      return {
        vh,
        over: items.filter((i) => i.top < 0 || i.bottom > vh).map((i) => i.label),
        donateBottom: items.length ? Math.round(items[items.length - 1].bottom) : null,
        socialBottom: social ? Math.round(social.getBoundingClientRect().bottom) : null,
        overflowY: menuEl ? getComputedStyle(menuEl).overflowY : null,
      };
    });
    ok(r.over.length === 0, `${name} (${w}x${h}): all links on screen${r.over.length ? ' -- off: ' + r.over.join(', ') : ''}`);
    ok(r.donateBottom !== null && r.donateBottom <= r.vh, `${name}: Donate CTA reachable (bottom ${r.donateBottom} <= ${r.vh})`);
    ok(r.socialBottom !== null && r.socialBottom <= r.vh, `${name}: social row on screen (bottom ${r.socialBottom} <= ${r.vh})`);
    await c.close();
  }

  // ---------- 5. External destinations resolve ----------
  console.log('\n## 5. External destinations');
  ctx = await browser.newContext();
  // Both hosts serve 200 on "not found" shells, so assert the page is actually
  // the campaign's -- a status check alone would pass a dead store.
  for (const url of ['https://www.mobilize.us/romeroforcolorado/', 'https://romero-for-colorado.bonfire.com']) {
    try {
      const res = await ctx.request.get(url, { timeout: 20000 });
      ok(res.status() < 400, `${url} -> ${res.status()}`);
      const body = (await res.text()).toLowerCase();
      ok(body.includes('romero'), `${url} -> page mentions "Romero" (not a soft-404 shell)`);
    } catch (e) {
      ok(false, `${url} -> request failed: ${e.message}`);
    }
  }
  await ctx.close();

  await browser.close();
  console.log(`\n${fails === 0 ? 'ALL CHECKS PASSED' : fails + ' CHECK(S) FAILED'}`);
  process.exit(fails === 0 ? 0 : 1);
})();
