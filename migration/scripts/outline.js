// Produce a readable content outline of each saved page: elements in
// document order with their widget types, text, image srcs, and link hrefs.
// Usage: node outline.js <page> [startMarker]
const fs = require('fs');
const page = process.argv[2] || 'home';
const html = fs.readFileSync(`/tmp/rfc-src/${page}.html`, 'utf8');

// Strip head/scripts/styles
let body = html.slice(html.indexOf('<body'));
body = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');

const decode = (s) =>
  s.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#8216;/g, "'")
   .replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–');

const tokens = [...body.matchAll(/<(h[1-6]|p|a|img|input|button|div|section|span|li|iframe)([^>]*)>|<\/(h[1-6]|p|a|section)>|([^<]+)/g)];
let out = [];
let depth = 0;
for (const t of tokens) {
  if (t[4]) {
    const text = decode(t[4]).replace(/\s+/g, ' ').trim();
    if (text) out.push(`TXT: ${text}`);
    continue;
  }
  const tag = t[1];
  const attrs = t[2] || '';
  if (!tag) continue;
  if (tag === 'img') {
    const src = (attrs.match(/src="([^"]*)"/) || [])[1];
    const alt = (attrs.match(/alt="([^"]*)"/) || [])[1];
    const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
    out.push(`IMG: ${src} alt="${alt || ''}" class="${cls.slice(0, 60)}"`);
  } else if (tag === 'a') {
    const href = (attrs.match(/href="([^"]*)"/) || [])[1];
    if (href && !href.startsWith('#content')) out.push(`A: ${decode(href)}`);
  } else if (/h[1-6]/.test(tag)) {
    out.push(`${tag.toUpperCase()}:`);
  } else if (tag === 'input') {
    const type = (attrs.match(/type="([^"]*)"/) || [])[1];
    const val = (attrs.match(/value="([^"]*)"/) || [])[1];
    const name = (attrs.match(/name="([^"]*)"/) || [])[1];
    out.push(`INPUT: type=${type} name=${name || ''} value="${val || ''}"`);
  } else if (tag === 'iframe') {
    const src = (attrs.match(/src="([^"]*)"/) || [])[1];
    out.push(`IFRAME: ${src}`);
  } else if (tag === 'div' || tag === 'section') {
    // note elementor structural markers
    const m = attrs.match(/data-elementor-id="(\d+)"|data-id="([a-z0-9]+)"/);
    const cls = (attrs.match(/class="([^"]*)"/) || [])[1] || '';
    if (/elementor-section|e-con-full|e-con(\s|")/.test(cls) || m && m[1]) {
      const label = m && m[1] ? `DOC ${m[1]}` : `sec ${(m && m[2]) || ''}`;
      const bgMatch = cls.match(/elementor-(?:section|element)[^"]*/);
      out.push(`--- ${label} class="${cls.slice(0, 100)}"`);
    }
  }
}
console.log(out.join('\n'));
