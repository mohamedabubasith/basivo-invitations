import type { WeddingConfig } from "@/lib/schema";
import { bi, type Lang } from "@/lib/i18n";

/** Closing flourish. */
export function Footer({ config, lang }: { config: WeddingConfig; lang: Lang }) {
  const f = config.footer;
  return (
    <footer id="footer">
      <div className="shell stack scrim">
        <div className="divider" aria-hidden="true">
          <span className="divider__dot" />
        </div>
        <p className="footer-names" data-reveal {...bi(f.names, lang)} />
        <p className="footer-meta" data-reveal>
          <span {...bi(f.dateLabel, lang)} /> · <span {...bi(f.location, lang)} />
        </p>
        <p className="footer-meta" data-reveal {...bi(f.tagline, lang)} />
      </div>
    </footer>
  );
}
