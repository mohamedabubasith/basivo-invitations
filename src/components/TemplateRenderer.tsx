import type { WeddingConfig } from "@/lib/schema";
import type { TemplateDefinition } from "@/lib/templates/types";
import { getTheme, themeToVars } from "@/lib/themes";
import { DEFAULT_LANG, type LocalizedString } from "@/lib/i18n";
import { MotionRoot } from "./engine/MotionRoot";
import { SECTION_REGISTRY, NAV_LABELS } from "./sections/registry";

/**
 * Composes one invitation: applies the template's theme (as CSS vars) and renders
 * its sections in order inside the imperative MotionRoot. Server component — the
 * sections it renders stay server components, passed as children into MotionRoot.
 * Sections render `DEFAULT_LANG`'s text on first paint; the EN/த toggle (wired
 * in MotionRoot) swaps it client-side from the `data-i18n-*` attributes each
 * section attaches via `bi()` — see `src/lib/i18n.ts`.
 */
export function TemplateRenderer({ config, template }: { config: WeddingConfig; template: TemplateDefinition }) {
  const theme = getTheme(template.theme);
  const navItems = template.sections
    .filter((k) => NAV_LABELS[k])
    .map((k) => ({ id: k, label: (NAV_LABELS[k] as LocalizedString)[DEFAULT_LANG] }));

  return (
    <MotionRoot
      style={themeToVars(theme)}
      navItems={navItems}
      particlePalette={theme.particlePalette}
      metaTitle={config.meta.title}
    >
      {template.sections.map((key) => {
        const Section = SECTION_REGISTRY[key];
        return <Section key={key} config={config} lang={DEFAULT_LANG} />;
      })}
    </MotionRoot>
  );
}
