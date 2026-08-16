// Capture baseline (or rebuilt) screenshots + behavioral data from a site.
// Usage: node capture.js <baseURL> <outDir> [--data]
//   --data also extracts metadata/forms/computed styles (baseline mode)
// Popups are captured with a spoofed google.com referrer (they are
// source-gated to search/external traffic). Numero requests are blocked so
// form capture never submits live data.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.argv[2] || 'https://romeroforcolorado.com';
const OUT = process.argv[3] || path.join(__dirname, '..', 'baseline');
const WANT_DATA = process.argv.includes('--data');
const DATA_DIR = path.join(__dirname, '..', 'data');

const WIDTHS = [375, 768, 1280, 1920];
const PAGES = [
  { slug: 'home', url: '/' },
  { slug: 'issues', url: '/issues/' },
  { slug: 'privacy-policy', url: '/privacy-policy/' },
];

async function hidePopups(page) {
  // Auto-popups fire even on direct visits (empty referrer counts as
  // "external"), so suppress them for clean base-page captures.
  await page.addStyleTag({
    content:
      '.elementor-location-popup,.elementor-popup-modal,.pp-modal{display:none!important}html,body{overflow:auto!important}',
  });
}

async function settle(page) {
  // Scroll through the page to trigger entrance animations / lazy loads,
  // then return to top and let things settle.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const browser = await chromium.launch();
  const data = { pages: {}, popups: {}, forms: [], stickyNav: {} };

  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    });
    for (const p of PAGES) {
      const page = await ctx.newPage();
      await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await hidePopups(page);
      await settle(page);
      // fullPage stitching renders black below the fold on this site at
      // wider widths — instead expand the viewport to the full document
      // height and take a plain viewport screenshot.
      const fullH = await page.evaluate(() => document.body.scrollHeight);
      await page.setViewportSize({ width, height: Math.min(fullH, 16000) });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(OUT, `${p.slug}-${width}.png`),
        fullPage: false,
        animations: 'disabled',
      });
      await page.setViewportSize({ width, height: 900 });

      // Mobile menu open state (375 only, home only)
      if (width === 375 && p.slug === 'home') {
        const burger = page
          .locator(
            '[aria-label*="menu" i], .elementor-menu-toggle, .hamburger, button.menu-toggle, [class*="menu-toggle"]'
          )
          .first();
        if ((await burger.count()) > 0) {
          await burger.click().catch(() => {});
          await page.waitForTimeout(800);
          await page.screenshot({
            path: path.join(OUT, `home-375-menu-open.png`),
            fullPage: false,
            animations: 'disabled',
          });
        }
      }
      await page.close();
    }

    // Popup captures with external referrer (triggers source-gated popups)
    const popPage = await ctx.newPage();
    await popPage
      .goto(BASE + '/', {
        waitUntil: 'networkidle',
        referer: 'https://www.google.com/',
        timeout: 60000,
      })
      .catch(() => {});
    await popPage.waitForTimeout(2500);
    await popPage.screenshot({
      path: path.join(OUT, `popup-pageload-${width}.png`),
      animations: 'disabled',
    });
    // Close it, then scroll down 85% to trigger the scroll popup
    await popPage.keyboard.press('Escape').catch(() => {});
    await popPage.waitForTimeout(600);
    // click any visible close button as fallback
    const close = popPage.locator('.dialog-close-button:visible, [class*="close-button"]:visible').first();
    if ((await close.count()) > 0) await close.click().catch(() => {});
    await popPage.waitForTimeout(600);
    await popPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // bottom: aligns background for diffing
    await popPage.waitForTimeout(2500);
    await popPage.screenshot({
      path: path.join(OUT, `popup-scroll-${width}.png`),
      animations: 'disabled',
    });
    await popPage.close();

    // About popup (manual trigger via Read More)
    const aboutPage = await ctx.newPage();
    await aboutPage.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await aboutPage.waitForTimeout(1500);
    // dismiss the page-load donate popup so Read More is clickable
    await aboutPage.keyboard.press('Escape').catch(() => {});
    await aboutPage.waitForTimeout(400);
    const closeBtn = aboutPage.locator('.dialog-close-button:visible, .pp-fund .pp-close:visible').first();
    if ((await closeBtn.count()) > 0) await closeBtn.click().catch(() => {});
    await aboutPage.waitForTimeout(600);
    const readMore = aboutPage.locator('a[href*="popup%3Aopen"], a[href*="popup:open"], [data-open-about]').first();
    if ((await readMore.count()) > 0) {
      await readMore.scrollIntoViewIfNeeded().catch(() => {});
      await readMore.click().catch(() => {});
      await aboutPage.waitForTimeout(2000);
      await aboutPage.screenshot({
        path: path.join(OUT, `popup-about-${width}.png`),
        animations: 'disabled',
      });
      // full popup content (it may scroll internally)
      const dialog = aboutPage.locator('[data-elementor-id="6127"], .pp-about .pp-about-body').first();
      if ((await dialog.count()) > 0) {
        await dialog
          .screenshot({ path: path.join(OUT, `popup-about-content-${width}.png`), animations: 'disabled' })
          .catch(() => {});
      }
    }
    await aboutPage.close();
    await ctx.close();
    console.log(`width ${width} done`);
  }

  if (WANT_DATA) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();

    for (const p of PAGES) {
      await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await hidePopups(page);
      // Rendered head metadata
      data.pages[p.slug] = await page.evaluate(() => {
        const metas = [...document.querySelectorAll('head meta')].map((m) => ({
          name: m.getAttribute('name'),
          property: m.getAttribute('property'),
          content: m.getAttribute('content'),
          charset: m.getAttribute('charset'),
        }));
        const links = [...document.querySelectorAll('head link')]
          .filter((l) => /canonical|icon|apple/i.test(l.rel))
          .map((l) => ({ rel: l.rel, href: l.href, sizes: l.getAttribute('sizes'), type: l.type }));
        return { title: document.title, metas, links, lang: document.documentElement.lang };
      });

      // Computed styles of key elements
      data.pages[p.slug].styles = await page.evaluate(() => {
        const pick = (el, props) => {
          const cs = getComputedStyle(el);
          const o = {};
          for (const pr of props) o[pr] = cs.getPropertyValue(pr);
          const r = el.getBoundingClientRect();
          o.rect = { x: r.x, y: r.y + scrollY, w: r.width, h: r.height };
          return o;
        };
        const props = [
          'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
          'color', 'background-color', 'text-transform', 'text-align',
          'padding', 'margin', 'border-radius', 'border',
        ];
        const out = {};
        const sels = {
          body: 'body', h1: 'h1', h2: 'h2', h3: 'h3', p: '.elementor-widget-text-editor p',
          navLink: 'nav a, .elementor-nav-menu a', donateBtn: 'a[href*="actblue"]',
          submitBtn: 'input[type="submit"]', input: 'input[type="email"]',
        };
        for (const [k, sel] of Object.entries(sels)) {
          const el = document.querySelector(sel);
          if (el) out[k] = pick(el, props);
        }
        return out;
      });
    }

    // Form payload capture: fill and submit, blocking the numero request.
    await ctx.route('**/secure.numero.ai/**', (route) => {
      data.forms.push({ capturedURL: route.request().url(), method: route.request().method() });
      route.abort();
    });
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await hidePopups(page);
    const formCount = await page.locator('form[name="signup"]').count();
    for (let i = 0; i < formCount; i++) {
      const form = page.locator('form[name="signup"]').nth(i);
      await form.locator('input[type="email"]').fill('migration-test@example.com').catch(() => {});
      await form.locator('input[name="zip"]').fill('80001').catch(() => {});
      await form.locator('input[name="phone"]').fill('3035550100').catch(() => {});
      await form.locator('input[type="submit"]').click().catch(() => {});
      await page.waitForTimeout(1000);
      await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await hidePopups(page);
    }

    // Sticky nav behavior: header styles at top vs after scrolling
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    data.stickyNav.top = await page.evaluate(() => {
      const h = document.querySelector('header, [data-elementor-type="header"], .elementor-location-header');
      if (!h) return null;
      const cs = getComputedStyle(h);
      return { position: cs.position, top: cs.top, background: cs.backgroundColor, height: h.getBoundingClientRect().height, zIndex: cs.zIndex, classes: h.className };
    });
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1500);
    data.stickyNav.scrolled = await page.evaluate(() => {
      const h = document.querySelector('header, [data-elementor-type="header"], .elementor-location-header');
      if (!h) return null;
      const cs = getComputedStyle(h);
      const r = h.getBoundingClientRect();
      return { position: cs.position, top: cs.top, background: cs.backgroundColor, height: r.height, y: r.y, zIndex: cs.zIndex, classes: h.className };
    });

    fs.writeFileSync(path.join(DATA_DIR, 'live-capture.json'), JSON.stringify(data, null, 2));
    await ctx.close();
  }

  await browser.close();
  console.log('capture complete');
})();
