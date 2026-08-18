import * as THREE from "three";

/**
 * Gold particle field (Tier C: procedural, zero assets).
 * One renderer for the whole page. dpr-capped. Fully disposable.
 * `render()` is called from MotionRoot's single rAF loop — this module owns no loop.
 */
export interface ParticleField {
  render(prog: number, t: number, px: number, py: number): void;
  resize(w: number, h: number): void;
  dispose(): void;
}

type RGB = [number, number, number];
const DEFAULT_GOLD: RGB[] = [
  [0.85, 0.71, 0.36],
  [0.93, 0.81, 0.54],
  [0.72, 0.53, 0.24],
  [0.98, 0.88, 0.62],
];

function makeSprite(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,240,205,0.85)");
  g.addColorStop(0.55, "rgba(220,180,110,0.35)");
  g.addColorStop(1, "rgba(220,180,110,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makePoints(
  count: number,
  spread: number,
  depth: number,
  size: number,
  opacity: number,
  sprite: THREE.Texture,
  palette: RGB[],
): THREE.Points {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = -Math.random() * depth + 6;
    const gcol = palette[(Math.random() * palette.length) | 0];
    col[i * 3] = gcol[0];
    col[i * 3 + 1] = gcol[1];
    col[i * 3 + 2] = gcol[2];
    seed[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    map: sprite,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });
  const pts = new THREE.Points(geo, mat);
  pts.userData.baseY = pos.slice();
  pts.userData.seed = seed;
  return pts;
}

export function createParticleField(
  canvas: HTMLCanvasElement,
  opts: { isMobile: boolean; palette?: RGB[] },
): ParticleField | null {
  // Feature-detect WebGL before committing to a context.
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
  } catch {
    return null;
  }
  if (!renderer.getContext()) return null;

  const isMobile = opts.isMobile;
  let w = window.innerWidth;
  let h = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
  renderer.setSize(w, h, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 120);
  camera.position.set(0, 0, 30);

  const sprite = makeSprite();
  const palette = opts.palette && opts.palette.length ? opts.palette : DEFAULT_GOLD;
  const dust = makePoints(isMobile ? 420 : 1200, 70, 60, isMobile ? 0.42 : 0.5, 0.9, sprite, palette);
  const bokeh = makePoints(isMobile ? 16 : 40, 64, 46, isMobile ? 2.6 : 3.4, 0.5, sprite, palette);
  scene.add(dust, bokeh);

  // Slow upward flow with wrap — "rising light".
  function flow(points: THREE.Points, t: number, speed: number) {
    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const base = points.userData.baseY as Float32Array;
    const seed = points.userData.seed as Float32Array;
    for (let i = 0; i < seed.length; i++) {
      let y = base[i * 3 + 1] + ((t * speed * (0.4 + seed[i])) % 70);
      if (y > 35) y -= 70;
      arr[i * 3 + 1] = y;
    }
    attr.needsUpdate = true;
  }

  return {
    render(prog, t, px, py) {
      dust.rotation.y = t * 0.015;
      dust.rotation.x = Math.sin(t * 0.08) * 0.04;
      bokeh.rotation.y = -t * 0.02;
      flow(dust, t, 3.0);
      flow(bokeh, t, 1.6);
      camera.position.y = -prog * 8 + py * 2.2;
      camera.position.x = px * 2.2;
      camera.position.z = 30 - prog * 6;
      camera.lookAt(0, camera.position.y * 0.4, 0);
      renderer.render(scene, camera);
    },
    resize(nw, nh) {
      w = nw;
      h = nh;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    },
    dispose() {
      dust.geometry.dispose();
      (dust.material as THREE.Material).dispose();
      bokeh.geometry.dispose();
      (bokeh.material as THREE.Material).dispose();
      sprite.dispose();
      renderer.dispose();
    },
  };
}
