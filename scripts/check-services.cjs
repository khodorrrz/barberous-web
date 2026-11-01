const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const base = 'https://barberous.pages.dev';
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const dir of ['services', 'services/ar']) {
  for (const name of fs.readdirSync(path.join(root, dir)).filter(f => f.endsWith('.html'))) {
    const file = `${dir}/${name}`;
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const page = new URL(`/${file}`, base);
    for (const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"#]*)?"/g)) {
      const url = new URL(match[1], page);
      if (url.origin === base) assert.ok(fs.existsSync(path.join(root, decodeURIComponent(url.pathname))), `${file}: missing ${url.pathname}`);
    }
    assert.ok(html.includes(`<link rel="canonical" href="${page.href}">`), `${file}: canonical`);
    assert.ok(sitemap.includes(`<loc>${page.href}</loc>`), `${file}: sitemap`);
    const back = html.match(/<a href="([^"]+)" style="color:#60a5fa/);
    assert.equal(new URL(back[1], page).pathname, dir === 'services' ? '/' : '/ar/', `${file}: back link`);
    const language = html.match(/class="language-switch" href="([^"]+)"/);
    assert.equal(new URL(language[1], page).pathname, dir === 'services' ? `/services/ar/${name}` : `/services/${name}`, `${file}: language switch`);
    if (dir === 'services/ar') assert.ok(!html.includes('Walk-ins are welcome'), `${file}: untranslated hours`);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)[1]);
    assert.equal(schema['@context'], 'https://schema.org', `${file}: schema context`);
    assert.equal(schema.offers['@type'], 'Offer', `${file}: schema offer`);
    for (const match of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+\?text=[^\"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'));
      assert.match(url.searchParams.get('text'), /(?:Date and time|اليوم والوقت):/, `${file}: booking message truncated`);
      assert.equal([...url.searchParams.keys()].length, 1, `${file}: unescaped booking query`);
    }
  }
}
assert.ok(fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes(`Sitemap: ${base}/sitemap.xml`));
console.log('Service links, booking messages, sitemap and schema OK');
