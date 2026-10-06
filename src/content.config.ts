import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      code: z.string().regex(/^S\d{2}$/),
      order: z.number(),
      title: z.string(), // short name used in menus and cards
      h1: z.string(),
      subhead: z.string(),
      card: z.string().max(90),
      category: z.enum(['medical', 'nursing', 'daily']),
      icon: z.string(), // healthicons name
      photo: image(),
      photoAlt: z.string(),
      providedBy: z.array(z.string()).min(1),
      availableAs: z.string(),
      included: z.array(z.string()).min(5),
      forWho: z.array(z.object({ label: z.string(), anchor: z.string() })),
      steps: z.array(z.object({ title: z.string(), text: z.string() })).min(3),
      safety: z.string(),
      faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(2),
      related: z.array(z.string()).length(3),
      wa: z.object({ code: z.string(), message: z.string() }),
      seo: z.object({ title: z.string().max(62), description: z.string().max(160), keyword: z.string() }),
    }),
});

const faqs = defineCollection({
  loader: file('src/content/faqs.yaml'),
  schema: z.object({
    category: z.enum(['General', 'Services', 'Staff', 'Booking & scheduling', 'Family & communication', 'Privacy & safety', 'Families abroad']),
    question: z.string(),
    answer: z.string(),
    link: z.object({ label: z.string(), href: z.string() }).optional(),
    home: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: file('src/content/testimonials.yaml'),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    relation: z.string(),
    area: z.string(),
    service: z.string(),
    overseas: z.boolean().default(false),
    // Sample entries render a visible "Sample" label. Real testimonials need recorded consent.
    sample: z.boolean().default(false),
    consent: z.boolean().default(false),
  }).refine((t) => t.sample || t.consent, { error: 'Real testimonials need consent: true' }),
});

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    order: z.number(),
  }),
});

export const collections = { services, faqs, testimonials, legal };
