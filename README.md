# Barberous

Static English/Arabic showcase website. No build step or runtime dependencies.

Preview from this directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Build with `node scripts/build-static.cjs`, then deploy the contents of `dist/client/`. This copies the current pages, SEO files, logo, icon, share image and fonts, excluding retired haircut and owner photographs. No server or database is needed.

WhatsApp links open a prefilled appointment request to +961 70 576 915. Visitors send it themselves; the shop confirms manually. Service links prefill the selected service. Nothing sends automatically or reserves a slot. The links work without JavaScript; `app.js` only adds the prefilled text and the mobile menu.

## Languages

English lives at `/`, Arabic at `/ar/`, both fully static with `hreflang` alternates. The header language switch is a plain link, so both versions are crawlable and indexable. Arabic uses `dir="rtl"`, Noto Sans Arabic and RTL layout rules.

The client replaced haircut photographs with twelve priced services in four categories. Prices are USD and match the supplied client menu. All people photographs, including the owner's portrait, are excluded from the public bundle; both barbers retain text introductions. Mobile categories have separate inset bordered panels; desktop retains its existing section bands. No invented reviews are included.

## SEO and AI search

Everything assumes the domain `https://barberous.pages.dev`. If the domain changes, update the canonical, `hreflang`, Open Graph/Twitter URLs, JSON-LD `@id`/`url`, `sitemap.xml` and `llms.txt` together.

- `index.html` and `ar/index.html` carry `BarberShop` and `FAQPage` JSON-LD: address, coordinates, hours, phone, all twelve offers with USD prices, employees and area served (Hadat, Baabda, Beirut).
- Visible FAQ accordion matches the `FAQPage` markup; answers restate address, hours, prices and booking so they stay readable without JavaScript.
- `robots.txt`, `sitemap.xml` (with `xhtml:link` alternates) and `llms.txt` (plain fact sheet for AI crawlers) are built into `dist/client/`.
- `assets/og-image.jpg` is the 1200x630 social/AI share card.
- `scripts/check-seo.cjs` validates JSON-LD, local asset references and `<details>` balance for both pages.

Ranking for "barbers near me" still depends on the Google Business Profile, reviews and proximity; the site only makes the shop eligible and readable. Google does not accept invented or AI-written reviews as real customer reviews — only genuine customers can review, and fake reviews risk suspension.

Instagram links in the hero and contact section point to https://www.instagram.com/barberous.byelie/. The tracking parameter from the supplied share link is unnecessary for visiting the profile.
