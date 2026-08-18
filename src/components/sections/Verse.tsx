import type { ReactNode } from "react";
import type { WeddingConfig } from "@/lib/schema";

/** Highlight an optional phrase inside the Arabic without splitting ligatures. */
function withEmphasis(arabic: string, emphasis?: string): ReactNode {
  if (!emphasis) return arabic;
  const idx = arabic.indexOf(emphasis);
  if (idx === -1) return arabic;
  return (
    <>
      {arabic.slice(0, idx)}
      <span className="em">{emphasis}</span>
      {arabic.slice(idx + emphasis.length)}
    </>
  );
}

/** The Verse — the emotional core (Ar-Rum 30:21). Pinned on desktop. */
export function Verse({ config }: { config: WeddingConfig }) {
  const v = config.verse;
  return (
    <section id="verse" data-nav="A Verse">
      <div className="verse__inner scrim">
        <p className="eyebrow" data-reveal>
          {v.reference}
        </p>
        {/* Arabic: scale reveal only — never char-split (breaks connected letters). */}
        <p className="verse__ar" dir="rtl" lang="ar" data-reveal="scale">
          {withEmphasis(v.arabic, v.emphasis)}
        </p>
        <svg className="verse__uline" viewBox="0 0 340 14" fill="none" data-draw aria-hidden="true">
          <path d="M2 7 Q85 1 170 7 T338 7" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <p className="verse__tr" data-reveal="words">
          {v.translation}
        </p>
      </div>
    </section>
  );
}
