import type { WeddingConfig } from "@/lib/schema";
import { bi, type Lang } from "@/lib/i18n";

/** The Celebration — a gold-noded timeline of the days (Mehndi → Nikah → Walima). */
export function Events({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const e = config.events;
  return (
    <section id="events" data-nav="Celebration">
      <div className="shell stack">
        <p className="eyebrow" data-reveal {...bi(e.eyebrow, lang)} />
        <p className="lead" data-reveal {...bi(e.intro, lang)} />
        <ol className="timeline">
          {e.items.map((item, idx) => (
            <li className="tl" data-reveal key={`${item.name.en}-${idx}`}>
              <span className="tl__marker" aria-hidden="true" />
              <p className="tl__name" {...bi(item.name, lang)} />
              <p className="tl__when">
                <span {...bi(item.day, lang)} /> · <span {...bi(item.time, lang)} />
              </p>
              <p className="tl__where" {...bi(item.venue, lang)} />
            </li>
          ))}
        </ol>
        <p className="lead serif-italic" data-reveal {...bi(e.outro, lang)} />
      </div>
    </section>
  );
}
