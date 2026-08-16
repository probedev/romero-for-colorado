// Download all same-origin assets referenced by the live pages (images,
// SVGs, favicons) into public/, preserving wp-content paths' filenames.
// Also downloads Google Fonts CSS + woff2 files for self-hosting.
const fs = require('fs');
const path = require('path');

const DATA = require(path.join(__dirname, '..', 'data', 'static-extract.json'));
const PUB = path.join(__dirname, '..', '..', 'public');

async function dl(url, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!res.ok) {
    console.error(`FAIL ${res.status} ${url}`);
    return false;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  return true;
}

(async () => {
  // 1. uploads (images/svg) — keep under /images/<filename>; favicons at root names
  const urls = new Set();
  for (const p of Object.values(DATA)) for (const a of p.assets) urls.add(a.split('?')[0]);

  const uploads = [...urls].filter((u) => /\/wp-content\/uploads\/.*\.(png|jpe?g|svg|gif|webp|ico)$/i.test(u));
  for (const u of uploads) {
    const name = u.split('/').pop();
    await dl(u, path.join(PUB, 'images', name));
  }
  console.log(`downloaded ${uploads.length} images`);

  // also grab elementor global css + post css for style reference (NOT shipped; reference only)
  const cssUrls = [...urls].filter((u) => /\.css$/.test(u));
  const REF = path.join(__dirname, '..', 'data', 'live-css');
  for (const u of cssUrls) {
    const name = u.split('/').pop();
    await dl(u, path.join(REF, name));
  }
  console.log(`downloaded ${cssUrls.length} css files (reference)`);

  // 2. Google Fonts: fetch css with modern UA to get woff2, then download fonts
  const families = [
    'Poppins:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic',
    'Roboto:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic',
    'Roboto+Slab:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic',
  ];
  let cssAll = '';
  for (const fam of families) {
    const res = await fetch(`https://fonts.googleapis.com/css?family=${fam}&display=auto`, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      },
    });
    cssAll += (await res.text()) + '\n';
  }
  const fontUrls = [...new Set([...cssAll.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
  const mapping = {};
  for (const fu of fontUrls) {
    const name = fu.split('/').slice(-2).join('-'); // e.g. v23-abc.woff2
    mapping[fu] = `/fonts/${name}`;
    await dl(fu, path.join(PUB, 'fonts', name));
  }
  let localCss = cssAll;
  for (const [remote, local] of Object.entries(mapping)) localCss = localCss.split(remote).join(local);
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'fonts.css'), localCss);
  console.log(`downloaded ${fontUrls.length} font files`);
})();
