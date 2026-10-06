# Heaven Nursing Care 24/7 — Website Specification

The implementation specification for the Heaven Nursing Care 24/7 marketing and company website (Lahore home healthcare). It's derived from [heaven-nursing-care-website-content.md](heaven-nursing-care-website-content.md) and written to the brief in [prompt.md](prompt.md).

| # | Document | What it answers | Primary readers |
|---|---|---|---|
| 01 | [Website Structure & Page Specification](01-website-structure.md) | Which pages exist, the URLs, navigation, what goes on each page and in what order, CTAs, SEO architecture, the conversion paths | PM, designer, developer, writer |
| 02 | [Content & Copywriting](02-content-copywriting.md) | What we say and how: brand messaging, voice, draft copy for every page, service descriptions, FAQ, CTAs, titles and meta | Writer, designer, client |
| 03 | [Animation, 3D & Motion Graphics](03-motion-3d-interaction.md) | Where things move and why, with exact behaviour, timing, mobile and reduced-motion states, performance budgets, visual language | Designer, developer, 3D/motion artist |
| 04 | [Technology, Tools & Plugins](04-technology-stack.md) | What we build it with and why, cost and licences, integrations, security, budgets, launch checklist | Developer, PM |

---

## How to use this, by role

- **UI/UX designer:** start with 01 §5 (8 templates, not 30 pages) and §6 (global elements), then 03 §2 (visual language) and §4 (motion specs). Design the templates T1–T8 and the components; the page specs in 01 §7 fill them.
- **Content writer:** 02 is your brief, with draft copy for every page. Follow the voice rules (02 §2) and keyword map (01 §10.1). **Don't publish any line marked [CONFIRM]** until the client verifies it.
- **Frontend developer:** 04 (stack, structure, budgets), then 01 §7–8 (page behaviour, forms, Care Finder logic) and 03 (motion specs with tiers). Content is typed in collections (04 §3.16); business details live once in `src/site.ts`.
- **Project manager:** run the **client checklist** below first; most open items are operational facts only the client can give. Then use 01 §12 (media production list), 02 §15 (content checklist) and 04 §11 (launch checklist).

## Conventions
- **IDs:** `P##` page · `S##` service page · `T#` template · `M##` motion spec · `A#` audience · `G#` goal · `C##` CTA.
- **[CONFIRM]** = not in the source document. It must be verified by Heaven Nursing Care before publishing. If it can't be confirmed, **remove the sentence; never fill it with a guess.**
- Section references look like "01 §8.3" (document 01, section 8.3).

---

## Key decisions (and why)

1. **WhatsApp-first conversion.** Every page offers Book · WhatsApp · Call. A fixed mobile action bar puts them one tap away. WhatsApp links carry page ref codes (`[Ref: WEB-WOUND]`) for free attribution.
2. **"Not an emergency service" notice sitewide.** The "24/7" in the name could be misread as emergency response. Rescue 1122 is signposted.
3. **About 30 pages from 8 templates.** 11 service pages; the brief's "Products/Solutions" slot becomes **Care Plans** (coverage options, no prices); "Industries/Use cases" becomes **Who We Care For**, plus **Overseas Families** and **For Hospitals & Doctors** pages.
4. **Thin-content rule.** Paramedical support (S10) and Mother & Baby care (S11) get standalone pages only if the client supplies real specifics.
5. **Trust over decoration.** Real photography of real staff, named clinical leadership, medical review bylines, published safety standards. **No fabricated testimonials or statistics, and no AI-generated "staff".**
6. **Calm, purposeful motion in three tiers.** Full effects on capable desktops, light on phones, static for reduced motion. At most 2 signature moments per page. **One** real-time 3D scene (the Care Kit on the Services hub); every other 3D asset is pre-rendered.
7. **Astro + Tailwind on Cloudflare.** Static at the edge with in-region delivery, zero JavaScript by default, two small Preact islands. GSAP and Three.js load only on capable desktops.
8. **Cookieless analytics (Umami), so no consent banner** until ad pixels are added.
9. **No CMS at launch.** Typed Markdown/YAML in Git; add Keystatic over the same files if the client wants to self-edit.
10. **English at launch; Urdu in Phase 2.** Logical CSS properties are used from day one, so right-to-left support is cheap later.

---

## Client checklist (resolve before copy sign-off)

**Credentials & people**
- [ ] Nurse registrations (Pakistan Nursing & Midwifery Council) and doctor registrations (PMDC): can they be stated publicly?
- [ ] Business registration; Punjab Healthcare Commission registration (if held)
- [ ] Named clinical lead / medical director, and a doctor to medically review service pages
- [ ] How staff are vetted (ID, qualifications, references, background checks) and trained or supervised

**Operations**
- [ ] Typical time from first contact to care starting; call-back response time
- [ ] Assessment model: by phone, a home visit, or both? Who does it?
- [ ] Shift hours (day and night); how 24-hour care is staffed (rotating shifts or live-in)
- [ ] Female/male staff on request?
- [ ] How families are updated (format, frequency); escalation protocol if a patient deteriorates
- [ ] Is there a "care coordinator" role? Can families request a staff replacement, and how fast?
- [ ] Office hours for walk-in visits; email address

**Scope**
- [ ] Mother & Baby care: what exactly is included, and which staff (nurse, midwife, LHV)?
- [ ] Paramedical support: a specific list of services
- [ ] Medical equipment supply? Lab sample collection? Do doctors prescribe on visits?
- [ ] Which medicines and supplies the family provides, and which staff bring

**Commercial & legal**
- [ ] Payment methods (including from abroad); cancellation and notice terms; non-solicitation of staff
- [ ] A lawyer qualified in Pakistan engaged for P17–P21; lead-data retention period

**Coverage & brand assets**
- [ ] Final list of Lahore areas served; office map coordinates
- [ ] Logo files and brand colours (palette in 03 §2.1 is a proposal to align); domain (.com/.pk); social media handles
- [ ] At least 3 consented testimonials; any verifiable statistics (02 §10)
- [ ] Consent and availability of staff (and willing patients or families) for the photo/video shoot

---

## Phasing

**Launch:** all pages in 01 §4 (P11 may slip; P21 only if non-essential cookies are used), English, the full motion spec, cookieless analytics, form → email + lead log.

**Phase 2:** Urdu site · Keystatic editing · WhatsApp Cloud API notifications · CRM · area landing pages (only with unique local content) · ad landing variants with consent-managed tracking · brand film. See 04 §12.

**Suggested order of work:**
1. Client workshop on the checklist above
2. Align the visual language with the logo
3. Wireframes for T1–T8
4. Copy drafts in parallel with the photo shoot and 3D production
5. Build
6. Content entry, then medical and legal review
7. QA against 04 §11
8. Launch

**Out of scope (per brief):** Careers, Portfolio/Case Studies, Blog/Resources, Pricing.
