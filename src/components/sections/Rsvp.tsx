import type { WeddingConfig } from "@/lib/schema";
import { bi, biHref, UI, type Lang } from "@/lib/i18n";

const mailto = (email: string, subject: string, body?: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

/** Duʿā & RSVP — gratitude and the closing prayer. */
export function Rsvp({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const r = config.rsvp;
  const acceptEn = mailto(r.email, UI.rsvpSubject.en, UI.rsvpBody.en);
  const acceptTa = mailto(r.email, UI.rsvpSubject.ta, UI.rsvpBody.ta);
  const duaEn = mailto(r.email, UI.duaSubject.en);
  const duaTa = mailto(r.email, UI.duaSubject.ta);

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
        <div className="btns" data-reveal>
          <a className="btn btn--solid" {...biHref(acceptEn, acceptTa, lang)}>
            <span {...bi(UI.acceptWithJoy, lang)} />
          </a>
          <a className="btn" {...biHref(duaEn, duaTa, lang)}>
            <span {...bi(UI.sendDua, lang)} />
          </a>
        </div>
        <p className="rsvp-note" data-reveal>
          <span {...bi(UI.respondBy, lang)} /> <span {...bi(r.replyBy, lang)} />
        </p>
      </div>
    </section>
  );
}
