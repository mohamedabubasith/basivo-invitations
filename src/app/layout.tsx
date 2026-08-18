import type { Metadata, Viewport } from "next";
import { Amiri, Cormorant_Garamond, Jost } from "next/font/google";
import { active } from "@/data/active";
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

export const metadata: Metadata = {
  title: active.config.meta.title,
  description: active.config.meta.description,
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
    <html lang="en" className={`${amiri.variable} ${cormorant.variable} ${jost.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: antiFlash }} />
        {children}
      </body>
    </html>
  );
}
