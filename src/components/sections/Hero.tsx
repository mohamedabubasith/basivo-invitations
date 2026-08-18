import type { WeddingConfig } from "@/lib/schema";
import { bi, UI, type Lang } from "@/lib/i18n";

/** Bismillah / Hero — the opening. Elements fade + rise in a gentle stagger. */
export function Hero({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const { hero, couple } = config;
  return (
    <section id="hero" data-nav="Bismillah">
      <div className="hero__aura" aria-hidden="true" />

      <div className="shell stack scrim" data-pointer="14">
        <p className="hero__bism" dir="rtl" lang="ar" data-hero>
          {hero.sacredLine}
        </p>
        <p className="hero__sub" data-hero {...bi(hero.eyebrow, lang)} />
        <h1 className="hero__names">
          <span className="name" data-hero {...bi(couple.groom.firstName, lang)} />
          <span className="amp" data-hero aria-hidden="true">&amp;</span>
          <span className="name" data-hero {...bi(couple.bride.firstName, lang)} />
        </h1>
        <p className="hero__sub" data-hero {...bi(hero.leadIn, lang)} />
        <div className="divider" data-hero>
          <span className="divider__dot" />
        </div>
        <p className="hero__date" data-hero {...bi(hero.dateLabel, lang)} />
      </div>

      <div className="scrollcue" aria-hidden="true">
        <span {...bi(UI.scroll, lang)} />
        <span className="line" />
      </div>
    </section>
  );
}
