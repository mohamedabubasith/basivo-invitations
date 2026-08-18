import type { Theme } from "./types";

/**
 * Emerald Islamic — deep emerald night, gold, ivory. Reverent, not flashy.
 * Fonts reference the next/font CSS variables loaded in the root layout.
 */
export const emeraldIslamic: Theme = {
  id: "emerald-islamic",
  name: "Emerald Islamic",
  colors: {
    abyss: "#04110b",
    deep: "#06180f",
    emerald: "#0a3323",
    emeraldMid: "#0d3f2b",
    emeraldLight: "#12503a",
    gold: "#c9a24b",
    goldBright: "#ecce8a",
    goldSoft: "#d9bd82",
    goldDeep: "#a67c34",
    ivory: "#f3ead4",
    ivoryDim: "rgba(243,234,212,.72)",
    ivoryFaint: "rgba(243,234,212,.42)",
    rose: "#c98b7a",
  },
  fonts: {
    display: "var(--font-cormorant), 'Times New Roman', serif",
    displayTa: "var(--font-noto-serif-tamil), 'Noto Sans Tamil', serif",
    arabic: "var(--font-amiri), 'Cormorant Garamond', serif",
    ui: "var(--font-jost), system-ui, sans-serif",
    uiTa: "var(--font-noto-sans-tamil), sans-serif",
  },
  particlePalette: [
    [0.85, 0.71, 0.36],
    [0.93, 0.81, 0.54],
    [0.72, 0.53, 0.24],
    [0.98, 0.88, 0.62],
  ],
};
