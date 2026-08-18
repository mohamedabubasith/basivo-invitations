import type { WeddingConfig } from "@/lib/schema";

/** Closing flourish. */
export function Footer({ config }: { config: WeddingConfig }) {
  const f = config.footer;
  return (
    <footer id="footer">
      <div className="shell stack scrim">
        <div className="divider" aria-hidden="true">
          <span className="divider__dot" />
        </div>
        <p className="footer-names" data-reveal>
          {f.names}
        </p>
        <p className="footer-meta" data-reveal>
          {f.dateLabel} · {f.location}
        </p>
        <p className="footer-meta" data-reveal>
          {f.tagline}
        </p>
      </div>
    </footer>
  );
}
