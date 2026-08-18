import type { FC } from "react";
import type { WeddingConfig } from "@/lib/schema";
import type { SectionKey } from "@/lib/templates/types";
import { Hero } from "./Hero";
import { Invitation } from "./Invitation";
import { Verse } from "./Verse";
import { Couple } from "./Couple";
import { Nikah } from "./Nikah";
import { Events } from "./Events";
import { Rsvp } from "./Rsvp";
import { Footer } from "./Footer";

/** Section key → component. A template arranges these in order. */
export const SECTION_REGISTRY: Record<SectionKey, FC<{ config: WeddingConfig }>> = {
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
export const NAV_LABELS: Partial<Record<SectionKey, string>> = {
  hero: "Bismillah",
  invitation: "Invitation",
  verse: "A Verse",
  couple: "The Couple",
  nikah: "The Nikah",
  events: "Celebration",
  rsvp: "Duʿā & RSVP",
};
