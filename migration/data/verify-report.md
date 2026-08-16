## 1. Link check (rebuilt site)
- /: /facebook → handled by vercel.json redirect (404 on bare static server, OK)
- /: /twitter → handled by vercel.json redirect (404 on bare static server, OK)
- /: /instagram → handled by vercel.json redirect (404 on bare static server, OK)
- /: /youtube → handled by vercel.json redirect (404 on bare static server, OK)
- /: /bluesky → handled by vercel.json redirect (404 on bare static server, OK)
- /: /threads → handled by vercel.json redirect (404 on bare static server, OK)
- /: /tiktok → handled by vercel.json redirect (404 on bare static server, OK)
- /: /volunteer → handled by vercel.json redirect (404 on bare static server, OK)
- /: /signup → handled by vercel.json redirect (404 on bare static server, OK)
Result: PASS — no broken links, no old-origin/wp-content references

Head references to romeroforcolorado.com (expected — canonical domain):
- /: https://romeroforcolorado.com/ | https://romeroforcolorado.com/ | https://romeroforcolorado.com/images/drshare.png | https://romeroforcolorado.com/images/drshare.png
- /issues/: https://romeroforcolorado.com/issues/ | https://romeroforcolorado.com/issues/ | https://romeroforcolorado.com/images/drshare.png
- /privacy-policy/: https://romeroforcolorado.com/privacy-policy/ | https://romeroforcolorado.com/privacy-policy/ | https://romeroforcolorado.com/images/drshare.png

## 2. ActBlue URL parity (document order, incl. popups)
- /: live 28 urls, rebuilt 28 urls — set MATCH, order MATCH
- /issues/: live 27 urls, rebuilt 27 urls — set MATCH, order MATCH
- /privacy-policy/: live 14 urls, rebuilt 14 urls — set MATCH, order MATCH

## 3. Metadata parity (live vs rebuilt)

### /
- ✅ title: "Romero for Colorado"
- ✅ meta[name=description]: "United States Army Engineer Officer Dwayne Romero is a husband, father, combat veteran, small business owner, and Democratic candid
- ⚠️ meta[name=robots]:
    live:    index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
    rebuilt: index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1
- ✅ link[rel=canonical]: "https://romeroforcolorado.com/"
- ✅ meta[property="og:locale"]: "en_US"
- ✅ meta[property="og:type"]: "website"
- ✅ meta[property="og:title"]: "Romero for Colorado"
- ✅ meta[property="og:description"]: "United States Army Engineer Officer Dwayne Romero is a husband, father, combat veteran, small business owner, and Democrat
- ✅ meta[property="og:url"]: "https://romeroforcolorado.com/"
- ✅ meta[property="og:site_name"]: "Romero for Colorado"
- ✅ meta[property="article:modified_time"]: "2026-04-30T16:34:37+00:00"
- ⚠️ meta[property="og:image"]:
    live:    https://romeroforcolorado.com/wp-content/uploads/2026/03/drshare.png
    rebuilt: https://romeroforcolorado.com/images/drshare.png
- ✅ meta[property="og:image:width"]: "1200"
- ✅ meta[property="og:image:height"]: "630"
- ✅ meta[name="twitter:card"]: "summary_large_image"
- ⚠️ meta[name="twitter:image"]:
    live:    https://romeroforcolorado.com/wp-content/uploads/2026/03/drshare.png
    rebuilt: https://romeroforcolorado.com/images/drshare.png

### /issues/
- ✅ title: "Issues - Romero for Colorado"
- ✅ meta[name=description]: "null"
- ⚠️ meta[name=robots]:
    live:    index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
    rebuilt: index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1
- ✅ link[rel=canonical]: "https://romeroforcolorado.com/issues/"
- ✅ meta[property="og:locale"]: "en_US"
- ✅ meta[property="og:type"]: "article"
- ✅ meta[property="og:title"]: "Issues - Romero for Colorado"
- ✅ meta[property="og:description"]: "Donate to Support Dwayne Romero for Colorado FIGHT FOR CO-03 Donate to Support Romero for Colorado If you’ve saved your in
- ✅ meta[property="og:url"]: "https://romeroforcolorado.com/issues/"
- ✅ meta[property="og:site_name"]: "Romero for Colorado"
- ✅ meta[property="article:modified_time"]: "2026-05-01T18:45:52+00:00"
- ⚠️ meta[property="og:image"]:
    live:    https://romeroforcolorado.com/wp-content/uploads/2026/03/drshare.png
    rebuilt: https://romeroforcolorado.com/images/drshare.png
- ✅ meta[property="og:image:width"]: "1200"
- ✅ meta[property="og:image:height"]: "630"
- ✅ meta[name="twitter:card"]: "summary_large_image"
- ✅ meta[name="twitter:image"]: "null"

### /privacy-policy/
- ✅ title: "Privacy Policy - Romero for Colorado"
- ✅ meta[name=description]: "null"
- ⚠️ meta[name=robots]:
    live:    index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
    rebuilt: index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1
- ✅ link[rel=canonical]: "https://romeroforcolorado.com/privacy-policy/"
- ✅ meta[property="og:locale"]: "en_US"
- ✅ meta[property="og:type"]: "article"
- ✅ meta[property="og:title"]: "Privacy Policy - Romero for Colorado"
- ✅ meta[property="og:description"]: "Privacy Policy INFORMATION THAT IS GATHERED FROM VISITORS In common with other websites, log files are stored on the web s
- ✅ meta[property="og:url"]: "https://romeroforcolorado.com/privacy-policy/"
- ✅ meta[property="og:site_name"]: "Romero for Colorado"
- ✅ meta[property="article:modified_time"]: "2026-03-10T18:21:49+00:00"
- ⚠️ meta[property="og:image"]:
    live:    https://romeroforcolorado.com/wp-content/uploads/2026/03/drshare.png
    rebuilt: https://romeroforcolorado.com/images/drshare.png
- ✅ meta[property="og:image:width"]: "1200"
- ✅ meta[property="og:image:height"]: "630"
- ✅ meta[name="twitter:card"]: "summary_large_image"
- ✅ meta[name="twitter:image"]: "null"

## 4. Form payload parity (submissions blocked, never sent)
live:
  (form 1 hidden at this viewport — skipped)
rebuilt:
  GET https://secure.numero.ai/signup/Sign-Up-227ef8ab-ce0e-4354-b510-b62d3cb58a71?type=SignupForm&email=migration-test%40example.com&zip=80001&phone=3035550100&YesSignMeUpForUpdatesForBinder=true
  (form 1 hidden at this viewport — skipped)
  GET https://secure.numero.ai/signup/Sign-Up-227ef8ab-ce0e-4354-b510-b62d3cb58a71?type=SignupForm&email=migration-test%40example.com&zip=80001&phone=3035550100&YesSignMeUpForUpdatesForBinder=true
Result: CHECK ABOVE