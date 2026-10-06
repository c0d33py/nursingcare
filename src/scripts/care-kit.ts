/**
 * M23 — procedural "soft clay" 3D Care Kit (Tier A + WebGL2 only).
 * Built from primitives, so there is no model file to download. The HTML list beside it
 * stays the real, accessible interface; this scene mirrors its hover state.
 */
import {
  ACESFilmicToneMapping, BoxGeometry, CanvasTexture, CatmullRomCurve3, CylinderGeometry, DirectionalLight,
  Group, HemisphereLight, Mesh, MeshBasicMaterial, MeshStandardMaterial, Object3D, PerspectiveCamera, PlaneGeometry,
  Raycaster, Scene, SphereGeometry, ConeGeometry, TorusGeometry, TubeGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const COLORS = { teal: 0x0e6e6a, tealDeep: 0x0a4f4c, tealLight: 0x6cbcb6, cream: 0xf6efe3, gold: 0xe7a93c, white: 0xfbfbf8, slate: 0x2b3a4a, silver: 0xcfd8de };
const clay = (color: number, roughness = 0.72, metalness = 0, extra: Partial<MeshStandardMaterial> = {}) =>
  Object.assign(new MeshStandardMaterial({ color, roughness, metalness }), extra);
const mesh = (geo: ConstructorParameters<typeof Mesh>[0], mat: MeshStandardMaterial, pos: [number, number, number] = [0, 0, 0], rot: [number, number, number] = [0, 0, 0]) => {
  const m = new Mesh(geo, mat);
  m.position.set(...pos);
  m.rotation.set(...rot);
  return m;
};
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const back = (t: number) => { const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };

/* ── Instruments ─────────────────────────────────────────────────────────── */
function stethoscope() {
  const g = new Group();
  const tube = clay(COLORS.slate, 0.55);
  g.add(mesh(new TorusGeometry(0.38, 0.045, 14, 48, Math.PI * 1.15), tube, [0, 0.12, 0], [0, 0, Math.PI * -0.07]));
  g.add(mesh(new CylinderGeometry(0.03, 0.03, 0.5, 12), tube, [0.02, -0.42, 0]));
  g.add(mesh(new CylinderGeometry(0.17, 0.17, 0.08, 32), clay(COLORS.silver, 0.3, 0.6), [0.02, -0.7, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh(new CylinderGeometry(0.12, 0.12, 0.09, 32), clay(COLORS.gold, 0.4), [0.02, -0.7, 0.01], [Math.PI / 2, 0, 0]));
  for (const x of [-0.36, 0.38]) g.add(mesh(new SphereGeometry(0.06, 16, 16), clay(COLORS.gold, 0.5), [x, 0.18, 0]));
  return g;
}

function fobWatch() {
  const g = new Group();
  g.add(mesh(new CylinderGeometry(0.34, 0.34, 0.1, 48), clay(COLORS.gold, 0.35, 0.3), [0, 0, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh(new CylinderGeometry(0.28, 0.28, 0.11, 48), clay(COLORS.white, 0.6), [0, 0, 0.01], [Math.PI / 2, 0, 0]));
  g.add(mesh(new BoxGeometry(0.03, 0.18, 0.02), clay(COLORS.slate), [0, 0.07, 0.07]));
  g.add(mesh(new BoxGeometry(0.13, 0.03, 0.02), clay(COLORS.teal), [0.05, 0, 0.07]));
  g.add(mesh(new TorusGeometry(0.08, 0.025, 10, 24), clay(COLORS.gold, 0.35, 0.3), [0, 0.42, 0]));
  return g;
}

function syringe(plunger = COLORS.teal, length = 0.85) {
  const g = new Group();
  g.add(mesh(new CylinderGeometry(0.12, 0.12, length, 28), clay(COLORS.white, 0.25, 0, { transparent: true, opacity: 0.85 })));
  g.add(mesh(new CylinderGeometry(0.1, 0.1, length * 0.45, 28), clay(COLORS.tealLight, 0.5), [0, -length * 0.2, 0]));
  g.add(mesh(new CylinderGeometry(0.035, 0.035, 0.45, 12), clay(plunger), [0, length / 2 + 0.18, 0]));
  g.add(mesh(new CylinderGeometry(0.15, 0.15, 0.05, 28), clay(plunger), [0, length / 2 + 0.42, 0]));
  g.add(mesh(new RoundedBoxGeometry(0.42, 0.05, 0.16, 2, 0.02), clay(COLORS.white), [0, length / 2, 0]));
  g.add(mesh(new CylinderGeometry(0.055, 0.04, 0.3, 16), clay(plunger), [0, -length / 2 - 0.15, 0])); // needle stays capped
  g.rotation.z = 0.55;
  return g;
}

function bpMonitor() {
  const g = new Group();
  g.add(mesh(new RoundedBoxGeometry(0.95, 0.68, 0.26, 4, 0.08), clay(COLORS.white, 0.55)));
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#0a4f4c'; ctx.fillRect(0, 0, 256, 128);
  ctx.fillStyle = '#dff7f4'; ctx.font = '600 56px Inter, system-ui, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('120/80', 128, 70);
  ctx.font = '600 26px Inter, system-ui, sans-serif'; ctx.fillStyle = '#f3c46f'; ctx.fillText('♥ 72 bpm', 128, 108);
  const screen = new Mesh(new PlaneGeometry(0.66, 0.33), new MeshBasicMaterial({ map: new CanvasTexture(c) }));
  screen.position.set(0, 0.08, 0.135);
  g.add(screen);
  g.add(mesh(new CylinderGeometry(0.07, 0.07, 0.05, 24), clay(COLORS.gold, 0.4), [0, -0.21, 0.13], [Math.PI / 2, 0, 0]));
  g.add(mesh(new TorusGeometry(0.28, 0.035, 10, 32, Math.PI), clay(COLORS.slate, 0.5), [0.62, 0.05, 0], [0, 0, -Math.PI / 2]));
  return g;
}

function feedingSyringe() {
  const g = syringe(COLORS.gold, 0.8);
  const pts = Array.from({ length: 40 }, (_, i) => {
    const t = i / 39;
    return new Vector3(Math.cos(t * Math.PI * 4) * 0.22, -0.55 - t * 0.6, Math.sin(t * Math.PI * 4) * 0.22);
  });
  g.add(new Mesh(new TubeGeometry(new CatmullRomCurve3(pts), 80, 0.03, 8), clay(COLORS.tealLight, 0.5)));
  return g;
}

function sterilePack() {
  const g = new Group();
  g.add(mesh(new RoundedBoxGeometry(0.92, 0.62, 0.09, 3, 0.04), clay(COLORS.white, 0.6)));
  g.add(mesh(new RoundedBoxGeometry(0.76, 0.46, 0.1, 3, 0.03), clay(0xe8f3f2, 0.6), [0, 0, 0.005]));
  const drop = new Group();
  drop.add(mesh(new SphereGeometry(0.13, 24, 24), clay(COLORS.teal, 0.45)));
  drop.add(mesh(new ConeGeometry(0.115, 0.2, 24), clay(COLORS.teal, 0.45), [0, 0.15, 0]));
  drop.position.set(0, -0.02, 0.12);
  g.add(drop);
  return g;
}

function bandageRoll() {
  const g = new Group();
  g.add(mesh(new CylinderGeometry(0.32, 0.32, 0.36, 40), clay(COLORS.cream, 0.9), [0, 0, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh(new CylinderGeometry(0.12, 0.12, 0.37, 24), clay(COLORS.tealDeep), [0, 0, 0], [Math.PI / 2, 0, 0]));
  g.add(mesh(new BoxGeometry(0.34, 0.012, 0.32), clay(COLORS.cream, 0.9), [0.3, -0.31, 0], [0, 0, -0.15]));
  return g;
}

const BUILDERS = [stethoscope, fobWatch, () => syringe(), bpMonitor, feedingSyringe, sterilePack, bandageRoll];

/* ── Bag ─────────────────────────────────────────────────────────────────── */
function bag() {
  const g = new Group();
  g.add(mesh(new RoundedBoxGeometry(3, 1.5, 1.7, 5, 0.3), clay(COLORS.teal, 0.68), [0, 0.75, 0]));
  g.add(mesh(new BoxGeometry(2.6, 0.04, 1.3), clay(0x063b39, 0.9), [0, 1.49, 0]));
  g.add(mesh(new BoxGeometry(0.5, 0.15, 0.05), clay(COLORS.white, 0.6), [0, 0.78, 0.86]));
  g.add(mesh(new BoxGeometry(0.15, 0.5, 0.05), clay(COLORS.white, 0.6), [0, 0.78, 0.86]));
  g.add(mesh(new RoundedBoxGeometry(0.34, 0.2, 0.08, 2, 0.04), clay(COLORS.gold, 0.4, 0.2), [0, 1.36, 0.87]));
  const lidPivot = new Group();
  lidPivot.position.set(0, 1.5, -0.85);
  lidPivot.add(mesh(new RoundedBoxGeometry(3.04, 0.3, 1.74, 5, 0.14), clay(COLORS.tealDeep, 0.68), [0, 0.06, 0.85]));
  lidPivot.add(mesh(new TorusGeometry(0.45, 0.08, 16, 40, Math.PI), clay(COLORS.gold, 0.4, 0.2), [0, 0.2, 0.85]));
  g.add(lidPivot);
  return { group: g, lidPivot };
}

function contactShadow() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(16,36,58,0.35)');
  grd.addColorStop(1, 'rgba(16,36,58,0)');
  ctx.fillStyle = grd; ctx.fillRect(0, 0, 128, 128);
  const m = new Mesh(new PlaneGeometry(6, 3), new MeshBasicMaterial({ map: new CanvasTexture(c), transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.01;
  return m;
}

/* ── Mount ───────────────────────────────────────────────────────────────── */
export function mountCareKit(root: HTMLElement) {
  const host = root.querySelector<HTMLElement>('[data-kit-canvas]')!;
  const items = JSON.parse(root.dataset.items ?? '[]') as { slug: string; url: string }[];

  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  renderer.domElement.style.cursor = 'grab';
  renderer.domElement.style.touchAction = 'pan-y';

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 2.6, 10.5);
  camera.lookAt(0, 1.75, 0);
  scene.add(new HemisphereLight(0xffffff, 0xe9dcc6, 1.5));
  const key = new DirectionalLight(0xfff3e0, 2.4); key.position.set(-4, 6, 5); scene.add(key);
  const fill = new DirectionalLight(0xd7ecea, 0.9); fill.position.set(5, 3, 4); scene.add(fill);

  const world = new Group();
  scene.add(world);
  world.add(contactShadow());
  const { group: bagGroup, lidPivot } = bag();
  world.add(bagGroup);

  type Item = { obj: Group; slug: string; url: string; open: Vector3; hover: number; phase: number };
  const kit: Item[] = items.map((it, i) => {
    const obj = new Group();
    obj.add(BUILDERS[i % BUILDERS.length]());
    obj.userData.slug = it.slug;
    const a = Math.PI * (0.86 - (0.72 * i) / (items.length - 1));
    const open = new Vector3(Math.cos(a) * 2.75, 2.05 + Math.sin(a) * 1.35, 0.35);
    obj.position.set(open.x * 0.25, 0.9, 0);
    obj.scale.setScalar(0.001);
    world.add(obj);
    return { obj, slug: it.slug, url: it.url, open, hover: 0, phase: i * 0.9 };
  });

  // State
  let openT = 0, opening = false, openStart = 0;
  let hovered: Item | null = null, highlighted: string | null = null;
  let rotTarget = 0, dragging = false, dragStartX = 0, dragStartRot = 0, moved = 0;
  const ray = new Raycaster();
  const ptr = new Vector2();

  const open = () => { if (!opening && openT === 0) { opening = true; openStart = performance.now(); } };
  new IntersectionObserver(([e]) => { if (e.isIntersecting) open(); }, { threshold: 0.4 }).observe(host);

  const setHover = (item: Item | null) => {
    if (item === hovered) return;
    hovered = item;
    renderer.domElement.style.cursor = item ? 'pointer' : dragging ? 'grabbing' : 'grab';
    root.dispatchEvent(new CustomEvent('kit:hover3d', { detail: item?.slug ?? null }));
  };
  root.addEventListener('kit:highlight', (e) => { highlighted = (e as CustomEvent<string | null>).detail; });

  const el = renderer.domElement;
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    if (dragging) {
      moved = Math.max(moved, Math.abs(e.clientX - dragStartX));
      rotTarget = Math.max(-0.45, Math.min(0.45, dragStartRot + (e.clientX - dragStartX) * 0.006));
      return;
    }
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(kit.map((k) => k.obj), true)[0];
    let o: Object3D | null = hit?.object ?? null;
    while (o && !o.userData.slug) o = o.parent;
    setHover(openT > 0.9 && o ? kit.find((k) => k.obj === o) ?? null : null);
  });
  el.addEventListener('pointerleave', () => setHover(null));
  el.addEventListener('pointerdown', (e) => { dragging = true; moved = 0; dragStartX = e.clientX; dragStartRot = rotTarget; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointerup', (e) => {
    dragging = false;
    el.releasePointerCapture(e.pointerId);
    if (moved < 6 && hovered) location.href = hovered.url;
  });

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    el.style.width = '100%'; el.style.height = '100%';
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const tmp = new Vector3();
  let first = true;
  const frame = (now: number) => {
    const time = now / 1000;
    if (opening) {
      const t = Math.min(1, (now - openStart) / 1300);
      openT = t;
      if (t >= 1) opening = false;
    }
    // Lid swings back, then instruments rise into an arc with a 60ms stagger.
    lidPivot.rotation.x = -1.95 * ease(Math.min(1, openT / 0.55));
    kit.forEach((k, i) => {
      const local = Math.min(1, Math.max(0, (openT - 0.3 - i * 0.05) / 0.5));
      const p = back(local);
      const active = (hovered === k || highlighted === k.slug) ? 1 : 0;
      k.hover += (active - k.hover) * 0.15;
      const dim = hovered || highlighted ? (active ? 1 : 0.94) : 1;
      tmp.set(k.open.x * 0.25, 0.9, 0).lerp(k.open, p);
      k.obj.position.set(tmp.x, tmp.y + Math.sin(time * 1.2 + k.phase) * 0.05 * local + k.hover * 0.15, tmp.z + k.hover * 0.3);
      k.obj.scale.setScalar(Math.max(0.001, p * (0.9 + k.hover * 0.18) * dim));
      k.obj.rotation.y = Math.sin(time * 0.6 + k.phase) * 0.12 + k.hover * 0.35;
    });
    const sway = openT < 1 ? Math.sin(time * 0.8) * 0.14 * (1 - openT) : 0;
    world.rotation.y += (rotTarget + sway - world.rotation.y) * 0.08;
    renderer.render(scene, camera);
    if (first) { first = false; root.classList.add('is-3d'); }
  };

  // Render only while visible and the tab is shown.
  let visible = false;
  const sync = () => renderer.setAnimationLoop(visible && !document.hidden ? frame : null);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }).observe(host);
  document.addEventListener('visibilitychange', sync);
}
