/** @jsxImportSource preact */
// M26 — Care Finder: three questions → suggested services + plan → WhatsApp or booking (docs/01 §8.4).
import { useEffect, useRef, useState } from 'preact/hooks';
import { href, waLink } from '../site';

type Service = { slug: string; title: string; card: string; icon: string; url: string };

const WHO = [
  { id: 'elderly', label: 'An elderly parent or relative', service: 'elderly-patient-care' },
  { id: 'surgery', label: 'Someone recovering from surgery or a hospital stay', service: 'post-surgery-care' },
  { id: 'bedridden', label: 'A bedridden or dependent patient', service: 'elderly-patient-care' },
  { id: 'chronic', label: 'Someone with diabetes or blood pressure', service: 'bp-sugar-monitoring' },
  { id: 'mother', label: 'A new mother and baby', service: 'mother-baby-care' },
];
const NEEDS = [
  { id: 'doctor', label: 'Doctor check-up', service: 'doctor-home-visit' },
  { id: 'injections', label: 'Injections or a drip', service: 'injections-iv-therapy' },
  { id: 'wound', label: 'Wound dressing', service: 'wound-dressing-care' },
  { id: 'feeding', label: 'Feeding tube (NG)', service: 'ng-tube-feeding-care' },
  { id: 'catheter', label: 'Urinary catheter', service: 'urinary-catheter-care' },
  { id: 'vitals', label: 'BP & sugar checks', service: 'bp-sugar-monitoring' },
  { id: 'daily', label: 'Daily personal care', service: 'elderly-patient-care' },
  { id: 'nursing', label: 'Nursing at night or round the clock', service: 'nursing-care' },
  { id: 'notsure', label: 'Not sure', service: '' },
];
const DURATION = [
  { id: 'visit', label: 'One visit', plan: 'visit', suggestion: 'A single home visit' },
  { id: 'weeks', label: 'A few days or weeks', plan: '', suggestion: 'A short-term plan: visits or shifts for days to weeks' },
  { id: 'ongoing', label: 'Ongoing', plan: '', suggestion: 'Ongoing care: day, night or 24-hour shifts' },
  { id: 'notsure', label: 'Not sure yet', plan: '', suggestion: "We'll advise after a quick assessment" },
];
const TITLES = ['Who needs care?', 'What help is needed? Choose all that apply.', 'For how long?'];

export default function CareFinder({ services }: { services: Service[] }) {
  const [step, setStep] = useState(0);
  const [who, setWho] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [step]);

  const whoOpt = WHO.find((w) => w.id === who);
  const durOpt = DURATION.find((d) => d.id === duration);
  const picked = [...NEEDS.filter((n) => needs.includes(n.id) && n.service).map((n) => n.service), whoOpt?.service ?? '']
    .filter((s, i, a) => s && a.indexOf(s) === i)
    .slice(0, 3);
  const results = picked.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);

  const needLabels = NEEDS.filter((n) => needs.includes(n.id)).map((n) => n.label).join(', ');
  const message = `I used the Care Finder. Care is for: ${whoOpt?.label ?? '-'}. Needs: ${needLabels || '-'}. Duration: ${durOpt?.label ?? '-'}.`;
  const params = new URLSearchParams({ service: picked.join(','), situation: whoOpt?.label ?? '' });
  if (durOpt?.plan) params.set('plan', durOpt.plan);
  const bookUrl = `${href('/book-a-visit')}?${params}`;

  const canNext = [!!who, needs.length > 0, !!duration][step];
  const toggleNeed = (id: string) =>
    setNeeds((cur) => (cur.includes(id) ? cur.filter((n) => n !== id) : [...cur.filter((n) => (id === 'notsure' ? false : n !== 'notsure')), id]));
  const reset = () => { setWho(''); setNeeds([]); setDuration(''); setStep(0); };

  return (
    <div class="card overflow-hidden">
      <div class="h-1.5 bg-sky" aria-hidden="true">
        <div class="h-full bg-primary transition-transform duration-500" style={{ transform: `scaleX(${(Math.min(step, 3) + (step === 3 ? 0 : 1)) / 3})`, transformOrigin: 'left' }} />
      </div>
      <p class="sr-only" aria-live="polite">{step < 3 ? `Step ${step + 1} of 3` : 'Your suggestions'}</p>

      <div key={step} class="cf-step p-6 sm:p-10">
        {step < 3 ? (
          <fieldset>
            <legend class="contents">
              <span class="text-sm font-semibold uppercase tracking-[0.12em] text-primary">Step {step + 1} of 3</span>
              <h3 ref={heading} tabIndex={-1} class="h3 mt-2 block outline-none">{TITLES[step]}</h3>
            </legend>
            <div class="mt-6 flex flex-wrap gap-2.5">
              {step === 0 && WHO.map((o) => (
                <label class="choice" key={o.id}>
                  <input type="radio" name="cf-who" checked={who === o.id} onChange={() => setWho(o.id)} />
                  <span>{o.label}</span>
                </label>
              ))}
              {step === 1 && NEEDS.map((o) => (
                <label class="choice" key={o.id}>
                  <input type="checkbox" checked={needs.includes(o.id)} onChange={() => toggleNeed(o.id)} />
                  <span>{o.label}</span>
                </label>
              ))}
              {step === 2 && DURATION.map((o) => (
                <label class="choice" key={o.id}>
                  <input type="radio" name="cf-duration" checked={duration === o.id} onChange={() => setDuration(o.id)} />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" class="btn btn-primary" disabled={!canNext} style={{ opacity: canNext ? 1 : 0.5 }} onClick={() => canNext && setStep(step + 1)}>
                {step === 2 ? 'See my suggestions' : 'Next'}
              </button>
              {step > 0 && <button type="button" class="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>}
            </div>
          </fieldset>
        ) : (
          <div>
            <h3 ref={heading} tabIndex={-1} class="h3 outline-none">Here’s what we’d suggest</h3>
            <ul class="mt-6 grid gap-3 sm:grid-cols-3">
              {results.map((s, i) => (
                <li key={s.slug} class="cf-result" style={{ animationDelay: `${i * 80}ms` }}>
                  <a href={s.url} class="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-primary">
                    <span dangerouslySetInnerHTML={{ __html: s.icon }} />
                    <span class="font-semibold text-ink">{s.title}</span>
                    <span class="text-[0.92rem] leading-snug text-muted">{s.card}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p class="mt-5 rounded-2xl bg-cream p-4 text-ink"><strong>Suggested arrangement:</strong> {durOpt?.suggestion}</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a href={waLink(message, 'WEB-FINDER')} target="_blank" rel="noopener" class="btn btn-wa" data-umami-event="whatsapp_click" data-umami-event-placement="finder">Send this to us on WhatsApp</a>
              <a href={bookUrl} class="btn btn-primary">Book with these answers</a>
              <button type="button" class="btn btn-outline" onClick={reset}>Start again</button>
            </div>
            <p class="mt-5 text-[0.95rem] text-muted">This helps us understand your needs. It isn’t medical advice — a qualified professional will confirm the right care.</p>
          </div>
        )}
      </div>
    </div>
  );
}
