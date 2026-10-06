/**
 * Tier A only (capable desktop): smooth scroll, parallax and the pinned day→night story.
 * Loaded after `load` + idle by motion.ts, so it never touches the critical path.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

/* M39 smooth scrolling — removable with zero loss of function */
const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 }, autoRaf: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
for (const d of document.querySelectorAll('dialog')) {
  new MutationObserver(() => (d.open ? lenis.stop() : lenis.start())).observe(d, { attributes: true, attributeFilter: ['open'] });
}

/* M20 doorway hero: image drifts slower than the page, the arch widens slightly */
const hero = document.querySelector<HTMLElement>('[data-hero]');
if (hero) {
  const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 };
  gsap.to('[data-hero-img]', { yPercent: 8, ease: 'none', scrollTrigger: st });
  gsap.to('[data-hero-media]', { scaleX: 1.06, ease: 'none', scrollTrigger: { ...st, end: '+=40%' } });
}

/* M36 image parallax inside overflow-hidden frames */
for (const img of document.querySelectorAll<HTMLElement>('[data-parallax]')) {
  gsap.fromTo(img, { yPercent: -6 }, {
    yPercent: 6, ease: 'none',
    scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

/* M28 Around the Clock — pinned day→night story */
const dn = document.querySelector<HTMLElement>('[data-daynight]');
if (dn) setupDayNight(dn);

function setupDayNight(section: HTMLElement) {
  const pin = section.querySelector<HTMLElement>('.dn-pin')!;
  const bgs = [...section.querySelectorAll<HTMLElement>('.dn-bg')];
  const cards = [...section.querySelectorAll<HTMLElement>('.dn-card')];
  const dots = [...section.querySelectorAll<HTMLButtonElement>('.dn-dot')];
  const sun = section.querySelector<SVGGElement>('[data-sun]');
  const moon = section.querySelector<SVGGElement>('[data-moon]');
  const clock = section.querySelector<HTMLElement>('[data-clock]');
  const canvas = section.querySelector<HTMLCanvasElement>('[data-particles]');
  section.classList.add('dn--live');

  const arc = (t: number, rx = 250, ry = 190) => {
    const a = Math.PI * (0.94 - 0.88 * t);
    return [300 + rx * Math.cos(a), 240 - ry * Math.sin(a)];
  };
  const clamp = (v: number) => Math.min(1, Math.max(0, v));
  let active = -1;
  const particles = canvas ? nightParticles(canvas) : null;

  const render = (p: number) => {
    const s = p * 3;
    bgs.forEach((bg, i) => (bg.style.opacity = String(clamp(1 - Math.abs(s - i)))));
    if (sun) {
      const [x, y] = arc(clamp(p / 0.78));
      sun.setAttribute('transform', `translate(${x} ${y})`);
      sun.style.opacity = String(clamp(1 - (p - 0.7) * 5));
    }
    if (moon) {
      const t = clamp((p - 0.62) / 0.38);
      const [x, y] = arc(0.12 + t * 0.3);
      moon.setAttribute('transform', `translate(${x} ${y})`);
      moon.style.opacity = String(t);
    }
    particles?.(clamp(s - 2));
    const idx = Math.min(3, Math.round(s));
    if (idx !== active) {
      active = idx;
      section.dataset.stage = String(idx);
      cards.forEach((c, i) => c.classList.toggle('is-active', i === idx));
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
      if (clock) clock.textContent = cards[idx]?.dataset.time ?? '';
    }
  };

  const trigger = ScrollTrigger.create({
    trigger: pin,
    pin: true,
    start: 'top top',
    end: '+=200%',
    snap: { snapTo: 1 / 3, duration: { min: 0.2, max: 0.6 }, ease: 'power1.inOut' },
    onUpdate: (self) => render(self.progress),
  });
  dots.forEach((d, i) => d.addEventListener('click', () => lenis.scrollTo(trigger.start + ((trigger.end - trigger.start) * i) / 3)));
  render(0);
}

/* M42 night particles — 2D canvas, ≤ 40 dots, ~30fps, only while the night stage shows */
function nightParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const dots = Array.from({ length: 38 }, () => ({ x: Math.random(), y: Math.random(), r: 1 + Math.random() * 2.2, v: 0.0004 + Math.random() * 0.0008, a: Math.random() }));
  let strength = 0, running = false, last = 0;
  const size = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight; };
  size();
  addEventListener('resize', size);
  const frame = (t: number) => {
    if (strength < 0.02) { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); return; }
    requestAnimationFrame(frame);
    if (t - last < 33) return;
    last = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      d.y -= d.v; if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
      d.a += 0.01;
      ctx.globalAlpha = strength * (0.25 + 0.35 * (1 + Math.sin(d.a)) / 2);
      ctx.fillStyle = '#fff4dc';
      ctx.beginPath(); ctx.arc(d.x * canvas.width, d.y * canvas.height, d.r, 0, Math.PI * 2); ctx.fill();
    }
  };
  return (s: number) => {
    strength = s;
    if (s > 0.02 && !running) { running = true; requestAnimationFrame(frame); }
  };
}
