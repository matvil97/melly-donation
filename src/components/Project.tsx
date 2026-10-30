import Reveal from "./Reveal";

const SKILLS = ["Technique vocale", "Compétences musicales", "Composition", "MAO", "Service & louange"];

export default function Project() {
  return (
    <section id="projet" className="relative py-28 md:py-40 px-5 md:px-8 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <span className="text-[12px] uppercase tracking-[0.3em] text-gold">03 — Mon projet</span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.02em] mt-6">
              L&apos;École <span className="italic text-gradient-gold">Pierre.</span>
            </h2>
          </div>
          <p className="max-w-sm text-bone-muted font-light leading-relaxed">
            École créative, communication, audiovisuelle et musique — j&apos;y serai à Lyon, de septembre 2026 à juin 2027.
          </p>
        </Reveal>

        {/* Bento */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Intro */}
          <Reveal className="md:col-span-4">
            <div className="h-full rounded-[2rem] glass p-8 md:p-10">
              <p className="text-xl md:text-2xl leading-relaxed text-bone font-light">
                À la rentrée prochaine, j&apos;aurai l&apos;immense privilège d&apos;intégrer l&apos;École Pierre, une école
                chrétienne dédiée à la formation créative dans la communication et la musique.
              </p>
              <p className="mt-6 text-bone-muted leading-relaxed">
                Cette année représente bien plus qu&apos;une formation : c&apos;est une opportunité de grandir
                artistiquement et surtout avec le Seigneur.
              </p>
            </div>
          </Reveal>

          {/* Objectif */}
          <Reveal className="md:col-span-2" delay={100}>
            <div className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-gold p-8 text-ink flex flex-col justify-between min-h-[260px]">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[rgba(255,255,255,0.3)] blur-2xl" />
              <span className="relative text-[12px] uppercase tracking-[0.25em] font-semibold opacity-70">Objectif</span>
              <div className="relative">
                <div className="font-display text-6xl md:text-7xl leading-none">10 950 €</div>
                <div className="mt-3 text-sm font-medium opacity-75">sept. 2026 – juin 2027</div>
              </div>
            </div>
          </Reveal>

          {/* Budget */}
          <Reveal className="md:col-span-2">
            <div className="h-full rounded-[2rem] glass p-8">
              <span className="text-[12px] uppercase tracking-[0.25em] text-bone-faint">Scolarité</span>
              <div className="mt-4 font-display text-5xl text-bone">
                650 €<span className="text-lg text-bone-muted font-sans font-light"> /mois</span>
              </div>
              <div className="my-6 h-px bg-line" />
              <span className="text-[12px] uppercase tracking-[0.25em] text-bone-faint">Logement</span>
              <div className="mt-4 font-display text-5xl text-bone">
                450 €<span className="text-lg text-bone-muted font-sans font-light"> /mois</span>
              </div>
            </div>
          </Reveal>

          {/* Ce que j'y apprendrai */}
          <Reveal className="md:col-span-4" delay={100}>
            <div className="h-full rounded-[2rem] glass p-8 md:p-10">
              <span className="text-[12px] uppercase tracking-[0.25em] text-bone-faint">Ce que j&apos;y apprendrai</span>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {SKILLS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold-light"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-bone-muted leading-relaxed">
                J&apos;y développerai ma technique vocale, mes compétences musicales, j&apos;apprendrai la composition,
                la musique assistée par ordinateur (MAO) et approfondirai ma compréhension du service à travers la
                louange. Mon désir est de revenir équipée pour servir avec davantage de justesse, de créativité et
                d&apos;excellence, que ce soit dans mon église, auprès d&apos;autres communautés ou, si Dieu le permet, à
                travers de futurs projets musicaux.
              </p>
            </div>
          </Reveal>

          {/* Carte */}
          <Reveal className="md:col-span-3">
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              <iframe
                title="École Pierre Lyon"
                src="https://maps.google.com/maps?q=ecole+pierre+lyon&output=embed"
                className="map-tint absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs text-bone">
                <svg width="12" height="14" viewBox="0 0 24 28" fill="none" className="text-gold" aria-hidden="true">
                  <path d="M12 27s10-8.6 10-16a10 10 0 10-20 0c0 7.4 10 16 10 16z" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="12" cy="11" r="3.5" fill="currentColor" />
                </svg>
                Lyon, France
              </div>
            </div>
          </Reveal>

          {/* Prière / partage */}
          <Reveal className="md:col-span-3" delay={100}>
            <div className="h-full rounded-[2rem] glass p-8 md:p-10 flex flex-col justify-between gap-8">
              <p className="font-display italic text-3xl leading-tight text-bone">
                Si vous ne pouvez pas participer financièrement, vos prières, vos encouragements et le simple fait de
                partager cette cagnotte sont déjà un précieux soutien.
              </p>
              <div>
                <p className="text-bone-muted leading-relaxed">
                  Merci du fond du cœur de croire en ce projet et de choisir, peut-être, d&apos;en faire un peu partie.
                </p>
                <a
                  href="#donation"
                  className="group mt-4 inline-flex items-center gap-2 py-2.5 text-gold-light text-sm font-medium"
                >
                  Je veux te soutenir
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M3 8h10m0 0L9 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
