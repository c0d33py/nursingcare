# 01 · Website Structure & Page Specification

**Project:** Heaven Nursing Care 24/7 — marketing & company website
**Version:** 1.0 · 6 October 2026
**Source:** [heaven-nursing-care-website-content.md](heaven-nursing-care-website-content.md) (company content + flyer)
**Read with:** [02 Content & Copy](02-content-copywriting.md) · [03 Motion & 3D](03-motion-3d-interaction.md) · [04 Technology](04-technology-stack.md) · [README](README.md)

> **Conventions.** `P##` = page, `S##` = service page, `T#` = page template, `M##` = motion spec (doc 03). **[CONFIRM]** = a fact not in the source document; verify with Heaven Nursing Care before publishing. Copy shown here is indicative — final copy lives in doc 02.

---

## 1. Website goals

| # | Goal | Measured by |
|---|---|---|
| G1 | Turn visits into care enquiries | WhatsApp chats started, call taps, booking-form submissions (per session) |
| G2 | Be seen as a professional, clinically competent provider — not an informal attendant agency | Visits to trust pages (team, quality & safety), share of enquiries that become bookings [tracked in lead log] |
| G3 | Win local search for home nursing in Lahore | Search Console clicks/impressions for target keywords; Google Business Profile calls and direction requests |
| G4 | Reach families living abroad who arrange care for parents in Lahore | Enquiries from P10 and from non-Pakistan traffic |
| G5 | Open a referral channel with hospitals and doctors | Partner enquiries from P11 |

**Conversion hierarchy:** (1) WhatsApp chat, (2) phone call, (3) booking form. **Micro-conversions:** Care Finder completed, service page → booking page, phone number copied, FAQ opened.

---

## 2. Audiences

| ID | Audience | Situation and mindset | What they need from the site | Key pages |
|---|---|---|---|---|
| A1 | **Adult children in Lahore (30–55)** managing a parent's care. Primary decision-makers. | Busy, often anxious, sometimes urgent. Comparing agencies by trust and how fast care can start. | Proof of qualified staff, clear services, fast contact, option for female or male staff [CONFIRM] | P01, S-pages, P03, P04, P15 |
| A2 | **Overseas family members** (UK, Gulf, North America) | Remote, worried, unable to supervise in person. Different time zone. | One point of contact, regular updates, a reason to trust from afar, payment from abroad [CONFIRM] | P10, P01, P13 |
| A3 | **Families of patients being discharged or recovering from surgery** | Time-pressured, needs specific procedures (dressing, NG tube, catheter, IV). | Confirmation that the exact procedure is offered, by whom, and how soon | S03, S05, S06, S07, S09 |
| A4 | **Patients themselves** (elderly, chronic conditions) | Less confident with technology. Larger text, slower reading, often on a phone. | Plain language, large tap targets, a phone number that is always visible | All |
| A5 | **New mothers and families** [CONFIRM service] | Post-birth, sleep-deprived, want gentle and trustworthy help. | Clarity on what mother & baby care includes and who provides it | S11 |
| A6 | **Healthcare professionals** (discharge coordinators, doctors, clinics) | Professional, brief, need reliability and clinical communication. | Referral process, scope of procedures, reporting back | P11 |

---

## 3. Sitemap & URL structure

```
heavennursingcare.[com|pk]                      ← domain [CONFIRM]
│
├── /                                        P01  Home
├── /services                                P06  Services (hub)
│   ├── /services/doctor-home-visit          S01  Doctor Home Visit & Consultation
│   ├── /services/nursing-care               S02  Professional Nursing Care
│   ├── /services/injections-iv-therapy      S03  Injections & IV Medication
│   ├── /services/bp-sugar-monitoring        S04  BP, Sugar & Vital Signs Monitoring
│   ├── /services/ng-tube-feeding-care       S05  NG Tube & Feeding Care
│   ├── /services/urinary-catheter-care      S06  Urinary Catheter Care
│   ├── /services/wound-dressing-care        S07  Wound & Dressing Care
│   ├── /services/elderly-patient-care       S08  Elderly & Patient Care
│   ├── /services/post-surgery-care          S09  Post-Surgery & Recovery Care
│   ├── /services/paramedical-support        S10  Paramedical & Medical Support
│   └── /services/mother-baby-care           S11  Mother & Baby Care            [CONFIRM scope]
├── /care-plans                              P08  Care Plans (how care is arranged)
├── /who-we-care-for                         P09  Who We Care For (use cases hub)
│   └── /who-we-care-for/overseas-families   P10  Care for Parents from Abroad
├── /for-hospitals-and-doctors               P11  Referral Partners
├── /how-it-works                            P05  How It Works
├── /areas-we-serve                          P12  Areas We Serve
├── /about                                   P02  About Us
│   ├── /about/care-team                     P03  Our Care Team
│   └── /about/quality-and-safety            P04  Quality & Safety
├── /faq                                     P13  FAQ
├── /contact                                 P14  Contact
├── /book-a-visit                            P15  Book a Home Visit (Get Started)
│   └── /book-a-visit/thank-you              P16  Thank You                     (noindex)
├── /legal/privacy-policy                    P17  Privacy Policy
├── /legal/terms                             P18  Terms of Service
├── /legal/medical-disclaimer                P19  Medical Disclaimer
├── /legal/patient-rights                    P20  Patient Rights & Responsibilities
├── /legal/cookie-policy                     P21  Cookie Policy  (only if non-essential cookies are used)
└── (any unknown URL)                        P22  404
```

**Out of scope by brief:** Careers, Portfolio/Case Studies, Blog/Resources, Pricing.

### URL rules

1. Lowercase, hyphen-separated, English words, no IDs, dates or file extensions.
2. Maximum three levels deep. Every page is reachable within three clicks of Home.
3. No trailing slash (`trailingSlash: 'never'`). The other form 301-redirects to the canonical.
4. Slugs are keyword-led but readable (`/services/wound-dressing-care`, not `/services/wound-care-lahore-best`).
5. Once a URL is published it is permanent. Any change needs a 301 redirect, recorded in the redirects file (doc 04).
6. `/legal` has no index page and is not linked.
7. **Phase 2 Urdu:** mirror the structure under `/ur/` with the same English slugs (e.g. `/ur/services/nursing-care`), plus `hreflang` pairs.
8. **Phase 2 area pages:** `/areas-we-serve/{area}` (e.g. `/areas-we-serve/dha`), only when each page has genuinely unique content (see §10.4).

---

## 4. Page inventory

| ID | Page | URL | Template | Navigation | Phase | Index |
|---|---|---|---|---|---|---|
| P01 | Home | `/` | T1 | Logo | Launch | ✓ |
| P02 | About Us | `/about` | T2 | About ▾ | Launch | ✓ |
| P03 | Our Care Team | `/about/care-team` | T2 | About ▾ | Launch | ✓ |
| P04 | Quality & Safety | `/about/quality-and-safety` | T2 | About ▾ | Launch | ✓ |
| P05 | How It Works | `/how-it-works` | T2 | About ▾ | Launch | ✓ |
| P06 | Services hub | `/services` | T3 | Services ▾ | Launch | ✓ |
| S01–S11 | Service detail (×11) | `/services/{slug}` | T4 | Services ▾ (mega menu) | Launch (S10, S11: see §7.7) | ✓ |
| P08 | Care Plans | `/care-plans` | T2 | Primary nav | Launch | ✓ |
| P09 | Who We Care For | `/who-we-care-for` | T3 | Who We Care For ▾ | Launch | ✓ |
| P10 | Overseas Families | `/who-we-care-for/overseas-families` | T5 | Who We Care For ▾ | Launch | ✓ |
| P11 | For Hospitals & Doctors | `/for-hospitals-and-doctors` | T5 | Who We Care For ▾ / footer | Launch (can slip to Phase 2) | ✓ |
| P12 | Areas We Serve | `/areas-we-serve` | T2 | About ▾ / footer | Launch | ✓ |
| P13 | FAQ | `/faq` | T2 | About ▾ / footer | Launch | ✓ |
| P14 | Contact | `/contact` | T6 | Primary nav | Launch | ✓ |
| P15 | Book a Home Visit | `/book-a-visit` | T6 | Header CTA button | Launch | ✓ |
| P16 | Thank You | `/book-a-visit/thank-you` | T8 | — | Launch | ✗ noindex |
| P17 | Privacy Policy | `/legal/privacy-policy` | T7 | Footer | Launch | ✓ |
| P18 | Terms of Service | `/legal/terms` | T7 | Footer | Launch | ✓ |
| P19 | Medical Disclaimer | `/legal/medical-disclaimer` | T7 | Footer | Launch | ✓ |
| P20 | Patient Rights & Responsibilities | `/legal/patient-rights` | T7 | Footer | Launch | ✓ |
| P21 | Cookie Policy | `/legal/cookie-policy` | T7 | Footer | Only if non-essential cookies are used | ✓ |
| P22 | 404 | — | T8 | — | Launch | ✗ |

**Site search:** not needed for about 30 pages. Navigation, the FAQ filter and the footer cover it. Revisit if the site grows past ~60 pages.

---

## 5. Page templates

The designer builds **8 templates**, not 30 pages. Each page below names its template.

| T# | Template | Used by | Key characteristics |
|---|---|---|---|
| T1 | Home | P01 | Long-form storytelling, two signature motion moments (doc 03), all conversion components |
| T2 | Standard content | P02–P05, P08, P12, P13 | Hero (H1, subhead, optional media), modular content sections, CTA band |
| T3 | Hub | P06, P09 | Hero, filterable or anchored grid of children, cross-links, CTA band |
| T4 | Service detail | S01–S11 | Structured service page with a fixed section order (§7.7), service-prefilled CTAs, medical review byline |
| T5 | Audience landing | P10, P11 | Focused on one audience: problem → solution → proof → CTA. Can run as an ad landing page |
| T6 | Conversion | P14, P15 | Form-led, few distractions, reassurance panel, alternative channels |
| T7 | Legal | P17–P21 | Single readable column (≤ 72ch), sticky table of contents on desktop, "Last updated" date |
| T8 | Utility | P16, P22 | Short message, next steps, links back into the site |

---

## 6. Navigation & global elements

### 6.1 Desktop header (≥ 1024px)

```
[Logo]   Services ▾   Care Plans   Who We Care For ▾   About ▾   Contact        ☎ 0324 4744447   [WhatsApp]   [Book a home visit]
```

- **Sticky.** Shrinks from 80px to 64px after 80px of scroll (M04). Solid white background with a subtle blur once scrolled.
- **Phone number** is always visible as text, so older users can read it and dial from another phone. On pointer devices a small copy icon sits beside it (M13).
- **Order of prominence:** "Book a home visit" (filled, primary) → WhatsApp (outlined, WhatsApp icon) → phone (text link).

**Services ▾ mega menu**

| Medical | Nursing procedures | Daily & recovery care | Side panel |
|---|---|---|---|
| Doctor home visit (S01) | Professional nursing care (S02) | Elderly & patient care (S08) | **Not sure what you need?** → Care Finder (P01 `#care-finder`) |
| BP, sugar & vital signs (S04) | Injections & IV medication (S03) | Post-surgery & recovery (S09) | **Care plans:** visit, day, night or 24-hour → P08 |
| Paramedical support (S10) | NG tube & feeding care (S05) | Mother & baby care (S11) | **All services** → P06 |
| | Urinary catheter care (S06) | | |
| | Wound & dressing care (S07) | | |

Each item shows its 3D icon (small), name and a one-line description (doc 02 §6).

**Who We Care For ▾:** Elderly parents · Bedridden patients · After surgery & hospital discharge · Chronic conditions · Mothers & newborns (each links to an anchor on P09) · **Families living abroad** (P10) · **For hospitals & doctors** (P11)

**About ▾:** About us (P02) · Our care team (P03) · Quality & safety (P04) · How it works (P05) · Areas we serve (P12) · FAQ (P13)

### 6.2 Mobile header (< 1024px)

```
[Logo]                         [☎]  [☰ Menu]
```

- **Menu:** full-screen sheet (M06). The same groups as desktop, as accordions. The bottom of the sheet holds three buttons (Book · WhatsApp · Call), the address and "Available 24/7".
- Focus is trapped while open. Esc and the close button both dismiss it. Body scroll is locked.

### 6.3 Mobile action bar (< 1024px, every page)

```
┌──────────────┬──────────────┬──────────────┐
│  ☎  Call     │  ◉ WhatsApp  │  Book visit  │
└──────────────┴──────────────┴──────────────┘
```

- Fixed to the bottom, 64px tall plus `env(safe-area-inset-bottom)`. Each button is at least 48px tall. Labels always shown, never icon-only.
- **Always visible.** It never hides on scroll, because older users rely on it. On P01 it slides in once the hero CTAs leave the viewport (M07).
- On P15 the "Book visit" button is replaced by nothing (the bar shows two buttons), because the user is already on the form. Hidden on P16.
- Page content gets bottom padding equal to the bar height, so the footer is never covered.

### 6.4 Floating WhatsApp button (desktop only)

Bottom-right. Appears after 30% scroll (M08). Tooltip: "Chat with us on WhatsApp — available 24/7" [CONFIRM reply hours]. Hidden on P15 and P16. Not shown on mobile, where the action bar does this job.

### 6.5 Footer

```
┌─ CTA band (global, except P15/P16) ─────────────────────────────────────────────┐
│ "Let's talk about the care your loved one needs."  [Book] [WhatsApp] ☎ number    │
└──────────────────────────────────────────────────────────────────────────────────┘
┌ Brand ───────────────┬ Services ─────────┬ Company ───────────┬ Help ──────────┬ Contact ─────────────┐
│ Logo                 │ 11 service links  │ About us           │ FAQ            │ ☎/WhatsApp           │
│ Tagline              │ Care plans        │ Our care team      │ Who we care for│  0324 4744447 (24/7) │
│ 2-line description   │                   │ Quality & safety   │ Overseas       │ 176-A Pak Arab       │
│ Social: FB · IG ·    │                   │ How it works       │  families      │  Society, Lahore     │
│ Google reviews       │                   │ Areas we serve     │ Book a visit   │  → Get directions    │
│ [CONFIRM handles]    │                   │ For hospitals &    │ Contact        │ Email [CONFIRM]      │
│                      │                   │  doctors           │                │ Reg. no. [CONFIRM]   │
└──────────────────────┴───────────────────┴────────────────────┴────────────────┴──────────────────────┘
  ⚠ Emergency notice (§6.9)
  © 2026 Heaven Nursing Care 24/7 · Privacy · Terms · Medical disclaimer · Patient rights · [Cookie settings*]
```

- **Mobile:** the Services, Company and Help columns become accordions. Brand and Contact stay open.
- The footer lists every service, which guarantees a crawl path to all of them.
- *"Cookie settings" appears only if a consent manager is in use (doc 04 §3.21).

### 6.6 Breadcrumbs

On every page except P01, P15, P16 and P22. Format: `Home › Services › Wound & dressing care`. Marked up with `BreadcrumbList` schema. On mobile, collapse to `‹ Services` (parent only).

### 6.7 CTA band (reusable component)

| Variant | Used on | Primary | Secondary | Tertiary |
|---|---|---|---|---|
| Default | Most pages | Book a home visit | WhatsApp us | Call number |
| Service | S01–S11 | Book {service} | Ask about {service} on WhatsApp (prefilled) | Call |
| Overseas | P10 | WhatsApp us (international format +92 324 4744447) | Request a call back | — |
| Partner | P11 | Refer a patient | Partner enquiry form | Call |

### 6.8 Trust strip (reusable)

A horizontal row of 4–5 short proof points with icons, used on P01, P06, S-pages and P10. Example items (each needs proof): *Qualified nurses & doctors [CONFIRM registration]* · *24/7 phone & WhatsApp line* · *Day, night & 24-hour care* · *Female & male staff available [CONFIRM]* · *★ 4.x on Google [CONFIRM — only if real]*.

Mobile: a 2×2 grid. If there is a fifth item, it drops.

### 6.9 Emergency notice (required)

> Heaven Nursing Care 24/7 is not an emergency service. In a medical emergency, call **Rescue 1122** or go to the nearest hospital emergency department.

**Placement:** the footer (every page), above the form on P15, on P14, as FAQ Q4, and on the thank-you page. "24/7" in the brand name could be read as emergency response. This notice protects patients and the business.

### 6.10 Cookie / consent banner (conditional)

Only if non-essential cookies or trackers are used (GA4 or Meta Pixel for ads, see doc 04 §3.20–3.21). With cookieless analytics alone, no banner is needed.

---

## 7. Page specifications

### 7.1 P01 · Home — `/`

**Template:** T1 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | In about 10 seconds, establish what the business does (doctors, nurses and caregivers at home), where (Lahore), when (24/7) and why it can be trusted. Then route each visitor to the right service or straight to contact. |
| **Target audience** | All, with A1 and A2 first |
| **Primary CTA** | Book a home visit → P15 |
| **Secondary CTA** | WhatsApp us (prefilled, ref `WEB`) · Call 0324 4744447 |
| **Conversion goals** | Lead rate ≥ [baseline after 4 weeks]; ≥ 40% of visitors reach a service page, the Care Finder or a contact action |

**Content sections & layout**

| # | Section | Content | Layout (desktop → mobile) |
|---|---|---|---|
| 1 | **Hero** | Eyebrow "Home nursing & healthcare · Lahore · 24/7"; H1; subhead; Book + WhatsApp buttons; "or call 0324 4744447"; three-item proof row | 12-column grid: text 6 columns on the left, arch-shaped media 6 columns on the right (M20) with two floating "vitals" chips (M21). Soft "dawn sky" background (M22). **Mobile:** text, then buttons, then a short arch image (40vh); the proof row scrolls horizontally |
| 2 | **Trust strip** | §6.8 | Full-width band directly under the hero |
| 3 | **Services overview** | H2 + intro; filter chips (All · Medical · Nursing procedures · Daily & recovery care); 11 service cards (3D icon, name, one line, link); "Explore all services" | 4-column card grid (3 at 1024px). **Mobile:** 2-column compact cards, chips scroll horizontally |
| 4 | **Who we care for** | 6 situation tiles: Elderly parents, Bedridden patients, After surgery, Chronic conditions, Mothers & newborns, Families abroad | 3×2 image tiles with overlaid titles. **Mobile:** horizontal scroll-snap, 85% card width so the next card peeks |
| 5 | **Care Finder** `#care-finder` | "Not sure what you need?" Three-question selector → recommended services + plan → prefilled WhatsApp or booking (§8.4) | Centred card (max 760px) on a tinted panel (M26). **Mobile:** full-width stepper |
| 6 | **How it works** | 4 steps: Tell us → We assess → We match → Care begins and you stay informed; link to P05 | 4 columns joined by an animated path (M27, M41). **Mobile:** a vertical timeline |
| 7 | **Around the clock** | "Care that doesn't clock off": Morning, Afternoon, Evening, Night examples; link to P08 | Pinned day-to-night scroll story (M28). **Mobile:** 4 stacked cards, each with its own time-of-day colour |
| 8 | **Our care team** | 5 roles (Doctors, Nurses, Paramedical staff, Assistant nurses, Ayas/Caregivers) with one-line descriptions from the source; real team photo; link to P03 | Team photo on the left (5 cols), role list on the right (7 cols). **Mobile:** photo, then the list |
| 9 | **Why families choose us** | The source's 6 reasons, rewritten (doc 02 §3.9) | Bento grid: 2 large and 4 small tiles. **Mobile:** single column |
| 10 | **Stats** *(only if verified)* | 3–4 counters (doc 02 §10). **If there are no verified numbers, drop the section entirely. Never show placeholders.** | Row of counters (M30) |
| 11 | **Testimonials** | 3–6 real, consented testimonials plus a Google rating link | Scroll-snap row with prev/next buttons (M34). No autoplay |
| 12 | **Families abroad band** | "Living abroad? We'll be there for your parents." Mini chat illustration (M32, 3 messages); link to P10 | 2 columns: copy on the left, phone mock-up on the right. **Mobile:** stacked |
| 13 | **FAQ preview** | 5 top questions (doc 02 §12, marked ★) + link to P13 | Accordion, max 760px wide |
| 14 | **Final CTA band** | §6.7 default, with the emergency notice in small print | Full-width warm gradient with a light glow (M35) |

**Required media**
- Hero video loop, 8–12s, silent, portrait crop for the arch (M40), plus an AVIF poster. Real staff with a consenting patient or model.
- 11 pre-rendered 3D service icons (doc 03 §2.5).
- 6 situation photos (original shoot preferred, §12).
- Real team group photo in uniform.
- 4 How-it-works line illustrations (SVG).
- Day/night illustration set: sun/moon arc and 4 time-of-day scenes (SVG).
- Chat mock-up, built in HTML/CSS (not an image).
- Default OG image (1200×630).

**Internal linking**
- All 11 service pages (cards), P06, P08, P09 and its anchors, P10, P05, P03, P13, P15.
- The Care Finder results link to S-pages and P08.

**SEO considerations**
- Primary keyword: *home nursing care in Lahore*. Secondary: *home healthcare services Lahore*, *nurse at home Lahore*, *24/7 home care Lahore*.
- One H1, which may be emotional. The eyebrow and first paragraph must contain "home nursing" and "Lahore".
- Schema: `MedicalBusiness` (with `LocalBusiness` properties: NAP, `openingHoursSpecification` 24/7, `areaServed` Lahore, `sameAs`) + `WebSite`.
- Service names and descriptions are real HTML text, never only inside a canvas or image.
- LCP target is the H1 or the hero poster. The hero video loads after LCP.

---

### 7.2 P02 · About Us — `/about`

**Template:** T2 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Tell the company's story, mission and values. Prove there is a real, accountable organisation behind the phone number. |
| **Target audience** | A1, A2, A6. Anyone checking credibility before calling. |
| **Primary CTA** | Book a home visit |
| **Secondary CTA** | Meet our care team → P03 |
| **Conversion goals** | Reach P03/P04 or a contact action; lower bounce from trust-checkers |

**Content sections & layout**
1. **Hero:** H1 "Professional healthcare, at the heart of home" + subhead. Wide arch-masked photo of the team or office.
2. **Our story:** why the company was founded, by whom, when [CONFIRM all]. 2-column: text plus a portrait of the founder or medical lead (parallax M36).
3. **Mission (our commitment):** adapted from the source's "Our Commitment"; large pull-quote "Professional Healthcare. Compassionate Care. At Your Home."
4. **Values:** 5 values (Dignity, Competence, Reliability, Transparency, Compassion), each with a one-line meaning. 5-column icon row; on mobile, 2 columns.
5. **What we do at a glance:** 5 roles × 11 services summary with links to P03 and P06.
6. **Leadership & clinical oversight:** named people with roles and registrations (e.g. "Dr [Name], Medical Director, PMDC reg. [#]") [CONFIRM]. 2–3 portrait cards.
7. **Registrations & credentials:** business registration, Punjab Healthcare Commission registration if held, staff council registrations (PNMC for nurses, PMDC for doctors) [CONFIRM all]. Badge row, each badge linking to a verification source where one exists.
8. **Our office:** address, photo of the exterior and reception, "Visit us" with a map link.
9. **CTA band** (default).

**Required media:** founder/leadership portraits, office exterior and interior, team photo, value icons (Lucide).
**Internal linking:** P03, P04, P05, P06, P12, P14.
**SEO considerations:** target brand queries ("Heaven Nursing Care Lahore"). Schema: `AboutPage` + `Organization` reference. Strong E-E-A-T page; named people with credentials matter for health content.

---

### 7.3 P03 · Our Care Team — `/about/care-team`

**Template:** T2 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Explain the five professional roles, what each does and doesn't do, and how staff are selected and matched. Directly answers "who will come to my home?" |
| **Target audience** | A1, A2, A4 |
| **Primary CTA** | Book a home visit |
| **Secondary CTA** | Read our quality & safety standards → P04 |
| **Conversion goals** | Lower anxiety about strangers at home; move users to booking |

**Content sections & layout**
1. **Hero:** H1 "The right professional for every need". Group photo.
2. **Five roles:** Doctors, Nurses, Paramedical Staff, Assistant Nurses, Ayas/Caregivers. For each: the source description, typical tasks, qualification level [CONFIRM], and the services they deliver (links). Expandable role cards (M37); 5 across on desktop, stacked on mobile.
3. **"Which professional do I need?"** A comparison table: role × example tasks (injections, dressing, hygiene, feeding, NG tube, doctor's review). Shown as cards on mobile.
4. **How we select our staff:** verification of qualifications, interviews, reference and background checks, ID verification [CONFIRM each step]. Numbered steps.
5. **Training & supervision:** [CONFIRM] e.g. induction, infection-control training, clinical supervision by a senior nurse or doctor.
6. **Matching to your family:** clinical need, staff gender preference [CONFIRM], language, experience with the condition, continuity of the same carer where possible [CONFIRM].
7. **Conduct & uniform:** ID cards, uniform, punctuality, respect for household customs and privacy [CONFIRM].
8. **Featured professionals** (optional, with written consent): photo, first name, role, years of experience.
9. **CTA band.**

**Required media:** group photo, 5 role photos (real staff in uniform), optional individual portraits.
**Internal linking:** each role links to its services; P04, P05, P15.
**SEO considerations:** keywords: *qualified nurses Lahore*, *patient attendant Lahore*, *aya for patient care*. Schema: `WebPage` (+ `Person` for featured professionals only with consent). **Note:** this is not a careers page. No recruitment CTA, per the brief.

---

### 7.4 P04 · Quality & Safety — `/about/quality-and-safety`

**Template:** T2 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Show the standards behind clinical care at home. This separates the brand from informal attendant agencies. |
| **Target audience** | A1, A2, A6 |
| **Primary CTA** | Book a home visit |
| **Secondary CTA** | Read our patient rights → P20 |
| **Conversion goals** | Build trust for higher-acuity services (IV, NG tube, catheter); give P11 visitors confidence to refer |

**Content sections & layout**
1. **Hero:** H1 "Safe, careful, accountable care".
2. **Our standards, at a glance:** 6 tiles. *Procedures by qualified staff only* (from source) · *Medication only as prescribed* (from source) · *Infection-control practices* (from source) · *Clinical oversight* [CONFIRM] · *Care records* [CONFIRM] · *Family communication* (from source).
3. **Clinical procedures and who performs them:** table of procedure → minimum role (e.g. NG tube insertion → qualified nurse [CONFIRM]).
4. **Infection control:** hand hygiene, single-use sterile supplies, safe disposal of sharps and dressings [CONFIRM practices].
5. **Medication safety:** prescription required, checks before administering, record of doses [CONFIRM].
6. **If a patient's condition changes:** escalation steps (staff inform the family and the treating doctor; in an emergency, call 1122) [CONFIRM protocol]. Simple flow diagram.
7. **Privacy & dignity:** confidentiality, same-gender care on request [CONFIRM], respect for the home.
8. **Feedback & complaints:** how to raise a concern, who handles it, target response time [CONFIRM].
9. **CTA band.**

**Required media:** 6 icons, an escalation flow diagram (SVG), one calm photo (hands washing, or a nurse preparing sterile supplies, with no needles in close-up).
**Internal linking:** P03, P20, P19, S03, S05, S06, S07.
**SEO considerations:** low search volume, high trust value. Schema: `WebPage`. Keep every claim specific and verifiable. A vague "highest standards" claim does more harm than good.

---

### 7.5 P05 · How It Works — `/how-it-works`

**Template:** T2 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Remove uncertainty about the process from first contact to ongoing care. |
| **Target audience** | A1, A2, A3 |
| **Primary CTA** | Book a home visit |
| **Secondary CTA** | WhatsApp us |
| **Conversion goals** | Visitors who read this page should convert at a higher rate than average |

**Content sections & layout**
1. **Hero:** H1 "From first call to first visit".
2. **Four steps in detail:** (1) Tell us what's needed (channels, what we'll ask); (2) Care assessment (by phone and/or a home visit by a nurse or doctor [CONFIRM]); (3) Matching the right professional; (4) Care begins and the family stays informed. A vertical timeline with an illustration per step (M27, M41).
3. **What to have ready:** prescriptions, discharge summary, medication list, the patient's routine, and preferences (e.g. staff gender). Checklist card.
4. **The first visit:** what happens, roughly how long it takes, introductions [CONFIRM].
5. **Changing, extending or pausing care:** how it works [CONFIRM notice].
6. **How we keep you updated:** update format and frequency [CONFIRM].
7. **FAQ subset:** Booking & scheduling category (P13).
8. **CTA band.**

**Required media:** 4 step illustrations (shared with P01), one photo of a first-visit introduction.
**Internal linking:** P15, P08, P03, P13, P10.
**SEO considerations:** keywords: *how to hire a nurse at home*, *home nursing process*. Schema: `WebPage` + `FAQPage`. Google has retired `HowTo` rich results, so `HowTo` schema isn't worth adding.

---

### 7.6 P06 · Services hub — `/services`

**Template:** T3 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Show the complete range of services at a glance and route visitors to the right service page. |
| **Target audience** | All |
| **Primary CTA** | Book a home visit |
| **Secondary CTA** | Find the right care (Care Finder) |
| **Conversion goals** | ≥ 60% of hub visitors click through to a service page or a contact action |

**Content sections & layout**
1. **Hero:** H1 "Home healthcare services in Lahore" + subhead. Trust strip.
2. **3D Care Kit (signature):** a medical bag opens to reveal instruments, each linked to a service (M23). An HTML list of the same links sits alongside for accessibility. **Mobile and low-power devices:** a static render plus the list.
3. **Services by category:** filter chips plus 11 cards in 3 groups (Medical / Nursing procedures / Daily & recovery care). Card: 3D icon, name, one-line description, top 3 inclusions, "Learn more" (M25).
4. **Not sure? Care Finder:** a compact version, or a link to P01 `#care-finder`.
5. **How care is arranged:** a teaser of the 4 coverage types (Visit · Day · Night · 24-hour) → P08.
6. **Who provides your care:** the 5-role strip → P03.
7. **FAQ subset:** Services category.
8. **CTA band.**

**Required media:** Care Kit GLB plus a poster render, 11 icons.
**Internal linking:** all 11 S-pages, P08, P03, P09, P15.
**SEO considerations:** keywords: *home healthcare services Lahore*, *home care services Lahore*. Schema: `CollectionPage` + `ItemList` of `Service`. Each card is a crawlable `<a>`.

---

### 7.7 S01–S11 · Service detail — `/services/{slug}`

**Template:** T4 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Confirm that the exact service is offered, explain what's included and who performs it, reassure on safety, and convert with a CTA prefilled for that service. These pages carry most of the organic search traffic. |
| **Target audience** | A3, A1, A2. People searching for one specific procedure. |
| **Primary CTA** | Book {service} → `/book-a-visit?service={slug}` |
| **Secondary CTA** | Ask about {service} on WhatsApp (prefilled, ref `WEB-{CODE}`, doc 02 §11.3) · Call |
| **Conversion goals** | Highest-converting page type; target lead rate ≥ 1.5× site average |

**Fixed section order**

| # | Section | Content | Layout |
|---|---|---|---|
| 1 | Hero | Breadcrumb; H1; one-sentence subhead; Book + WhatsApp buttons; fact chips: *Provided by* (role), *Available as* (visit or shift) [CONFIRM], *Area:* Lahore | Text 7 cols, large 3D icon 5 cols (M24, shared-element transition from the card, M11). **Mobile:** icon above the H1, smaller |
| 2 | Overview | 2 short paragraphs: what it is, who it helps (doc 02 §6) | Single column, max 68ch |
| 3 | What's included | Checklist from the source document | 2-column checklist; 1 column on mobile |
| 4 | Who it's for | Situation chips linking to P09 anchors | Chip row |
| 5 | Who provides it | Role card(s) → P03 | 1–2 cards |
| 6 | How it works | 3–4 steps specific to the service | Horizontal steps; vertical on mobile |
| 7 | Safety & clinical standards | The service's safety note (e.g. prescription required) | Tinted callout box with an icon |
| 8 | Related services | 3 cards (§9.2 matrix) | 3-column cards; scroll-snap on mobile |
| 9 | FAQs | 4–6 service-specific questions | Accordion |
| 10 | Medical review byline | "Medically reviewed by Dr [Name], PMDC reg. [#] · Last reviewed [date]" [CONFIRM reviewer] | Small text row |
| 11 | CTA band | Service variant (§6.7) | — |

**Per-service specification**

| ID | Service | Slug | H1 | Provided by | Primary keyword | Unique content to add | Related |
|---|---|---|---|---|---|---|---|
| S01 | Doctor Home Visit & Medical Consultation | `doctor-home-visit` | Doctor home visits in Lahore | Doctor | doctor home visit Lahore | What a home examination covers; post-hospital assessment; referral coordination; prescribing [CONFIRM] | S04, S02, S09 |
| S02 | Professional Nursing Care | `nursing-care` | Professional nursing care at home | Qualified nurse | nurse at home Lahore | Day, night and 24/7 shift explanation; bedside procedures; nurse vs assistant nurse vs caregiver | S03, S07, S08 |
| S03 | Injections & IV Medication | `injections-iv-therapy` | Injections, drips & IV medication at home | Qualified nurse / paramedical [CONFIRM] | injection at home Lahore; drip at home Lahore | IM, subcutaneous and IV explained in plain English; prescription requirement; courses of antibiotics | S02, S01, S04 |
| S04 | BP, Sugar & Vital Signs Monitoring | `bp-sugar-monitoring` | BP, sugar & vital signs monitoring at home | Nurse / assistant nurse [CONFIRM] | BP and sugar check at home Lahore | What each vital sign means; how readings are recorded and shared; animated vitals panel (M31) | S01, S02, S08 |
| S05 | NG Tube & Feeding Care | `ng-tube-feeding-care` | NG tube insertion & feeding care at home | Qualified nurse | NG tube insertion at home Lahore | What an NG tube is; safety checks before feeding [CONFIRM protocol]; family guidance | S06, S08, S02 |
| S06 | Urinary Catheter Care | `urinary-catheter-care` | Urinary catheter care at home | Qualified nurse | catheter change at home Lahore | Insertion and replacement, infection prevention, dignity and same-gender staff [CONFIRM] | S05, S08, S07 |
| S07 | Wound & Dressing Care | `wound-dressing-care` | Wound care & dressing at home | Nurse | wound dressing at home Lahore | Surgical wounds, bed sores, diabetic wounds; dressing frequency; signs to watch | S09, S08, S03 |
| S08 | Elderly & Patient Care | `elderly-patient-care` | Elderly & bedridden patient care at home | Caregiver (aya) / assistant nurse | elderly care at home Lahore; patient attendant Lahore | Daily routine support, turning and positioning, companionship; combining with nurse visits | S04, S01, S07 |
| S09 | Post-Surgery & Recovery Care | `post-surgery-care` | Post-surgery & recovery care at home | Nurse + caregiver | post-operative care at home Lahore | Typical recovery timeline at home; discharge coordination; mobility support | S07, S03, S02 |
| S10 | Paramedical & Medical Support | `paramedical-support` | Paramedical & medical support at home | Paramedical staff | paramedical staff at home Lahore | **Source content is thin.** Get a specific list of paramedical services [CONFIRM] | S02, S01, S09 |
| S11 | Mother & Baby Care | `mother-baby-care` | Mother & baby care at home | Nurse / midwife / LHV [CONFIRM] | postnatal care at home Lahore; newborn baby care Lahore | Appears only in the flyer. Confirm scope (mother's recovery, newborn care, feeding support) and staff qualifications | S02, S04, S01 |

> **Thin-content rule (S10, S11):** if the client can't provide at least 6 specific inclusions and staff details for a service, don't publish a standalone page. Show it as a section on P06 and add the page later. A thin page hurts the whole site's quality signals.

**Required media (per page):** 3D icon at hero size (1024px), one supporting photo (dignified; no close-ups of wounds, needles or catheters), an OG image with the icon.
**Internal linking:** breadcrumb to P06; 3 related services; at least one P09 anchor; P03 role; P15 prefilled; relevant P13 category.
**SEO considerations:** 800–1,200 words of unique copy per page. The title follows `{Service} at Home in Lahore | Heaven Nursing Care` (doc 02 §13). Schema: `Service` (`serviceType`, `provider` → MedicalBusiness, `areaServed` Lahore) + `MedicalWebPage` (`reviewedBy`, `lastReviewed`) + `BreadcrumbList` + `FAQPage`. The medical reviewer byline supports E-E-A-T for health content.

---

### 7.8 P08 · Care Plans — `/care-plans`

**Template:** T2 · **Phase:** Launch · *(Fills the brief's "Products or Solutions" slot. Coverage options, no prices.)*

| | |
|---|---|
| **Purpose** | Explain how care can be arranged (coverage × duration), so families can picture the commitment before calling. Prices are left out deliberately. |
| **Target audience** | A1, A2 |
| **Primary CTA** | Get a care plan → `/book-a-visit?plan={type}` |
| **Secondary CTA** | WhatsApp us (ref `WEB-PLAN`) |
| **Conversion goals** | Visitors arrive at the booking form with a plan pre-selected |

**Content sections & layout**
1. **Hero:** H1 "Care arranged around your day — and night".
2. **24-hour care ring (interactive):** choose Visit / Day shift / Night shift / 24-hour; the ring shows the covered hours and a short description (M29). Shift hours [CONFIRM, e.g. 8 am–8 pm].
3. **Coverage options:** 4 cards.
   - **Single visit:** injections, dressing, catheter change, doctor visit.
   - **Day shift:** daytime nursing or caregiving.
   - **Night shift:** overnight watch, turning, medication.
   - **24-hour care:** round-the-clock rotating staff or live-in [CONFIRM model].
   Each card covers: best for, typical professional, example services, "Get this plan".
4. **Duration:** one-off · short-term (days to weeks, e.g. after surgery) · ongoing (long-term care). Three simple columns.
5. **Combining services:** examples such as "daily caregiver + nurse visit for injections + monthly doctor review". 2–3 illustrated combinations.
6. **How cost is worked out (no prices):** depends on the professional, the services and the hours; a clear quote is given after assessment [CONFIRM wording]. A text block only. This keeps the page within the "no pricing" brief while answering the question.
7. **CTA band.**

**Required media:** ring (SVG, built in code), 4 coverage icons, combination illustrations or icons.
**Internal linking:** S02, S08, S09, P05, P15, P13.
**SEO considerations:** keywords: *24 hour nursing care at home Lahore*, *night nurse Lahore*, *home care plans*. Schema: `WebPage` + `ItemList` of `Service` (no `Offer` or price).

---

### 7.9 P09 · Who We Care For — `/who-we-care-for`

**Template:** T3 · **Phase:** Launch · *(Fills the "Industries / Use Cases" slot.)*

| | |
|---|---|
| **Purpose** | Let visitors self-identify by situation, then point them to the right bundle of services. |
| **Target audience** | A1, A3, A5 |
| **Primary CTA** | Book a home visit (situation-prefilled `?who=`) |
| **Secondary CTA** | Find the right care (Care Finder) |
| **Conversion goals** | Situation → service page → lead |

**Content sections & layout**
1. **Hero:** H1 + subhead. Anchor chips: Elderly parents · Bedridden patients · After surgery · Chronic conditions · Mothers & newborns · Families abroad. The chips stick under the header on desktop and scroll horizontally on mobile.
2. **Six situation sections** (anchors `#elderly-parents`, `#bedridden-patients`, `#after-surgery`, `#chronic-conditions`, `#mothers-and-newborns`, `#families-abroad`). Each has:
   - *The challenge* (empathetic, 2 sentences)
   - *How we help* (3–4 bullets)
   - *Relevant services* (links, §9.3)
   - A situation CTA

   Layout alternates image left/right with parallax (M36); stacked on mobile.
3. **Families abroad:** a short teaser → P10.
4. **Healthcare professionals:** a one-line band → P11.
5. **CTA band.**

**Required media:** 6 situation photos (shared with P01 tiles).
**Internal linking:** all relevant S-pages, P10, P11, P08.
**SEO considerations:** don't target the same keywords as S08 or S09 (keyword map, §10.1). Target situation phrasing: *care for elderly parents at home*, *care for bedridden patient at home*, *home care after hospital discharge Lahore*. Schema: `WebPage`.

---

### 7.10 P10 · Overseas Families — `/who-we-care-for/overseas-families`

**Template:** T5 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Win families abroad by solving their specific problem: arranging and overseeing a parent's care remotely. This page can also serve as the landing page for ads that target the diaspora. |
| **Target audience** | A2 |
| **Primary CTA** | WhatsApp us (international format, ref `WEB-ABROAD`) |
| **Secondary CTA** | Request a call back at a time that suits your time zone → P15 |
| **Conversion goals** | WhatsApp chats from non-Pakistan numbers; highest lead value per visit |

**Content sections & layout**
1. **Hero:** H1 "Caring for your parents in Lahore, wherever you are". Photo of an elderly parent on a video call with a nurse beside them (parallax M36). WhatsApp button prominent.
2. **The worry, acknowledged:** 2–3 sentences of empathy, without fear-mongering.
3. **How we help from afar:** 6 tiles.
   - A single point of contact [CONFIRM]
   - Regular WhatsApp updates [CONFIRM format]
   - Video calls with your parent
   - Doctor visit summaries
   - Coordination with hospitals and specialists (from source)
   - Help if something changes
4. **"A day of updates":** an animated chat mock-up (M32), clearly labelled as an example.
5. **Getting started from abroad:** 4 steps, including the assessment visit with a family member or neighbour present [CONFIRM].
6. **Payments from abroad:** methods [CONFIRM]. No prices.
7. **Trust strip + testimonials from overseas families** (if available).
8. **Overseas FAQ** (doc 02 §12, "Families abroad" category).
9. **CTA band** (overseas variant).

**Required media:** video-call photo, chat mock-up (HTML), optional world-to-Lahore line illustration.
**Internal linking:** S08, S02, S01, P04, P05, P13.
**SEO considerations:** keywords: *care for elderly parents in Pakistan from abroad*, *home nursing Lahore for overseas Pakistanis*. Show the phone number as **+92 324 4744447** on this page. Schema: `WebPage`. If ads need a stripped-down variant, create `/lp/overseas` with `noindex` (Phase 2).

---

### 7.11 P11 · For Hospitals & Doctors — `/for-hospitals-and-doctors`

**Template:** T5 · **Phase:** Launch (recommended; can slip to Phase 2)

| | |
|---|---|
| **Purpose** | Build a B2B referral channel for safe discharge to home. The source mentions coordination with hospitals and specialists. |
| **Target audience** | A6 |
| **Primary CTA** | Refer a patient (phone or WhatsApp, ref `WEB-PARTNER`) |
| **Secondary CTA** | Partner enquiry form (on the page) |
| **Conversion goals** | Partner enquiries; recurring referrers |

**Content sections & layout**
1. **Hero:** H1 "A safe next step home for your patients". Professional tone, no emotional imagery.
2. **What we can take on:** a services grid of procedures (wound care, NG tube, catheter, IV medication, monitoring, post-operative nursing, elderly care).
3. **How referral works:** 4 steps (contact → share discharge summary and orders → we confirm staffing → care starts and we report back [CONFIRM]).
4. **Clinical communication:** what the referring doctor receives and when [CONFIRM].
5. **Standards:** a summary of P04 with a link.
6. **Partner enquiry form:** name, organisation, role, phone, email, message, consent.
7. **Direct line:** phone/WhatsApp, email [CONFIRM].

**Required media:** a clean photo of a nurse with clinical documents; service icons.
**Internal linking:** P04, P03, S03, S05, S06, S07, S09.
**SEO considerations:** low volume; the page mostly exists to be shared directly with hospitals and clinics. Schema: `WebPage`.

---

### 7.12 P12 · Areas We Serve — `/areas-we-serve`

**Template:** T2 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Confirm coverage for a visitor's neighbourhood and strengthen local SEO. |
| **Target audience** | A1, A2 |
| **Primary CTA** | Book a home visit (area pre-selected) |
| **Secondary CTA** | "Don't see your area? Ask us on WhatsApp" |
| **Conversion goals** | Remove the "do they cover my area?" objection |

**Content sections & layout**
1. **Hero:** H1 "Home nursing across Lahore". Base: 176-A Pak Arab Society.
2. **Coverage map:** a stylised SVG map of Lahore with the HQ pin and highlighted areas (M33). An accessible list next to it is the source of truth.
3. **Area list:** grouped alphabetically or by zone, with a filter field. Candidate areas: DHA, Gulberg, Model Town, Johar Town, Bahria Town, Cantt, Garden Town, Faisal Town, Wapda Town, Allama Iqbal Town, Valencia, Township, Pak Arab Society, Lake City, Askari, Shadman, Samanabad [CONFIRM the full list].
4. **Visit times by area:** only if the client can commit to them [CONFIRM]; otherwise leave this out.
5. **CTA band.**

**Required media:** stylised Lahore map (SVG, designed; not for navigation).
**Internal linking:** P14, P15, P06.
**SEO considerations:** keywords: *home nursing near me*, *home nursing {area} Lahore*. One page at launch. **Phase 2:** individual area pages only with genuinely unique content (local team, local testimonials, response times). Otherwise Google treats them as doorway pages. Schema: `WebPage`. The `MedicalBusiness.areaServed` field lists areas.

---

### 7.13 P13 · FAQ — `/faq`

**Template:** T2 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Answer objections and operational questions in one place; capture long-tail search. |
| **Target audience** | All |
| **Primary CTA** | WhatsApp us ("Didn't find your answer?") |
| **Secondary CTA** | Book a home visit |
| **Conversion goals** | FAQ → contact action |

**Content sections & layout**
1. **Hero:** H1 "Questions families ask us" + a filter input ("Search questions"), which filters client-side.
2. **Category tabs or chips:** General · Services · Staff · Booking & scheduling · Family & communication · Privacy & safety · Families abroad.
3. **Accordions:** about 33 Q&As (doc 02 §12). Each question has a deep-link slug (`/faq#do-you-provide-female-nurses`). Opening a deep link opens and scrolls to that question (M09).
4. **Still have questions?** WhatsApp and call card.

**Required media:** none beyond icons.
**Internal linking:** each answer links to the relevant S-page or P-page. FAQ subsets are reused on P05, P06, S-pages and P10, from a single content source (doc 04 §3.16).
**SEO considerations:** schema `FAQPage`. Google now shows FAQ rich results mainly for authoritative government and health sites, so the schema is low-cost but not guaranteed to show. Answers are visible HTML, not loaded on click.

---

### 7.14 P14 · Contact — `/contact`

**Template:** T6 · **Phase:** Launch

| | |
|---|---|
| **Purpose** | Every contact method, the address and hours. General enquiries. |
| **Target audience** | All, including partners and suppliers |
| **Primary CTA** | Call / WhatsApp 0324 4744447 |
| **Secondary CTA** | General enquiry form · Get directions |
| **Conversion goals** | Contact actions; route care requests to P15 |

**Content sections & layout**
1. **Hero:** H1 "We're here, day and night".
2. **Contact cards** (4): Call · WhatsApp · Visit us (address, office hours [CONFIRM]) · Email [CONFIRM]. A 4-column grid; 1 column on mobile.
3. **"Need care at home?"** A strong link to P15 (care requests go to the structured form).
4. **General enquiry form:** name, phone, email (optional), message, consent.
5. **Map:** a static map image (click opens Google Maps directions). No live embed until clicked (performance, doc 04 §3.19).
6. **For hospitals & doctors** → P11.
7. **Emergency notice** (§6.9).

**Required media:** static map image, office exterior photo.
**Internal linking:** P15, P11, P12, P13.
**SEO considerations:** NAP exactly as in Google Business Profile. Schema: `ContactPage` + `MedicalBusiness` reference. Title includes "Lahore".

---

### 7.15 P15 · Book a Home Visit — `/book-a-visit`

**Template:** T6 · **Phase:** Launch · *(The brief's "Get Started" page.)*

| | |
|---|---|
| **Purpose** | Capture a structured care request with the least possible friction. |
| **Target audience** | A1, A2, A3 |
| **Primary CTA** | Request a call back (form submit) |
| **Secondary CTA** | WhatsApp us instead · Call now |
| **Conversion goals** | Form completion rate ≥ 35% of form starters (benchmark, adjust after launch) |

**Content sections & layout**
1. **Header:** the normal site header. The floating WhatsApp button is hidden; the mobile bar shows Call and WhatsApp only.
2. **H1** "Book a home visit" + subhead ("A care coordinator will call or WhatsApp you to confirm. No obligation.") [CONFIRM role name].
3. **Emergency notice** above the form.
4. **Form** (2 steps, §8.3), max 640px wide, with a step indicator. Fields are prefilled from query parameters (`service`, `plan`, `who`, `area`).
5. **Reassurance panel:** a sticky right column on desktop; below the form on mobile.
   - What happens next (3 steps)
   - Response time [CONFIRM]
   - "Your details stay private" → P17
   - Alternative channels (WhatsApp, Call)
6. **Mini trust row:** registrations [CONFIRM] and the Google rating (if real).

**Required media:** none (speed is the priority). Optional small team photo in the reassurance panel.
**Internal linking:** P17, P05. Navigation otherwise kept minimal.
**SEO considerations:** indexable (searches for "book nurse at home Lahore"). Schema: `WebPage`. Keep JavaScript small: the form must work with JavaScript disabled (doc 04 §3.17).

---

### 7.16 P16 · Thank You — `/book-a-visit/thank-you`

**Template:** T8 · **Phase:** Launch · **noindex**

| | |
|---|---|
| **Purpose** | Confirm receipt, set expectations and fire the conversion event. |
| **Target audience** | People who just submitted the form |
| **Primary CTA** | WhatsApp us now (if urgent) |
| **Secondary CTA** | What to have ready → P05 `#what-to-have-ready` |
| **Conversion goals** | Lower drop-off before the call back; accurate conversion tracking |

**Sections:** success animation (M38) → H1 "Thank you — we've received your request" → response-time expectation [CONFIRM] → urgent: WhatsApp/Call → what to prepare (3 bullets) → emergency notice.
**SEO:** `noindex, nofollow`; excluded from the sitemap. Fire `lead_form_submit` only when reached via a successful submission (one-time token or flag), not on reloads.

---

### 7.17 P17–P21 · Legal pages — `/legal/*`

**Template:** T7 · **Phase:** Launch (P21 conditional)

| | |
|---|---|
| **Purpose** | Legal compliance, transparency and trust. Required before using forms and analytics. |
| **Target audience** | All; regulators; partners |
| **Primary CTA** | None (a quiet "Questions? Contact us" link) |
| **Secondary CTA** | — |
| **Conversion goals** | None. These pages support trust. |

**Layout:** single column (≤ 72ch), sticky table of contents on desktop, "Last updated" date, print-friendly. **All legal text must be drafted or reviewed by a lawyer qualified in Pakistan.** Outlines are in doc 02 §14.

| ID | Page | Must cover |
|---|---|---|
| P17 | Privacy Policy | What's collected (forms, calls, WhatsApp, analytics), purposes, who sees it (staff assigned to the case), retention, security, rights, contact. Handling of health information. Overseas users (UK GDPR or EU GDPR may apply if the site targets them; lawyer to advise) |
| P18 | Terms of Service | A request is not a confirmed booking, assessment, scope of services, family responsibilities, cancellations [CONFIRM], payment terms (no prices) [CONFIRM], non-solicitation of staff [CONFIRM], liability, governing law (Pakistan) |
| P19 | Medical Disclaimer | Website content is informational; not a substitute for medical advice; not an emergency service (1122); services follow assessment and prescription |
| P20 | Patient Rights & Responsibilities | Dignity, privacy, informed consent, right to refuse, right to request a change of staff, complaints process; responsibilities: accurate information, valid prescriptions, a safe and respectful environment for staff |
| P21 | Cookie Policy | Only if non-essential cookies are used: a list of cookies and a link to change consent |

**SEO:** indexable, low priority (sitemap priority 0.2). Schema: `WebPage`.

---

### 7.18 P22 · 404

**Template:** T8. **Sections:** H1 "This page has moved — but we're still here" → three links (Services, Book a home visit, Contact) → WhatsApp button → a small illustration (a front door, ajar). Returns HTTP 404. Logs the requested URL for redirect clean-up.

---

## 8. Conversion architecture

### 8.1 Primary conversion paths

```
Google search ─▶ Service page (S##) ─▶ [WhatsApp prefilled] or [Book ?service=] ─▶ Lead
Google search ─▶ Home ─▶ Care Finder ─▶ Recommended services ─▶ [WhatsApp with answers] or [Book prefilled]
Diaspora ad / search ─▶ P10 ─▶ [WhatsApp +92] ─▶ Lead
Brand search / GBP ─▶ Home ─▶ Trust pages (P03/P04) ─▶ Book ─▶ Lead
Hospital staff (direct link) ─▶ P11 ─▶ Phone / partner form ─▶ Referral
```

### 8.2 CTA rules

1. One filled (primary) button per viewport. WhatsApp is outlined, the phone is a text link, except on P10 (WhatsApp primary) and P11 (Refer primary).
2. Every page ends with a CTA band. No dead ends.
3. CTA labels say what happens ("Request a call back", not "Submit").
4. **Review after 4 weeks of data:** if WhatsApp produces more than 60% of leads, test WhatsApp as the primary button sitewide.
5. The phone number is always visible as text (header on desktop, action bar on mobile).

### 8.3 Booking form (P15)

| Step | Field | Type | Required | Notes |
|---|---|---|---|---|
| 1 | Who needs care? | Radio chips: My parent / My spouse / Myself / My child / Another relative / Someone else | ✓ | Prefill `who` |
| 1 | Patient's age | Select: Under 18 / 18–59 / 60–74 / 75+ | — | Helps matching |
| 1 | Services needed | Checkbox chips: 11 services + "Not sure" | ✓ (≥ 1) | Prefill `service` |
| 1 | Type of care | Radio: Single visit / Day shift / Night shift / 24-hour / Not sure yet | ✓ | Prefill `plan` |
| 1 | When should care start? | Radio: Today / Tomorrow / This week / Pick a date (reveals native date input) | ✓ | |
| 1 | Area in Lahore | Select (area list) + "Other" (text) | ✓ | Prefill `area` |
| 1 | Staff preference | Radio: No preference / Female / Male | — | [CONFIRM available] |
| 2 | Your name | Text, `autocomplete="name"` | ✓ | |
| 2 | Phone / WhatsApp number | `type="tel"`, `autocomplete="tel"` | ✓ | Accept international numbers; hint "+92 3XX XXXXXXX or your country code" |
| 2 | How should we contact you? | Radio: WhatsApp / Phone call | ✓ | Default WhatsApp |
| 2 | Anything else we should know? | Textarea, 500 characters | — | Hint: "Please don't share detailed medical records here — we'll ask what we need when we call." |
| 2 | Consent | Checkbox | ✓ | Links to P17 |
| — | Spam protection | Cloudflare Turnstile + honeypot | — | Doc 04 §3.17 |

- **Data minimisation:** no patient name, diagnosis or ID numbers on the website. Clinical detail is collected by phone by staff.
- **Validation:** native HTML constraints plus server-side validation. Inline errors, and an error summary at the top on submit with focus moved to it.
- **Without JavaScript:** a single-page form that still submits. The two steps are a progressive enhancement.
- **Delivery:** email to the operations inbox plus a lead-log row (doc 04 §3.18). Response target [CONFIRM].

**Contact form (P14):** name, phone, email (optional), message, consent. **Partner form (P11):** name, organisation, role, phone, email, message, consent. Same pipeline, with a different `form` tag.

### 8.4 Care Finder logic

Three questions. Answers map to services and a plan by simple rules, with no scoring engine.

| Question | Options | Maps to |
|---|---|---|
| Q1 Who needs care? | Elderly parent or relative · Recovering from surgery or a hospital stay · Bedridden or dependent patient · Someone with diabetes or blood pressure · A new mother and baby | Adds a default service: S08 · S09 · S08 · S04 · S11 |
| Q2 What help is needed? (multi) | Doctor check-up · Injections or drip · Wound dressing · Feeding tube · Urinary catheter · BP and sugar checks · Daily personal care · Nursing at night or round the clock · Not sure | S01 · S03 · S07 · S05 · S06 · S04 · S08 · S02 · (Q1 default only) |
| Q3 For how long? | One visit · A few days or weeks · Ongoing · Not sure | Single visit · Short-term plan · Day, night or 24-hour shifts · "We'll advise" |

**Output:** up to 3 service cards (Q2 picks first, then the Q1 default), one plan suggestion, and two CTAs:
- **"Send this to us on WhatsApp"**, prefilled with the answers and ref `WEB-FINDER` (doc 02 §11.3)
- **"Book with these answers"**, linking to `/book-a-visit?service=…&plan=…&who=…`

**Disclaimer under the results:** "This helps us understand your needs. A qualified professional will confirm the right care after an assessment."

### 8.5 WhatsApp deep links & lead attribution

- Format: `https://wa.me/923244744447?text={url-encoded message}`. Calls use `tel:+923244744447`.
- Every WhatsApp link carries a page reference code (`[Ref: WEB-WOUND]`). Staff log the code in the lead log, which gives source attribution for WhatsApp leads at no cost. Codes and messages: doc 02 §11.3.
- Analytics events fire on click (doc 04 §7).

---

## 9. Internal linking

### 9.1 Rules
1. Home links to every hub and every service page.
2. Every service page links to: P06 (breadcrumb), 3 related services (§9.2), ≥ 1 P09 anchor, P03, P15 (prefilled) and the relevant P13 category.
3. Hubs link to all of their children; children link back to their hub.
4. Anchor text describes the destination ("wound and dressing care at home"), never "click here" or "learn more" alone. Card links get an accessible name such as "Learn more about wound and dressing care".
5. Vary anchor text naturally. Don't repeat the exact keyword every time.
6. Contextual links in body copy: 2–5 per page, in addition to navigation.

### 9.2 Related-services matrix

| Service | Related 1 | Related 2 | Related 3 |
|---|---|---|---|
| S01 Doctor home visit | S04 Vitals | S02 Nursing | S09 Post-surgery |
| S02 Nursing care | S03 Injections & IV | S07 Wound | S08 Elderly |
| S03 Injections & IV | S02 Nursing | S01 Doctor | S04 Vitals |
| S04 BP, sugar & vitals | S01 Doctor | S02 Nursing | S08 Elderly |
| S05 NG tube | S06 Catheter | S08 Elderly | S02 Nursing |
| S06 Catheter | S05 NG tube | S08 Elderly | S07 Wound |
| S07 Wound & dressing | S09 Post-surgery | S08 Elderly | S03 Injections & IV |
| S08 Elderly & patient care | S04 Vitals | S01 Doctor | S07 Wound |
| S09 Post-surgery | S07 Wound | S03 Injections & IV | S02 Nursing |
| S10 Paramedical | S02 Nursing | S01 Doctor | S09 Post-surgery |
| S11 Mother & baby | S02 Nursing | S04 Vitals | S01 Doctor |

### 9.3 Situations → services (P09, Care Finder, P01 tiles)

| Situation | Services |
|---|---|
| Elderly parents | S08, S01, S04, S02 |
| Bedridden patients | S08, S07 (bed sores), S05, S06 |
| After surgery / hospital discharge | S09, S07, S03, S02 |
| Chronic conditions | S04, S01, S03 |
| Mothers & newborns | S11, S02 |
| Families abroad | P10, S08, S02, S01 |

---

## 10. SEO architecture

### 10.1 Keyword ownership map (one owner per keyword cluster; no cannibalisation)

> Keywords are hypotheses from local search patterns. **Validate volumes** in Google Keyword Planner and Search Console before final copy.

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| P01 | home nursing care in Lahore | home healthcare services Lahore, home care Lahore, 24/7 nursing Lahore |
| P06 | home healthcare services Lahore | home care services, medical services at home Lahore |
| S01 | doctor home visit Lahore | doctor on call at home, home doctor Lahore |
| S02 | nurse at home Lahore | home nurse Lahore, 24 hour nurse at home, night nurse Lahore |
| S03 | injection at home Lahore | drip at home Lahore, IV at home, antibiotic injection at home |
| S04 | BP and sugar check at home | blood pressure check at home, sugar test at home Lahore, vital signs monitoring |
| S05 | NG tube insertion at home Lahore | NG tube feeding at home, feeding tube care |
| S06 | catheter change at home Lahore | urinary catheter care at home, Foley catheter at home |
| S07 | wound dressing at home Lahore | bed sore care at home, diabetic wound care Lahore |
| S08 | elderly care at home Lahore | patient attendant Lahore, aya for patient, bedridden patient care |
| S09 | post-operative care at home Lahore | care after surgery at home, recovery care at home |
| S10 | paramedical staff at home Lahore | paramedic at home |
| S11 | postnatal care at home Lahore | newborn baby care nurse Lahore, mother and baby care at home |
| P08 | 24 hour nursing care at home | day and night nursing, home care plans Lahore |
| P09 | care for elderly parents at home | care for bedridden patient at home, home care after hospital discharge |
| P10 | care for parents in Pakistan from abroad | elderly parent care Lahore overseas Pakistanis |
| P12 | home nursing near me (Lahore) | home nursing in {area} |
| P13 | home nursing questions | (long-tail questions) |

### 10.2 Structured data per template

| Template / page | Schema types |
|---|---|
| Sitewide (in layout, once) | `MedicalBusiness` (name, url, logo, telephone `+92-324-4744447`, PostalAddress `176-A Pak Arab Society, Lahore, Punjab, PK`, geo [CONFIRM coordinates], 24/7 `openingHoursSpecification`, `areaServed`, `sameAs`) + `WebSite` |
| T4 Service | `Service` + `MedicalWebPage` (`reviewedBy`, `lastReviewed`) + `BreadcrumbList` + `FAQPage` |
| T3 Hub | `CollectionPage` + `ItemList` + `BreadcrumbList` |
| P13 | `FAQPage` |
| P02 | `AboutPage` |
| P14 | `ContactPage` |
| All others | `WebPage` + `BreadcrumbList` |

A JSON-LD example is in doc 04 §3.22. **Never** add `Review` or `AggregateRating` markup for self-collected reviews; that breaks Google's guidelines.

### 10.3 Technical SEO checklist
- Unique `<title>` (≤ 60 characters) and meta description (≤ 155 characters) per page (doc 02 §13).
- Self-referencing canonical on every page; `noindex` on P16 and the 404.
- XML sitemap (auto-generated, excludes noindex pages), `robots.txt` pointing to it.
- One H1 per page; a logical H2/H3 hierarchy.
- All primary content is server-rendered HTML. Nothing important exists only in JavaScript, canvas or images.
- Descriptive image `alt` text (doc 02 §13.5). Filenames are descriptive (`nurse-checking-blood-pressure-elderly-woman.avif`).
- Open Graph and Twitter card tags per page; an OG image per template.
- Core Web Vitals within budget (doc 04 §8).
- 301 map for any changed URL. 404s are monitored in Search Console.
- `lang="en"` (Phase 2: `lang="ur" dir="rtl"` + `hreflang`).

### 10.4 Local SEO (outside the website, but required for G3)
- **Google Business Profile:** the most important local ranking asset. Suggested primary category "Home health care service" plus relevant secondaries (e.g. "Nursing agency"). 24/7 hours, services list, real photos, website link with UTM parameters.
- **NAP consistency:** identical name, address and phone on the website, GBP, Facebook, Instagram and directories.
- **Reviews:** an ongoing request process (doc 02 §9). Reply to every review.
- **Area pages (Phase 2):** publish an area page only when it has real local substance. Never create city or area pages from a template with swapped names.

---

## 11. Responsive & accessibility requirements (site-wide)

**Breakpoints (mobile-first):** base 360 · `sm` 640 · `md` 768 · `lg` 1024 (desktop navigation, Tier A motion) · `xl` 1280 · `2xl` 1536 (content max 1280px). Test at 360, 390 and 412px widths (common Android sizes).

**Accessibility target: WCAG 2.2 AA.** Many users are elderly or stressed, so several items go beyond the minimum:

- Body text at least **18px**, line height ≥ 1.6, line length ≤ 70ch.
- Contrast at least 4.5:1 for text; aim for 7:1 on body copy.
- Touch targets at least **48×48px** (beyond WCAG's 24px minimum).
- Visible `:focus-visible` rings (3px, offset 2px) on every interactive element.
- "Skip to content" link; landmarks (`header`, `nav`, `main`, `footer`); one H1.
- Every form field has a visible `<label>` (no placeholder-only labels). Errors are announced and linked to their fields.
- Information is never conveyed by colour alone.
- Motion respects `prefers-reduced-motion` (doc 03 §5). Any auto-playing media has a pause control.
- Layout survives 200% zoom and 400% reflow with no horizontal scroll.
- No time limits on forms. No auto-advancing carousels.
- 3D and canvas elements are decorative (`aria-hidden`), with equivalent HTML content and links.

---

## 12. Media production list (for the PM)

**An original photo and video shoot is the biggest single driver of trust on this site. Budget for it.** Use real staff and real homes, with signed model releases. Patients appear only with written consent; otherwise use models.

| # | Asset | Used on | Notes |
|---|---|---|---|
| 1 | Hero video loop (8–12s) + poster | P01 | Nurse arrives at the door → greets the family → checks BP → warm moment. Portrait crop for the arch. No text in the video |
| 2 | Nurse checking BP of an elderly woman | P01 tile, S04 | Female nurse with a female patient |
| 3 | Doctor arriving at a home with a bag | S01, P02 | |
| 4 | Nurse preparing medication (no needle close-up) | S03 | |
| 5 | Caregiver helping an elderly man walk | S08, P09 | |
| 6 | Patient resting after surgery, nurse checking | S09, P09 | |
| 7 | Elderly parent on a video call, nurse beside them | P10 | |
| 8 | Team group photo in uniform | P01, P03 | |
| 9 | Leadership and clinical lead portraits | P02, P03 | |
| 10 | Office exterior and reception | P02, P14 | |
| 11 | Hands detail shots (holding hands, care) | Section backgrounds | |
| 12 | Mother and newborn with a nurse | S11, P09 | Only if S11 is confirmed |
| 13 | 3D Care Kit model (GLB) + poster render | P06 | Doc 03 M23 |
| 14 | 11 3D service icons | Sitewide | Doc 03 §2.5 |
| 15 | SVG illustrations: 4 process steps, 4 day/night scenes, Lahore map, 404 door | P01, P05, P12, P22 | |
| 16 | OG images: default + per template | All | 1200×630 |

**Avoid:** generic Western hospital stock photography; close-ups of wounds, needles, tubes or catheters; identifiable patients without consent; **AI-generated people presented as real staff or patients.**
