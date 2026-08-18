/**
 * WeddingConfig — the single typed source of truth for one couple's invitation.
 * A new client = a new file in `src/data/clients/` exporting a WeddingConfig.
 * No field here is design-specific: the same config drives any theme/template.
 */

/** Local datetime string, e.g. "2026-12-12T16:00:00" (parsed with `new Date(...)`). */
export type ISODateTime = string;

export interface Person {
  /** Display first name, used for the grand hero reveal. */
  firstName: string;
  /** Full name shown in the couple section. */
  fullName: string;
  /** e.g. "son of Mr. & Mrs. Abdur Rahman" */
  lineage: string;
  /** e.g. "The Groom" / "The Bride" */
  role: string;
  /** Optional path to a photo under /public (e.g. "/photos/groom.jpg"). */
  photo?: string;
  /** Monogram letter shown when no photo is supplied. */
  initial: string;
}

export interface Venue {
  name: string;
  address: string;
  /** Optional map/directions link (e.g. a Google Maps URL). Shown as a button. */
  mapUrl?: string;
}

export interface EventItem {
  name: string;
  /** e.g. "Thursday · 10 December" */
  day: string;
  /** e.g. "6:00 PM" */
  time: string;
  venue: string;
}

export interface QuranVerse {
  arabic: string;
  /** Optional phrase within `arabic` to highlight in the accent colour. */
  emphasis?: string;
  translation: string;
  /** e.g. "Ar-Rum · 30:21" */
  reference: string;
}

export interface WeddingConfig {
  couple: { groom: Person; bride: Person };
  bismillah: { arabic: string; translation: string };
  hero: { eyebrow: string; sacredLine: string; leadIn: string; leadOut: string; dateLabel: string };
  invitation: { intro: string; families: string; body: string; quote: string };
  verse: QuranVerse;
  couple_eyebrow: string;
  nikah: {
    eyebrow: string;
    arabicWord: string;
    dayLabel: string;
    dateLabel: string;
    time: string;
    venue: Venue;
    note: string;
    /** Target for the live countdown. */
    countdownTarget: ISODateTime;
  };
  events: { eyebrow: string; intro: string; items: EventItem[]; outro: string };
  rsvp: {
    eyebrow: string;
    duaArabic: string;
    duaTranslation: string;
    body: string;
    email: string;
    /** e.g. "the 20th of November 2026" */
    replyBy: string;
  };
  footer: { names: string; dateLabel: string; location: string; tagline: string };
  meta: { title: string; description: string; themeColor: string };
}
