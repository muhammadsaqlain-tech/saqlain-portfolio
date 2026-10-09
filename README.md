# Muhammad Saqlain — Portfolio

A structured, responsive React + TypeScript portfolio with subtle motion, real project descriptions, a custom favicon, SEO metadata, and basic deployment security headers.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run typecheck
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Project structure

```text
saqlain-portfolio/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── saqlain-resume.pdf        # real resume, served as a download
│   └── _headers
├── src/
│   ├── assets/
│   │   ├── saqlain-original.jpg   # hero portrait (real photo; keep under ~150KB)
│   │   └── icons/                 # official brand SVGs, bundled locally (devicons)
│   ├── components/
│   │   ├── Navbar.tsx             # hides on scroll down, returns on scroll up
│   │   ├── Hero.tsx               # masked headline reveal, ambient orbs, parallax portrait
│   │   ├── Marquee.tsx            # infinite toolkit ticker (decorative, aria-hidden)
│   │   ├── Magnetic.tsx           # magnetic hover wrapper for call-to-action buttons
│   │   ├── SectionHeading.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx             # filter tabs + cursor spotlight cards
│   │   ├── Projects.tsx           # abstract cover art per project (never fake screenshots)
│   │   ├── Journey.tsx            # timeline line draws itself while scrolling
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── portfolio.ts           # single source of truth: profile, skills, projects, journey
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css                 # design tokens + polish-pass section at the end
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Personalize before publishing

Edit `src/data/portfolio.ts` to update:
- email address
- GitHub and LinkedIn URLs
- project links and descriptions
- skills and education details

Empty social URLs are intentionally hidden. The email action uses `mailto:` and does not pretend to submit a server-side form.

Replace `src/assets/saqlain-original.jpg` with another portrait if desired. Keep the filename the same, or update the import in `Hero.tsx`. Keep it under ~150KB (resize before adding).

## Deploy

This is a static site — `npm run build` outputs everything into `dist/`.

**Option A — Vercel (recommended, config included):**
1. Push this folder to a GitHub repository.
2. Go to vercel.com → Add New → Project → import the repo.
3. Build command `npm run build`, output directory `dist` (already set in `vercel.json`).
4. After deploy, uncomment the `og:url` / `og:image` lines in `index.html` and set your real domain, then redeploy.

**Option B — any static host (Netlify, Cloudflare Pages, GitHub Pages):**
1. Run `npm run build`.
2. Upload the contents of `dist/` to the host.
3. Same `index.html` note about `og:url` / `og:image` applies.

## Security notes

- No API keys or secrets are used in the browser.
- External links use `rel="noreferrer"` where applicable.
- There is no fake contact form or client-side claim that a message was stored.
- Security headers are provided for Vercel and static hosts that support `_headers`. Configure equivalent headers on any other host.
- For a future backend, validate inputs server-side, rate-limit endpoints, use CSRF protections where relevant, and never put private keys in `VITE_*` environment variables.

## Motion and accessibility

- Motion is used for restrained entrance/reveal and hover interactions: masked headline reveal, ambient hero orbs, magnetic buttons, toolkit marquee, skill-card spotlight, project cover art, scroll-drawn journey line, and hide-on-scroll navbar.
- `prefers-reduced-motion` disables the looping/parallax motion (orbs, scanline, marquee, magnetic pull, timeline draw) via both CSS and `useReducedMotion`.
- Decorative motion (marquee, orbs, scanline) is `aria-hidden`; the spotlight uses CSS vars only, no extra DOM.
- Semantic sections, visible focus states, mobile navigation labels, and accessible button names are included.
