// Extract structured data from saved live-site HTML: popup settings, head
// metadata, forms, and asset URLs. Reads /tmp/rfc-src/*.html, writes JSON
// to migration/data/.
const fs = require('fs');
const path = require('path');

const SRC = '/tmp/rfc-src';
const OUT = path.join(__dirname, '..', 'data');
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const pages = ['home', 'issues', 'privacy-policy'];
const result = {};

for (const p of pages) {
  const html = fs.readFileSync(path.join(SRC, `${p}.html`), 'utf8');
  const page = { documents: [], head: {}, forms: [], actblue: [] };

  // Elementor documents (page/header/footer/popup) with settings
  const docRe = /<div[^>]*class="[^"]*elementor[^"]*"[^>]*>/g;
  let m;
  while ((m = docRe.exec(html))) {
    const tag = m[0];
    const id = tag.match(/data-elementor-id="(\d+)"/);
    const type = tag.match(/data-elementor-type="([^"]*)"/);
    const settings = tag.match(/data-elementor-settings="([^"]*)"/);
    if (id && type) {
      page.documents.push({
        id: +id[1],
        type: type[1],
        settings: settings ? JSON.parse(decode(settings[1])) : null,
      });
    }
  }

  // Head metadata
  const head = html.slice(0, html.indexOf('</head>'));
  page.head.title = (head.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  page.head.metas = [...head.matchAll(/<meta[^>]*>/g)].map((x) => x[0]);
  page.head.links = [...head.matchAll(/<link[^>]*>/g)]
    .map((x) => x[0])
    .filter((l) => /canonical|icon|apple|og|alternate/i.test(l));

  // Forms with full inner markup
  const formRe = /<form[\s\S]*?<\/form>/g;
  while ((m = formRe.exec(html))) {
    const f = m[0];
    page.forms.push({
      action: (f.match(/action="([^"]*)"/) || [])[1],
      method: (f.match(/method="([^"]*)"/) || [])[1],
      inputs: [...f.matchAll(/<input[^>]*>/g)].map((x) => x[0]),
      selects: [...f.matchAll(/<select[^>]*>/g)].map((x) => x[0]),
      textareas: [...f.matchAll(/<textarea[^>]*>/g)].map((x) => x[0]),
    });
  }

  // All ActBlue hrefs in document order
  page.actblue = [...html.matchAll(/href="(https:\/\/secure\.actblue\.com[^"]*)"/g)].map((x) =>
    decode(x[1])
  );

  // All same-origin asset URLs
  page.assets = [
    ...new Set(
      [...html.matchAll(/https:\/\/romeroforcolorado\.com\/wp-[^"'\s)>]+/g)].map((x) =>
        decode(x[0])
      )
    ),
  ];

  result[p] = page;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'static-extract.json'), JSON.stringify(result, null, 2));

// Summary to stdout
for (const p of pages) {
  const r = result[p];
  console.log(`=== ${p} ===`);
  for (const d of r.documents) {
    console.log(
      `  doc id=${d.id} type=${d.type}` +
        (d.settings && d.settings.triggers
          ? ` triggers=${JSON.stringify(d.settings.triggers)} timing=${JSON.stringify(d.settings.timing)}`
          : '')
    );
  }
  console.log(`  title: ${r.head.title}`);
  console.log(`  forms: ${r.forms.length}, actblue links: ${r.actblue.length}, assets: ${r.assets.length}`);
}
