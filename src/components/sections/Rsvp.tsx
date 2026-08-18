import type { WeddingConfig } from "@/lib/schema";
import { bi, UI, type Lang } from "@/lib/i18n";

/** Duʿā & RSVP — gratitude and the closing prayer. */
export function Rsvp({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const r = config.rsvp;

  return (
    <section id="rsvp" data-nav="Duʿā & RSVP">
      <div className="shell stack scrim">
        <p className="eyebrow" data-reveal {...bi(r.eyebrow, lang)} />
        <p className="dua-ar" dir="rtl" lang="ar" data-reveal="scale">
          {r.duaArabic}
        </p>
        <p className="dua-tr" data-reveal="words" {...bi(r.duaTranslation, lang)} />
        <div className="divider" data-reveal>
          <span className="divider__dot" />
        </div>
        <p className="lead" data-reveal {...bi(r.body, lang)} />
        <p className="rsvp-note" data-reveal>
          <span {...bi(UI.respondBy, lang)} /> <span {...bi(r.replyBy, lang)} />
        </p>
      </div>
    </section>
  );
}
