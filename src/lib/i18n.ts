/**
 * Studio-level language plumbing. A Theme is the look; this is the *language* —
 * every couple's WeddingConfig carries English + Tamil text per field (see
 * schema.ts's `LocalizedString`), and this file supplies the mechanism that
 * puts one of them on screen.
 *
 * The toggle is a DOM attribute flip, not React state (same imperative spirit
 * as the motion engine): `bi()` renders the default-language string as real
 * SSR'd text and stashes both languages as `data-i18n-en` / `data-i18n-ta`
 * attributes; `setupLangToggle` (engine/lang-toggle.ts) swaps `textContent`
 * on click. This keeps the static export single-pass and never re-triggers
 * scroll reveals or SplitText.
 */
export type Lang = "en" | "ta";

export interface LocalizedString {
  en: string;
  ta: string;
}

/** The language shown on first paint (and baked into the static HTML). */
export const DEFAULT_LANG: Lang = "ta";

/** Spread onto the element carrying a localized text node. */
export function bi(s: LocalizedString, lang: Lang) {
  return { children: s[lang], "data-i18n-en": s.en, "data-i18n-ta": s.ta };
}

/**
 * Fixed chrome text — the same in every client's invitation, so it lives here
 * rather than in a WeddingConfig. Never bake couple-specific copy into this file.
 */
export const UI = {
  invitationEyebrow: { en: "The Invitation", ta: "அழைப்பிதழ்" },
  scroll: { en: "Scroll", ta: "கீழே இழுக்கவும்" },
  directions: { en: "Get directions", ta: "வழிகாட்டி பெற" },
  countdownLabel: { en: "Time remaining until the Nikah", ta: "நிக்காஹ்வுக்கு மீதமுள்ள நேரம்" },
  days: { en: "Days", ta: "நாட்கள்" },
  hours: { en: "Hours", ta: "மணி" },
  minutes: { en: "Minutes", ta: "நிமிடம்" },
  seconds: { en: "Seconds", ta: "வினாடி" },
  respondBy: { en: "Kindly respond by", ta: "தயவுசெய்து இதற்குள் பதிலளிக்கவும்" },
  navLabel: { en: "Section navigation", ta: "பிரிவு வழிசெலுத்தல்" },
  languageGroupLabel: { en: "Language", ta: "மொழி" },
} satisfies Record<string, LocalizedString>;
