# 04 · Technology, Tools & Plugins

**Project:** Heaven Nursing Care 24/7 — marketing & company website
**Version:** 1.0 · 6 October 2026
**Read with:** [01 Structure](01-website-structure.md) · [02 Content & Copy](02-content-copywriting.md) · [03 Motion & 3D](03-motion-3d-interaction.md)

> **Selection rule.** Every tool must earn its place, in line with the brief ("do not add technology merely for visual decoration"). Prefer, in order: **the web platform** (HTML, CSS and browser APIs), then **what the framework already includes**, then **one well-chosen library**. Free and open-source tools are preferred. Every paid service has a free starting tier. Licence terms and prices below reflect the time of writing; **verify them before procurement.**

---

## 1. Architecture in one picture

```
                    ┌──────────────────────── Cloudflare (DNS · CDN · WAF · Turnstile) ───────────────────────┐
Visitor (mostly     │                                                                                        │
mobile, Pakistan) ─▶│  Static HTML/CSS/JS (Astro build, served from edge)  +  On-demand: /book-a-visit, /_actions │
                    └──────────────────────────────────────────────┬─────────────────────────────────────────┘
                                                                   │ lead (validated, spam-checked)
                                         ┌─────────────────────────┼─────────────────────────┐
                                         ▼                         ▼                         ▼
                                  Email (Resend) ──▶ ops inbox   Lead log (Google Sheet)   Analytics event (Umami, no PII)
WhatsApp & calls go straight from the browser to the phone (wa.me / tel:) → WhatsApp Business App on the business phone.
Content: Markdown/YAML in Git (Astro content collections) → build → deploy on every push.
```

- **No database, no server to patch, no WordPress.** The site is static at the edge, with two small on-demand routes (the booking page and the form action).
- **JavaScript only where interaction needs it:** two Preact islands, a few small vanilla scripts, and GSAP and Three.js loaded only for capable desktops (doc 03 §3.2).

---

## 2. Stack at a glance

| Layer | Choice | Cost | Alternative |
|---|---|---|---|
| Framework | **Astro** | Free, MIT | Next.js |
| Language | **TypeScript** (strict) | Free | — |
| Interactive islands | **Preact** (2 islands) | Free, MIT | React, Svelte |
| UI components | **Custom Astro components + native HTML** (`<dialog>`, `<details>`, popover) | Free | shadcn/ui (React) |
| Styling | **Tailwind CSS v4** | Free, MIT | Vanilla CSS + custom properties |
| Animation | **GSAP** (core, ScrollTrigger) | Free (GSAP standard licence) | Motion (motion.dev) |
| Native motion | **CSS transitions, View Transitions, scroll-driven animations** | Free | — |
| Smooth scroll | **Lenis** (desktop only) | Free, MIT | None (native) |
| 3D | **Three.js** + **Blender** + **glTF Transform** | Free (MIT / GPL tools) | OGL, React Three Fiber, Spline |
| Animated illustrations | **SVG + CSS/GSAP** | Free | dotLottie, Rive |
| Images | **`astro:assets` + sharp** | Free | Cloudflare Images (paid) |
| Video | **ffmpeg** pipeline, self-hosted short loops | Free | Cloudflare Stream, Mux (paid) |
| Icons | **Lucide + Healthicons** via `astro-icon` | Free | Phosphor, Tabler |
| Fonts | **Fraunces + Inter** (self-hosted via Fontsource) | Free, OFL | — |
| Content / CMS | **Astro content collections** → **Keystatic** if the client edits | Free | Sanity, Decap |
| Forms | **Native forms + Astro Actions + Zod + Turnstile** | Free | Web3Forms, Formspree |
| Email delivery | **Resend** | Free tier | Postmark, Brevo |
| Leads / CRM | **wa.me links + WhatsApp Business App + Google Sheet lead log** → Zoho CRM / HubSpot | Free | — |
| Maps | **Static map image → Google Maps link** | Free | Click-to-load embed |
| Analytics | **Umami** (cookieless) + **Google Search Console** | Free tier | Plausible, Cloudflare Web Analytics |
| Ads tracking (only if ads run) | GA4 + GTM (Consent Mode v2), Meta Pixel + Conversions API | Free | — |
| Consent | **None needed** with cookieless analytics → **vanilla-cookieconsent** if ad pixels are added | Free, MIT | CookieYes, Cookiebot |
| SEO | `@astrojs/sitemap`, custom `<Seo>` + JSON-LD components | Free | — |
| Hosting / CDN | **Cloudflare Workers (static assets) + `@astrojs/cloudflare`** | Free plan | Vercel, Netlify |
| Security | Cloudflare WAF and rate limits, `_headers` (CSP, HSTS), Turnstile | Free plan | — |
| Monitoring | Uptime monitor (Better Stack / UptimeRobot) + Cloudflare logs | Free tier | Sentry (optional) |
| QA | Playwright + axe-core, Lighthouse CI | Free | Pa11y |
| Design | Figma, Blender | Figma paid seats; Blender free | Penpot |

---

## 3. Recommendations in detail

### 3.1 Frontend framework: **Astro**
- **Why:** the site is content-first (about 30 pages) with a handful of interactive parts. Astro renders HTML at build time and ships **zero JavaScript by default**, hydrating only the components that need it ("islands").
- **Used for:** every page, routing, layouts, content collections (§3.16), image pipeline (§3.12), sitemap, i18n routing (Phase 2 Urdu), form actions (§3.17).
- **Advantages:**
  - The best-in-class Core Web Vitals profile for marketing sites.
  - Framework-agnostic islands.
  - Built-in image optimisation, content schemas, prefetching and i18n.
  - Simple mental model for any frontend developer.
- **Drawbacks:**
  - Smaller ecosystem than Next.js.
  - Complex app-like features (patient portals, dashboards) would be more natural in an app framework. They are out of scope.
- **Performance impact:** strongly positive. A baseline page ships HTML and CSS only.
- **Cost / licence:** free, MIT.
- **Alternative:** **Next.js** (App Router) if the team is React-only or a logged-in product is planned. It costs more JavaScript per page.

### 3.2 Language: **TypeScript (strict)**
- **Why:** type-checked content schemas, form validation and component props catch errors at build time, not on a patient's phone.
- **Used for:** all scripts, islands, actions and content config.
- **Advantages:** safer refactors; schema-driven content.
- **Drawbacks:** a small learning cost for non-TypeScript developers.
- **Performance impact:** none at runtime.
- **Cost / licence:** free, Apache-2.0.
- **Alternative:** JavaScript with JSDoc types.

### 3.3 Interactive islands: **Preact**
- **Why:** two widgets hold enough state to justify a component model: the **Care Finder** (doc 01 §8.4) and the **two-step booking form** (doc 01 §8.3). Everything else is vanilla TypeScript.
- **Used for:** `CareFinder.tsx` (`client:visible`), `BookingForm.tsx` (`client:idle`). Both are server-rendered by Astro, so their HTML exists before hydration. The booking form posts without JavaScript.
- **Advantages:** a React-compatible API (any React developer can work on it) at about 4 KB gzipped; official `@astrojs/preact` integration.
- **Drawbacks:** some React-only libraries need `preact/compat` or don't work, which is irrelevant for these two widgets.
- **Performance impact:** about 4 KB of runtime plus component code (~5–10 KB), on two pages only.
- **Cost / licence:** free, MIT.
- **Alternative:** **React** (if you want shadcn/ui, at roughly +40 KB) or **Svelte** (compiles away the runtime).

### 3.4 UI components: **custom Astro components + native HTML elements** (no UI kit)
- **Why:** the brief rejects a "generic template" look, and UI kits produce exactly that. The few complex patterns needed now exist natively in the browser.
- **Used for:**
  - Header, mega menu, footer, mobile action bar, cards, CTA band and trust strip as Astro components.
  - Mobile menu as `<dialog>` (focus trapping and Esc for free).
  - Accordions as `<details>`/`<summary>`.
  - Tooltips and mini-panels via the `popover` attribute.
  - Date input as `<input type="date">`.
- **Advantages:** zero dependency weight; accessibility comes from the platform; full design control.
- **Drawbacks:** the team must follow the WAI-ARIA Authoring Practices for the mega menu and the Care Finder; there's no library doing it for them.
- **Performance impact:** the lightest possible.
- **Cost / licence:** free.
- **Alternative:** **shadcn/ui** (copy-in components on Radix) if the islands move to React.

### 3.5 Styling: **Tailwind CSS v4**
- **Why:** design tokens (colour, type scale, radii and motion, doc 03 §2–3) live in one `@theme` block. It gives fast, consistent implementation of a custom design and purges unused CSS automatically.
- **Used for:** all styling; tokens are exposed as CSS custom properties for motion scripts too. **Use logical utilities** (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) from day one, so the Phase 2 Urdu right-to-left version costs almost nothing.
- **Advantages:** small production CSS; tokens in CSS; works with Astro out of the box.
- **Drawbacks:** utility-heavy markup; designers need to name tokens consistently in Figma.
- **Performance impact:** typically 10–25 KB gzipped of CSS.
- **Cost / licence:** free, MIT.
- **Alternative:** vanilla CSS with custom properties and cascade layers. It's perfectly viable; choose it if the team prefers.

### 3.6 Animation library: **GSAP** (core + ScrollTrigger)
- **Why:** the **scrubbed and pinned** scroll stories (Around the Clock M28, How-it-works path M27, hero parallax M20, image parallax M36) and the Care Kit open sequence (M23) need precise timelines and scroll syncing. Native CSS can't yet do this reliably across browsers.
- **Used for:** Tier A only (desktop, doc 03 §3.2), **dynamically imported**. Phones never download it. `gsap.matchMedia()` handles reduced motion and breakpoints. DrawSVG and SplitText are available if needed later; neither is required by the current spec.
- **Advantages:** industry standard; robust ScrollTrigger (pinning, snapping, scrub); excellent performance; framework-agnostic.
- **Drawbacks:** about 45 KB gzipped for core plus ScrollTrigger. Its licence is free but not an OSI open-source licence (it forbids use in tools that compete with Webflow, which is irrelevant here).
- **Performance impact:** moderate, but only on capable desktops and off the critical path.
- **Cost / licence:** free for commercial use, including all plugins (GSAP "standard" licence since 2025).
- **Alternative:** **Motion** (`motion` package, vanilla API) has a smaller footprint and good scroll support, but pinning is weaker.

### 3.7 Native web motion: **CSS transitions, View Transitions API, scroll-driven animations**
- **Why:** most of the motion (reveals, hovers, menus, accordions, counters, the ring, the chat) needs no library.
- **Used for:**
  - Micro-interactions and reveals (CSS plus IntersectionObserver, doc 03 §3.3).
  - **Cross-document View Transitions** for page transitions and the card-to-hero icon morph (M11), with no JavaScript.
  - `animation-timeline: view()` as an optional enhancement for simple parallax.
  - `interpolate-size` for accordion height.
- **Advantages:** zero bytes; runs on the compositor; degrades to "instant" in unsupported browsers.
- **Drawbacks:** uneven browser support for the newest features (View Transitions: Chromium and Safari; scroll-driven animations: Chromium, with others catching up). Treat them as progressive enhancement.
- **Performance impact:** best possible.
- **Cost / licence:** free.
- **Alternative:** —

### 3.8 Smooth scrolling: **Lenis** (desktop only)
- **Why:** the brief asks for smooth scrolling. Lenis gives gentle inertia on desktop while keeping native scroll semantics.
- **Used for:** Tier A only; synced with ScrollTrigger. Off for touch, reduced motion and Save-Data (doc 03 M39).
- **Advantages:** tiny; doesn't hijack scroll position; works with `position: sticky`.
- **Drawbacks:** any smooth-scroll layer is a source of edge-case bugs (anchors, find-in-page, modals). **It adds polish, not function, and can be removed with zero loss of function.**
- **Performance impact:** a few KB; negligible CPU.
- **Cost / licence:** free, MIT.
- **Alternative:** no library: native scrolling plus `scroll-behavior: smooth` for anchors.

### 3.9 3D: **Three.js** (runtime) + **Blender** (authoring) + **glTF Transform** (optimisation)
- **Why:** one real-time 3D scene, the **Care Kit** on the Services hub (M23), turns the service list into an explorable object. All other 3D (11 service icons) is **pre-rendered** in Blender and shipped as images, which gives a premium look at no runtime cost.
- **Used for:** Three.js with `GLTFLoader` and `MeshoptDecoder`, plus `OrbitControls` (zoom and pan disabled, rotation clamped). Pipeline:

  ```
  Blender (.blend) ─▶ export .glb ─▶ gltf-transform optimize in.glb care-kit.glb --compress meshopt --texture-compress webp
  ```

  Textures are WebP (≤ 2 atlased materials). KTX2 would save GPU memory, but its transcoder adds several hundred KB, which isn't worth it for one small scene.
- **Advantages:** the most mature WebGL library; large community; vanilla API (no React needed); glTF is the standard 3D web format.
- **Drawbacks:** the library is large (≤ 180 KB gzipped budget for the chunk); 3D production needs a 3D artist; it needs a WebGL2 fallback path.
- **Performance impact:** significant, so it's **isolated**: Tier A only, lazy-loaded on idle near the section, on-demand rendering, paused off-screen, DPR ≤ 1.5. GLB ≤ 800 KB. Phones get a pre-rendered image.
- **Cost / licence:** Three.js MIT; Blender GPL (free); glTF Transform MIT.
- **Alternative:** **OGL** (much smaller, but more hand-written code); **React Three Fiber** (only if the site moves to React); **Spline** (fast for designers to prototype, but the runtime is heavy and the free tier has export limitations; good for concepting the scene, not for production here).

### 3.10 WebGL vs WebGPU
- **Decision: WebGL2 via Three.js. No WebGPU.**
- **Why:** one small, stylised scene doesn't benefit from WebGPU's compute or throughput. WebGL2 has the widest support, including the older devices this audience uses.
- **When to revisit:** only if a future feature needs GPU compute or very large particle counts. Three.js's WebGPU renderer would then be a drop-in path with WebGL2 fallback.
- **Particles (M42)** use a **2D canvas**, not WebGL.

### 3.11 Animated illustrations: **SVG + CSS/GSAP** (dotLottie or Rive only if needed)
- **Why:** the illustrations (process steps, day/night scenes, ECG line, success check, 404 door, Lahore map) are line art. SVG stroke animation covers them with no runtime.
- **Used for:** M27, M28 scenes, M31, M33, M38 and M41.
- **Advantages:** tiny, crisp at any size, styleable with tokens, accessible.
- **Drawbacks:** complex character animation is laborious in SVG.
- **Performance impact:** negligible.
- **Cost / licence:** free.
- **Alternatives (only if a motion designer delivers After Effects or state-machine animations):**
  - **dotLottie** (`@lottiefiles/dotlottie-web`, MIT; ships a WASM renderer, so check its weight).
  - **Rive** (open-source runtimes, freemium editor; excellent for interactive state machines; also a WASM runtime).

### 3.12 Image optimisation: **`astro:assets` + sharp**
- **Why:** photos are the biggest weight on the site and the main trust driver.
- **Used for:** every raster image through `<Picture>`: **AVIF with WebP fallback**, responsive `srcset`/`sizes`, explicit dimensions (no CLS), `loading="lazy"` below the fold. The **LCP image** (hero poster) gets `loading="eager"` and `fetchpriority="high"`. A dominant-colour placeholder sits behind each image (doc 03 M12).
- **Advantages:** automatic at build; no external service; deterministic output.
- **Drawbacks:** build time grows with image count (fine at this scale). Images from a future hosted CMS need a remote-image configuration.
- **Performance impact:** strongly positive. Targets: hero poster ≤ 120 KB, content images ≤ 150 KB at 1280w.
- **Cost / licence:** free (sharp is Apache-2.0).
- **Alternative:** **Cloudflare Images** (paid) if images move to a hosted CMS.
- **Source photography:** export at 2560px long edge, sRGB. Faces are retouched lightly, never altered.

### 3.13 Video: **ffmpeg** pipeline, self-hosted short loops
- **Why:** the hero loop (M40) is short and muted, so a streaming service adds nothing. Two encodes plus a poster are enough.
- **Used for:** hero loop (desktop ≤ 2.5 MB, mobile ≤ 1.2 MB). If a long brand film is added (Phase 2), use a click-to-load facade (`lite-youtube-embed` with youtube-nocookie) or a streaming service.

  ```bash
  # AV1 / WebM (first <source>, with codecs in type="video/webm; codecs=av01.0.05M.08")
  ffmpeg -i hero.mov -an -vf "scale=1080:-2,fps=30" -c:v libsvtav1 -crf 38 -preset 6 -g 60 hero-1080.webm
  # H.264 / MP4 fallback (Safari without AV1 hardware decode, older Android)
  ffmpeg -i hero.mov -an -vf "scale=1080:-2,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart hero-1080.mp4
  # Mobile versions: scale=720:-2 and raise CRF until the size is within budget. Poster: export one frame, then encode it as AVIF via sharp.
  ```

- **Advantages:** smallest files; no third-party scripts; full control.
- **Drawbacks:** no adaptive bitrate, which is fine for 10-second loops but not for long films.
- **Performance impact:** loads after `load`; poster-only on Save-Data or slow networks.
- **Cost / licence:** free (ffmpeg LGPL/GPL).
- **Alternative:** **Cloudflare Stream** or **Mux** (paid, adaptive streaming) for long-form video only.

### 3.14 Icons: **Lucide** (UI) + **Healthicons** (medical) via **`astro-icon`**
- **Why:** a consistent line-icon set for UI (Lucide), plus a free medical-specific set (Healthicons) for clinical concepts Lucide lacks.
- **Used for:** navigation, trust strip, checklists, contact cards, form states (Lucide); service and procedure glyphs at small sizes (Healthicons). The **3D service icons** (doc 03 §2.5) are separate, pre-rendered images.
- **Advantages:** `astro-icon` inlines only the icons actually used, as SVG at build time (zero runtime, no icon font); both sets are available as Iconify JSON packages.
- **Drawbacks:** two visual styles need aligning (stroke width 1.75–2px, rounded caps).
- **Performance impact:** under 1 KB per icon, inline.
- **Cost / licence:** free. Lucide is ISC; Healthicons is free and open-source (MIT at time of writing; verify).
- **Alternative:** **Phosphor** or **Tabler** icons.

### 3.15 Typography: **Fraunces** (display) + **Inter** (text/UI), self-hosted via **Fontsource**
- **Why:**
  - **Fraunces** is a soft, warm variable serif that gives the premium, human, "compassionate" character and avoids the template look.
  - **Inter** is highly legible at the 18px body size, with tabular numbers for stats and vitals and broad language support.
- **Used for:** the type scale in doc 03 §2.2.
- **Phase 2 Urdu:** **Noto Nastaliq Urdu** (Google Fonts, OFL), loaded only on `/ur/` pages. It's large, so subset it.
- **Delivery:**
  - Self-host the variable fonts via `@fontsource-variable/fraunces` and `@fontsource-variable/inter`, Latin subset only.
  - Preload at most 2 files, with `font-display: swap`.
  - Add metric-matched fallback `@font-face` rules (`size-adjust`, `ascent-override`) so swapping causes no layout shift. That's a few lines of CSS; Fontaine or Capsize can calculate the values.
- **Advantages:** no third-party font requests (privacy and speed); consistent rendering.
- **Drawbacks:** variable font files can be heavy. If they exceed the budget, ship static 400/500/600 weights instead.
- **Performance impact:** ≤ 160 KB total WOFF2.
- **Cost / licence:** free, SIL Open Font License.
- **Alternatives:** **Atkinson Hyperlegible Next** for body text if usability testing with older users shows a need; **Newsreader** as an alternative display serif.

### 3.16 Content management: **Astro content collections** → **Keystatic** when the client edits
- **Why:** the content is about 30 pages that change rarely. Typed Markdown and YAML files in Git are the simplest reliable "CMS": versioned, reviewable and free. Schemas also **enforce content rules**, for example that a testimonial can't build without consent.
- **Used for:** services, FAQs (one source reused on many pages), testimonials, team roles, areas, stats and legal pages.

  ```ts
  // src/content.config.ts (excerpt)
  import { defineCollection, z } from 'astro:content';
  import { glob, file } from 'astro/loaders';

  const services = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/services' }),
    schema: ({ image }) => z.object({
      code: z.string().regex(/^S\d{2}$/),            // S01–S11
      h1: z.string(), subhead: z.string(), card: z.string().max(90),
      category: z.enum(['medical', 'nursing', 'daily']),
      included: z.array(z.string()).min(6),         // thin-content rule, doc 01 §7.7
      providedBy: z.array(z.string()),
      related: z.array(z.string()).length(3),
      waCode: z.string(),                           // doc 02 §11.3
      seo: z.object({ title: z.string().max(60), description: z.string().max(155) }),
      reviewedBy: z.string().optional(), lastReviewed: z.coerce.date().optional(),
      icon: image(),
    }),
  });

  const testimonials = defineCollection({
    loader: file('src/content/testimonials.yaml'),
    schema: z.object({
      quote: z.string(), name: z.string(), relation: z.string(), area: z.string(),
      services: z.array(z.string()), date: z.coerce.date(),
      consent: z.literal(true),                     // build fails without recorded consent
    }),
  });
  ```

  Other collections follow the same pattern: `faqs`, `stats` (with a required `source` and `asOf`), `areas`, `teamRoles` and `legal`.

  **`src/site.ts`** holds the business name, phone, WhatsApp number, address and social URLs **once**. Header, footer, schema and links all read from it, which guarantees NAP consistency.
- **Advantages:** zero cost; no CMS outage risk; type-safe; content reviewed in pull requests.
- **Drawbacks:** non-technical staff can't edit Markdown in Git comfortably.
- **Upgrade path:** if the client wants to edit testimonials, FAQs or areas themselves, add **Keystatic** (free, MIT). It's a Git-based admin UI over the **same files**, so there's no migration. Confirm its admin routes run on the chosen hosting adapter before committing.
- **Performance impact:** none at runtime (everything resolves at build).
- **Cost / licence:** free.
- **Alternatives:**
  - **Sanity** (hosted studio, generous free tier) for multiple non-technical editors; content changes trigger rebuilds via webhook.
  - **Decap CMS** (Git-based, older).

### 3.17 Forms: **native HTML forms + Astro Actions + Zod + Cloudflare Turnstile**
- **Why:** three forms (booking, contact, partner) carry the main conversions and must be fast, accessible, spam-resistant and **work without JavaScript**.
- **Used for:**
  - **One Astro Action** (`lead`, with `accept: 'form'`) that takes a `form` discriminator (booking, contact or partner).
  - **Zod** validation on the server (Zod is bundled with Astro).
  - **Turnstile** token verified server-side, plus a hidden honeypot field.
  - **On success:** send the email (§3.18), append to the lead log, then redirect 303 to P16 with a one-time flag so the conversion event fires once.
  - **On error:** re-render with inline errors and a focused error summary.
  - **With JavaScript:** the Preact form calls the same action and shows errors without reloading.

  `/book-a-visit` opts out of prerendering (`export const prerender = false`) so it can read the action result.
- **Advantages:** no third-party form vendor; progressive enhancement; one validated pipeline; health-related lead data never passes through a form SaaS.
- **Drawbacks:** the team owns the email and lead-log integration code (about 100 lines).
- **Performance impact:** Turnstile adds a small script on form pages only. The rest is server-side.
- **Cost / licence:** free (Turnstile is free).
- **Alternatives:** **Web3Forms** or **Formspree** (hosted endpoints, quickest setup, but lead data goes to a third party); **Tally** embeds (not recommended: heavy, and they break the brand experience).

### 3.18 Contact & CRM integrations
| Tool | Why / used for | Advantages | Drawbacks | Perf | Cost | Alternative |
|---|---|---|---|---|---|---|
| **`wa.me` deep links** | WhatsApp is the primary channel: `https://wa.me/923244744447?text=…` with page reference codes (doc 02 §11.3) | Zero code, zero weight; attribution via the ref code | Attribution relies on staff logging the ref code | None | Free | — |
| **WhatsApp Business App** (on the business phone) | Where conversations happen: greeting and away messages, quick replies, labels (New lead / Assessed / Active / Closed) as a lightweight CRM, service catalogue | Familiar; free; works today | Manual; one device plus linked devices | — | Free | WhatsApp Business Platform (below) |
| **`tel:` links** | Calls | Native | — | None | Free | — |
| **Resend** (transactional email) | Delivers form leads to the operations inbox; HTML-escaped content | Simple API; good deliverability with SPF/DKIM/DMARC on the domain | Another account to manage | Server-side only | Free tier (~3,000 emails/month) | **Postmark**, **Brevo**; Cloudflare's Worker email sending if Email Routing handles the domain's mail |
| **Google Sheet lead log** (Apps Script web-app webhook with a shared secret) | One row per web lead (timestamp, form, services, plan, area, contact preference, ref); staff add WhatsApp and call leads manually with their ref codes | Free; everyone already knows spreadsheets; easy reporting | Not a real CRM; access must be restricted to named staff | Server-side only | Free | Straight to a CRM |
| **Zoho CRM** or **HubSpot CRM** (when needed) | Pipeline, reminders, reporting once lead volume or team size outgrows the sheet | Proper CRM; free entry tiers | Setup and training effort | Server-side only | Free tiers, then paid | — |
| **WhatsApp Business Platform (Cloud API)**, Phase 2 | Automated lead acknowledgements, staff notifications, template messages | Automation; multi-agent inboxes via a provider | Meta business verification; per-message pricing for business-initiated templates; check whether the number can stay on the Business App at the same time (otherwise use a second number) | None on site | Paid per message | Provider dashboards (360dialog, Twilio, Wati) |

**Recommendation:** launch with **wa.me + Business App + Resend email + Sheet log**. Move to a CRM or the WhatsApp API only when the sheet becomes a bottleneck.

### 3.19 Maps: **static map image → Google Maps link**
- **Why:** visitors need directions to 176-A Pak Arab Society. A live Google Maps embed loads about 1 MB of third-party JavaScript and sets cookies.
- **Used for:** P14 and P02. A designed static map (or a Static Maps API image saved at build time) links to `https://www.google.com/maps/dir/?api=1&destination=…` ("Get directions"). The P12 coverage map is a custom SVG (doc 03 M33).
- **Advantages:** instant; no cookies; no API key at runtime.
- **Drawbacks:** not interactive in place (one tap opens the Maps app, which is better on mobile anyway).
- **Performance impact:** one image (≤ 60 KB).
- **Cost / licence:** free (respect Google's terms when caching Static Maps images; a designed map avoids the question).
- **Alternative:** a click-to-load embed facade.

### 3.20 Analytics: **Umami** (cookieless) + **Google Search Console**
- **Why:** measure leads by channel and placement (doc 01 §1) without cookies, which means **no consent banner** and no health-adjacent tracking.
- **Used for:**
  - Page views and the event spec in §7, using `data-umami-event` attributes on links and buttons (no extra JavaScript).
  - **Search Console** for search performance, indexing and Core Web Vitals field data.
  - **Bing Webmaster Tools** as a quick bonus.
- **Advantages:** privacy-friendly; tiny script (~2 KB); simple dashboards the client can read; custom events.
- **Drawbacks:** no ad-platform integration, and less depth than GA4.
- **Performance impact:** negligible (deferred).
- **Cost / licence:** free (open-source, MIT). Umami Cloud has a free hobby tier and paid plans; it can also be self-hosted.
- **Alternatives:** **Plausible** (paid, cookieless); **Cloudflare Web Analytics** (free, cookieless, but **no custom events**).
- **Only if paid ads run:**
  - **GA4 + Google Tag Manager** with **Consent Mode v2**, for Google Ads conversions.
  - **Meta Pixel + Conversions API**, for Facebook and Instagram ads, which are likely relevant for the Pakistani and diaspora audience.

  Both set cookies and need the consent setup in §3.21. **Never send form contents, services or free text to ad platforms.** Review Google's and Meta's healthcare advertising and data policies before enabling.
- **Not recommended:** session-recording tools (Hotjar, Clarity) on form pages, because health-related inputs would be recorded.

### 3.21 Cookie / consent management
- **Default: no banner.** Umami is cookieless; the site sets no non-essential cookies. Turnstile is security-related. Disclose everything in the Privacy Policy (P17).
- **If GA4 or Meta Pixel are added:** use **vanilla-cookieconsent** (open-source, MIT, lightweight, accessible) wired to **Google Consent Mode v2**; add the P21 Cookie Policy and a "Cookie settings" footer link. Tags load only after consent.
  - **Advantages:** free; no vendor lock-in.
  - **Drawbacks:** manual cookie inventory.
  - **Performance impact:** ~10–15 KB.
- **Paid alternatives:** **CookieYes** or **Cookiebot** (automatic scanning, consent logs). Worth it only if many tags are added.

### 3.22 SEO tooling
- **`@astrojs/sitemap`:** generates `sitemap-index.xml`, excluding P16 and the 404 (free, MIT).
- **A custom `<Seo>` component** (about 40 lines): title, description, canonical, Open Graph and Twitter tags, `robots`. No plugin is needed. **Test the link preview inside WhatsApp**, because most sharing of this site will happen there.
- **A custom `<JsonLd>` component** that renders schema from `site.ts` and page data (doc 01 §10.2). Use `schema-dts` for TypeScript types (optional, Apache-2.0).
- **Redirects:** `public/_redirects` (served as real 301s by Cloudflare). Every URL change gets an entry.
- **Audits:** Screaming Frog SEO Spider (free up to 500 URLs), Search Console, Rich Results Test.
- **Off-site:** Google Business Profile (doc 01 §10.4), the single biggest local SEO lever.

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://[domain]/#business",
  "name": "Heaven Nursing Care 24/7",
  "url": "https://[domain]/",
  "logo": "https://[domain]/logo.png",
  "telephone": "+92-324-4744447",
  "address": { "@type": "PostalAddress", "streetAddress": "176-A Pak Arab Society",
               "addressLocality": "Lahore", "addressRegion": "Punjab", "addressCountry": "PK" },
  "openingHoursSpecification": { "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00", "closes": "23:59" },
  "areaServed": { "@type": "City", "name": "Lahore" },
  "sameAs": ["[Facebook URL]", "[Instagram URL]", "[Google Business Profile URL]"]
}
```

Service pages add `{"@type": "Service", "serviceType": "…", "provider": {"@id": "https://[domain]/#business"}, "areaServed": {"@type": "City", "name": "Lahore"}}` plus `MedicalWebPage` with `reviewedBy` and `lastReviewed`.

### 3.23 Performance tooling & techniques
- **Astro prefetch** (`prefetch: { defaultStrategy: 'hover' }`; `viewport` for the main CTAs) makes navigation feel instant, especially when combined with View Transitions.
- **Lighthouse CI** (GitHub Action) on P01, P06, one S-page and P15. It fails the build when the budgets in §8 are exceeded.
- **WebPageTest** or **PageSpeed Insights** on a throttled mid-range Android profile, plus field data from Search Console.
- **`rollup-plugin-visualizer`** to inspect bundle size when adding any dependency.
- **Caching:** hashed `/_astro/*` assets get `Cache-Control: public, max-age=31536000, immutable`; HTML is short-lived and revalidated at the edge.
- **Rules:**
  - No third-party scripts on the critical path.
  - Lazy-load everything below the fold.
  - Tier A extras load only after `load` and idle.
- **Cost:** free.

### 3.24 Accessibility tooling
- **Target:** WCAG 2.2 AA (doc 01 §11).
- **Automated:**
  - **axe-core** via `@axe-core/playwright` in CI on every template (MPL-2.0).
  - **Astro dev toolbar** accessibility audit during development.
  - **Lighthouse** accessibility score of 100.
  - **eslint-plugin-jsx-a11y** for the Preact islands.
- **Manual (each release):**
  - Keyboard-only pass.
  - **NVDA** + Chrome (free), **VoiceOver** + Safari (macOS and iOS), **TalkBack** + Chrome.
  - 200% zoom and 400% reflow; reduced-motion pass.
  - A short test with 2–3 older users (most valuable of all).
- **Explicitly rejected: accessibility overlay widgets.** They don't fix underlying issues, often interfere with assistive technology, and give false assurance.
- **Cost:** free.

### 3.25 Hosting & deployment: **Cloudflare (Workers with static assets) + GitHub**
- **Why:** global edge with **locations in Pakistan** (verify the current list on Cloudflare's network page), so pages load fast for local users. The free plan covers this site comfortably. DNS, CDN, WAF, Turnstile and hosting sit in one account.
- **Used for:**
  - Static assets served from the edge.
  - The on-demand route (`/book-a-visit`) and actions (`/_actions/*`) run as a Worker via `@astrojs/cloudflare`.
  - **GitHub** holds the repo. Every pull request gets a preview deployment; merging to `main` deploys production.
  - Secrets are stored as Cloudflare secrets.
- **Advantages:** fast in-region delivery; generous free tier; no servers; instant rollbacks.
- **Drawbacks:** the Workers runtime isn't full Node.js (use `nodejs_compat` if a library needs it; Resend's HTTP API and Turnstile verification work with plain `fetch`).
- **Performance impact:** strongly positive (low TTFB at the edge).
- **Cost / licence:** free plan (static asset requests are free; Worker invocations, which here are only forms and the booking page, are far below free limits).
- **Alternatives:** **Vercel** or **Netlify** (excellent developer experience; check edge latency to Pakistan).
- **Domain:** `.com` and/or `.pk` (via PKNIC) [CONFIRM]. **Domain email** (Google Workspace or Zoho Mail) with SPF, DKIM and DMARC, for credibility and Resend deliverability.

### 3.26 CDN: **Cloudflare** (included)
- **Used for:**
  - Caching and compression (Brotli), HTTP/3.
  - Tiered caching.
  - Image and video delivery from the same edge.
  - Cache rules per §3.23.
- **Advantages:** no extra vendor; in-region edges.
- **Drawbacks:** none at this scale.
- **Performance impact:** positive.
- **Cost:** free.
- **Alternative:** the CDN built into Vercel or Netlify.

### 3.27 Security
- **Attack surface:** small by design: a static site, no CMS login on the public site, no database, and one form endpoint.

| Control | Implementation |
|---|---|
| HTTPS & HSTS | Cloudflare "Always Use HTTPS"; `Strict-Transport-Security: max-age=31536000; includeSubDomains` (add `preload` only once every subdomain is HTTPS) |
| Security headers | `public/_headers`: `Content-Security-Policy` (below), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`, `frame-ancestors 'none'` |
| CSP (starting point; deploy as `Report-Only` first) | `default-src 'self'; script-src 'self' 'sha256-[tier script hash]' https://challenges.cloudflare.com [analytics script origin]; connect-src 'self' [analytics collection origin]; frame-src https://challenges.cloudflare.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'` |
| Bot and spam protection | Turnstile (server-verified) + honeypot + Zod validation + a Cloudflare **rate-limiting rule** on `POST /_actions/*` (available on the free plan at time of writing) |
| Input handling | All user input HTML-escaped in lead emails and the sheet; length limits on every field; no file uploads |
| Secrets | Cloudflare secrets only; never in the repo or in `PUBLIC_` variables |
| Accounts | 2FA on Cloudflare, GitHub, Google (sheet, Search Console, GBP), Resend, Meta; least-privilege access |
| Data minimisation & retention | No diagnosis or patient name on web forms (doc 01 §8.3); lead log restricted to named staff; delete web leads after [CONFIRM: e.g. 12 months, per legal advice] |
| Dependencies | Lockfile committed; **Renovate** or **Dependabot** weekly; `pnpm audit` in CI |
| Disclosure | `/.well-known/security.txt` with a contact email |
| Email authentication | SPF, DKIM and DMARC (`p=quarantine` after monitoring) for the sending domain |

### 3.28 Monitoring
- **Uptime:** **Better Stack** or **UptimeRobot** free tier (check commercial-use terms). Monitor the home page and run a synthetic check of the form action. Alerts go to email and the phone.
- **Errors:** **Cloudflare Workers logs** for the action are enough at launch. **Sentry** (free developer tier) is optional, and only if form failures need deeper diagnosis.
- **Search and CWV:** Search Console alerts.
- **Lead pipeline check:** a weekly test submission (tagged `TEST`) to confirm email and sheet delivery.

### 3.29 Developer tooling & QA

| Tool | Purpose | Licence |
|---|---|---|
| **pnpm** | Fast, strict package manager | MIT |
| **ESLint** (`eslint-plugin-astro`, `eslint-plugin-jsx-a11y`) | Code quality and accessibility linting | MIT |
| **Prettier** (`prettier-plugin-astro`, `prettier-plugin-tailwindcss`) | Formatting, class ordering | MIT |
| **Playwright** | Smoke tests: navigation, all three forms end-to-end (with Turnstile test keys), Care Finder outcome, WhatsApp link format, 404; axe checks per template | Apache-2.0 |
| **Lighthouse CI** | Performance, accessibility and SEO budgets in CI | Apache-2.0 |
| **Renovate / Dependabot** | Dependency updates | Free |

### 3.30 Design & production tools
- **Figma** (paid seats): design system, templates T1–T8, prototypes, motion tokens as variables. **Alternative:** Penpot (open source).
- **Blender** (free): Care Kit model and the 11 pre-rendered service icons (doc 03 §2.5).
- **After Effects** (paid, optional): only if dotLottie animations are commissioned.
- **Squoosh / ImageOptim** (free): one-off image checks; the build handles production.

---

## 4. Deliberately not used

| Not using | Reason |
|---|---|
| **WordPress + page builder** (Elementor etc.) | Common locally, but heavier pages, plugin security upkeep, and the motion and performance targets are hard to hit. Consider it only if the client must self-edit layouts with no developer support |
| **Next.js** | Excellent, but ships a React runtime to every page; this site is content-first. Pick it if a logged-in product is planned |
| **React Three Fiber, Spline runtime** | Add React or a heavy runtime for one scene |
| **UI kits** (MUI, Chakra, Bootstrap, daisyUI) | Generic look that the brief rejects; extra weight |
| **Carousel libraries** (Swiper, Slick), **jQuery** | Native scroll-snap plus a few lines do it |
| **Live-chat widgets** (Tawk.to, Intercom) | WhatsApp is the chat; widgets add hundreds of KB and split the channel |
| **Google Maps live embed, Google-reviews widgets** | Heavy third-party JavaScript and cookies; use a static map and curated testimonials with a link to GBP |
| **Accessibility overlays** | They don't make a site accessible |
| **Session recording on forms** | Health-related input privacy |
| **Preloaders, scroll-jacking, cursor libraries** | Doc 03 §1.4 |

---

## 5. Project structure

```
/
├── astro.config.mjs            # integrations: preact, sitemap, icon; adapter: cloudflare; prefetch
├── src/
│   ├── site.ts                 # NAP, phone, WhatsApp, socials, domain: the single source of truth
│   ├── content.config.ts       # collection schemas (§3.16)
│   ├── content/
│   │   ├── services/*.md       # S01–S11
│   │   ├── legal/*.md          # P17–P21
│   │   ├── faqs.yaml  testimonials.yaml  stats.yaml  areas.yaml  team-roles.yaml
│   ├── pages/
│   │   ├── index.astro
│   │   ├── services/index.astro  services/[slug].astro
│   │   ├── care-plans.astro  how-it-works.astro  areas-we-serve.astro  faq.astro  contact.astro
│   │   ├── who-we-care-for/index.astro  who-we-care-for/overseas-families.astro
│   │   ├── for-hospitals-and-doctors.astro
│   │   ├── about/index.astro  about/care-team.astro  about/quality-and-safety.astro
│   │   ├── book-a-visit/index.astro        # prerender = false
│   │   ├── book-a-visit/thank-you.astro    # noindex
│   │   ├── legal/[slug].astro
│   │   └── 404.astro
│   ├── actions/index.ts        # `lead` action: booking | contact | partner
│   ├── layouts/Base.astro  Legal.astro
│   ├── components/             # Header, MegaMenu, MobileMenu, ActionBar, Footer, CtaBand, TrustStrip,
│   │                           # ServiceCard, Seo, JsonLd, EmergencyNotice, Breadcrumbs, WhatsAppLink
│   ├── islands/                # CareFinder.tsx, BookingForm.tsx (Preact)
│   ├── scripts/motion/         # tier.ts, reveal.ts, counters.ts, ring.ts, chat.ts, day-night.ts, care-kit.ts
│   ├── assets/                 # source images and icon renders (optimised by astro:assets)
│   └── styles/global.css       # Tailwind + @theme tokens
├── public/
│   ├── _headers  _redirects  robots.txt  favicon.svg  .well-known/security.txt
│   ├── models/care-kit.glb
│   └── video/hero-1080.webm  hero-1080.mp4  hero-720.webm  hero-720.mp4
└── tests/                      # Playwright smoke + axe
```

---

## 6. Environment variables & secrets

| Variable | Used by | Secret |
|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Form widget | No |
| `TURNSTILE_SECRET_KEY` | `lead` action | **Yes** |
| `RESEND_API_KEY` | Lead email | **Yes** |
| `LEAD_EMAIL_TO` | Lead email recipients | No |
| `LEAD_SHEET_WEBHOOK_URL`, `LEAD_SHEET_TOKEN` | Lead log append | **Yes** |
| `PUBLIC_UMAMI_WEBSITE_ID` | Analytics | No |

Business details (phone, address, socials) live in `src/site.ts`, not in environment variables.

---

## 7. Analytics event specification

Implemented with `data-umami-event` and `data-umami-event-*` attributes (no custom JavaScript), except the form and finder events.

| Event | Fires when | Properties | Counts as |
|---|---|---|---|
| `whatsapp_click` | Any `wa.me` link is clicked | `placement` (header, floating, action_bar, hero, cta_band, service, finder, overseas, partner, contact), `page` | **Lead** |
| `call_click` | Any `tel:` link is clicked | `placement`, `page` | **Lead** |
| `form_submit` | P16 is reached via a successful submission (one-time flag) | `form` (booking, contact, partner), `service` codes, `plan` | **Lead** |
| `form_start` | First interaction with a form | `form` | Micro |
| `form_step_2` | Booking step 2 is reached | — | Micro |
| `finder_complete` | Care Finder results are shown | `who`, `needs` (codes), `duration` | Micro |
| `phone_copy` | Copy-number button | `page` | Micro |
| `care_kit_item` | Care Kit item clicked (3D or list) | `service` | Insight |
| `faq_open` | FAQ item opened | `slug` | Insight |
| `hero_video_pause` | Hero video paused | — | Insight |

**Rules:** never send names, phone numbers, free text or anything typed by the user to analytics. Use service codes only. Review the lead split by placement after 4 weeks (doc 01 §8.2).

---

## 8. Performance budgets (enforced in Lighthouse CI)

| Metric | Budget |
|---|---|
| LCP (p75, mobile, 4G) | ≤ 2.5s (aim ≤ 2.0s) |
| INP (p75) | ≤ 200ms |
| CLS | ≤ 0.05 |
| TTFB (edge) | ≤ 0.5s from Pakistan |
| JavaScript, content pages (gzipped) | ≤ 15 KB |
| JavaScript, P01 / P15, Tier B (gzipped) | ≤ 40 KB (Preact island + small scripts) |
| JavaScript, Tier A extras | GSAP + ScrollTrigger ~45 KB, Lenis a few KB, Three.js chunk ≤ 180 KB on P06 only, all deferred |
| CSS (gzipped) | ≤ 30 KB |
| Fonts | ≤ 160 KB WOFF2 total, ≤ 2 preloaded |
| Above-the-fold images | ≤ 200 KB total |
| P01 initial page weight (mobile, excluding deferred video) | ≤ 1 MB |
| Lighthouse (mobile) | Performance ≥ 90 · Accessibility 100 · Best Practices ≥ 95 · SEO 100 |

---

## 9. Browser & device support

| Level | Browsers | Expectation |
|---|---|---|
| **Full** | Latest 2 versions of Chrome, Edge, Firefox, Safari (macOS and iOS), Samsung Internet | Complete experience per tier |
| **Functional** | iOS Safari 15+, Android Chrome on devices about 5 years old | All content and conversions work; advanced effects degrade |

| Feature | Fallback |
|---|---|
| View Transitions | Normal navigation |
| Scroll-driven animations, `interpolate-size` | Static or instant |
| AV1 video | H.264 MP4 `<source>` |
| AVIF | WebP via `<picture>` |
| WebGL2 | Pre-rendered poster |
| `backdrop-filter` | Solid background |

**Test devices:** doc 03 §6.

---

## 10. Cost summary

| Item | Cost |
|---|---|
| Astro, Tailwind, Preact, GSAP, Lenis, Three.js, icons, fonts, Zod, Playwright, axe, Lighthouse CI | Free |
| Cloudflare (hosting, CDN, DNS, WAF basics, Turnstile) | Free plan |
| Resend, Umami Cloud | Free tiers (paid only if volume grows) |
| Search Console, Google Business Profile, WhatsApp Business App, Google Sheets | Free |
| Domain (.com / .pk) | Annual registration |
| Domain email (Google Workspace / Zoho Mail) | Per user, per month |
| Figma | Per designer seat |
| Keystatic / Sanity (if the client edits) | Free tier |
| Zoho CRM / HubSpot (Phase 2) | Free tier, then per seat |
| WhatsApp Cloud API (Phase 2) | Per message (Meta rate card) |
| **Photo and video shoot** | **Largest non-development cost; budget it explicitly** |
| 3D artist (Care Kit + 11 icons) | Project fee |
| Legal review (P17–P21) | One-off fee |

---

## 11. Technical launch checklist

- [ ] Domain, DNS and HTTPS on Cloudflare; HSTS; `www` ↔ apex redirect decided
- [ ] `_headers` live; CSP moved from Report-Only to enforced after a clean week
- [ ] `_redirects` populated (old site URLs, if any)
- [ ] Sitemap submitted in Search Console and Bing; `robots.txt` allows crawling; P16 is `noindex`
- [ ] Structured data validated (Rich Results Test) on P01, an S-page, P13 and P14
- [ ] Open Graph previews checked **in WhatsApp**, Facebook and LinkedIn
- [ ] All three forms tested end-to-end in production (email received, sheet row added, P16 event fires once)
- [ ] Turnstile production keys set; rate-limit rule active
- [ ] Every `wa.me` link opens the right number with the right prefill; `tel:` links work on Android and iOS
- [ ] Analytics events verified in the Umami dashboard
- [ ] Lighthouse CI budgets pass; field data monitored for 28 days
- [ ] Accessibility: axe clean; manual keyboard and screen-reader pass; reduced-motion pass
- [ ] Cross-browser and device QA (§9, doc 03 §6)
- [ ] Privacy Policy, Terms, Medical Disclaimer and Patient Rights live and lawyer-approved
- [ ] Google Business Profile website link uses UTM parameters; NAP matches `site.ts`
- [ ] Uptime monitor and alert contacts set
- [ ] All [CONFIRM] items resolved or the affected copy removed (docs 01–02)

---

## 12. Phase 2 technical items

| Item | Trigger | Notes |
|---|---|---|
| **Urdu site** (`/ur/`) | After launch content is stable | Astro i18n routing, `lang="ur" dir="rtl"`, Noto Nastaliq Urdu, `hreflang`. Logical CSS from day one keeps right-to-left cheap |
| **Keystatic** admin | Client wants to self-edit | Same files; no migration |
| **WhatsApp Cloud API** notifications | Lead volume justifies automation | Through a provider; templates approved by Meta |
| **CRM** (Zoho / HubSpot) | Sheet becomes a bottleneck | Swap the sheet webhook for a CRM API call |
| **Area landing pages** | Unique local content exists | Doc 01 §10.4 |
| **Ad landing variants** (`/lp/*`, noindex) | Paid campaigns start | Plus GA4/Meta with consent (§3.20–3.21) |
| **Brand film** | Budget allows | Click-to-load facade or a streaming service |
| **Motion toggle, dark theme** | User feedback asks for them | Doc 03 §5 |
