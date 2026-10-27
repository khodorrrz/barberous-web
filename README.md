# Barberous

Static English/Arabic showcase website. No build step or runtime dependencies.

Preview from this directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Build with `node scripts/build-static.cjs`, then deploy the contents of `dist/client/`. This copies only the current logo, icon and fonts, excluding retired haircut and owner photographs. No server or database is needed.

WhatsApp links open a prefilled appointment request to +961 70 576 915. Visitors send it themselves; the shop confirms manually. Service links prefill the selected service. Nothing sends automatically or reserves a slot.

English is the initial language. The language switch remembers the visitor's choice when browser storage is available. Arabic changes text, image descriptions, document direction, metadata, and WhatsApp messages.

The client replaced haircut photographs with twelve priced services in four categories. Prices are USD and match the supplied client menu. All people photographs, including the owner's portrait, are excluded from the public bundle; both barbers retain text introductions. Mobile categories have separate inset bordered panels; desktop retains its existing section bands. No invented reviews are included.

Instagram links in the hero and contact section point to https://www.instagram.com/barberous.byelie/. The tracking parameter from the supplied share link is unnecessary for visiting the profile.
