import type { TemplateDefinition } from "./types";

/**
 * Classic Emerald — the full, reverent Muslim-wedding arc:
 * Bismillah → Invitation → Verse → Couple → Nikah → Events → Duʿā/RSVP → Footer.
 */
export const classicEmerald: TemplateDefinition = {
  id: "classic-emerald",
  name: "Classic Emerald",
  theme: "emerald-islamic",
  sections: ["hero", "invitation", "verse", "couple", "nikah", "events", "rsvp", "footer"],
};
