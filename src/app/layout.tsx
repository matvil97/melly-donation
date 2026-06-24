import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Melly — Faire partie de l'histoire",
  description:
    "Melly répond à son appel : intégrer l'École Pierre à Lyon, école de formation musicale chrétienne. Objectif : 10 950 €.",
  openGraph: {
    title: "Melly — Faire partie de l'histoire",
    description: "Ce n'est pas seulement une histoire de musique. Aujourd'hui, je réponds à l'appel.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
