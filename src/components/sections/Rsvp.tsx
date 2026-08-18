import type { WeddingConfig } from "@/lib/schema";

/** Duʿā & RSVP — gratitude and the closing prayer. */
export function Rsvp({ config }: { config: WeddingConfig }) {
  const r = config.rsvp;
  const accept = `mailto:${r.email}?subject=${encodeURIComponent("RSVP — Wedding Invitation")}&body=${encodeURIComponent(
    "With joy, we will attend.\n\nName(s): ___\nNumber of guests: ___",
  )}`;
  const dua = `mailto:${r.email}?subject=${encodeURIComponent("With our duʿā — Wedding Invitation")}`;

  return (
    <section id="rsvp" data-nav="Duʿā & RSVP">
      <div className="shell stack scrim">
        <p className="eyebrow" data-reveal>
          {r.eyebrow}
        </p>
        <p className="dua-ar" dir="rtl" lang="ar" data-reveal="scale">
          {r.duaArabic}
        </p>
        <p className="dua-tr" data-reveal="words">
          {r.duaTranslation}
        </p>
        <div className="divider" data-reveal>
          <span className="divider__dot" />
        </div>
        <p className="lead" data-reveal>
          {r.body}
        </p>
        <div className="btns" data-reveal>
          <a className="btn btn--solid" href={accept}>
            Accept with joy
          </a>
          <a className="btn" href={dua}>
            Send our du&#699;ā
          </a>
        </div>
        <p className="rsvp-note" data-reveal>
          Kindly respond by {r.replyBy}
        </p>
      </div>
    </section>
  );
}
