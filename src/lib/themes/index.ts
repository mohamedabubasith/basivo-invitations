import type { Theme } from "./types";
import { emeraldIslamic } from "./emerald-islamic";

/** All available design themes. Add a new design by registering it here. */
export const THEMES = {
  "emerald-islamic": emeraldIslamic,
} satisfies Record<string, Theme>;

export type ThemeId = keyof typeof THEMES;

export function getTheme(id: ThemeId): Theme {
  return THEMES[id];
}

export type { Theme, ThemeFonts } from "./types";
export { themeToVars } from "./types";
