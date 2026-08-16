// Pixel-diff rebuilt captures against the live-site baseline.
// Usage: node compare.js [nameFilter]
// Writes diff PNGs to migration/diff/ and prints a report.
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch').default || require('pixelmatch');

const BASE = path.join(__dirname, '..', 'baseline');
const REBUILT = path.join(__dirname, '..', process.env.REBUILT_DIR || 'rebuilt');
const DIFF = path.join(__dirname, '..', 'diff');
const filter = process.argv[2] || '';

fs.mkdirSync(DIFF, { recursive: true });

const files = fs
  .readdirSync(BASE)
  .filter((f) => f.endsWith('.png') && f.includes(filter))
  .sort();

const rows = [];
for (const f of files) {
  const rebuiltPath = path.join(REBUILT, f);
  if (!fs.existsSync(rebuiltPath)) {
    rows.push({ f, status: 'MISSING in rebuilt' });
    continue;
  }
  const a = PNG.sync.read(fs.readFileSync(path.join(BASE, f)));
  const b = PNG.sync.read(fs.readFileSync(rebuiltPath));
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  // pad both to common canvas (white background)
  const pad = (img) => {
    const out = new PNG({ width, height });
    out.data.fill(255);
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const pa = pad(a);
  const pb = pad(b);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(pa.data, pb.data, diff.data, width, height, {
    threshold: 0.2,
  });
  const pct = ((mismatched / (width * height)) * 100).toFixed(2);
  const hDelta = b.height - a.height;
  fs.writeFileSync(path.join(DIFF, f), PNG.sync.write(diff));
  rows.push({ f, status: `${pct}% diff, height Δ ${hDelta}px (live ${a.height} vs rebuilt ${b.height})` });
}

for (const r of rows) console.log(`${r.f.padEnd(32)} ${r.status}`);
