import type { WeddingConfig } from "@/lib/schema";
import type { TemplateId } from "@/lib/templates";
import { weddingConfig } from "./clients/demo";

/**
 * The currently-live client + template. Changing which invitation is served is a
 * one-line change here — swap the import above and the template id below.
 * (Identifiers/filenames stay client-neutral; the names live only inside the data.)
 */
export const active: { config: WeddingConfig; template: TemplateId } = {
  config: weddingConfig,
  template: "classic-emerald",
};
