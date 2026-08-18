import type { FC } from "react";
import type { WeddingConfig } from "@/lib/schema";
import type { SectionKey } from "@/lib/templates/types";
import type { Lang, LocalizedString } from "@/lib/i18n";
import { Hero } from "./Hero";
import { Invitation } from "./Invitation";
import { Verse } from "./Verse";
import { Couple } from "./Couple";
import { Nikah } from "./Nikah";
import { Events } from "./Events";
import { Rsvp } from "./Rsvp";
import { Footer } from "./Footer";

/** Section key → component. A template arranges these in order. */
export const SECTION_REGISTRY: Record<SectionKey, FC<{ config: WeddingConfig; lang: Lang }>> = {
  hero: Hero,
  invitation: Invitation,
  verse: Verse,
  couple: Couple,
  nikah: Nikah,
  events: Events,
  rsvp: Rsvp,
  footer: Footer,
};

/** Sections that appear as side nav-dots (footer is intentionally omitted). */
export const NAV_LABELS: Partial<Record<SectionKey, LocalizedString>> = {
  hero: { en: "Bismillah", ta: "பிஸ்மில்லாஹ்" },
  invitation: { en: "Invitation", ta: "அழைப்பிதழ்" },
  verse: { en: "A Verse", ta: "வசனம்" },
  couple: { en: "The Couple", ta: "இணையர்" },
  nikah: { en: "The Nikah", ta: "நிக்காஹ்" },
  events: { en: "Celebration", ta: "கொண்டாட்டம்" },
  rsvp: { en: "Duʿā & RSVP", ta: "துஆ & RSVP" },
};
