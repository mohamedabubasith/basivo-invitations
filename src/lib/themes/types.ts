import type { CSSProperties } from "react";

/**
 * A Theme is the *look* — colours + font stacks — expressed so it can be applied
 * as CSS custom properties on a template root. A new design = a new Theme file.
 * The motion engine and section markup never hard-code a colour; they read these.
 */
export interface ThemeColors {
  abyss: string;
  deep: string;
  emerald: string;
  emeraldMid: string;
  emeraldLight: string;
  gold: string;
  goldBright: string;
  goldSoft: string;
  goldDeep: string;
  ivory: string;
  ivoryDim: string;
  ivoryFaint: string;
  rose: string;
}

export interface ThemeFonts {
  /** Display / names (serif). */
  display: string;
  /** Arabic + calligraphic accents. */
  arabic: string;
  /** UI labels / eyebrows (sans). */
  ui: string;
}

/** RGB triplets (0..1) used to tint the Three.js gold-particle field. */
export type GoldPalette = [number, number, number][];

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  /** Particle colours for the 3D atmosphere; falls back to a gold set. */
  particlePalette: GoldPalette;
}

/** Map a Theme to the CSS custom properties the stylesheet consumes. */
export function themeToVars(t: Theme): CSSProperties {
  const c = t.colors;
  const vars: Record<string, string> = {
    "--abyss": c.abyss,
    "--deep": c.deep,
    "--emerald": c.emerald,
    "--emerald-mid": c.emeraldMid,
    "--emerald-light": c.emeraldLight,
    "--gold": c.gold,
    "--gold-bright": c.goldBright,
    "--gold-soft": c.goldSoft,
    "--gold-deep": c.goldDeep,
    "--ivory": c.ivory,
    "--ivory-dim": c.ivoryDim,
    "--ivory-faint": c.ivoryFaint,
    "--rose": c.rose,
    "--ff-display": t.fonts.display,
    "--ff-arabic": t.fonts.arabic,
    "--ff-ui": t.fonts.ui,
  };
  return vars as unknown as CSSProperties;
}
