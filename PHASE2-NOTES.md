# Phase 2 ideas (observed during Phase 1 — nothing built)

Notes captured while doing the pixel-faithful migration. All of these are
cheap now that the styling is plain CSS with design tokens
(`styles/tokens.css`).

## Performance (biggest wins first)

- `mohd.png` (mobile hero photo) is a 1.5MB PNG of a photograph. Re-exporting
  as JPEG/WebP (~150KB) would take mobile Lighthouse from 58 into the 80s on
  its own. Same for `phrr.jpg` (295KB), `bgbb2-scaled.jpg` (384KB),
  `fam1.jpg` (232KB) — responsive `srcset`/`image-set()` variants would help
  since they're served full-size to phones.
- The Meta pixel + UserWay widget account for ~900KB of third-party JS. If
  UserWay is kept, its `data-widget_layout` options can defer the heavy
  bundle further.
- Adobe Fonts kit loads all stratos weights; a kit trimmed to
  brothers 700 + stratos 700/800/900 would shave the typekit CSS.

## Navigation / structure

- No real navigation on the home header (only Volunteer/Donate) — a slim
  sticky nav with Home/Issues/Meet Dwayne anchors would help wayfinding,
  especially mobile (currently logo + Donate only, no menu at all).
- Footer "Meet Dwayne" links to `#about`, which silently does nothing on
  /issues and /privacy-policy (replicated as-is). Should be `/#about`.
- `/signup` and `/volunteer` bounce users off-site to secure.numero.ai pages
  with default Numero styling — native styled pages posting to the same
  endpoints would keep users in the brand.
- The Issues page has no per-issue anchors — deep links like
  `/issues#water` would be handy for social/ads.

## Look and feel

- The hero "WE LEAD" highlight animation and clip-path slide-ins exist in
  CSS (`.sclydleft/right/up` on live) but most are unused — could be applied
  consistently to section entrances.
- The issues accordion could animate open/close (Phase 1 uses instant native
  toggle; live animates 400ms). `interpolate-size: allow-keywords` makes
  this ~3 lines of CSS in modern browsers.
- Duplicate donate popups (page-load AND 80%-scroll popup on every page,
  every visit from external referrers) is aggressive — consider frequency
  capping (Elementor supported "show N times" but it wasn't enabled).
- The gold kicker `#AD9F3B` on white fails WCAG contrast (the one Lighthouse
  a11y flag). A slightly darker gold (`#8a7f2f`) passes AA without changing
  the brand feel.
- Mixed heading tags for visual text (SMS consent is an `<h2>`, "Paid for by"
  is a heading widget) — semantic cleanup would improve screen-reader outline.

## Content/ops

- OG image (`drshare.png`) is referenced at the apex domain; once DNS moves,
  nothing to do — but if a staging domain needs correct social cards, make
  the og:image URL environment-aware.
- The WP `robots.txt` had Cloudflare-managed AI-crawler blocks; decide
  whether to replicate them on Vercel (`public/robots.txt` currently absent —
  Vercel serves none by default).
- Favicon set: live emitted many sizes (150/270/300px variants unused by
  browsers); Phase 1 ships 32/192/180 which covers everything real.
