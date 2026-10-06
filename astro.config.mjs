// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The GitHub Pages workflow sets these from `actions/configure-pages`, so the same build works for
// https://<user>.github.io/<repo>/ and for a custom domain. Locally they fall back to the root.
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // GitHub Pages serves folders as `/path/`; linking with the slash avoids a redirect hop.
  trailingSlash: 'always',
  // Astro 7 defaults to JSX whitespace rules, which glue inline text to links across lines.
  compressHTML: true,
  prefetch: { defaultStrategy: 'hover' },
  integrations: [preact(), sitemap({ filter: (page) => !page.includes('/thank-you/') })],
  vite: { plugins: [tailwindcss()] },
});
