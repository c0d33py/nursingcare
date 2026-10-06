import { photos } from './photos';

export const categories = {
  medical: 'Medical',
  nursing: 'Nursing procedures',
  daily: 'Daily & recovery care',
} as const;

/** "Who we care for" situations — P09 sections, home tiles, Care Finder (docs/01 §9.3). */
export const situations = [
  {
    id: 'elderly-parents',
    title: 'Elderly parents',
    tile: 'Daily support and medical checks that help seniors live safely at home.',
    challenge:
      "Ageing parents often want to stay in the home they love, but daily tasks, medicines and check-ups get harder, and you can't be there every hour.",
    help: [
      'Caregivers (ayas) for hygiene, meals, mobility and companionship',
      'Regular BP and sugar checks, with readings shared with the family',
      'Doctor home visits for reviews and medication changes',
      'Night support, so someone is awake when it matters',
    ],
    services: ['elderly-patient-care', 'doctor-home-visit', 'bp-sugar-monitoring', 'nursing-care'],
    photo: photos.elderlyMan,
    alt: 'Portrait of an elderly man with a white beard',
  },
  {
    id: 'bedridden-patients',
    title: 'Bedridden patients',
    tile: 'Turning, hygiene, feeding and bed-sore prevention, day and night.',
    challenge:
      'Caring for someone confined to bed is physically and emotionally demanding. Bed sores, feeding and hygiene need skill as well as love.',
    help: [
      'Turning and repositioning to protect the skin',
      'Bed-sore (pressure sore) prevention and dressing',
      'NG tube feeding and catheter care by qualified nurses',
      'Day, night or 24-hour shifts',
    ],
    services: ['elderly-patient-care', 'wound-dressing-care', 'ng-tube-feeding-care', 'urinary-catheter-care'],
    photo: photos.holdingHand,
    alt: 'Nurse holding the hand of a patient in bed',
  },
  {
    id: 'after-surgery',
    title: 'After surgery or a hospital stay',
    tile: 'Continue recovery at home with nursing, monitoring and wound care.',
    challenge:
      'Coming home after an operation is a relief, but the first days bring wounds to dress, medicines to give and worries about what is normal.',
    help: [
      'Post-operative nursing, from the day of discharge',
      'Wound care and dressing changes',
      'Injections and IV medication as prescribed',
      'Coordination with the surgeon or hospital',
    ],
    services: ['post-surgery-care', 'wound-dressing-care', 'injections-iv-therapy', 'nursing-care'],
    photo: photos.nurseBed,
    alt: 'Nurse checking on a patient recovering in bed',
  },
  {
    id: 'chronic-conditions',
    title: 'Diabetes, BP & long-term conditions',
    tile: 'Regular BP and sugar checks, medication support and doctor follow-ups.',
    challenge:
      'Long-term conditions such as diabetes and high blood pressure need steady monitoring. Small changes caught early can prevent big problems.',
    help: [
      'Scheduled BP, sugar, oxygen and pulse checks',
      'Insulin and other injections as prescribed',
      'Regular doctor reviews at home',
      'Readings shared with the family on WhatsApp',
    ],
    services: ['bp-sugar-monitoring', 'doctor-home-visit', 'injections-iv-therapy'],
    photo: photos.bpMonitor,
    alt: 'Blood pressure monitor cuff on an arm',
  },
  {
    id: 'mothers-and-newborns',
    title: 'Mothers & newborns',
    tile: 'Post-natal support for mum and attentive care for baby.',
    challenge:
      'The first weeks with a newborn are beautiful and exhausting, especially after a C-section or a difficult birth.',
    help: [
      'Female nurses, midwives and LHVs',
      'C-section wound care and recovery support',
      'Feeding, bathing and cord care for baby',
      'Night support so mum can rest',
    ],
    services: ['mother-baby-care', 'nursing-care'],
    photo: photos.motherBaby,
    alt: 'Smiling mother holding her baby',
  },
  {
    id: 'families-abroad',
    title: 'Families living abroad',
    tile: 'Your trusted hands in Lahore, with regular updates.',
    challenge:
      "When you live overseas, a parent's health scare is twice as frightening. You need someone in Lahore you can trust completely.",
    help: [
      'One coordinator as your single point of contact',
      'Daily WhatsApp updates and video calls',
      'Doctor visit summaries sent to you',
      'Payment from abroad by bank transfer',
    ],
    services: ['elderly-patient-care', 'nursing-care', 'doctor-home-visit'],
    photo: photos.elderlyPhone,
    alt: 'Elderly woman smiling at her smartphone',
  },
] as const;

/** The five professional roles from the source document (P03). */
export const roles = [
  {
    name: 'Doctors',
    icon: 'stethoscope',
    summary: 'Medical examination, consultation, diagnosis support and follow-up.',
    tasks: ['Home check-ups and follow-ups', 'Medication reviews and prescriptions', 'Referral and hospital coordination'],
    services: ['doctor-home-visit'],
  },
  {
    name: 'Nurses',
    icon: 'heart-pulse',
    summary: 'Professional nursing procedures, bedside care, monitoring and medication.',
    tasks: ['Injections, drips and IV medication', 'NG tube, catheter and wound care', 'Day, night and 24-hour nursing'],
    services: ['nursing-care', 'injections-iv-therapy', 'wound-dressing-care'],
  },
  {
    name: 'Paramedical staff',
    icon: 'activity',
    summary: 'Appropriate clinical and technical healthcare support.',
    tasks: ['Nebulisation and oxygen support', 'ECG recording at home', 'Escort to appointments and tests'],
    services: ['paramedical-support'],
  },
  {
    name: 'Assistant nurses',
    icon: 'clipboard-check',
    summary: 'Nursing assistance and routine patient care.',
    tasks: ['Vital signs and observation', 'Help with nursing routines', 'Support for recovering patients'],
    services: ['bp-sugar-monitoring', 'post-surgery-care'],
  },
  {
    name: 'Caregivers (ayas)',
    icon: 'hand-heart',
    summary: 'Personal hygiene, feeding, mobility and daily living.',
    tasks: ['Washing, dressing and toileting', 'Meals, feeding and mobility', 'Companionship, day or night'],
    services: ['elderly-patient-care'],
  },
] as const;

export const steps = [
  { icon: 'message-circle', title: "Tell us what's needed", text: "Call or WhatsApp us any time, or book online. We'll ask a few questions about your loved one." },
  { icon: 'clipboard-list', title: 'We assess', text: "A nurse reviews the patient's needs, prescriptions and home setting, by phone or at a home visit." },
  { icon: 'users', title: 'We match the right professional', text: 'A doctor, nurse, paramedic, assistant nurse or caregiver, chosen for the patient and your preferences.' },
  { icon: 'house', title: 'Care begins, and you stay informed', text: 'Care starts at home and the family gets regular updates on progress.' },
] as const;

/** Around the Clock (M28). */
export const dayStages = [
  { time: '8:00 am', label: 'Morning', icon: 'sunrise', text: 'Vital signs, medication and help starting the day.' },
  { time: '2:00 pm', label: 'Afternoon', icon: 'sun', text: 'Meals and feeding support, doctor visits, gentle mobility.' },
  { time: '7:00 pm', label: 'Evening', icon: 'sunset', text: 'Dressings, medication and comfort before rest.' },
  { time: '2:00 am', label: 'Night', icon: 'moon', text: 'An overnight watch, turning and repositioning, and someone awake when it matters.' },
] as const;

export const reasons = [
  { icon: 'badge-check', title: 'Professional healthcare staff', text: "Doctors, qualified nurses and trained caregivers, matched to each patient's needs." },
  { icon: 'house', title: 'Healthcare at your doorstep', text: 'No difficult journeys or waiting rooms. Care comes to the patient.' },
  { icon: 'calendar-clock', title: 'Flexible care', text: 'A single visit, a few weeks of recovery or ongoing care. Plans change as needs change.' },
  { icon: 'moon', title: 'Day & night support', text: 'Day shifts, night shifts or 24-hour care, with a phone line open around the clock.' },
  { icon: 'heart-handshake', title: 'Compassionate care', text: 'Every patient is treated with dignity, respect and personal attention.' },
  { icon: 'message-square-heart', title: 'Families kept informed', text: "Regular updates, so you always know how your loved one is doing." },
] as const;

export const values = [
  { icon: 'heart-handshake', title: 'Dignity', text: 'Every patient is treated as we would treat our own parents.' },
  { icon: 'badge-check', title: 'Competence', text: 'The right qualification for every task.' },
  { icon: 'clock', title: 'Reliability', text: 'On time, every time, day or night.' },
  { icon: 'message-circle', title: 'Transparency', text: 'Families always know what is happening.' },
  { icon: 'hand-heart', title: 'Compassion', text: 'Patience and kindness, not just procedures.' },
] as const;

export const standards = [
  { icon: 'shield-check', title: 'Qualified staff for procedures', text: 'NG tubes, catheters, injections and IV medication are handled only by qualified nurses.' },
  { icon: 'pill', title: 'Medication as prescribed', text: 'Medicines are given only against a valid prescription, and every dose is recorded.' },
  { icon: 'droplet', title: 'Infection control', text: 'Hand hygiene, sterile single-use supplies and safe disposal at every visit.' },
  { icon: 'stethoscope', title: 'Clinical oversight', text: 'A senior nurse and doctor oversee care plans and review complex cases.' },
  { icon: 'notebook-pen', title: 'Care records', text: 'A simple daily record of vitals, medicines and observations.' },
  { icon: 'messages-square', title: 'Family communication', text: 'Daily WhatsApp updates, and an immediate call if anything changes.' },
] as const;

/** Care Plans — coverage (P08, M29). Ring hours use a 24h clock. */
export const plans = [
  {
    id: 'visit', name: 'Single visit', hours: '1–2 hours', start: 10, end: 12,
    ringLabel: 'Visit · 1–2 hours',
    bestFor: 'Injections, dressings, catheter or NG tube changes, BP checks and doctor visits.',
    who: 'Nurse, doctor or paramedic',
    examples: ['Course of injections', 'Dressing change', 'Doctor check-up'],
  },
  {
    id: 'day', name: 'Day shift', hours: '12 hours · 8 am – 8 pm', start: 8, end: 20,
    ringLabel: 'Day · 8 am – 8 pm',
    bestFor: 'Daytime nursing or caregiving while the family is at work.',
    who: 'Nurse, assistant nurse or caregiver',
    examples: ['Medication and meals', 'Mobility and hygiene', 'Vital signs'],
  },
  {
    id: 'night', name: 'Night shift', hours: '12 hours · 8 pm – 8 am', start: 20, end: 32,
    ringLabel: 'Night · 8 pm – 8 am',
    bestFor: 'An overnight watch so the family can sleep.',
    who: 'Nurse or caregiver',
    examples: ['Turning and repositioning', 'Night-time medicines', 'Toileting support'],
  },
  {
    id: '24h', name: '24-hour care', hours: 'Round the clock', start: 0, end: 24,
    ringLabel: '24 hours · round the clock',
    bestFor: 'Patients who need someone with them at all times.',
    who: 'Two staff on rotating 12-hour shifts, or a live-in caregiver',
    examples: ['Bedridden care', 'Post-surgery recovery', 'Advanced illness'],
  },
] as const;

export const durations = [
  { icon: 'calendar-check', title: 'One-off', text: 'A single visit for a specific need, such as an injection, a dressing or a doctor check-up.' },
  { icon: 'route', title: 'Short-term', text: 'Days to weeks of support, typically after surgery or a hospital stay.' },
  { icon: 'heart-handshake', title: 'Ongoing', text: 'Long-term care for elderly parents or chronic conditions, adjusted as needs change.' },
] as const;

export const combos = [
  { title: 'Staying independent', parts: ['Daily caregiver (day shift)', 'Weekly BP & sugar check', 'Monthly doctor review'] },
  { title: 'Recovering after surgery', parts: ['Night nurse for the first week', 'Daily dressing visit', 'Injections as prescribed'] },
  { title: 'Bedridden at home', parts: ['24-hour caregiving', 'Nurse visits for NG tube & catheter', 'Doctor review every 2 weeks'] },
] as const;

/** Areas served — x/y place dots on the stylised map (viewBox 600×520). SAMPLE list: confirm coverage. */
export const areas = [
  { name: 'Gulshan-e-Ravi', x: 170, y: 160 },
  { name: 'Samanabad', x: 210, y: 205 },
  { name: 'Shadman', x: 292, y: 168 },
  { name: 'Gulberg', x: 318, y: 232 },
  { name: 'Cantt', x: 425, y: 195 },
  { name: 'Cavalry Ground', x: 392, y: 258 },
  { name: 'Askari', x: 452, y: 252 },
  { name: 'DHA', x: 458, y: 322 },
  { name: 'Garden Town', x: 282, y: 268 },
  { name: 'Faisal Town', x: 246, y: 306 },
  { name: 'Model Town', x: 304, y: 318 },
  { name: 'Allama Iqbal Town', x: 200, y: 262 },
  { name: 'Johar Town', x: 188, y: 332 },
  { name: 'Wapda Town', x: 150, y: 366 },
  { name: 'Township', x: 268, y: 370 },
  { name: 'Pak Arab Society', x: 336, y: 398, hq: true },
  { name: 'Valencia', x: 138, y: 404 },
  { name: 'Lake City', x: 182, y: 452 },
  { name: 'Bahria Town', x: 98, y: 448 },
  { name: 'Ferozepur Road', x: 360, y: 350 },
] as const;

/** Verifiable facts only — no invented numbers (docs/02 §10). */
export const stats = [
  { value: 24, suffix: '/7', label: 'Phone & WhatsApp line' },
  { value: 11, suffix: '', label: 'Home healthcare services' },
  { value: 5, suffix: '', label: 'Types of professionals' },
  { value: areas.length, suffix: '', label: 'Areas across Lahore' },
] as const;
