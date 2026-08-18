import type { Person, WeddingConfig } from "@/lib/schema";

/** Arch-framed portrait; falls back to an elegant monogram when no photo is set. */
function Portrait({ person }: { person: Person }) {
  return (
    <div className="photo-frame">
      <div className="photo-inner">
        {person.photo ? (
          <div
            className="photo-media"
            data-photo
            role="img"
            aria-label={person.fullName}
            style={{ backgroundImage: `url(${person.photo})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        ) : (
          <div className="photo-media" data-photo>
            <span className="initial">{person.initial}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** The Couple — intimate. Photos rise + parallax within their arches. */
export function Couple({ config }: { config: WeddingConfig }) {
  const { groom, bride } = config.couple;
  return (
    <section id="couple" data-nav="The Couple">
      <div className="shell stack">
        <p className="eyebrow" data-reveal>
          {config.couple_eyebrow}
        </p>
        <div className="couple-grid">
          <div className="person" data-reveal>
            <Portrait person={groom} />
            <p className="person__role">{groom.role}</p>
            <p className="person__name">{groom.fullName}</p>
            <p className="person__of">{groom.lineage}</p>
          </div>
          <div className="couple-amp" data-reveal aria-hidden="true">
            &amp;
          </div>
          <div className="person" data-reveal>
            <Portrait person={bride} />
            <p className="person__role">{bride.role}</p>
            <p className="person__name">{bride.fullName}</p>
            <p className="person__of">{bride.lineage}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
