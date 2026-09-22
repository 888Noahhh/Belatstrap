# Belatstrap

<p align="center">
  <img src="Logo.png" alt="Belatstrap logo" />
</p>

> Roblox FFLAGS manager that puts you in control of your game's performance.

This repo is the **website** for Belatstrap — the landing page, the docs, the note about antivirus flags. The injector itself is not in here.

## What is Belatstrap?

Belatstrap tweaks Roblox Fast Flags through **memory injection**. That means the flags are changed live inside Roblox's process — no game files touched, no restart needed, everything reversible if something breaks.

It ships with a 14K+-offset database that gets re-dumped after every Roblox update, an editor for 14K+ flags, and a smart installer that grabs the right Roblox client for your version automatically.

### Main features (as shown on the site)

- **FFLAGS presets** — performance, FPS boost, graphics, stability. One click, done.
- **Flags editor** — search and edit any flag in the database, applied live.
- **Memory injection** — verifies the Roblox process before writing anything.
- **HWID & MAC spoofer** — automatic HWID, manual MAC, for handling stale bans and crashes.
- **Smart installer** — auto-detects your Roblox version, in 12 languages.
- **5-hour Discord session** — log in once, stay verified for 5 hours. No passwords stored, no re-logins.
- **Full reversibility** — anything you change can be undone.

AV might flag the injector (it hooks into a process and uses low-level calls). It's not a virus — see the **Note** page on the site for the whitelist instructions and the hashed report link.

## Pages

| Route | File |
| --- | --- |
| `/` | `index.html` (copy of `strapper.html`) — home (hero, showcase video, features, FAQ, download) |
| `/about` | `about.html` |
| `/docs` | `docs.html` — install guide + all tabs explained |
| `/note` | `note.html` — the antivirus false-positive note |
| `/healthz` | health check, returns `ok` |

## Running it locally

```
npm install
npm start
```

Needs Node 18+. The server listens on port `3000` by default (override with the `PORT` env var) → open `http://localhost:3000`.

## Deploying (Cloudflare Pages — current hosting)

This repo is now Cloudflare Pages-ready. No build step, no `server.js` runs on Cloudflare.

- `index.html` — copy of `strapper.html` for `/`. After editing `strapper.html`, run `npm run build`.
- `about.html`, `docs.html`, `note.html` — served natively at `/about`, `/docs`, `/note` by Pages clean URLs. Do NOT create `about/index.html`, `docs/index.html`, `note/index.html` duplicates — having both `about.html` AND `about/index.html` causes an infinite `308` redirect loop on Pages (`/about.html -> /about -> /about/ -> /about ...`). Same for `_redirects` with `200` rewrites — don't add it.
- No `_redirects` file — pretty routes work natively from the `*.html` files above.
- `_headers` — same CSP / security headers + caching as `server.js`.
- `functions/healthz.js` — `/healthz` returns `ok`.
- `server.js` is only for local dev (`npm start`) and legacy Vercel. Cloudflare ignores it.
- All local asset refs use absolute paths (`/cursor.css`, `/trail.min.js`) so `/about`, `/about/` and `/about.html` all load CSS/JS correctly.

Cloudflare dashboard settings:
- Framework preset: `None`
- Build command: `npm run build` (or empty — `index.html` is already committed)
- Output directory: `/` (repo root)
- Then upload this folder or connect Git. Every push auto-deploys.

Note: rate-limiting, basic-auth (`SITE_USER`/`SITE_PASS`), and gzip in `server.js:26-32,56-63,17` do not apply on Pages. Use Cloudflare WAF / Access if you need them.

## Deploying (Vercel — legacy)

`vercel.json` is already set up for Vercel — it runs the existing Express app (`server.js`) as a serverless function:

- The app is exported from `server.js`, so no rewrite of the routes was needed
- Static files are served by Express itself; caching headers are set in `server.js`
- Health check `/healthz` still works, and the `VERCEL` env var makes Vercel skip the local `app.listen`

Deploying is just: push to GitHub → import the repo on Vercel → done. Every push after that auto-deploys.

Optional: set `SITE_USER` and `SITE_PASS` in Vercel's Environment Variables to password-protect the whole site.

To test locally, install the Vercel CLI (`npm i -g vercel`) and run `vercel dev`.

## What's in the folder

- `server.js` — Express app for local dev only: helmet, gzip compression, rate limiting, hit logging, optional basic auth, and the routes above. No database, no build step.
- `index.html` — Cloudflare entry, must stay in sync with `strapper.html` (`npm run build`).
- `_headers`, `functions/healthz.js` — Cloudflare Pages config (security headers, health check).
- `*.html` — the four pages. Tailwind via CDN, custom cursor + spider-web canvas + music player inline, AOS scroll-reveal animations (CSS + JS from unpkg, needed for the animations to actually show).
- `cursor.css`, `trail.css`, `trail.js`, `trail.min.js`, `sw.js` — styling and misc scripts.
- `vercel.json` — Vercel deployment config (Express app as a serverless function). `package.json` — dependencies and `npm start`.

---

*The site is live at `https://belatstrap.vercel.app`.*
