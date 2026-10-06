import lucide from '@iconify-json/lucide/icons.json';
import healthicons from '@iconify-json/healthicons/icons.json';

type IconSet = {
  icons: Record<string, { body: string; width?: number; height?: number }>;
  aliases?: Record<string, { parent: string }>;
  width?: number;
  height?: number;
};

const sets: Record<string, IconSet> = { lucide, healthicons };

/**
 * Inline SVG for "lucide:name" (default prefix) or "healthicons:name".
 * Build-time only — the JSON sets never reach the browser.
 */
export function iconSvg(name: string, { size = 24, className = '', label = '' } = {}) {
  const [prefix, id] = name.includes(':') ? name.split(':') : ['lucide', name];
  const set = sets[prefix];
  const icon = set?.icons[id] ?? set?.icons[set.aliases?.[id]?.parent ?? ''];
  if (!icon) throw new Error(`Icon not found: ${name}`);
  const w = icon.width ?? set.width ?? 24;
  const h = icon.height ?? set.height ?? 24;
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${size}" height="${size}" class="${className}" ${a11y}>${icon.body}</svg>`;
}
