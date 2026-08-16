# Romero for Colorado — static rebuild

Pixel-faithful static rebuild of https://romeroforcolorado.com (WordPress +
Elementor) as a Next.js App Router static export. Phase 1: same copy, same
layout, same behavior — see `migration/REPORT.md` for the acceptance report
and `PHASE2-NOTES.md` for deferred improvement ideas.

## Develop

```bash
npm install
npm run dev        # dev server
npm run build      # static export to out/
```

## Deploy

Deploys to Vercel as a static export. `vercel.json` holds the redirects
(social shortlinks, /signup, /volunteer). **Do not touch DNS, the domain, or
the Numero account** — preview URL only until client approval.

## Layout of the repo

- `app/` — pages (home, /issues, /privacy-policy)
- `components/` — header/footer/forms/popups; `SitePopups.tsx` reproduces the
  Elementor popup triggers (page-load + 80%-scroll donate popups are gated to
  external/search referrers, exactly like Elementor Pro)
- `styles/` — plain CSS; `tokens.css` holds the design tokens extracted from
  the live Elementor kit
- `lib/urls.ts` — ActBlue/Numero/social URLs (preserve exactly)
- `migration/` — capture/measure/compare tooling, live-site baseline
  screenshots, rebuilt screenshots, pixel diffs, and data extracted from the
  live site

## Legally required content

The FEC disclaimer, military-endorsement disclaimer, SMS consent language,
Privacy Policy text, and "Powered By Apollo" credit are byte-for-byte from
the live site. Do not edit without flagging.
