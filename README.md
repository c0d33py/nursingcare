# Heaven Nursing Care 24/7 — Website

Marketing website for **Heaven Nursing Care 24/7**, home nursing & healthcare in Lahore.
Built to the specification in [`docs/`](docs/README.md); deploys as a static site to **GitHub Pages**.

**Stack:** Astro 7 · Tailwind CSS 4 · Preact (Care Finder island) · GSAP + Lenis (desktop only) · Three.js (3D Care Kit) · no backend.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
npm run check      # type-check
```

Requires Node 22.12+.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to the `main` branch:
   ```bash
   git add .
   git commit -m "Heaven Nursing Care website"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The site goes live at `https://<you>.github.io/<repo>/` (the workflow passes the right base path to the build automatically).

**Custom domain (recommended for a business):** add the domain under Settings → Pages, then create `public/CNAME` containing the domain (e.g. `heavennursingcare.pk`) and push. The workflow switches the base path to `/` on its own.

**Analytics (optional, cookieless):** create a site in [Umami](https://umami.is), then add a repository *variable* (Settings → Secrets and variables → Actions → Variables) named `UMAMI_WEBSITE_ID`. Buttons already carry `data-umami-event` tracking attributes (WhatsApp clicks, calls, by placement).

## How the forms work (no server needed)

GitHub Pages can't run server code, so the booking, contact and partner forms **validate in the browser, then open WhatsApp with a prefilled, structured message** (e.g. `[Ref: WEB-BOOK]`) to 0308 2177778 and show the thank-you page. Nothing is stored on the site. Logic: [`src/scripts/wa-form.ts`](src/scripts/wa-form.ts).
If email delivery is wanted later, point the forms at a form service (Web3Forms/Formspree) — no CRM is integrated, by design.

## Where to edit things

| What | File |
|---|---|
| Phone, WhatsApp, address, office hours, response time, shift hours, email, social links | [`src/site.ts`](src/site.ts) |
| Services (11 pages: copy, inclusions, FAQs, SEO titles) | [`src/content/services/*.md`](src/content/services) |
| FAQs | [`src/content/faqs.yaml`](src/content/faqs.yaml) |
| Testimonials | [`src/content/testimonials.yaml`](src/content/testimonials.yaml) |
| Legal pages | [`src/content/legal/*.md`](src/content/legal) |
| Situations, roles, care plans, areas, stats, standards | [`src/data/content.ts`](src/data/content.ts) |
| Photos | [`src/assets/photos/`](src/assets/photos) — overwrite files, keep names ([credits](src/assets/photos/CREDITS.md)) |
| Colours, fonts, motion tokens | [`src/styles/global.css`](src/styles/global.css) |
| Social share image, icons | [`public/og/default.jpg`](public/og/default.jpg), [`public/icons/`](public/icons) |

## Before you launch — replace the sample content

The site is complete with **realistic sample content**. These items must be confirmed by Heaven Nursing Care (see `docs/02` §15):

- [ ] **`src/site.ts`** — values marked `SAMPLE`: office hours, response time ("within 30 minutes"), shift hours, email (hidden while empty), medical reviewer name, social links.
- [ ] **Testimonials** — the six entries are samples and display a visible "Sample" label. Replace with real, consented reviews (`sample: false`, `consent: true`); the build refuses a non-sample testimonial without consent.
- [ ] **Areas served** — list in `src/data/content.ts` (also drives the map, form and stats).
- [ ] **Operational answers** in `faqs.yaml` and service pages — payment methods, notice periods, staff vetting steps, same-day availability, female/male staff, replacement time.
- [ ] **Paramedical support (S10)** and **Mother & baby care (S11)** — confirm the inclusions and staff (midwife/LHV).
- [ ] **Photos** — currently free-licence Pexels placeholders; replace with an original shoot of real staff.
- [ ] **Legal pages** — drafts; have them reviewed by a lawyer qualified in Pakistan.
- [ ] **Domain** — add `public/CNAME` and set the domain in GitHub Pages settings.

## Motion & accessibility

Motion follows `docs/03`: capable desktops (tier **A**) get smooth scrolling, the pinned day→night story, parallax and the live 3D Care Kit; phones (**B**) get light CSS motion; `prefers-reduced-motion` or Save-Data (**C**) get a static page with all content intact. Force a tier for testing with `?motion=A`, `?motion=B` or `?motion=C`.
All content works without JavaScript except the forms (which then show WhatsApp/phone alternatives).

## Project structure

```
src/
  site.ts               business details + link helpers (base-path aware)
  content.config.ts     content schemas
  content/              services, FAQs, testimonials, legal (Markdown/YAML)
  data/                 structured page data + photo imports
  layouts/Base.astro    <head>, SEO, JSON-LD, header/footer, motion tier
  components/           Header, Footer, CareKit, CareFinder, AroundTheClock, …
  pages/                30 routes (see docs/01 §3)
  scripts/              motion.ts, motion-a.ts (desktop), care-kit.ts (3D), wa-form.ts
public/                 favicon, icons, OG image, .nojekyll
docs/                   specification (structure, copy, motion, technology)
```
