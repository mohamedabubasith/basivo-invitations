import type { WeddingConfig } from "@/lib/schema";

/** The Invitation — warm announcement, framed in an arch. */
export function Invitation({ config }: { config: WeddingConfig }) {
  const i = config.invitation;
  return (
    <section id="invitation" data-nav="Invitation">
      <div className="shell stack">
        <p className="eyebrow" data-reveal>
          The Invitation
        </p>
        <div className="card-arch scrim stack">
          <p className="lead" data-reveal>
            {i.intro}
          </p>
          <p className="invite-families" data-reveal="words">
            {i.families}
          </p>
          <p className="lead" data-reveal>
            {i.body}
          </p>
          <div className="divider" data-reveal>
            <span className="divider__dot" />
          </div>
          <p className="lead serif-italic" data-reveal>
            {i.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
