import type { WeddingConfig } from "@/lib/schema";

/** The Celebration — a gold-noded timeline of the days (Mehndi → Nikah → Walima). */
export function Events({ config }: { config: WeddingConfig }) {
  const e = config.events;
  return (
    <section id="events" data-nav="Celebration">
      <div className="shell stack">
        <p className="eyebrow" data-reveal>
          {e.eyebrow}
        </p>
        <p className="lead" data-reveal>
          {e.intro}
        </p>
        <ol className="timeline">
          {e.items.map((item, idx) => (
            <li className="tl" data-reveal key={`${item.name}-${idx}`}>
              <span className="tl__marker" aria-hidden="true" />
              <p className="tl__name">{item.name}</p>
              <p className="tl__when">
                {item.day} · {item.time}
              </p>
              <p className="tl__where">{item.venue}</p>
            </li>
          ))}
        </ol>
        <p className="lead serif-italic" data-reveal>
          {e.outro}
        </p>
      </div>
    </section>
  );
}
