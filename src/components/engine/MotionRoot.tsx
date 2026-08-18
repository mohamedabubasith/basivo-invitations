"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { createParticleField, type ParticleField } from "./three-particles";
import { setupReveals, setupDraws, setupDesktopPins, setupNav, heroEntrance } from "./motion-setup";
import { SvgDefs } from "./SvgDefs";

interface NavItem {
  id: string;
  label: string;
}

interface MotionRootProps {
  /** Theme CSS custom properties applied at the root. */
  style?: CSSProperties;
  navItems: NavItem[];
  particlePalette: [number, number, number][];
  children: ReactNode;
}

/**
 * The one imperative controller. Sections render static markup with data-hooks;
 * this owns the single rAF loop (parallax + progress + 3D), the GSAP scene, the
 * hero entrance, reduced-motion degradation, visibility gating and WebGL
 * context-loss recovery. React never runs per scroll frame. No blocking overlay.
 */
export function MotionRoot({ style, navItems, particlePalette, children }: MotionRootProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const win = window as unknown as { __wedSafety?: number };

    // reveal everything now that the engine is alive (clears the CSS pre-hide)
    document.documentElement.classList.remove("anim");
    if (win.__wedSafety) clearTimeout(win.__wedSafety);

    // 3D atmosphere (feature-detected; null => CSS gradient remains).
    let field: ParticleField | null = createParticleField(canvas, { isMobile, palette: particlePalette });
    if (!field) canvas.style.display = "none";

    // Reduced motion: one static frame, no loop, content already visible.
    if (reduce) {
      field?.render(0, 0, 0, 0);
      return () => field?.dispose();
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);

    // --- loop state ---
    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let scrollY = window.scrollY;
    let px = 0, py = 0, tpx = 0, tpy = 0;
    let rafId = 0;
    let t0 = performance.now();

    const parEls = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
      el,
      amp: parseFloat(el.dataset.parallax || "0") || 0,
      top: 0,
      h: 0,
      cur: 0,
    }));
    const ptrEls = Array.from(root.querySelectorAll<HTMLElement>("[data-pointer]")).map((el) => ({
      el,
      s: parseFloat(el.dataset.pointer || "0") || 0,
    }));

    const measure = () => {
      const sy = window.scrollY;
      for (const p of parEls) {
        const r = p.el.getBoundingClientRect();
        p.top = r.top + sy;
        p.h = p.el.offsetHeight;
      }
    };
    measure();

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onPointer = (e: PointerEvent) => {
      tpx = e.clientX / vw - 0.5;
      tpy = e.clientY / vh - 0.5;
    };
    const onResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      field?.resize(vw, vh);
      measure();
      ScrollTrigger.refresh();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!isTouch) window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    const progressEl = progressRef.current;

    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      const docH = document.documentElement.scrollHeight - vh;
      const prog = docH > 0 ? Math.min(1, Math.max(0, scrollY / docH)) : 0;
      if (progressEl) progressEl.style.transform = `scaleX(${prog})`;

      px += (tpx - px) * 0.05;
      py += (tpy - py) * 0.05;

      for (const p of parEls) {
        const rel = (scrollY + vh - p.top) / (vh + p.h);
        const target = (rel - 0.5) * p.amp;
        p.cur += (target - p.cur) * 0.08;
        p.el.style.transform = `translate3d(0, ${p.cur.toFixed(2)}px, 0)`;
      }
      if (!isTouch) {
        for (const q of ptrEls) {
          q.el.style.transform = `translate3d(${(px * q.s).toFixed(2)}px, ${(py * q.s).toFixed(2)}px, 0)`;
        }
      }
      if (field && document.visibilityState === "visible") field.render(prog, t, px, py);
      rafId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!rafId) {
        t0 = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    start();

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    // WebGL context-loss recovery.
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    const onRestored = () => {
      field?.dispose();
      field = createParticleField(canvas, { isMobile, palette: particlePalette });
      start();
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

    // GSAP scene — reveals, geometry draw-ons, desktop pins, nav, hero entrance.
    const ctx = gsap.context(() => {
      setupReveals(root);
      setupDraws(root);
      setupDesktopPins(root);
      setupNav(root);
      heroEntrance(root);
    }, root);

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      ctx.revert();
      field?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div ref={rootRef} className="template-root" style={style}>
      <SvgDefs />
      <div className="bg-gradient" aria-hidden="true" />
      <canvas ref={canvasRef} id="bg" className="bg-canvas" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      <div className="progress" aria-hidden="true">
        <div ref={progressRef} className="progress__bar" />
      </div>

      <nav className="navdots" aria-label="Section navigation">
        {navItems.map((n) => (
          <button key={n.id} type="button" data-target={n.id} aria-label={n.label} onClick={() => scrollTo(n.id)} />
        ))}
      </nav>

      <main>{children}</main>
    </div>
  );
}
