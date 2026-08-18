import type { Person, WeddingConfig } from "@/lib/schema";
import { bi, type Lang } from "@/lib/i18n";

/** Arch-framed portrait; falls back to an elegant monogram when no photo is set. */
function Portrait({ person, lang }: { person: Person; lang: Lang }) {
  return (
    <div className="photo-frame">
      <div className="photo-inner">
        {person.photo ? (
          <div
            className="photo-media"
            data-photo
            role="img"
            aria-label={person.fullName[lang]}
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
export function Couple({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const { groom, bride } = config.couple;
  return (
    <section id="couple" data-nav="The Couple">
      <div className="shell stack">
        <p className="eyebrow" data-reveal {...bi(config.couple_eyebrow, lang)} />
        <div className="couple-grid">
          <div className="person" data-reveal>
            <Portrait person={groom} lang={lang} />
            <p className="person__role" {...bi(groom.role, lang)} />
            <p className="person__name" {...bi(groom.fullName, lang)} />
            <p className="person__of" {...bi(groom.lineage, lang)} />
          </div>
          <div className="couple-amp" data-reveal aria-hidden="true">
            &amp;
          </div>
          <div className="person" data-reveal>
            <Portrait person={bride} lang={lang} />
            <p className="person__role" {...bi(bride.role, lang)} />
            <p className="person__name" {...bi(bride.fullName, lang)} />
            <p className="person__of" {...bi(bride.lineage, lang)} />
          </div>
        </div>
      </div>
    </section>
  );
}
