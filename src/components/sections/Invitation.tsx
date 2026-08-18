import type { WeddingConfig } from "@/lib/schema";
import { bi, UI, type Lang } from "@/lib/i18n";

/** The Invitation — warm announcement, framed in an arch. */
export function Invitation({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const i = config.invitation;
  return (
    <section id="invitation" data-nav="Invitation">
      <div className="shell stack">
        <p className="eyebrow" data-reveal {...bi(UI.invitationEyebrow, lang)} />
        <div className="card-arch scrim stack">
          <p className="lead" data-reveal {...bi(i.intro, lang)} />
          <p className="invite-families" data-reveal="words">
            <span className="invite-families__line" {...bi(i.groomFamily, lang)} />
            <span className="amp" aria-hidden="true">
              &amp;
            </span>
            <span className="invite-families__line" {...bi(i.brideFamily, lang)} />
          </p>
          <p className="lead" data-reveal {...bi(i.body, lang)} />
          <div className="divider" data-reveal>
            <span className="divider__dot" />
          </div>
          <p className="lead serif-italic" data-reveal {...bi(i.quote, lang)} />
        </div>
      </div>
    </section>
  );
}
