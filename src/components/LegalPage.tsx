import Nav from "./Nav";
import Footer from "./Footer";

// Gabarit commun des pages légales (mentions, CGU, confidentialité)
export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <section className="relative px-5 md:px-8 pt-36 md:pt-44 pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[30rem] w-[50rem] rounded-full bg-gold/10 blur-[160px]" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto animate-fade-in">
          <span className="text-[12px] uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5rem)] leading-[1] tracking-[-0.02em] mt-5">{title}</h1>
          <p className="mt-4 text-sm text-bone-faint">Dernière mise à jour : {updated}</p>
          <div
            className="mt-14 space-y-10 text-bone-muted font-light leading-relaxed
                       [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-bone [&_h2]:mb-4
                       [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5
                       [&_a]:text-gold-light [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-bone [&_strong]:font-normal"
          >
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
