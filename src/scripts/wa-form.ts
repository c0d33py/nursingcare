/**
 * Static-hosting form handler (GitHub Pages has no server): validates, then hands the
 * request to WhatsApp as a prefilled message and moves to the thank-you page.
 *
 * Markup contract:
 *   <form data-wa-form data-ref="WEB-BOOK" data-intro="…" data-thanks="/thank-you/">
 *     <div data-field="name" data-label="Your name" data-required data-msg="Please enter your name.">
 *       … inputs … <p data-error hidden></p>
 *     </div>
 *     optional steps: <fieldset data-step> … [data-next] [data-back]
 *     optional reveal: <div data-show-when="start=date">
 */
import { waLink } from '../site';

type Field = HTMLElement & { dataset: DOMStringMap };

const inputs = (f: Element) => [...f.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')];
// Fields on an inactive step still count; only conditional fields that are hidden don't.
const isShown = (el: Element) => !el.closest('[hidden]:not([data-step])');

function valueOf(field: Field): string {
  const els = inputs(field);
  const checked = els.filter((e) => (e instanceof HTMLInputElement && (e.type === 'radio' || e.type === 'checkbox')) ? e.checked : false);
  if (els.some((e) => e instanceof HTMLInputElement && (e.type === 'radio' || e.type === 'checkbox'))) {
    return checked.map((e) => e.closest('label')?.querySelector('span')?.textContent?.trim() ?? e.value).join(', ');
  }
  const el = els[0];
  if (el instanceof HTMLSelectElement) return el.value ? el.selectedOptions[0]?.textContent?.trim() ?? '' : '';
  return el?.value.trim() ?? '';
}

function check(field: Field): string {
  if (!isShown(field)) return '';
  const v = valueOf(field);
  if (field.hasAttribute('data-required') && !v) return field.dataset.msg ?? 'This field is required.';
  if (field.dataset.type === 'phone' && v && v.replace(/\D/g, '').length < 10) return field.dataset.msg ?? 'Please enter a valid phone number.';
  return '';
}

function showError(field: Field, msg: string) {
  const out = field.querySelector<HTMLElement>('[data-error]');
  inputs(field).forEach((i) => i.setAttribute('aria-invalid', String(!!msg)));
  if (out) { out.textContent = msg; out.hidden = !msg; }
}

function validate(fields: Field[]) {
  return fields.map((f) => { const msg = check(f); showError(f, msg); return { f, msg }; }).filter((r) => r.msg);
}

for (const form of document.querySelectorAll<HTMLFormElement>('[data-wa-form]')) {
  form.noValidate = true;
  const fields = () => [...form.querySelectorAll<Field>('[data-field]')];
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  const indicators = [...document.querySelectorAll<HTMLElement>('[data-step-indicator]')];

  // Conditional fields, e.g. "Pick a date" reveals a date input.
  const conditionals = [...form.querySelectorAll<HTMLElement>('[data-show-when]')];
  const syncConditionals = () => {
    for (const el of conditionals) {
      const [name, value] = el.dataset.showWhen!.split('=');
      const src = form.elements.namedItem(name) as RadioNodeList | HTMLSelectElement | null;
      el.hidden = (src as { value?: string } | null)?.value !== value;
    }
  };
  form.addEventListener('change', syncConditionals);

  // Prefill from links like /book-a-visit/?service=wound-dressing-care&plan=night&situation=…
  const params = new URLSearchParams(location.search);
  for (const slug of (params.get('service') ?? '').split(',').filter(Boolean)) {
    const box = form.querySelector<HTMLInputElement>(`input[name="services"][value="${CSS.escape(slug)}"]`);
    if (box) box.checked = true;
  }
  const plan = params.get('plan');
  if (plan) { const r = form.querySelector<HTMLInputElement>(`input[name="plan"][value="${CSS.escape(plan)}"]`); if (r) r.checked = true; }
  const area = params.get('area');
  if (area) { const s = form.querySelector<HTMLSelectElement>('select[name="area"]'); if (s && [...s.options].some((o) => o.value === area)) s.value = area; }
  const situation = params.get('situation');
  const sit = form.querySelector<HTMLElement>('[data-situation]');
  if (situation && sit) {
    sit.hidden = false;
    sit.querySelector('input')!.value = situation;
    sit.querySelector('[data-situation-text]')!.textContent = situation;
  }
  syncConditionals();

  // Two-step booking form
  const goTo = (i: number, focus = true) => {
    steps.forEach((s, n) => (s.hidden = n !== i));
    indicators.forEach((el, n) => el.setAttribute('aria-current', n === i ? 'step' : 'false'));
    if (focus) steps[i]?.querySelector<HTMLElement>('legend, h2, h3')?.focus();
  };
  if (steps.length > 1) {
    steps.forEach((s) => s.querySelector('legend, h2, h3')?.setAttribute('tabindex', '-1'));
    goTo(0, false);
    form.querySelectorAll('[data-next]').forEach((b) => b.addEventListener('click', () => {
      const current = steps.findIndex((s) => !s.hidden);
      const errors = validate([...steps[current].querySelectorAll<Field>('[data-field]')]);
      if (errors.length) { inputs(errors[0].f)[0]?.focus(); return; }
      goTo(current + 1);
      document.dispatchEvent(new CustomEvent('form:step', { detail: current + 2 }));
    }));
    form.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => goTo(steps.findIndex((s) => !s.hidden) - 1)));
  }

  // Clear an error as soon as the field is fixed.
  form.addEventListener('input', (e) => {
    const f = (e.target as Element).closest<Field>('[data-field]');
    if (f && f.querySelector('[data-error]:not([hidden])')) showError(f, check(f));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errors = validate(fields());
    if (errors.length) {
      const firstStep = steps.findIndex((s) => s.contains(errors[0].f));
      if (firstStep >= 0 && steps[firstStep].hidden) goTo(firstStep);
      if (summary) {
        summary.hidden = false;
        summary.innerHTML = `<p class="font-semibold">Please check ${errors.length === 1 ? '1 thing' : `${errors.length} things`} before sending:</p><ul class="mt-2 list-disc pl-5">${errors
          .map((r) => `<li><a href="#${inputs(r.f)[0]?.id ?? ''}" class="underline">${r.msg}</a></li>`).join('')}</ul>`;
        summary.focus();
      } else inputs(errors[0].f)[0]?.focus();
      return;
    }
    if (summary) summary.hidden = true;

    const lines = fields()
      .filter((f) => isShown(f) && !f.hasAttribute('data-skip'))
      .map((f) => [f.dataset.label, valueOf(f)] as const)
      .filter(([, v]) => v)
      .map(([l, v]) => `• ${l}: ${v}`);
    const url = waLink(`${form.dataset.intro ?? ''}\n${lines.join('\n')}\n`, form.dataset.ref ?? 'WEB-FORM');
    try { sessionStorage.setItem('wa-last', url); } catch { /* fine */ }

    const win = window.open(url, '_blank');
    if (!win) { location.href = url; return; } // pop-up blocked: go straight to WhatsApp
    win.opener = null;
    // The WhatsApp tab takes focus, so skip the cross-document view transition.
    addEventListener('pageswap', (ev) => (ev as Event & { viewTransition?: ViewTransition }).viewTransition?.skipTransition(), { once: true });
    location.href = form.dataset.thanks ?? location.href;
  });
}
