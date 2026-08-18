import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Jost, Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import { active } from "@/data/active";
import { DEFAULT_LANG } from "@/lib/i18n";
import "./globals.css";

// Arabic + calligraphic accents.
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});
// Display / names.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
// UI labels / eyebrows (variable font).
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});
// Display / names — Tamil. A proper Tamil webfont (correct conjunct/vowel-sign
// shaping) instead of relying on whatever the OS happens to substitute.
const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif-tamil",
  display: "swap",
});
// UI labels / eyebrows — Tamil.
const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["300", "400", "500"],
  variable: "--font-noto-sans-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: active.config.meta.title[DEFAULT_LANG],
  description: active.config.meta.description[DEFAULT_LANG],
};

export const viewport: Viewport = {
  themeColor: active.config.meta.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Pre-hydration: hide reveal targets while motion is possible, with a hard
// failsafe (5s) so content always appears even if the engine never boots.
const antiFlash = `(function(){var d=document.documentElement;var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r){d.classList.add('anim');}window.__wedSafety=setTimeout(function(){d.classList.remove('anim');},5000);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={DEFAULT_LANG}
      className={`${amiri.variable} ${cormorant.variable} ${jost.variable} ${notoSerifTamil.variable} ${notoSansTamil.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: antiFlash }} />
        {children}
      </body>
    </html>
  );
}
