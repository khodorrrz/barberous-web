# Barberous

Static English/Arabic showcase website. No build step or runtime dependencies.

Preview from this directory:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. Deploy `index.html`, `style.css`, `app.js`, and the `assets` directory to a static host such as Cloudflare Pages. No server or database is needed.

WhatsApp links open a prefilled appointment request to +961 70 576 915. Visitors send it themselves; the shop confirms manually. Service links prefill the selected service. Nothing sends automatically or reserves a slot.

English is the initial language. The language switch remembers the visitor's choice when browser storage is available. Arabic changes text, image descriptions, document direction, metadata, and WhatsApp messages.

The six haircut photographs and logo were supplied by the user. Elie's portrait is an AI-retouched version of the supplied owner photograph. No portrait is supplied for Mohamad; his introduction remains text-only. No prices or invented reviews are included.

Instagram links in the hero and contact section point to https://www.instagram.com/barberous.byelie/. The tracking parameter from the supplied share link is unnecessary for visiting the profile.
