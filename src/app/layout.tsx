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
  title: "Melly Malonga — Soutenez son rêve",
  description:
    "Aidez Melly à réaliser son rêve : intégrer l'École Pierre, école de chant à Lyon. Objectif : 10 000 €. Chaque don compte.",
  openGraph: {
    title: "Melly Malonga — Soutenez son rêve",
    description: "Sa voix mérite d'être entendue. Aidez-la à intégrer l'École Pierre à Lyon.",
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
