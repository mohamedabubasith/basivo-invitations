import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Design-agnostic GSAP wiring. Every function is scoped to a `root` element and
 * is meant to be called inside a `gsap.context(..., root)` so cleanup is one
 * `ctx.revert()`. Sections only render markup with `data-*` hooks; this file
 * turns those hooks into motion. Comments name the film technique each implements.
 */

/** Entrance reveals — varied per element via `data-reveal` (fade | scale | words | chars). */
export function setupReveals(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(revealOne);
}

function revealOne(el: HTMLElement) {
  const type = el.dataset.reveal || "fade";
  const st = { trigger: el, start: "top 84%", once: true };

  if (type === "words" || type === "chars") {
    // Word/letter stagger (SplitText). Never used on Arabic — it breaks ligatures.
    gsap.set(el, { opacity: 1 });
    let targets: Element[] = [el];
    try {
      const split = new SplitText(el, { type: type === "chars" ? "chars" : "words" });
      targets = (type === "chars" ? split.chars : split.words) as Element[];
    } catch {
      /* SplitText unavailable → fall back to fading the element as one unit */
    }
    gsap.set(targets, { opacity: 0, yPercent: type === "chars" ? 40 : 90 });
    gsap.to(targets, {
      opacity: 1,
      yPercent: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: type === "chars" ? 0.02 : 0.06,
      scrollTrigger: st,
    });
  } else if (type === "scale") {
    // Dolly-in: a slow settle from slightly oversized.
    gsap.set(el, { opacity: 0, scale: 1.14, transformOrigin: "50% 50%" });
    gsap.to(el, { opacity: 1, scale: 1, duration: 1.3, ease: "expo.out", scrollTrigger: st });
  } else {
    // Dissolve + lift.
    gsap.set(el, { opacity: 0, y: 38 });
    gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", scrollTrigger: st });
  }
}

/** Geometry draws itself on with the scroll (stroke-dashoffset). */
export function setupDraws(root: HTMLElement) {
  root.querySelectorAll<SVGPathElement>("[data-draw] path").forEach((path) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.inOut",
      scrollTrigger: { trigger: path, start: "top 82%", once: true },
    });
  });

  const med = root.querySelector<SVGElement>("[data-draw-medallion]");
  if (med) {
    med.querySelectorAll<SVGGeometryElement>("path, circle").forEach((geoEl, i) => {
      const len = geoEl.getTotalLength ? geoEl.getTotalLength() : 400;
      gsap.set(geoEl, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(geoEl, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.inOut",
        delay: i * 0.12,
        scrollTrigger: { trigger: med, start: "top 62%", once: true },
      });
    });
  }
}

/** Desktop-only scrubbed parallax (film: tracking shots). No pinning — pinned
 *  sections crop when their content is taller than the viewport. */
export function setupDesktopPins(root: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 768px)", () => {
    root.querySelectorAll<HTMLElement>("[data-photo]").forEach((media) => {
      const frame = media.closest(".photo-frame");
      if (!frame) return;
      gsap.fromTo(
        media,
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.8 } },
      );
    });
  });
}

/** Side nav-dot active state as sections cross mid-viewport. */
export function setupNav(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-nav]").forEach((sec) => {
    const btn = root.querySelector<HTMLButtonElement>(`.navdots button[data-target="${sec.id}"]`);
    if (!btn) return;
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (!self.isActive) return;
        root.querySelectorAll(".navdots button").forEach((b) => b.removeAttribute("aria-current"));
        btn.setAttribute("aria-current", "true");
      },
    });
  });
}

/**
 * The hero opening — a plain, always-plays staggered entrance (no overlay, no
 * scroll dependency, no `from`/CSS conflict). Runs once on mount.
 */
export function heroEntrance(root: HTMLElement) {
  const els = root.querySelectorAll("#hero [data-hero]");
  if (!els.length) return;
  gsap.set(els, { opacity: 0, y: 26 });
  gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.09, delay: 0.12 });
}
