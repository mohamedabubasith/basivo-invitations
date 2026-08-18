import type { WeddingConfig } from "@/lib/schema";

/** Bismillah / Hero — the opening. Elements fade + rise in a gentle stagger. */
export function Hero({ config }: { config: WeddingConfig }) {
  const { hero, couple } = config;
  return (
    <section id="hero" data-nav="Bismillah">
      <div className="hero__aura" aria-hidden="true" />

      <div className="shell stack scrim" data-pointer="14">
        <p className="hero__bism" dir="rtl" lang="ar" data-hero>
          {hero.sacredLine}
        </p>
        <p className="hero__sub" data-hero>
          {hero.eyebrow}
        </p>
        <h1 className="hero__names">
          <span className="name" data-hero>{couple.groom.firstName}</span>
          <span className="amp" data-hero aria-hidden="true">&amp;</span>
          <span className="name" data-hero>{couple.bride.firstName}</span>
        </h1>
        <p className="hero__sub" data-hero>
          {hero.leadIn}
        </p>
        <div className="divider" data-hero>
          <span className="divider__dot" />
        </div>
        <p className="hero__date" data-hero>
          {hero.dateLabel}
        </p>
      </div>

      <div className="scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
