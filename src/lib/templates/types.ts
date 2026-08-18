import type { ThemeId } from "../themes";

/** Every composable section the studio can arrange into a template. */
export type SectionKey =
  | "hero"
  | "invitation"
  | "verse"
  | "couple"
  | "nikah"
  | "events"
  | "rsvp"
  | "footer";

/**
 * A Template = an ordered list of sections + a theme. "Different layouts" for
 * different clients means reordering / choosing sections here — not new code.
 */
export interface TemplateDefinition {
  id: string;
  name: string;
  theme: ThemeId;
  sections: SectionKey[];
}
