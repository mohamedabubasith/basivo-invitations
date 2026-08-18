import type { WeddingConfig } from "@/lib/schema";
import { Countdown } from "../engine/Countdown";

/** The Nikah — the jewel. An elegant mihrab arch draws on to frame the date. */
export function Nikah({ config }: { config: WeddingConfig }) {
  const n = config.nikah;
  return (
    <section id="nikah" data-nav="The Nikah">
      <div className="nikah__glow" data-parallax="-40" aria-hidden="true" />
      <div className="shell stack">
        <p className="eyebrow" data-reveal>
          {n.eyebrow}
        </p>

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
              {n.dayLabel}
              <span>{n.dateLabel}</span>
            </h2>
            <p className="nikah__time" data-reveal>
              {n.time}
            </p>
          </div>
        </div>

        <div className="stack" data-reveal>
          <p className="nikah__venue-name">{n.venue.name}</p>
          <p className="nikah__venue-addr">{n.venue.address}</p>
          {n.venue.mapUrl && (
            <a className="map-link" href={n.venue.mapUrl} target="_blank" rel="noopener noreferrer">
              Get directions
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>

        <div data-reveal>
          <Countdown target={n.countdownTarget} label="Time remaining until the Nikah" />
        </div>

        <p className="nikah__note" data-reveal>
          {n.note}
        </p>
      </div>
    </section>
  );
}
