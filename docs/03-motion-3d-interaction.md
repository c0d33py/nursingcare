# 03 · Animation, 3D & Motion Graphics

**Project:** Heaven Nursing Care 24/7 — marketing & company website
**Version:** 1.0 · 6 October 2026
**Read with:** [01 Structure](01-website-structure.md) · [02 Content & Copy](02-content-copywriting.md) · [04 Technology](04-technology-stack.md)

> **The brief in one line:** modern, premium and technologically advanced, but the people using this site are often worried, often older and usually on a mid-range Android phone. **Motion here should feel like a calm, steady hand: gentle, unhurried and never startling.** Each effect below has a job. If it can't name one, it isn't built.

---

## 1. Principles & rules

### 1.1 Principles
1. **Calm over clever.** Slow-in, soft-out easing. No bounce on content, no shake, no flashing.
2. **Motion explains.** It shows a sequence (how care starts), a change (day → night), a relationship (instrument → service) or feedback (sent ✓).
3. **Content first.** Text is readable immediately. Nothing important waits for an animation.
4. **Earned richness.** Full 3D and scroll storytelling only on capable desktops. Phones get a fast, light, still-premium version.
5. **Always optional.** Every effect has a reduced-motion state that loses no information.

### 1.2 The purpose test (apply to every proposed effect)
An effect ships only if it can answer **yes** to at least one question and **no** to the last:
- Does it explain something (sequence, change, relationship, state)?
- Does it give feedback on a user action?
- Does it direct attention to a conversion point or key information?
- Does it make the brand promise tangible ("care comes to your door", "24/7")?
- **Would a stressed 65-year-old on a 3-year-old phone be slowed down, confused or made dizzy by it?**

### 1.3 Motion budget
- **At most 2 signature moments per page** (large, scroll-linked or 3D). Home: the Doorway hero (M20) and Around the Clock (M28). Services hub: the Care Kit (M23).
- **At most one continuously moving element in view at a time**, and none in the viewport while the user is typing in a form.
- **No animation longer than 1.2s** on a direct UI response; signature sequences up to ~1.6s, or scrubbed by scroll.
- **Anything moving for more than 5 seconds** stops on its own or has a visible pause control (WCAG 2.2.2).

### 1.4 What we deliberately don't do
| Not doing | Why |
|---|---|
| Full-screen preloader / intro animation | Delays content and LCP, costs conversions, adds nothing |
| Custom cursors or cursor followers | Hurts usability and accessibility, especially for older users |
| Scroll-jacking, horizontal-scroll sections | Disorienting; breaks keyboard, trackpad and find-in-page |
| Auto-rotating carousels | Users miss content; WCAG issues; poor on mobile |
| Infinite pulsing or bouncing CTAs | Anxious feel; vestibular discomfort |
| Letter-by-letter text scramble or split effects on body copy | Slows reading; screen-reader issues |
| Magnetic buttons, "liquid" distortion, glitch effects | Gimmicky; contradicts the calm brand |
| 3D on every page | Weight and battery cost with diminishing returns |
| Video with sound, or auto-playing video without a pause button | Accessibility and trust |
| Shake animation on form errors | Vestibular trigger; a message is clearer |

---

## 2. Visual language (the canvas the motion lives on)

> **Proposed. Align with the existing logo and flyer colours before finalising.** Hex values are a starting point that passes contrast checks.

### 2.1 Colour tokens

| Token | Hex | Use | Contrast note |
|---|---|---|---|
| `--ink` | `#10243A` | Headings, primary text | ~15:1 on white |
| `--text` | `#1F2A37` | Body text | ~14:1 on white |
| `--muted` | `#5B6675` | Secondary text | ~5.8:1 on white ✓ |
| `--primary` | `#0E6E6A` | "Care teal": primary buttons, links | ~6.1:1 with white text ✓ |
| `--primary-strong` | `#0A4F4C` | Hover/pressed | — |
| `--accent` | `#E7A93C` | "Dawn gold": highlights, illustration light, glow | **Decorative only; never text on light backgrounds** |
| `--sky` | `#EAF4F6` | Cool section backgrounds | — |
| `--cream` | `#FBF7F0` | Warm section backgrounds | — |
| `--night` | `#0B1B2B` | Night stage (M28), footer | White text ~17:1 |
| `--wa` | `#075E54` | WhatsApp button background | ~7.7:1 with white ✓. **Don't** use `#25D366` with white text (~2:1, fails) |
| `--success` / `--danger` | `#067647` / `#B42318` | Form states | Both AA with white |

**No site-wide dark mode at launch.** The night stage and footer use dark surfaces. Add a dark theme only if analytics show demand.

### 2.2 Typography scale (fonts and delivery: doc 04 §3.15)

| Role | Font | Size (fluid) | Weight / line height |
|---|---|---|---|
| Display (Home H1) | Fraunces | `clamp(2.5rem, 1.6rem + 4vw, 4.5rem)` | 500 / 1.05, tracking −0.02em |
| H1 (pages) | Fraunces | `clamp(2.25rem, 1.7rem + 2.4vw, 3.5rem)` | 500 / 1.1 |
| H2 | Fraunces | `clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)` | 500 / 1.15 |
| H3 | Inter | `1.375rem` | 600 / 1.3 |
| Lead | Inter | `1.25rem` | 400 / 1.6 |
| Body | Inter | **`1.125rem` (18px)** | 400 / 1.65 |
| Small / labels | Inter | `1rem` (minimum 15px for labels) | 500 / 1.4 |
| Numbers (stats, vitals) | Inter, `font-variant-numeric: tabular-nums` | per context | 600 |

### 2.3 Shape language: the arch
- **The signature shape is an arch** (`border-radius: 999px 999px 28px 28px`). It reads as a **doorway** ("care comes to your door") and nods to **Lahore's Mughal architecture**. It's used for the hero media mask, key section images, and the 404 illustration.
- Cards: 24px radius. Buttons: pill, 52px tall (48px minimum). Chips: pill, 40px tall.
- Shadows: soft, layered and tinted (`0 1px 2px rgb(16 36 58 / .06), 0 12px 32px rgb(14 110 106 / .10)`).
- Glass surfaces (hero chips only): `backdrop-filter: blur(16px)` on a 70% white fill, with a solid-white fallback.

### 2.4 Photography & illustration direction
- **Photography:** real staff, real Lahore homes, natural window light, warm grade. Modest, culturally natural styling. Hands and faces over equipment. **No** close-ups of needles, wounds, tubes or catheters; procedures are suggested through context and 3D icons.
- **Illustration:** single-weight line art (2px at 1×) in `--ink` with `--accent` and `--primary` fills used sparingly; rounded caps and joins. Built as SVG so strokes can animate (M41).

### 2.5 3D art direction: "soft clay & frosted glass"
- **Materials:** matte, slightly rough "clay" in cream, teal and gold; frosted glass for screens and IV bags; small polished metal accents (stethoscope chest-piece). Nothing hyper-real.
- **Form:** rounded bevels, simplified geometry, friendly proportions. Syringes always **capped**; no exposed needles. No body parts except stylised hands.
- **Lighting:** one soft key light (upper left), large fill, gentle rim; soft contact shadows. The same rig for every asset.
- **Camera:** 3/4 view, ~30° elevation, the same focal length across the icon set.
- **Service icon set (pre-rendered):** 11 icons, 1024×1024 transparent, exported to AVIF and WebP at 128, 256, 512 and 1024.

| Service | Object |
|---|---|
| S01 | Stethoscope |
| S02 | Nurse's fob watch with a small heart |
| S03 | Capped syringe + small IV bag |
| S04 | Digital BP monitor with SpO₂ clip |
| S05 | Feeding syringe with a soft coiled tube |
| S06 | Sterile pack with a droplet symbol (abstract) |
| S07 | Bandage roll + plaster |
| S08 | Walking cane with a supporting hand |
| S09 | Bed with a heart pillow |
| S10 | Medical bag with a plus symbol |
| S11 | Swaddled-blanket bundle with a rattle |

---

## 3. Motion system

### 3.1 Tokens

```css
:root {
  /* easing */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* entrances, reveals  ≈ GSAP "expo.out"     */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* state changes        ≈ GSAP "power2.inOut" */
  --ease-in:     cubic-bezier(0.55, 0, 1, 0.45);  /* exits                ≈ GSAP "power2.in"    */
  /* durations */
  --dur-1: 120ms;   /* press, toggle            */
  --dur-2: 200ms;   /* hover, focus, small fades */
  --dur-3: 320ms;   /* menus, accordions, steps  */
  --dur-4: 600ms;   /* section reveals           */
  --dur-5: 1200ms;  /* signature moments, counters */
  /* distance */
  --rise: 24px;     /* reveal travel (16px on mobile) */
}
```

Ambient loops (float, glow drift) use `sine.inOut` at 6–30s periods. **Bounce and elastic easing are banned** on content. A very soft `back.out(1.2)` is allowed only on the WhatsApp button entrance and on Care Kit items.

### 3.2 Capability tiers

| Tier | Who | Gets |
|---|---|---|
| **A: Full** | Desktop or laptop, fine pointer, ≥ 1024px, ≥ 4 CPU cores, no reduced-motion preference, no Save-Data, WebGL2 available (for 3D) | Everything: WebGL Care Kit, pinned scroll stories, parallax, smooth scroll, pointer effects |
| **B: Light** | Phones, tablets, weaker laptops | CSS transitions, simple reveals, counters, SVG drawing. **No** WebGL (pre-rendered images instead), no pinning, no parallax, no smooth scroll, no particles |
| **C: Static** | `prefers-reduced-motion: reduce` **or** Save-Data | No movement beyond ≤ 150ms opacity fades and instant state changes. All content and information intact |

```js
// src/scripts/motion/tier.ts — runs inline in <head> to avoid a flash
const reduce   = matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData === true;
const desktop  = matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
const strong   = (navigator.hardwareConcurrency ?? 4) >= 4 && (navigator.deviceMemory ?? 4) >= 4;
document.documentElement.dataset.motion = reduce || saveData ? 'C' : desktop && strong ? 'A' : 'B';
```

The 3D module also checks `WebGL2RenderingContext` support before loading Three.js. Without it, Tier A falls back to the Tier B image.

### 3.3 Implementation defaults
- **Animate only `transform` and `opacity`** (plus `stroke-dashoffset` on small SVGs). Never animate `width`, `height`, `top`, `left`, `box-shadow` or `filter` on large elements.
- **Progressive reveal:** content is visible by default. Elements hide for reveal only when JavaScript has run (`html.js`), so a script failure never leaves a blank page.
- **Never animate the LCP element** (the hero H1 and hero poster) in from opacity 0.
- **Use IntersectionObserver for triggers**, not scroll listeners. Use GSAP ScrollTrigger only for scrubbed or pinned timelines.
- **Pause everything off-screen:** loops, canvases and video stop when out of view or when the tab is hidden (`visibilitychange`).
- **No layout shift:** reserve space for everything that animates in (CLS stays ≤ 0.05).

```css
/* M10 standard reveal: CSS + IntersectionObserver, no library needed */
html.js [data-reveal]:not(.is-in) { opacity: 0; translate: 0 var(--rise); }
[data-reveal] { transition: opacity var(--dur-4) var(--ease-out), translate var(--dur-4) var(--ease-out);
                transition-delay: calc(var(--i, 0) * 80ms); }
html[data-motion="C"] [data-reveal] { opacity: 1; translate: none; transition: none; }
```

---

## 4. Element specifications

### 4.0 Inventory

| ID | Element | Category | Pages | A | B | C |
|---|---|---|---|---|---|---|
| M01 | Buttons | Micro-interaction | All | ✓ | ✓ | state only |
| M02 | Nav link underline | Micro-interaction | All | ✓ | ✓ | instant |
| M03 | Form fields | Micro-interaction | P11, P14, P15 | ✓ | ✓ | instant |
| M04 | Header compaction | UI | All | ✓ | ✓ | instant |
| M05 | Mega menu / dropdowns | UI | All | ✓ | — (mobile menu) | fade |
| M06 | Mobile menu sheet | UI | All | — | ✓ | fade |
| M07 | Mobile action bar | UI | All | — | ✓ | instant |
| M08 | Floating WhatsApp button | UI | All except P15/16 | ✓ | — | instant, no ping |
| M09 | Accordions | UI | P13, FAQ blocks | ✓ | ✓ | instant |
| M10 | Standard scroll reveal | Scroll | All | ✓ | ✓ (16px) | none |
| M11 | Page transitions | Transition | All | ✓ | ✓ | none |
| M12 | Image fade-in | Loading | All | ✓ | ✓ | none |
| M13 | Copy phone number | Micro-interaction | Header, P14 | ✓ | — | ✓ |
| M20 | Doorway hero | Signature / parallax | P01 | ✓ | load only | static |
| M21 | Floating vitals chips | Data / micro | P01 | ✓ | ✓ (no float) | static |
| M22 | Dawn-sky background | Background | P01 | ✓ | static | static |
| M23 | 3D Care Kit | 3D | P06 | ✓ WebGL | image | image |
| M24 | 3D service icons | 3D (pre-rendered) | Cards, S-pages | ✓ | ✓ | static |
| M25 | Interactive service cards | Hover / cards | P01, P06, S-pages | ✓ | tap states | static |
| M26 | Care Finder transitions | Interactive | P01, P06 | ✓ | ✓ | crossfade |
| M27 | How-it-works path | Scroll | P01, P05 | scrubbed | per step | static |
| M28 | Around the Clock | Signature / scroll | P01 | pinned | stacked | stacked static |
| M29 | 24-hour care ring | Interactive / data | P08 | ✓ | ✓ | instant |
| M30 | Stat counters | Data | P01 | ✓ | ✓ | final values |
| M31 | Vitals panel + ECG line | Data / motion graphic | S04 | ✓ | ✓ | static |
| M32 | Family-updates chat | Animated illustration | P10, P01 | ✓ | ✓ (3 messages) | static |
| M33 | Lahore coverage map | Interactive | P12 | ✓ (tilt) | flat | static |
| M34 | Testimonial row | Interactive | P01, P10 | ✓ | swipe | static |
| M35 | Final CTA glow | Background | All (CTA band) | ✓ | static | static |
| M36 | Image parallax | Parallax | P02, P09, P10 | ✓ | — | — |
| M37 | Team role cards | Interactive cards | P03 | ✓ | ✓ | instant |
| M38 | Form submit & success | Feedback / loading | P15, P16 | ✓ | ✓ | static ✓ |
| M39 | Smooth scrolling | Scroll | All | ✓ | — | — |
| M40 | Hero video loop | Motion graphics | P01 | ✓ | ✓ (or poster) | poster |
| M41 | Line-art illustrations | Animated illustration | P01, P05 | ✓ | ✓ | static |
| M42 | Night particles | Particles | P01 (M28) | ✓ | — | — |

---

### 4.1 Micro-interactions

#### M01 · Buttons
- **Where:** all buttons.
- **Communicates:** "this is interactive and responding to you."
- **Behaviour:**
  - *Hover:* background darkens to `--primary-strong` and the button lifts by `translateY(-1px)`; a trailing arrow icon slides 4px.
  - *Press:* `scale(.98)`.
  - *Focus-visible:* a 3px `--accent` ring with a 2px offset (not animated).
  - *Pending (forms):* see M38.
- **Trigger:** hover, active, focus-visible.
- **Duration / easing:** hover 200ms `--ease-out`; press 120ms.
- **Mobile:** no hover; press state only.
- **Reduced motion:** colour change only, no movement.
- **Performance:** transform and colour only. Negligible.

#### M02 · Navigation link underline
- **Where:** header nav, footer links. *Inline body links are always underlined*, with no animation, for accessibility.
- **Communicates:** hover target and current page.
- **Behaviour:** the underline grows from the left (`scale-x 0 → 1`, `transform-origin: left`). The current page shows a persistent underline.
- **Trigger:** hover, focus.
- **Duration / easing:** 240ms `--ease-out`.
- **Mobile:** n/a.
- **Reduced motion:** instant.
- **Performance:** a pseudo-element transform.

#### M03 · Form fields
- **Where:** all forms.
- **Communicates:** where the user is, and whether the input is OK.
- **Behaviour:**
  - *Focus:* border goes to `--primary` with a 4px soft ring.
  - *Valid (after blur):* a small check icon fades in.
  - *Error:* `--danger` border, icon and message fade in below. **No shake.**
  - *Selection chips (P15, Care Finder):* press `scale(.98)`, then fill colour plus a check icon that draws its stroke.
- **Labels are static above fields.** No floating labels: they're harder to read and to target.
- **Trigger:** focus, blur, submit.
- **Duration / easing:** 160–200ms `--ease-out`; check draw 200ms.
- **Mobile:** same.
- **Reduced motion:** instant.
- **Performance:** negligible.

#### M13 · Copy phone number
- **Where:** next to the phone number in the desktop header and on P14.
- **Communicates:** "copied". Useful for overseas visitors dialling from another device.
- **Behaviour:** a copy icon button; on click, a tooltip reading "Copied" fades and rises 4px, then fades out after 1.5s. The tooltip text is mirrored in a polite `aria-live` region.
- **Trigger:** click.
- **Duration / easing:** 200ms in, 200ms out.
- **Mobile:** not shown; the `tel:` link is enough.
- **Reduced motion:** fade only.
- **Performance:** negligible.

---

### 4.2 UI animations

#### M04 · Header compaction
- **Where:** global header.
- **Communicates:** "you've left the top; navigation is still here."
- **Behaviour:** after 80px of scroll, height 80 → 64px, logo `scale(.9)`, background transparent → 90% white with `backdrop-blur(12px)` and a hairline shadow. **The header never hides on scroll down**; older users lose it otherwise.
- **Trigger:** a sentinel element at the top, watched by IntersectionObserver.
- **Duration / easing:** 240ms `--ease-out`.
- **Mobile:** same, at 64 → 56px.
- **Reduced motion:** instant switch.
- **Performance:** a single class toggle; no scroll handler.

#### M05 · Mega menu & dropdowns
- **Where:** desktop navigation.
- **Communicates:** structure (groups of services).
- **Behaviour:** the panel fades in and drops 8px; columns stagger 30ms.
  - Opens on click, or on hover with a 120ms intent delay; closes after a 250ms grace period so diagonal mouse paths don't close it.
  - Esc closes and returns focus to the trigger. `aria-expanded` is kept in sync.
- **Trigger:** click, hover-intent, keyboard (Enter/Space/↓).
- **Duration / easing:** 220ms `--ease-out` in; 160ms `--ease-in` out.
- **Mobile:** replaced by M06.
- **Reduced motion:** a 120ms fade only.
- **Performance:** transform and opacity. The menu HTML is server-rendered (crawlable).

#### M06 · Mobile menu sheet
- **Where:** < 1024px.
- **Communicates:** a full, calm overview of the site.
- **Behaviour:** the sheet slides in from the right (`translateX(100%) → 0`) as the backdrop fades to 40%. Groups are accordions. The CTA buttons are pinned to the bottom of the sheet. Focus is trapped and body scroll locked.
- **Trigger:** menu button.
- **Duration / easing:** 320ms `--ease-out` in; 240ms `--ease-in` out.
- **Reduced motion:** a 150ms fade.
- **Performance:** transform only. Built on the native `<dialog>` element (doc 04 §3.4).

#### M07 · Mobile action bar
- **Where:** < 1024px, all pages (§6.3 in doc 01).
- **Communicates:** "help is one tap away."
- **Behaviour:** slides up from below (`translateY(100%) → 0`). On P01 it appears when the hero CTAs leave the viewport; elsewhere, on load. **It never hides once shown.**
- **Duration / easing:** 280ms `--ease-out`.
- **Reduced motion:** appears instantly.
- **Performance:** IntersectionObserver on the hero CTA group.

#### M08 · Floating WhatsApp button (desktop)
- **Where:** bottom-right, all pages except P15 and P16.
- **Communicates:** an always-available, low-commitment chat.
- **Behaviour:** appears after 30% scroll (`scale(.8) → 1` with a fade). **8 seconds later, a single soft "ping" ring (2 pulses) plays, once per session.** It never loops. The tooltip appears on hover or focus.
- **Duration / easing:** 300ms `back.out(1.2)`; each ping 1.2s.
- **Mobile:** not shown (the action bar covers it).
- **Reduced motion:** appears with no scale and no ping.
- **Performance:** CSS only. The once-per-session flag is held in `sessionStorage` (wrapped in try/catch).

#### M09 · Accordions (FAQ and others)
- **Where:** P13 and the FAQ blocks on P05, P06, S-pages and P10; mobile footer and menu groups.
- **Communicates:** the answer belongs to the question.
- **Behaviour:** native `<details>`/`<summary>`. The chevron rotates 180°. Content height animates where supported (`interpolate-size: allow-keywords` plus `::details-content`); otherwise it opens instantly, which is acceptable. A deep link (`/faq#slug`) opens and scrolls to the item, then sets focus on its summary.
- **Duration / easing:** 240ms `--ease-in-out`.
- **Mobile:** same.
- **Reduced motion:** instant.
- **Performance:** zero JavaScript except the deep-link handler (about 10 lines).

---

### 4.3 Page transitions & loading

#### M11 · Page transitions
- **Where:** all same-site navigations.
- **Communicates:** continuity: one coherent site, not separate pages.
- **Behaviour:** native **cross-document View Transitions** (`@view-transition { navigation: auto; }`): a root crossfade. **Shared element:** a service card's 3D icon morphs into the service page's hero icon (`view-transition-name: icon-{slug}`). The header stays still (`view-transition-name: header`).
- **Trigger:** link navigation.
- **Duration / easing:** root 220ms `--ease-in-out`; icon morph 360ms `--ease-out`.
- **Mobile:** same (it's cheap).
- **Reduced motion:** disabled (`@media (prefers-reduced-motion) { @view-transition { navigation: none; } }`).
- **Performance:** zero JavaScript. Unsupported browsers navigate normally. Combined with prefetch (doc 04 §3.23), navigation feels instant.

#### Loading policy
- **No full-page preloader.** Pages are static and fast; content is visible on first paint.
- **3D (M23):** a poster render shows immediately at the final size. The canvas crossfades in (300ms) only after the first frame has rendered.
- **Video (M40):** an AVIF poster shows immediately. The video crossfades in once it can play through.
- **Forms:** button pending state (M38).
- **No skeleton screens:** there is no client-side data fetching to wait for.

#### M12 · Image fade-in
- **Where:** below-the-fold images.
- **Communicates:** smooth arrival with no pop-in.
- **Behaviour:** a dominant-colour placeholder background; the image fades from 0 to 1 when it loads.
- **Duration / easing:** 300ms.
- **Mobile:** same.
- **Reduced motion:** none.
- **Performance:** **never apply this to the LCP image.** Images are `loading="lazy"` with explicit width and height.

---

### 4.4 Scroll animations

#### M10 · Standard reveal
- **Where:** section headings, card groups and content blocks on all pages (not hero content).
- **Communicates:** gentle pacing; a sense of quality.
- **Behaviour:** fade in plus a rise of `--rise`. Groups stagger 80ms, with a maximum of 6 items staggered; the rest appear together. Runs once only.
- **Trigger:** 15% of the element visible (`rootMargin: 0px 0px -10% 0px`).
- **Duration / easing:** 600ms `--ease-out`.
- **Mobile:** rise reduced to 16px; stagger 60ms.
- **Reduced motion:** none; content is simply visible.
- **Performance:** CSS transitions plus one shared IntersectionObserver (§3.3). No library.

#### M27 · How-it-works path
- **Where:** P01 §6 and P05.
- **Communicates:** a clear, guided journey: four steps, one path, no confusion.
- **Behaviour:** a soft curved SVG path connects the 4 step illustrations and draws (`stroke-dashoffset`) as the user scrolls. Each step's icon settles in (`scale .9 → 1`, fade) when the path reaches it, and its line art draws (M41).
- **Trigger:** ScrollTrigger scrub from section top at 70% of the viewport to section bottom at 60%.
- **Duration / easing:** scrubbed (`scrub: 0.5`); icon settle 400ms `--ease-out`.
- **Mobile:** a vertical line on the left; each segment draws on enter (not scrubbed), 500ms.
- **Reduced motion:** a fully drawn static path.
- **Performance:** one SVG path. The scrubbed version uses the Tier A GSAP chunk; the mobile per-step version is IntersectionObserver plus CSS.

#### M28 · Around the Clock (day → night)
- **Where:** P01 §7. **Signature moment.**
- **Communicates:** care that genuinely continues through the night, which reassures families whose biggest worry is "what happens at 2 am?"
- **Behaviour (Tier A):** the section pins for about 200vh of scroll and runs through 4 stages:
  1. **Morning (8 am):** cream background, sun low on the left.
  2. **Afternoon (2 pm):** sky background, sun at its peak.
  3. **Evening (7 pm):** amber-rose background, sun setting.
  4. **Night (2 am):** `--night` background, moon risen, window lights glowing, soft particles (M42).

  The sun and moon travel a single arc. A digital clock label ticks between stage times. Each stage's copy card crossfades with a 16px rise. A progress rail on the right shows the 4 stages; it is clickable and scrolls to each stage.
- **Trigger:** ScrollTrigger `pin: true`, timeline scrubbed (`scrub: 0.6`) with `snap` to stage boundaries.
- **Duration / easing:** scrubbed; card swaps 400ms `--ease-in-out`.
- **Mobile (Tier B):** **no pinning.** Four stacked cards, each with its own static gradient background and icon. The icon (sun or moon) rises 12px on enter.
- **Reduced motion:** the stacked layout, with no icon motion.
- **Performance:** backgrounds are **4 pre-built gradient layers crossfading on opacity** (composited), *not* animated gradient values (which repaint). One SVG arc. Pin spacing is reserved, so there's no layout shift. All 4 stages' copy is in the HTML (SEO and screen readers).

---

### 4.5 Parallax

#### M20 · Doorway hero (load + scroll parallax)
- **Where:** P01 hero, right column. **Signature moment.**
- **Communicates:** **care arrives through your front door**, the brand promise in one image. The arch also echoes Lahore's architecture.
- **Behaviour:**
  - *On load:* the arch-masked media (poster, then video, M40) settles from `scale(1.04) → 1` while an inner warm-light overlay fades from 30% to 0. **The poster is fully visible from the first paint.** The H1 is the LCP element and is never hidden.
  - *On scroll (Tier A):* over the first 40% of the viewport height, the arch widens slightly (the mask scales by 1.08 on x) and the image inside moves at 0.9× scroll speed, as if stepping in through the door.
- **Trigger:** load (after first paint); scroll scrub.
- **Duration / easing:** load 900ms `--ease-out`; scroll scrubbed (`scrub: 0.6`).
- **Mobile:** the load settle only (600ms), no scroll effect. A shorter arch at 40vh.
- **Reduced motion:** a static arch with the poster. The video doesn't autoplay; a play button is shown instead.
- **Performance:** transforms on the wrapper and inner image only (no `clip-path` animation). The mask is a static `border-radius` with `overflow: hidden`.

#### M36 · Image parallax
- **Where:** P02 story portrait, P09 situation images, P10 hero image.
- **Communicates:** depth and a premium feel; slows the page's pace on trust content.
- **Behaviour:** the image inside an `overflow: hidden` frame moves ±6% (0.9× speed). **Never on text.** Never more than one parallax element in view at a time.
- **Trigger:** ScrollTrigger scrub; or, where supported, CSS `animation-timeline: view()`.
- **Mobile:** off.
- **Reduced motion:** off.
- **Performance:** the image is oversized by 12% to hide the movement; transform only.

---

### 4.6 3D elements

#### M23 · 3D Care Kit
- **Where:** P06, the section after the hero. **Signature moment.** (On P01, the services section uses 3D icons, M24, not this scene.)
- **Communicates:** **"Everything a clinic would bring — brought to your home."** Each instrument *is* a service, which makes an abstract list tangible and explorable.
- **Scene:** a stylised medical bag (clay and leather look, teal and cream) on a soft cream plinth. Inside are **7 instruments**, each mapped to a service:
  - stethoscope → S01
  - fob watch → S02
  - capped syringe with IV bag → S03
  - BP monitor → S04
  - feeding syringe → S05
  - sterile pack → S06
  - bandage roll → S07

  Services S08–S11 (people-centred care) appear beside the kit as cards headed "Care that goes beyond the kit".
- **Behaviour:**
  1. **Idle:** the closed bag sways gently (±8° yaw, 8s `sine.inOut`).
  2. **Open:** when the section is 40% in view, or on the "Open the kit" button, the lid hinges open (900ms `power3.out`). The instruments rise out and arrange in an arc above the bag (stagger 60ms, 700ms `back.out(1.2)`).
  3. **Hover or focus on an instrument:** it lifts 0.1 units and turns 15°; a label card appears (service name, one line, "Learn more →"). The other items dim to 60%.
  4. **Click:** navigates to the service page.
  5. **Drag:** rotates the whole kit ±25° (clamped). No zoom or pan (OrbitControls with zoom and pan disabled and azimuth limits).
- **Accessibility:** the canvas is `aria-hidden="true"`. **The real interface is an HTML list of 7 links** next to the canvas. Hovering or focusing a list item highlights the matching 3D instrument, and vice versa. Keyboard users get the full experience through the list.
- **Trigger:** the module is lazy-loaded when the section is within one viewport **and** the browser is idle (`requestIdleCallback`) **and** the device is Tier A with WebGL2.
- **Mobile / Tier B:** **no WebGL.** A pre-rendered "open kit" image (AVIF, ~1200px wide) above the same list of links, with M10 reveals.
- **Reduced motion:** the same static image; no idle sway.
- **Performance budget:**
  - **Three.js chunk:** ≤ 180 KB gzipped, loaded only for Tier A.
  - **Scene assets:** **one GLB ≤ 800 KB** (Meshopt geometry compression plus WebP textures, ≤ 50k triangles, ≤ 2 materials atlased). KTX2 is skipped: its transcoder outweighs the savings for one small scene.
  - **Rendering:** device pixel ratio capped at 1.5; antialiasing via MSAA on the renderer, no post-processing stack; baked ambient occlusion and contact shadow (no real-time shadows).
  - **Render loop:** renders **on demand** (only while animating or interacting), and stops when the section is off-screen or the tab is hidden.
  - **Loading:** the poster render shows until the first frame is ready, then crossfades (300ms).
  - **Graceful failure:** if loading errors or WebGL context creation fails, keep the poster. The page doesn't change.

#### M24 · 3D service icons (pre-rendered)
- **Where:** service cards (P01, P06, mega menu), S-page heroes, related-service cards.
- **Communicates:** a consistent, premium, friendly visual system for clinical topics, avoiding photos of procedures.
- **Behaviour:**
  - *In cards:* on card hover, the icon rises 6px and rotates 4° while its soft shadow widens.
  - *In S-page heroes:* a slow idle float (±6px, 6s `sine.inOut`), Tier A only.
  - *Between pages:* morphs from card to hero during navigation (M11).
- **Trigger:** card hover/focus; page load.
- **Duration / easing:** hover 300ms `--ease-out`.
- **Mobile:** no float; transition morph only.
- **Reduced motion:** static.
- **Performance:** AVIF/WebP images via `<picture>` with `srcset` (128–1024w). **No runtime 3D.** About 8–25 KB per icon at card size.

---

### 4.7 Motion graphics & animated illustrations

#### M40 · Hero video loop
- **Where:** P01 hero, inside the arch (M20).
- **Communicates:** real people, real homes, real care: the strongest trust signal there is.
- **Content:** 8–12s seamless loop, muted, no text. A nurse arrives at a front door, is greeted by a family member, checks an elderly patient's BP, and they share a warm moment. Warm grade, slow camera moves.
- **Behaviour:** the poster shows immediately; the video crossfades in once it can play through. A **visible pause/play button** sits in the arch corner (WCAG 2.2.2). The video pauses when off-screen.
- **Trigger:** after the window `load` event.
- **Mobile:** a 720p portrait version (≤ 1.2 MB). On Save-Data, `effectiveType` of `2g`/`3g`, or Tier C, only the poster is shown.
- **Reduced motion:** poster plus a play button; no autoplay.
- **Performance:** desktop ≤ 2.5 MB (1080×1350, AV1/WebM with an H.264 MP4 fallback); `preload="none"`, then set `src` after load; `playsinline muted loop`. Encoding presets: doc 04 §3.13.

#### M41 · Line-art illustrations
- **Where:** How-it-works steps (P01, P05) and the 404 door illustration.
- **Communicates:** a friendly, clear explanation of each step.
- **Illustrations:**
  - Step 1: a phone with a chat bubble
  - Step 2: a clipboard with a heart
  - Step 3: two matching puzzle pieces formed from a nurse badge and a home
  - Step 4: a home with a heart, and a phone showing a check mark
  - 404: a front door, slightly ajar
- **Behaviour:** strokes draw in (`stroke-dashoffset`) once, then accent fills fade in.
- **Trigger:** on enter (with M27 on P01 and P05).
- **Duration / easing:** stroke draw 800ms `--ease-in-out`; fill 300ms.
- **Mobile:** same.
- **Reduced motion:** fully drawn.
- **Performance:** inline SVG, ≤ 6 KB each.

#### M32 · Family-updates chat
- **Where:** P10 §4 (full) and the P01 families-abroad band (short).
- **Communicates:** **transparency and peace of mind** for remote families. The service is visible, not a black box.
- **Behaviour:** a phone frame with a **generic chat UI** (not WhatsApp's trade dress). Messages appear one at a time, each preceded by a typing indicator. Example messages:
  - 8:05 am: "Good morning! Ammi's BP is 128/82, fasting sugar 110. Breakfast done ✓"
  - 1:30 pm: "Doctor's visit complete. No change to medicines."
  - 9:10 pm: "Evening dressing changed. Resting comfortably 🌙"

  A small caption reads "Example updates". **It plays once and does not loop.** A "Replay" text button appears afterwards.

  The content must reflect the real update practice [CONFIRM, doc 02 FAQ 26].
- **Trigger:** 40% of the frame in view.
- **Duration / easing:** typing indicator 500ms, message 300ms rise and fade, 700ms gap between messages.
- **Mobile:** same. The P01 version has 3 messages.
- **Reduced motion:** all messages are shown at once.
- **Performance:** HTML and CSS plus about 20 lines of JavaScript; the text is real (accessible, translatable).

---

### 4.8 Interactive sections

#### M26 · Care Finder
- **Where:** P01 `#care-finder`, with a compact version on P06. Logic: doc 01 §8.4.
- **Communicates:** "we'll help you figure it out," which lowers the barrier for unsure visitors.
- **Behaviour:**
  - *Changing step:* the outgoing step slides 16px left and fades (200ms `--ease-in`); the incoming step slides in from the right (320ms `--ease-out`). The progress bar animates its width (`scaleX`).
  - *Chips:* M03.
  - *Results:* the cards stagger in (80ms) with the plan suggestion.
- **Accessibility:** each step is a `<fieldset>` with a `<legend>`. Focus moves to the new step's legend on change; a polite live region announces "Step 2 of 3". Back is always available.
- **Mobile:** full width; same motion.
- **Reduced motion:** a 150ms crossfade between steps.
- **Performance:** a small island (doc 04 §3.3), hydrated on `visible`. Without JavaScript, it falls back to a link to P15.

#### M29 · 24-hour care ring
- **Where:** P08 §2.
- **Communicates:** **exactly which hours are covered** by each care option, without prices.
- **Behaviour:** an SVG ring of 24 segments with an hour scale. Selecting **Visit** (a 1–2 hour arc), **Day** (8 am–8 pm), **Night** (8 pm–8 am) or **24-hour** (the full ring) [CONFIRM hours] animates the coloured arc (`stroke-dasharray`). The centre text updates ("12 hours · 8 am–8 pm") and a short description swaps below. The options are radio buttons styled as segmented control tabs.
- **Trigger:** selection (click, tap or keyboard arrows).
- **Duration / easing:** 600ms `--ease-in-out`.
- **Mobile:** same; the ring is 280px.
- **Reduced motion:** instant change.
- **Performance:** inline SVG plus about 30 lines of JavaScript; no library.

#### M33 · Lahore coverage map
- **Where:** P12.
- **Communicates:** local presence and coverage at a glance.
- **Behaviour:** a stylised SVG map of Lahore (illustrated, not geographic data; captioned "Illustrative map").
  - *On enter:* the HQ pin at Pak Arab Society drops in and pulses twice; area dots then appear with a 30ms stagger.
  - *Interaction:* hovering or focusing an area name in the list highlights its region and dot, and hovering a region highlights its list entry.
  - *Tier A:* the map sits on a subtle 3D plane (`perspective(1200px) rotateX(8deg)`) that flattens slightly on hover.
- **Accessibility:** the list is the real content. The map is `role="img"` with an `aria-label` summary.
- **Mobile:** a flat map above a filterable list.
- **Reduced motion:** static map; highlight still works (colour only).
- **Performance:** a single SVG ≤ 40 KB.

#### M37 · Team role cards
- **Where:** P03 §2.
- **Communicates:** who does what, without overwhelming.
- **Behaviour:** 5 cards; each card's "What they do" button expands it to show 3 responsibilities (a grid-rows `0fr → 1fr` transition). **No flip cards** (the hidden back face fails accessibility and confuses users).
- **Trigger:** click or tap (a button with `aria-expanded`).
- **Duration / easing:** 320ms `--ease-in-out`.
- **Mobile:** same.
- **Reduced motion:** instant.
- **Performance:** CSS only.

---

### 4.9 Hover effects & interactive cards

#### M25 · Interactive service cards
- **Where:** P01 services grid, P06, related services on S-pages.
- **Communicates:** "explore me": each card is a doorway to a service.
- **Behaviour (Tier A):**
  - *Hover or focus:* the card lifts 4px, its border goes to a 1px `--primary` at 40%, the icon rises (M24) and the "Learn more →" arrow slides 4px.
  - *Pointer tilt:* up to **4°** following the cursor (rAF-throttled), resetting on leave.
  - The whole card is one link (pseudo-element stretched link).
- **Tier B (touch):** no tilt or hover. A pressed state (`scale(.99)`) and the view transition (M11).
- **Duration / easing:** 240ms `--ease-out`; tilt follows with lerp 0.15.
- **Reduced motion:** border colour change only.
- **Performance:** transform only, `will-change` applied on hover only.

#### M34 · Testimonial row
- **Where:** P01 §11, P10.
- **Communicates:** many real families, without forcing attention.
- **Behaviour:** horizontal **CSS scroll-snap** row with Prev/Next buttons (they scroll by one card; disabled at the ends). Cards reveal with M10 stagger. **No autoplay.**
- **Mobile:** swipe; cards at 85% width so the next one peeks.
- **Reduced motion:** buttons jump without smooth scrolling.
- **Performance:** native scroll; about 15 lines of JavaScript for the buttons.

---

### 4.10 Background, gradient & particle effects

#### M22 · Dawn-sky background
- **Where:** P01 hero.
- **Communicates:** calm, warmth, a new day: a subtle nod to "Heaven" without wordplay.
- **Behaviour:** two large, heavily blurred gradient blobs (`--accent` at 25% and `--sky`) on a `--cream` base drift very slowly (±4% translation over 24s `sine.inOut`, alternating). A faint grain texture (2% opacity PNG) prevents banding.
- **Trigger:** load.
- **Mobile:** static blobs.
- **Reduced motion:** static.
- **Performance:** the blobs are pre-blurred AVIF images or `radial-gradient` pseudo-elements moved with `transform` (composited). **Never animate `filter: blur()` or gradient stops.** Pauses off-screen.

#### M35 · Final CTA glow
- **Where:** the CTA band on every page.
- **Communicates:** warmth and focus on the final conversion point.
- **Behaviour:** a soft `--accent` radial glow behind the heading follows the pointer at 10% easing, with a maximum offset of 40px. At rest it sits centred.
- **Mobile:** static glow.
- **Reduced motion:** static.
- **Performance:** one element moved with transform; the listener is active only while the band is in view.

#### M42 · Night particles
- **Where:** inside M28, night stage only (Tier A).
- **Communicates:** quiet, watchful night-time care (like soft lights through a window), not sparkle for its own sake.
- **Behaviour:** 30–40 small, soft, warm-white dots drifting slowly upward and fading (opacity 0.2–0.6, 10–20s life). They fade in with the night stage and out when it leaves.
- **Mobile, reduced motion:** none (a static night illustration).
- **Performance:** a **2D canvas** (not WebGL), ≤ 40 particles, capped at 30fps, stopped when not visible.

---

### 4.11 Data & statistic animations

#### M30 · Stat counters
- **Where:** P01 §10, **only if verified stats exist** (doc 02 §10).
- **Communicates:** scale and track record.
- **Behaviour:** counts from 0 to the final value once (tabular numbers, thousands separators). The suffix ("+", "years") is static.
- **Trigger:** 50% in view.
- **Duration / easing:** 1200ms `expo.out`.
- **Mobile:** same.
- **Reduced motion:** the final value only.
- **Accessibility:** **the final number is the HTML text.** The animated number is a separate `aria-hidden` element, so screen readers and search engines always read the real value.
- **Performance:** rAF, ≤ 1.2s, then stops.

#### M31 · Vitals panel + ECG line
- **Where:** S04 hero (full panel).
- **Communicates:** careful, competent monitoring: the core of S04.
- **Behaviour:**
  - A panel of 6 tiles (BP, Sugar, SpO₂, Pulse, Temp, Resp), each with an icon, value and a "Normal range" tag. Values count up once (M30 behaviour).
  - Underneath, an ECG trace draws across **2 heartbeats (about 3s), then rests.** It replays on hover or when re-entering the viewport.
  - A caption reads "Example readings".
- **Trigger:** on enter.
- **Duration / easing:** counters 1000ms `expo.out`; ECG `linear`, 1.5s per beat.
- **Mobile:** a 2×3 tile grid; same ECG.
- **Reduced motion:** static values and a fully drawn line.
- **Performance:** SVG plus CSS (`stroke-dashoffset`); no library.

#### M21 · Floating vitals chips
- **Where:** P01 hero, overlapping the arch edge.
- **Communicates:** clinical competence alongside human warmth (the photo).
- **Behaviour:** 2–3 glass chips (copy in doc 02 §3.1) fade up with a 120ms stagger after M20 settles. *Tier A:* an idle float (±4px, 6s `sine.inOut`, offset phases) plus pointer parallax up to ±8px. **The values never change.** They don't pretend to be live data.
- **Mobile:** 2 chips, static after their entrance.
- **Reduced motion:** static.
- **Performance:** transform only; `backdrop-filter` limited to these small elements.

---

### 4.12 Feedback & scrolling

#### M38 · Form submit & success
- **Where:** P15 (also P11, P14), P16.
- **Communicates:** "it's working" → "it's done, and we've got you."
- **Behaviour:**
  - **Pending:** the button keeps its width; the label changes to "Sending…" with a small heart icon that beats gently (scale 1 → 1.12 → 1, 700ms loop, only while pending). The button is disabled, with `aria-busy="true"`.
  - **Error:** fields per M03; the error summary at the top receives focus.
  - **Success (P16):** a circle draws, then a heart-shaped check strokes in (800ms total, once). Then the content fades up (M10).
- **Mobile:** same.
- **Reduced motion:** static icons; no loop or draw.
- **Performance:** inline SVG and CSS.

#### M39 · Smooth scrolling
- **Where:** sitewide, **Tier A only.**
- **Communicates:** a polished, premium feel on desktop.
- **Behaviour:** Lenis with gentle inertia (`lerp: 0.1`). Anchor links account for the sticky header offset. It's paused while a dialog or menu is open and synced with ScrollTrigger.
- **Must not break:** `position: sticky`, keyboard scrolling (Space, PgDn, arrows), find-in-page, or scroll restoration.
- **Mobile, Tier B, reduced motion:** **off.** Native scrolling (Lenis leaves touch alone by default). Anchor jumps use CSS `scroll-behavior: smooth`, except under reduced motion.
- **Performance:** a few KB. **This effect can be dropped at any point with no loss of function.** Drop it first if QA finds any scroll bug.

---

## 5. Reduced motion & accessibility

| Requirement | Implementation |
|---|---|
| Respect `prefers-reduced-motion: reduce` | Sets Tier C (§3.2); CSS overrides; `gsap.matchMedia()` conditions; Lenis disabled; view transitions off |
| No information lost in Tier C | Every animated state also exists as static content (M28 stacked cards, M30 final values, M32 all messages) |
| Pause, stop, hide (WCAG 2.2.2) | Hero video has a pause button; loops stop by themselves (ECG, ping, chat); off-screen pausing |
| No flashing (WCAG 2.3.1) | Nothing flashes more than 3 times per second; ping and pulse are slow and soft |
| Keyboard parity | Every hover effect also triggers on `:focus-visible`; the 3D Care Kit is fully operable through its HTML list |
| Focus management | Care Finder steps, menus, dialogs and accordions follow the WAI-ARIA Authoring Practices patterns |
| Screen readers | Canvases, decorative SVGs and animated counter layers are `aria-hidden`; live regions are used sparingly (Care Finder step, copy confirmation) |
| Motion toggle (optional, Phase 2) | A "Reduce motion" switch in the footer that sets `data-motion="C"` (stored per viewer). Add only if feedback asks for it; the OS setting covers most needs |

---

## 6. Performance budget & fallbacks

| Item | Budget | Notes |
|---|---|---|
| JavaScript for motion, Tier B page | ≤ 10 KB gzipped (reveal observer, counters, ring, chat; **no GSAP**) | Most pages need nothing beyond the shared reveal observer (< 1 KB) |
| JavaScript for motion, Tier A extras | GSAP + ScrollTrigger (~45 KB gzipped, dynamic import) + Lenis (a few KB) + Three.js chunk ≤ 180 KB gzipped (P06 only) | Loaded after `load` and idle; never on the critical path |
| 3D assets | GLB ≤ 800 KB; poster ≤ 120 KB AVIF | Meshopt + WebP textures |
| Hero video | Desktop ≤ 2.5 MB; mobile ≤ 1.2 MB; poster ≤ 120 KB | Loaded after `load` |
| Service icons | ≤ 25 KB each at card size | AVIF/WebP `srcset` |
| Frame rate | 60fps on a mid-range laptop (Tier A); no long tasks > 50ms during scroll on a mid-range Android (Tier B) | |
| Interaction | INP ≤ 200ms at p75 | Hover effects are rAF-throttled |
| Layout stability | CLS ≤ 0.05 | Reserve space; animate transforms only |

**Fallback chain:** WebGL fails → poster. Video fails or Save-Data → poster. JavaScript fails → all content visible and static (`html.js` gating). Unsupported CSS feature (view transitions, scroll-driven animations, `interpolate-size`) → instant, which is fine.

**Test devices (minimum):**
- A mid-range Android phone (Samsung Galaxy A-series or Xiaomi Redmi Note class, ~2–3 years old) on throttled 4G
- An older iPhone (iPhone 11 class)
- A mid-range Windows laptop with integrated graphics
- A MacBook with Safari

---

## 7. Motion map by page

| Page | Signature (max 2) | Supporting effects |
|---|---|---|
| P01 Home | M20 Doorway hero · M28 Around the Clock | M21, M22, M24, M25, M26, M27, M30, M32 (short), M34, M35, M40, M41, M42 |
| P02 About | — | M10, M36 |
| P03 Care team | — | M10, M37 |
| P04 Quality & safety | — | M10 (diagram steps reveal in sequence) |
| P05 How it works | — | M27, M41 |
| P06 Services | M23 Care Kit | M24, M25, M26 (compact) |
| S01–S11 | — | M24 (hero float + M11 morph), M09; **S04: M31** |
| P08 Care plans | — | M29 |
| P09 Who we care for | — | M10, M36 |
| P10 Overseas families | — | M32 (full), M34, M36 |
| P11 Hospitals | — | M10 only (professional, restrained) |
| P12 Areas | — | M33 |
| P13 FAQ | — | M09 |
| P14 Contact / P15 Book | — | M03, M38 (P15 form stepper uses M26 step transitions) |
| P16 Thank you | — | M38 success |
| P17–P21 Legal | — | **None** beyond global UI |
| P22 404 | — | M41 (door) |
| Global | — | M01, M02, M04–M09, M11, M12, M13, M35, M39 |

---

## 8. Design handoff & QA

**Designer delivers:**
1. Motion tokens as Figma variables (durations and easings named exactly as in §3.1).
2. Figma prototypes (Smart Animate) for micro-interactions and UI animations (M01–M09, M25, M26, M29, M37).
3. **Reference videos** (screen recordings or After Effects previews, 1080p) for the signature moments M20, M23 and M28, and for M31 and M32, at Tier A and Tier B.
4. 3D source files (`.blend`) plus exported GLB and renders, following §2.5.
5. SVG illustrations with stroke paths ready to animate (single paths, no outlined strokes).

**Developer QA checklist (per effect):**
- [ ] Matches the reference timing (± 50ms) and easing.
- [ ] Tier A, B and C each verified (force them with `?motion=A|B|C` in development).
- [ ] Content readable and usable with JavaScript disabled.
- [ ] Keyboard-operable; focus visible; screen reader announces correctly.
- [ ] No CLS; no long tasks during scroll (Chrome Performance panel, CPU 4× slowdown).
- [ ] Loops pause off-screen and in hidden tabs.
- [ ] Lighthouse mobile ≥ 90 performance and 100 accessibility on P01, P06 and one S-page, with all effects on.
