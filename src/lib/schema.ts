import type { LocalizedString } from "./i18n";

/**
 * WeddingConfig — the single typed source of truth for one couple's invitation.
 * A new client = a new file in `src/data/clients/` exporting a WeddingConfig.
 * No field here is design-specific: the same config drives any theme/template.
 *
 * Every field a guest reads is a `LocalizedString` ({ en, ta }) — see `src/lib/i18n.ts`
 * for how it reaches the screen. Fields that aren't language-dependent (photo paths,
 * map links, the countdown target, contact email, Quranic Arabic) stay plain strings.
 */

/** Local datetime string, e.g. "2026-12-12T16:00:00" (parsed with `new Date(...)`). */
export type ISODateTime = string;

export interface Person {
  /** Display first name, used for the grand hero reveal. */
  firstName: LocalizedString;
  /** Full name shown in the couple section. */
  fullName: LocalizedString;
  /** e.g. "son of Mr. & Mrs. Abdur Rahman" */
  lineage: LocalizedString;
  /** e.g. "The Groom" / "The Bride" */
  role: LocalizedString;
  /** Optional path to a photo under /public (e.g. "/photos/groom.jpg"). */
  photo?: string;
  /** Monogram letter shown when no photo is supplied (kept as-is across languages). */
  initial: string;
}

export interface Venue {
  name: LocalizedString;
  address: LocalizedString;
  /** Optional map/directions link (e.g. a Google Maps URL). Shown as a button. */
  mapUrl?: string;
}

export interface EventItem {
  name: LocalizedString;
  /** e.g. "Thursday · 10 December" */
  day: LocalizedString;
  /** e.g. "6:00 PM" */
  time: LocalizedString;
  venue: LocalizedString;
}

export interface QuranVerse {
  /** Quranic Arabic — shared across every language edition, never translated here. */
  arabic: string;
  /** Optional phrase within `arabic` to highlight in the accent colour. */
  emphasis?: string;
  translation: LocalizedString;
  /** e.g. "Ar-Rum · 30:21" — a citation, kept as-is across languages. */
  reference: string;
}

export interface WeddingConfig {
  couple: { groom: Person; bride: Person };
  bismillah: { arabic: string; translation: LocalizedString };
  hero: {
    eyebrow: LocalizedString;
    /** Arabic "Bismillah" calligraphic line — shared across languages. */
    sacredLine: string;
    leadIn: LocalizedString;
    leadOut: LocalizedString;
    dateLabel: LocalizedString;
  };
  invitation: { intro: LocalizedString; families: LocalizedString; body: LocalizedString; quote: LocalizedString };
  verse: QuranVerse;
  couple_eyebrow: LocalizedString;
  nikah: {
    eyebrow: LocalizedString;
    /** Arabic "Nikah" word — shared across languages. */
    arabicWord: string;
    dayLabel: LocalizedString;
    dateLabel: LocalizedString;
    time: LocalizedString;
    venue: Venue;
    note: LocalizedString;
    /** Target for the live countdown. */
    countdownTarget: ISODateTime;
  };
  events: { eyebrow: LocalizedString; intro: LocalizedString; items: EventItem[]; outro: LocalizedString };
  rsvp: {
    eyebrow: LocalizedString;
    /** Arabic duʿā — shared across languages. */
    duaArabic: string;
    duaTranslation: LocalizedString;
    body: LocalizedString;
    email: string;
    /** e.g. "the 20th of November 2026" */
    replyBy: LocalizedString;
  };
  footer: { names: LocalizedString; dateLabel: LocalizedString; location: LocalizedString; tagline: LocalizedString };
  meta: { title: LocalizedString; description: LocalizedString; themeColor: string };
}
