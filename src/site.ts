/**
 * Business details — the single source of truth (docs/04 §3.16).
 * Header, footer, schema, links and forms all read from here, so NAP stays consistent.
 *
 * Values marked SAMPLE are realistic placeholders. Confirm them with Heaven Nursing Care
 * before launch (see README → "Before you launch").
 */
export const site = {
  name: 'Heaven Nursing Care 24/7',
  shortName: 'Heaven Nursing Care',
  tagline: 'Professional Healthcare. Compassionate Care. At Your Home.',
  signOff: 'Your Health. Our Priority.',
  description:
    'Qualified nurses, doctors and caregivers at your home in Lahore: elderly care, injections, wound, NG tube and catheter care. Day, night or 24/7.',
  blurb:
    'Heaven Nursing Care 24/7 provides doctors, qualified nurses, paramedical staff and caregivers for patients at home across Lahore.',

  phone: { display: '0308 2177778', intl: '+92 308 2177778', href: 'tel:+923082177778', schema: '+92-308-2177778' },
  whatsapp: '923082177778',
  email: '', // SAMPLE: add a domain email (e.g. care@yourdomain.pk) — hidden everywhere while empty
  address: {
    street: '176-A Pak Arab Society',
    city: 'Lahore',
    region: 'Punjab',
    country: 'PK',
    full: '176-A Pak Arab Society, Lahore',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=176-A+Pak+Arab+Society+Lahore',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=176-A+Pak+Arab+Society+Lahore',
  officeHours: 'Mon–Sat, 10 am – 6 pm', // SAMPLE
  responseTime: 'within 30 minutes', // SAMPLE: only promise what operations can keep
  shifts: { day: '8 am – 8 pm', night: '8 pm – 8 am' }, // SAMPLE
  social: [] as { label: string; href: string }[], // e.g. { label: 'Facebook', href: 'https://facebook.com/…' }
  reviewedBy: 'the Heaven Nursing Care clinical team', // SAMPLE: replace with "Dr [Name], PMDC reg. [#]"
  lastReviewed: '2026-10-01',
};

/* ── Links ─────────────────────────────────────────────────────────────────── */

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Internal page link with the GitHub Pages base path and the trailing slash Pages expects. */
export function href(path = '/') {
  const [, p = '/', rest = ''] = path.match(/^([^?#]*)(.*)$/) ?? [];
  return BASE + (p.endsWith('/') ? p : `${p}/`) + rest;
}

/** File in /public (images, icons) with the base path, no trailing slash. */
export const asset = (path: string) => BASE + (path.startsWith('/') ? path : `/${path}`);

/** WhatsApp deep link with a prefilled message and a page reference code (docs/02 §11.3). */
export function waLink(message = "I'd like to know more about home care.", ref = 'WEB') {
  const text = `Assalam-o-Alaikum! ${message} [Ref: ${ref}]`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** "Wound & dressing care" → "wound & dressing care", but keeps acronyms: "BP, sugar…", "NG tube…". */
export const lcFirst = (t: string) => t.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase());
