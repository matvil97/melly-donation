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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Applique le thème mémorisé avant le premier affichage (évite le flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="grain font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
