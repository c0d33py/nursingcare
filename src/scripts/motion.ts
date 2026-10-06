/**
 * Site-wide behaviour and light motion (docs/03). Runs on every page, every tier.
 * Desktop-only extras (GSAP, Lenis, scroll stories) load lazily from ./motion-a.
 */
const root = document.documentElement;
const tier = (root.dataset.motion ?? 'B') as 'A' | 'B' | 'C';
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

function whenVisible(el: Element, cb: () => void, threshold = 0.4) {
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { io.disconnect(); cb(); }
  }, { threshold });
  io.observe(el);
}

/* M10 reveal + M41 line-art draw */
const revealer = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); revealer.unobserve(e.target); }
}, { rootMargin: '0px 0px -10% 0px' });
$$('[data-reveal], .draw').forEach((el) => revealer.observe(el));

/* M30 counters — the real number stays in the HTML for screen readers and no-JS */
if (tier !== 'C') {
  for (const el of $$('[data-count]')) {
    const target = Number(el.dataset.count);
    el.textContent = '0';
    whenVisible(el, () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200);
        el.textContent = String(p >= 1 ? target : Math.round(target * (1 - 2 ** (-10 * p))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 0.5);
  }
}

/* M07 mobile action bar — on Home it appears once the hero buttons scroll away */
const bar = document.querySelector<HTMLElement>('[data-action-bar]');
const heroCtas = document.querySelector('[data-hero-ctas]');
if (bar?.hasAttribute('data-wait-hero') && heroCtas) {
  new IntersectionObserver(([e]) => bar.classList.toggle('is-shown', !e.isIntersecting && e.boundingClientRect.top < 0)).observe(heroCtas);
} else bar?.classList.add('is-shown');

/* M08 floating WhatsApp button — after 30% scroll, one gentle ping per session */
const fab = document.querySelector<HTMLElement>('[data-wa-float]');
if (fab) {
  const show = () => {
    fab.classList.add('is-shown');
    removeEventListener('scroll', onScroll);
    if (tier === 'C') return;
    try {
      if (sessionStorage.getItem('wa-ping')) return;
      sessionStorage.setItem('wa-ping', '1');
    } catch { /* storage blocked: ping anyway */ }
    setTimeout(() => fab.classList.add('is-ping'), 8000);
  };
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    if (max < 200 || scrollY / max > 0.3) show();
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Filter chips (services grids): [data-filter-group="<list id>"] > [data-filter] */
for (const group of $$('[data-filter-group]')) {
  const list = document.getElementById(group.dataset.filterGroup ?? '');
  const buttons = $$<HTMLButtonElement>('[data-filter]', group);
  for (const btn of buttons) {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      if (!list) return;
      for (const card of $$('[data-category]', list)) {
        const item = card.closest('li') ?? card;
        item.hidden = f !== 'all' && card.dataset.category !== f;
      }
    });
  }
}

/* M34 horizontal scrollers with prev/next buttons */
for (const wrap of $$('[data-scroller]')) {
  const track = wrap.querySelector<HTMLElement>('[data-track]');
  const prev = wrap.querySelector<HTMLButtonElement>('[data-prev]');
  const next = wrap.querySelector<HTMLButtonElement>('[data-next]');
  if (!track || !prev || !next) continue;
  const step = () => ((track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 300) + 24;
  const behavior: ScrollBehavior = tier === 'C' ? 'auto' : 'smooth';
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior }));
  const update = () => {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  track.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

/* M32 family-updates chat — plays once when seen, then offers a replay */
for (const chat of $$('[data-chat]')) {
  const msgs = $$('[data-msg]', chat);
  const typing = chat.querySelector<HTMLElement>('[data-typing]');
  const replay = chat.querySelector<HTMLButtonElement>('[data-chat-replay]');
  if (tier === 'C') { chat.classList.add('is-static'); continue; }
  const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const play = async () => {
    msgs.forEach((m) => m.classList.remove('is-in'));
    if (replay) replay.hidden = true;
    for (const m of msgs) {
      if (typing) typing.hidden = false;
      await wait(550);
      if (typing) typing.hidden = true;
      m.classList.add('is-in');
      await wait(750);
    }
    if (replay) replay.hidden = false;
  };
  replay?.addEventListener('click', play);
  whenVisible(chat, play, 0.4);
}

/* M09 FAQ deep links: /faq/#question-slug opens and focuses that answer */
const openFromHash = () => {
  const id = decodeURIComponent(location.hash.slice(1));
  const el = id ? document.getElementById(id) : null;
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    el.scrollIntoView({ block: 'start' });
    el.querySelector('summary')?.focus({ preventScroll: true });
  }
};
openFromHash();
addEventListener('hashchange', openFromHash);

/* Tier A pointer effects: M25 card tilt (≤ 4°), M35 CTA glow */
if (tier === 'A') {
  for (const card of $$('[data-tilt]')) {
    let raf = 0;
    card.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 8}deg`);
        card.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  }
  for (const band of $$('[data-glow]')) {
    band.addEventListener('pointermove', (e) => {
      const r = band.getBoundingClientRect();
      band.style.setProperty('--gx', `${((e.clientX - r.left) / r.width - 0.5) * 80}px`);
      band.style.setProperty('--gy', `${((e.clientY - r.top) / r.height - 0.5) * 80}px`);
    });
  }

  const loadExtras = () => import('./motion-a');
  addEventListener('load', () =>
    'requestIdleCallback' in window ? requestIdleCallback(loadExtras, { timeout: 2000 }) : setTimeout(loadExtras, 800),
  );
}
