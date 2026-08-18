import type { WeddingConfig } from "@/lib/schema";

/**
 * A client's invitation content — the names, dates, and copy live here as DATA
 * only. Nothing in the codebase is named after a couple: to add a client, copy
 * this file under a neutral id (e.g. `client-0042.ts`), edit the values, and
 * point `src/data/active.ts` at it.
 *
 * Every guest-facing field is `{ en, ta }` (see `src/lib/schema.ts`). The Tamil
 * text below is a good-faith translation — have a Tamil-fluent family member
 * proofread it (especially the du'ā/verse wording) before sending invites.
 *
 * Photos: drop images in /public/photos and set `photo` on groom/bride.
 */
export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: { en: "Natheem", ta: "நதீம்" },
      fullName: { en: "Natheem", ta: "நதீம்" },
      lineage: { en: "son of Mr. & Mrs. Abdur Rahman", ta: "திரு. & திருமதி. அப்துர் ரஹ்மான் அவர்களின் புதல்வர்" },
      role: { en: "The Groom", ta: "மணமகன்" },
      initial: "N",
      // photo: "/photos/groom.jpg",
    },
    bride: {
      firstName: { en: "Ashira", ta: "ஆஷிரா" },
      fullName: { en: "Ashira", ta: "ஆஷிரா" },
      lineage: { en: "daughter of Mr. & Mrs. Kamran Siddiqui", ta: "திரு. & திருமதி. கம்ரான் சித்திகி அவர்களின் புதல்வி" },
      role: { en: "The Bride", ta: "மணமகள்" },
      initial: "A",
      // photo: "/photos/bride.jpg",
    },
  },

  bismillah: {
    arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْم",
    translation: {
      en: "In the name of Allah, the Most Gracious, the Most Merciful",
      ta: "அருளாளனும் அன்புடையோனுமாகிய அல்லாஹ்வின் திருப்பெயரால்",
    },
  },

  hero: {
    eyebrow: { en: "By the grace of Allah", ta: "அல்லாஹ்வின் அருளால்" },
    sacredLine: "بِسْمِ اللّٰه",
    leadIn: { en: "are to be wed, inshaAllah", ta: "இன்ஷா அல்லாஹ், திருமணம் புரிகின்றனர்" },
    leadOut: {
      en: "and request your presence & your prayers",
      ta: "தங்களது வருகையையும் பிரார்த்தனைகளையும் அன்புடன் வேண்டுகின்றனர்",
    },
    dateLabel: { en: "03 · 01 · 2027", ta: "03 · 01 · 2027" },
  },

  invitation: {
    intro: {
      en: "With hearts full of gratitude to Allah, and together with their beloved families,",
      ta: "அல்லாஹ்வுக்கு நன்றி நிறைந்த உள்ளத்துடன், அன்பு நிறை குடும்பங்களுடன் இணைந்து,",
    },
    families: {
      en: "Mr. & Mrs. Abdur Rahman  &  Mr. & Mrs. Kamran Siddiqui",
      ta: "திரு. & திருமதி. அப்துர் ரஹ்மான்  &  திரு. & திருமதி. கம்ரான் சித்திகி",
    },
    body: {
      en: "joyfully request the honour of your presence to celebrate the union of their children in the blessed bond of marriage.",
      ta: "தங்கள் பிள்ளைகளின் புனிதமான திருமணப் பந்தத்தைக் கொண்டாட, தங்களது கண்ணியமான வருகையை மகிழ்ச்சியுடன் வேண்டுகின்றனர்.",
    },
    quote: {
      en: "“And We created you in pairs.” — Surah An-Naba 78:8",
      ta: "“நாமே உங்களை ஜோடி ஜோடியாகப் படைத்தோம்.” — சூரா அந்நபா 78:8",
    },
  },

  verse: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    emphasis: "مَّوَدَّةً وَرَحْمَةً",
    translation: {
      en: "“And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy. Indeed in that are signs for a people who reflect.”",
      ta: "“அவனுடைய அத்தாட்சிகளில் ஒன்று: நீங்கள் அமைதி பெறுவதற்காக உங்களிலிருந்தே உங்களுக்குத் துணைவியரைப் படைத்தான்; மேலும் உங்களிடையே அன்பையும் கருணையையும் ஏற்படுத்தினான். சிந்திக்கின்ற மக்களுக்கு நிச்சயமாக இதில் அத்தாட்சிகள் உள்ளன.”",
    },
    reference: "Ar-Rum · 30:21",
  },

  couple_eyebrow: { en: "The Beloved", ta: "அன்பார்ந்தோர்" },

  nikah: {
    eyebrow: { en: "The Nikah", ta: "நிக்காஹ்" },
    arabicWord: "نِكَاح",
    dayLabel: { en: "Sunday", ta: "ஞாயிறு" },
    dateLabel: { en: "3 January 2027", ta: "3 ஜனவரி 2027" },
    time: { en: "Ba’d Ẓuhr · 4:00 in the afternoon", ta: "லுஹர் தொழுகைக்குப் பின் · மதியம் 4:00 மணி" },
    venue: {
      name: { en: "Thiruvarur", ta: "திருவாரூர்" },
      address: {
        en: "Bus Stop, SH 65, Kattur, Tamil Nadu 610104",
        ta: "பேருந்து நிலையம், மாநில நெடுஞ்சாலை 65, கட்டூர், தமிழ்நாடு 610104",
      },
      mapUrl: "https://maps.app.goo.gl/fBJeDk7TkL8XGkFd9",
    },
    note: {
      en: "Please join us as we begin our journey as husband and wife, in the presence of Allah and our loved ones.",
      ta: "அல்லாஹ்வின் சமூகத்திலும், நேசிப்போரின் முன்னிலையிலும், கணவன்-மனைவியாக எங்கள் புதிய பயணத்தைத் தொடங்கும் இத்தருணத்தில் தங்களையும் இணைந்துகொள்ள அன்புடன் அழைக்கிறோம்.",
    },
    countdownTarget: "2027-01-03T16:00:00",
  },

  events: {
    eyebrow: { en: "The Celebration", ta: "கொண்டாட்டம்" },
    intro: {
      en: "We would be honoured to share these blessed days with you.",
      ta: "இந்த அருள்மிகு நாட்களை தங்களுடன் பகிர்ந்துகொள்வதில் பெருமையடைகிறோம்.",
    },
    items: [
      {
        name: { en: "Mehndi", ta: "மெஹந்தி" },
        day: { en: "Saturday · 2 January", ta: "சனிக்கிழமை · 2 ஜனவரி" },
        time: { en: "6:00 PM", ta: "மாலை 6:00" },
        venue: { en: "The Garden Terrace", ta: "தி கார்டன் டெரஸ்" },
      },
      {
        name: { en: "Nikah", ta: "நிக்காஹ்" },
        day: { en: "Sunday · 3 January", ta: "ஞாயிறு · 3 ஜனவரி" },
        time: { en: "4:00 PM", ta: "மதியம் 4:00" },
        venue: { en: "Kattur · Thiruvarur", ta: "கட்டூர் · திருவாரூர்" },
      },
      {
        name: { en: "Walima", ta: "வலீமா" },
        day: { en: "Monday · 4 January", ta: "திங்கள் · 4 ஜனவரி" },
        time: { en: "7:30 PM", ta: "இரவு 7:30" },
        venue: { en: "Noor Banquet Hall", ta: "நூர் விருந்தினர் மண்டபம்" },
      },
    ],
    outro: { en: "Your presence is the greatest gift of all.", ta: "தங்களது வருகையே எங்களுக்கு மிகப்பெரிய பரிசு." },
  },

  rsvp: {
    eyebrow: { en: "With love & duʿā", ta: "அன்புடனும் துஆவுடனும்" },
    duaArabic: "بَارَكَ اللّٰهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْر",
    duaTranslation: {
      en: "“May Allah bless you, and shower His blessings upon you, and unite you both in goodness.”",
      ta: "“அல்லாஹ் உங்கள் இருவரையும் ஆசீர்வதிப்பானாக, தன் அருளை உங்கள் மீது பொழிவானாக, நன்மையில் உங்களை ஒன்றிணைப்பானாக.”",
    },
    body: {
      en: "We humbly request the pleasure of your company — and, above all, your heartfelt prayers for our new beginning.",
      ta: "தங்களது உடனிருப்பையும், அதைவிட மேலாக, எங்கள் புதிய பயணத்திற்கான தங்களது மனமார்ந்த பிரார்த்தனைகளையும் பணிவுடன் வேண்டுகிறோம்.",
    },
    email: "rsvp@example.com",
    replyBy: { en: "the 20th of November 2026", ta: "நவம்பர் 20, 2026 க்குள்" },
  },

  footer: {
    names: { en: "Natheem & Ashira", ta: "நதீம் & ஆஷிரா" },
    dateLabel: { en: "03 · 01 · 2027", ta: "03 · 01 · 2027" },
    location: { en: "Thiruvarur", ta: "திருவாரூர்" },
    tagline: { en: "Made with love, in remembrance of Allah", ta: "அல்லாஹ்வின் நினைவுடன், அன்புடன் உருவாக்கப்பட்டது" },
  },

  meta: {
    title: { en: "Natheem & Ashira — A Wedding Invitation", ta: "நதீம் & ஆஷிரா — திருமண அழைப்பிதழ்" },
    description: {
      en: "With the blessings of Allah, Natheem & Ashira joyfully invite you to their Nikah — Sunday, 3 January 2027.",
      ta: "அல்லாஹ்வின் அருளுடன், நதீம் & ஆஷிரா தங்கள் நிக்காஹ் விழாவிற்கு தங்களை அன்புடன் அழைக்கின்றனர் — ஞாயிறு, 3 ஜனவரி 2027.",
    },
    themeColor: "#05130d",
  },
};
