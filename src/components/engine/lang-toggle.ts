import type { Lang } from "@/lib/i18n";
import type { ThemeFonts } from "@/lib/themes";

/**
 * Wires the EN/த toggle buttons. No React state — a DOM attribute flip, in the
 * same imperative spirit as the motion engine: it swaps `textContent` on every
 * `[data-i18n-en]` node (and `href` on `[data-i18n-href-en]` links), flips
 * `data-lang` on the root + `<html lang>`, and repoints `--ff-display`/`--ff-ui`
 * at the theme's Tamil or English typeface. It never touches layout or replays
 * scroll reveals, so it's safe to fire after the GSAP scene has already settled.
 */
export function setupLangToggle(root: HTMLElement, initial: Lang, fonts: ThemeFonts, onChange?: (lang: Lang) => void) {
  let lang: Lang = initial;

  const apply = () => {
    root.dataset.lang = lang;
    document.documentElement.lang = lang;
    root.style.setProperty("--ff-display", lang === "ta" ? fonts.displayTa : fonts.display);
    root.style.setProperty("--ff-ui", lang === "ta" ? fonts.uiTa : fonts.ui);

    root.querySelectorAll<HTMLElement>("[data-i18n-en]").forEach((el) => {
      const next = lang === "en" ? el.dataset.i18nEn : el.dataset.i18nTa;
      if (next !== undefined) el.textContent = next;
    });
    root.querySelectorAll<HTMLAnchorElement>("[data-i18n-href-en]").forEach((a) => {
      const next = lang === "en" ? a.dataset.i18nHrefEn : a.dataset.i18nHrefTa;
      if (next !== undefined) a.href = next;
    });
    root.querySelectorAll<HTMLButtonElement>("[data-lang-btn]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.langBtn === lang));
    });

    onChange?.(lang);
  };

  const onClick = (e: Event) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-lang-btn]");
    const next = btn?.dataset.langBtn as Lang | undefined;
    if (!next || next === lang) return;
    lang = next;
    apply();
  };

  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-lang-btn]"));
  buttons.forEach((btn) => btn.addEventListener("click", onClick));
  apply();

  return () => buttons.forEach((btn) => btn.removeEventListener("click", onClick));
}
