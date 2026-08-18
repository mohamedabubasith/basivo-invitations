import type { TemplateDefinition } from "./types";
import { classicEmerald } from "./classic-emerald";

/** All available templates (section arrangement + theme). */
export const TEMPLATES = {
  "classic-emerald": classicEmerald,
} satisfies Record<string, TemplateDefinition>;

export type TemplateId = keyof typeof TEMPLATES;

export function getTemplate(id: TemplateId): TemplateDefinition {
  return TEMPLATES[id];
}

export type { TemplateDefinition, SectionKey } from "./types";
