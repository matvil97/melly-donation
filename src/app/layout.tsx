import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melly — Faire partie de l'histoire",
  description:
    "Je réponds à l'appel : intégrer l'École Pierre à Lyon, école de formation musicale chrétienne. Objectif : 10 950 €.",
  openGraph: {
    title: "Melly — Faire partie de l'histoire",
    description: "Ce n'est pas seulement une histoire de musique. Aujourd'hui, je réponds à l'appel.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0908",
  // Le site s'étend sous la barre d'état et la barre Safari : env(safe-area-inset-*) devient utilisable
  viewportFit: "cover",
};

// Couleur de la barre d'état / de Safari, alignée sur le thème (sinon reste sombre en mode clair)
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;
var c=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",document.documentElement.dataset.theme==="light"?"#F8F3EB":"#0A0908")};
c();document.addEventListener("DOMContentLoaded",c)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Applique le thème mémorisé avant le premier affichage (évite le flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body className="grain font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
