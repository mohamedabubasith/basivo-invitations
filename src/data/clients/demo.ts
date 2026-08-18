import type { WeddingConfig } from "@/lib/schema";

/**
 * A client's invitation content — the names, dates, and copy live here as DATA
 * only. Nothing in the codebase is named after a couple: to add a client, copy
 * this file under a neutral id (e.g. `client-0042.ts`), edit the values, and
 * point `src/data/active.ts` at it.
 *
 * Photos: drop images in /public/photos and set `photo` on groom/bride.
 */
export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Natheem",
      fullName: "Natheem",
      lineage: "son of Mr. & Mrs. Abdur Rahman",
      role: "The Groom",
      initial: "N",
      // photo: "/photos/groom.jpg",
    },
    bride: {
      firstName: "Ashira",
      fullName: "Ashira",
      lineage: "daughter of Mr. & Mrs. Kamran Siddiqui",
      role: "The Bride",
      initial: "A",
      // photo: "/photos/bride.jpg",
    },
  },

  bismillah: {
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْم",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
  },

  hero: {
    eyebrow: "By the grace of Allah",
    sacredLine: "بِسْمِ اللّٰه",
    leadIn: "are to be wed, inshaAllah",
    leadOut: "and request your presence & your prayers",
    dateLabel: "03 · 01 · 2027",
  },

  invitation: {
    intro: "With hearts full of gratitude to Allah, and together with their beloved families,",
    families: "Mr. & Mrs. Abdur Rahman  &  Mr. & Mrs. Kamran Siddiqui",
    body: "joyfully request the honour of your presence to celebrate the union of their children in the blessed bond of marriage.",
    quote: "“And We created you in pairs.” — Surah An-Naba 78:8",
  },

  verse: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    emphasis: "مَّوَدَّةً وَرَحْمَةً",
    translation:
      "“And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy. Indeed in that are signs for a people who reflect.”",
    reference: "Ar-Rum · 30:21",
  },

  couple_eyebrow: "The Beloved",

  nikah: {
    eyebrow: "The Nikah",
    arabicWord: "نِكَاح",
    dayLabel: "Sunday",
    dateLabel: "3 January 2027",
    time: "Ba’d Ẓuhr · 4:00 in the afternoon",
    venue: {
      name: "Thiruvarur",
      address: "Bus Stop, SH 65, Kattur, Tamil Nadu 610104",
      mapUrl: "https://maps.app.goo.gl/fBJeDk7TkL8XGkFd9",
    },
    note: "Please join us as we begin our journey as husband and wife, in the presence of Allah and our loved ones.",
    countdownTarget: "2027-01-03T16:00:00",
  },

  events: {
    eyebrow: "The Celebration",
    intro: "We would be honoured to share these blessed days with you.",
    items: [
      { name: "Mehndi", day: "Saturday · 2 January", time: "6:00 PM", venue: "The Garden Terrace" },
      { name: "Nikah", day: "Sunday · 3 January", time: "4:00 PM", venue: "Kattur · Thiruvarur" },
      { name: "Walima", day: "Monday · 4 January", time: "7:30 PM", venue: "Noor Banquet Hall" },
    ],
    outro: "Your presence is the greatest gift of all.",
  },

  rsvp: {
    eyebrow: "With love & duʿā",
    duaArabic: "بَارَكَ اللّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْر",
    duaTranslation:
      "“May Allah bless you, and shower His blessings upon you, and unite you both in goodness.”",
    body: "We humbly request the pleasure of your company — and, above all, your heartfelt prayers for our new beginning.",
    email: "rsvp@example.com",
    replyBy: "the 20th of November 2026",
  },

  footer: {
    names: "Natheem & Ashira",
    dateLabel: "03 · 01 · 2027",
    location: "Thiruvarur",
    tagline: "Made with love, in remembrance of Allah",
  },

  meta: {
    title: "Natheem & Ashira — A Wedding Invitation",
    description:
      "With the blessings of Allah, Natheem & Ashira joyfully invite you to their Nikah — Sunday, 3 January 2027.",
    themeColor: "#05130d",
  },
};
