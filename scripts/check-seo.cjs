const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
let bad = 0;
for (const f of ['index.html', 'ar/index.html']) {
  const full = path.join(root, f);
  const html = fs.readFileSync(full, 'utf8');
  const m = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (m.length !== 1) { console.log(f, 'FAIL: expected 1 ld+json, got', m.length); bad++; continue; }
  let data;
  try { data = JSON.parse(m[0][1]); } catch (e) { console.log(f, 'FAIL JSON:', e.message); bad++; continue; }
  console.log(f, 'JSON-LD OK:', data['@graph'].map(n => n['@type']).join(','));
  const meta = (attribute, key) => {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return html.match(new RegExp(`<meta ${attribute}="${escaped}" content="([^"]+)">`))?.[1];
  };
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) {
    if (!meta('property', key)) { console.log('  MISSING', key); bad++; }
  }
  if (meta('property', 'og:url') !== canonical) { console.log('  FAIL og:url differs from canonical'); bad++; }
  const image = meta('property', 'og:image');
  if (image) {
    const url = new URL(image);
    if (url.origin !== 'https://barberous.app' || !fs.existsSync(path.join(root, url.pathname))) {
      console.log('  FAIL social image', image); bad++;
    }
  }
  if (meta('name', 'twitter:image') !== image) { console.log('  FAIL Twitter image differs from Open Graph'); bad++; }
  if (!meta('name', 'description') || !meta('name', 'twitter:description')) { console.log('  MISSING description'); bad++; }
  const refs = [...html.matchAll(/(?:src|href)="((?!https?:|#|tel:|mailto:)[^"]+)"/g)].map(x => x[1]);
  for (const r of new Set(refs)) {
    const p = path.join(path.dirname(full), r.split('?')[0]);
    const file = fs.existsSync(p) ? p : fs.existsSync(p + '.html') ? p + '.html' : p;
    if (!fs.existsSync(file)) { console.log('  MISSING', r, '->', p); bad++; }
  }
  const opens = (html.match(/<details/g) || []).length;
  const closes = (html.match(/<\/details>/g) || []).length;
  if (opens !== closes) { console.log('  FAIL details', opens, closes); bad++; }
  console.log('  details', opens, '| data-message', (html.match(/data-message=/g) || []).length, '| lang', (html.match(/<html lang="(\w+)"/) || [])[1]);
}
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const braces = [...css].reduce((n, c) => n + (c === '{') - (c === '}'), 0);
console.log('css brace balance', braces);
process.exit(bad ? 1 : 0);
