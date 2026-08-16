# Phase 1 Acceptance Report — romeroforcolorado.com rebuild

Rebuild of the live WordPress/Elementor site as a static Next.js (App
Router) export. Same copy, layout, imagery, and behavior. Captured
2026-08-16 against the live site.

## 1. Visual regression — PASS

Full-page screenshots at 375 / 768 / 1280 / 1920px, live vs rebuilt
(`migration/baseline/` vs `migration/rebuilt/`, diffs in `migration/diff/`).
Pixel-diff threshold 0.2 (anti-aliasing tolerant).

| Capture | 375 | 768 | 1280 | 1920 | Height match |
|---|---|---|---|---|---|
| Home | 0.71% | 0.32% | 0.09% | 0.06% | exact at all widths |
| Issues | 0.42% | 0.02% | 0.01% | 0.01% | exact |
| Privacy Policy | 0.23% | 0.59% | 0.60% | 0.40% | exact |
| About popup (viewport) | 0.00% | 0.00% | 0.00% | 0.00% | exact |
| Page-load donate popup | 0.13% | 3.17%* | 1.79%* | 1.20%* | exact |
| Scroll donate popup | 1.15% | 0.05% | 0.01% | 0.01% | exact |
| About popup (full content) | 1.08% | 0.07% | 0.00% | 0.00% | −20/−40px trailing whitespace inside scroll area |

\* Page-load popup diffs are dominated by the embedded YouTube iframe
(thumbnail/UI render variance) and the UserWay widget icon — third-party
content, not layout. The remaining page-level noise is font anti-aliasing.

`home-375-menu-open.png` exists in the baseline because the capture script
probes for a hamburger menu; the live site has **no mobile menu** (mobile
header is logo + Donate only), so this capture is just the page top.

Re-run: `node migration/scripts/capture.js <baseURL> <outDir>` then
`node migration/scripts/compare.js`.

## 2. Link check — PASS

Zero broken internal links; zero references to `wp-content`, `wp-includes`,
or old-origin assets in DOM or network requests (see
`migration/data/verify-report.md`). Notes:

- `/facebook /twitter /instagram /youtube /bluesky /threads /tiktok
  /signup /volunteer` are 302 redirects in `vercel.json` (404 on a bare
  static file server, resolved on Vercel).
- Head canonical/og URLs intentionally point at `https://romeroforcolorado.com`
  per spec.
- Cloudflare-obfuscated emails resolved to plain
  `mailto:info@romeroforcolorado.com` / `mailto:press@romeroforcolorado.com`.

## 3. Form parity — PASS

All Numero signup form instances (hero, mobile hero, JOIN OUR CAMPAIGN)
produce a byte-identical request to live (captured with the request blocked
— nothing was submitted to Numero):

```
live:    GET https://secure.numero.ai/signup/Sign-Up-227ef8ab-ce0e-4354-b510-b62d3cb58a71?type=SignupForm&email=migration-test%40example.com&zip=80001&phone=3035550100&YesSignMeUpForUpdatesForBinder=true
rebuilt: GET https://secure.numero.ai/signup/Sign-Up-227ef8ab-ce0e-4354-b510-b62d3cb58a71?type=SignupForm&email=migration-test%40example.com&zip=80001&phone=3035550100&YesSignMeUpForUpdatesForBinder=true
```

All three instances on live share one action URL and identical hidden fields
(`type=SignupForm`, `YesSignMeUpForUpdatesForBinder=true`) — no per-instance
tracking fields exist. Only the submit label differs (JOIN US ×2,
STAY UPDATED ×1), preserved. **No test data was submitted** (requests
intercepted before leaving the browser).

## 4. ActBlue URLs — PASS

Full href extraction (document order, popups included):

| Page | Live | Rebuilt | Set | Order |
|---|---|---|---|---|
| / | 28 | 28 | match | match |
| /issues/ | 27 | 27 | match | match |
| /privacy-policy/ | 14 | 14 | match | match |

Tier orderings preserved per section: top banner $5/$25/$250 + $10/$100/Other;
mid-page $10/$25/$50/$250/$500/Other; popups $10/$25/$50/$100/$250/Other.

## 5. Metadata parity — PASS with 3 intentional deviations

Per-page diff in `migration/data/verify-report.md`. All titles,
descriptions, canonicals, og:title/description/url/site_name/locale/type,
article:modified_time, og:image dimensions, twitter:card match. Deviations:

1. `og:image` / `twitter:image` point to
   `https://romeroforcolorado.com/images/drshare.png` (self-hosted copy)
   instead of the old `wp-content/uploads` path — required by the
   no-old-origin-assets rule.
2. `robots` meta directives are in a different order
   (`max-video-preview:-1, max-image-preview:large, max-snippet:-1`) —
   semantically identical; Next.js controls ordering.
3. Live's `twitter:label1/data1` ("Est. reading time" on issues/privacy,
   a Yoast nicety) is not replicated — Next's metadata API doesn't support
   it and no consumer renders it.

## 6. Lighthouse — PASS (desktop)

| Page | Perf (desktop) | A11y (desktop) |
|---|---|---|
| Home | 93 | 97 |
| Issues | 91 | 100 |
| Privacy | 95 | 100 |

Home a11y 97: the one flag is `color-contrast` on the gold
"MEET DWAYNE ROMERO" kicker — the live site's own design colors (live scores
91 a11y with more failures). No regression; not changed per Phase 1 rules.

Mobile-emulation home: rebuilt 58 vs live 58 (parity — dominated by the
1.5MB `mohd.png` mobile hero and third-party scripts; see PHASE2-NOTES).

## Behavior replicated

- **Popups**: page-load donate popup (8567) fires immediately, scroll donate
  popup (7857) at 80% scroll depth — both only when `document.referrer` is
  empty/external/search (exact Elementor Pro source-gating logic, verified
  against `elements-handlers.min.js`); internal navigation suppresses them.
  About popup opens from Read More. Escape/background-click close semantics
  match (scroll popup is not background-closable and leaves the page
  interactive).
- **YouTube lightbox**: "Watch Our Latest Video" card + mobile play button →
  `ZGcTJrVIAk8` with autoplay, same embed URL as the live lightbox action.
- **Top donate banner + issues accordion**: native `<details>`, one-open-at-
  a-time, matching icons (FA5 carets / window-close / chevron).
- **Fonts**: brothers/stratos load from the same Adobe Fonts kit
  (`use.typekit.net/ncg8rno.css` — cannot be self-hosted per Adobe license;
  it is a third-party CDN, not the old origin). Google fonts (Poppins,
  Roboto, Roboto Slab, Figtree) self-hosted, trimmed to used weights.
  "nexa" is referenced by live CSS but not in the kit → falls back to
  sans-serif, identical to live.
- **Third-party parity**: UserWay accessibility widget (account I1rdyyTswi)
  and Meta pixel (955177076981934) included, same as live.

## Redirects

`vercel.json`, all 302: social paths to their resolved destinations
(facebook.com/romeroforcolorado, x.com/RomeroForCO, instagram, youtube
@romeroforcolorado, bsky.app/profile/romeroforcolorado,
threads.com/@romeroforcolorado, tiktok @romeroforcolorado), plus
`/signup` and `/volunteer` → their Numero signup pages. **Note:** live uses
301s for all of these; 302 chosen per spec (social) and to stay reversible
during preview (signup/volunteer). Flip to 301 after approval if desired.

## Client QA round (2026-08-16)

Fixed after client review of the preview: arrow icons on Read More / Issues /
Volunteer buttons now sit directly after the label (jet-button centers the
pair), social-icon hover is a gold circle with shrink animation
(elementor-shape-circle), the UserWay widget renders gold on the preview
domain (`data-color` — the account's own styling is domain-keyed and applies
automatically once served from romeroforcolorado.com), and the scroll donate
popup also fires when a page loads already ≥80% scrolled (restored scroll
positions emit no scroll event).

## Known micro-deviations (flagged)

- Issues accordion open/close is instant (native `<details name>`), not the
  live 400ms height animation.
- About popup scrollable content has 20–40px less trailing whitespace at its
  very bottom (invisible in any viewport).
- The live donate popup's close animation (fadeInUp exit) is simplified to
  instant hide.
