import type { WeddingConfig } from "@/lib/schema";
import { bi, UI, type Lang } from "@/lib/i18n";
import { Countdown } from "../engine/Countdown";

/** The Nikah — the jewel. An elegant mihrab arch draws on to frame the date. */
export function Nikah({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const n = config.nikah;
  return (
    <section id="nikah" data-nav="The Nikah">
      <div className="nikah__glow" data-parallax="-40" aria-hidden="true" />
      <div className="shell stack">
        <p className="eyebrow" data-reveal {...bi(n.eyebrow, lang)} />

        <div className="nikah__stage">
          <svg className="nikah__arch" viewBox="0 0 300 440" fill="none" data-draw-medallion aria-hidden="true">
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M55 438 L55 176 Q58 70 150 26 Q242 70 245 176 L245 438" strokeWidth="1.1" />
              <path d="M80 438 L80 190 Q84 98 150 58 Q216 98 220 190 L220 438" strokeWidth="0.9" opacity="0.5" />
              <path d="M150 8 L159 24 L150 40 L141 24 Z" strokeWidth="1.1" />
            </g>
          </svg>

          <div className="nikah__center stack">
            <p className="nikah__ar" dir="rtl" lang="ar" data-reveal="scale">
              {n.arabicWord}
            </p>
            <h2 className="nikah__date" data-reveal="scale">
              <span className="nikah__date-day" {...bi(n.dayLabel, lang)} />
              <span {...bi(n.dateLabel, lang)} />
            </h2>
            <p className="nikah__time" data-reveal {...bi(n.time, lang)} />
          </div>
        </div>

        <div className="stack" data-reveal>
          <p className="nikah__venue-name" {...bi(n.venue.name, lang)} />
          <p className="nikah__venue-addr" {...bi(n.venue.address, lang)} />
          {n.venue.mapUrl && (
            <a
              className="btn"
              href={n.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              {...bi(UI.directions, lang)}
            />
          )}
        </div>

        <div data-reveal>
          <Countdown target={n.countdownTarget} lang={lang} />
        </div>

        <p className="nikah__note" data-reveal {...bi(n.note, lang)} />
      </div>
    </section>
  );
}
