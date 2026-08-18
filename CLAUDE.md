# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# Wedding Invitation Studio

A **studio system** that generates premium, cinematic wedding-invitation websites
from one codebase. Studio-managed (no DB): one client = one data file; one design =
one theme; one layout = one template.

## Golden rules

- **Never bake a couple's names into identifiers or filenames.** Names live ONLY as
  string values inside a `WeddingConfig`. Files/exports stay client-neutral
  (`clients/demo.ts` → `weddingConfig`, not `clients/yusuf-aaliyah.ts` → `yusufAaliyah`).
- **Visual taste: no geometric star / rectangle / circle "icon" motifs.** Ornament with
  arches (mihrab), thin gold line dividers with a small diamond node, gold typography,
  and the gold particle field. (Established with the client — they explicitly rejected star motifs.)
- **Keep animation imperative and out of React render.** All GSAP/Three lives in the one
  `MotionRoot` client component's `useEffect`; sections are static server components with
  `data-reveal` / `data-parallax` / `data-nav` hooks. This protects 60fps.
- **The build gate is the definition of done:** `npm run build` must pass (it typechecks
  and static-exports). Verify runtime with the headless proof (below) and LOOK at the shots.

## Architecture (separation of concerns)

```
src/lib/schema.ts          WeddingConfig — the typed content contract (names/dates/copy)
src/lib/themes/            a THEME = the look (colours + fonts → CSS vars via themeToVars)
src/lib/templates/         a TEMPLATE = ordered section keys + a theme id
src/data/clients/*.ts      one WeddingConfig per client (neutrally named)
src/data/active.ts         which client + template is live (one-line switch)
src/components/engine/      design-agnostic motion: MotionRoot, three-particles, motion-setup,
                            Countdown, SvgDefs (only the #arch photo clip-path)
src/components/sections/    theme-aware, composable: Hero, Invitation, Verse, Couple, Nikah,
                            Events, Rsvp, Footer (+ registry.ts, NAV_LABELS)
src/components/TemplateRenderer.tsx   applies theme vars + renders sections in order in MotionRoot
```

- **New client** → copy `src/data/clients/demo.ts`, edit values, point `active.ts` at it.
- **New design** → add a theme in `src/lib/themes/` (colours/fonts/particle palette,
  `Theme` shape in `types.ts`) and register it in `THEMES` (`themes/index.ts`).
- **New arrangement** → add a template in `src/lib/templates/` (ordered `SectionKey[]` +
  a `theme` id) and register it in `TEMPLATES` (`templates/index.ts`).
- **New section type** → add the component in `src/components/sections/`, add its key to
  `SectionKey` (`templates/types.ts`), and register it in `SECTION_REGISTRY` (+ `NAV_LABELS`
  if it should get a nav dot) in `sections/registry.ts`.
- Adding a theme/template/section is a **registration**, not a rewire: every consumer
  (`TemplateRenderer`, `MotionRoot`, the nav) reads the registries above, so nothing else
  needs to change. `@/*` resolves to `./src/*` (see `tsconfig.json`).

## Stack (Next.js 16 — read node_modules/next/dist/docs before coding, see AGENTS.md)

- Next.js 16 App Router + TypeScript, **static export** (`output: 'export'`, `images.unoptimized`,
  `trailingSlash`). Output lands in `out/` — host on any static host.
- Tailwind v4 present, but the design system is CSS custom properties + hand-written CSS in
  `globals.css`. Colours/fonts come from the active theme; `--fs-*`, `--ease-*`, `--shell` are `:root`.
- GSAP 3.15 (ScrollTrigger + SplitText) and Three.js 0.185 (gold particle field, Tier C:
  procedural, one renderer, dpr-capped, WebGL-detected with CSS fallback, context-loss recovery).
- Fonts via `next/font/google` (Amiri / Cormorant Garamond / Jost) → CSS variables.

## Motion contract

- Sections render markup only. `data-reveal="fade|scale|words|chars"` (Arabic is NEVER
  char/word-split — it breaks ligatures; use `scale`). `data-parallax="<px>"` for full-bleed
  drift layers. `data-hero` for the hero entrance. `data-nav` marks nav-dot sections
  (paired with a `.navdots button[data-target]` — see `MotionRoot.tsx`). `data-draw`/
  `data-draw-medallion` self-draw SVG strokes on scroll; `data-pointer="<strength>"` adds
  subtle cursor-parallax drift (desktop only).
- Reduced motion → content shown, one static 3D frame, no loop. Mobile → no pins/scroll-jacking,
  but parallax + reveals stay scroll-coupled (never a dead page).
- No blocking preloader overlay (it caused stuck-scroll/hidden-content bugs — do not reintroduce).

## Commands

```bash
npm run dev      # local dev
npm run build    # typecheck + static export to out/  (the build gate — must pass)
npm run lint
npx serve out    # preview the exported static site (or: python3 -m http.server -d out)
```

### Runtime proof (headless Chrome, no browser download)

`playwright-core` (dev dep) drives the system Chrome. A proof script launches headless,
captures console errors, and screenshots each section at desktop + mobile viewports — then
LOOK at the shots. Serve `out/` first, then run the script against it.
