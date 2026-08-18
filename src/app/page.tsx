import { active } from "@/data/active";
import { getTemplate } from "@/lib/templates";
import { TemplateRenderer } from "@/components/TemplateRenderer";

export default function Page() {
  const template = getTemplate(active.template);
  return <TemplateRenderer config={active.config} template={template} />;
}
