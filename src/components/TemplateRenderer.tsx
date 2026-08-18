import type { WeddingConfig } from "@/lib/schema";
import type { TemplateDefinition } from "@/lib/templates/types";
import { getTheme, themeToVars } from "@/lib/themes";
import { MotionRoot } from "./engine/MotionRoot";
import { SECTION_REGISTRY, NAV_LABELS } from "./sections/registry";

/**
 * Composes one invitation: applies the template's theme (as CSS vars) and renders
 * its sections in order inside the imperative MotionRoot. Server component — the
 * sections it renders stay server components, passed as children into MotionRoot.
 */
export function TemplateRenderer({ config, template }: { config: WeddingConfig; template: TemplateDefinition }) {
  const theme = getTheme(template.theme);
  const navItems = template.sections
    .filter((k) => NAV_LABELS[k])
    .map((k) => ({ id: k, label: NAV_LABELS[k] as string }));

  return (
    <MotionRoot style={themeToVars(theme)} navItems={navItems} particlePalette={theme.particlePalette}>
      {template.sections.map((key) => {
        const Section = SECTION_REGISTRY[key];
        return <Section key={key} config={config} />;
      })}
    </MotionRoot>
  );
}
