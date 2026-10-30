import Reveal from "./Reveal";
import StoryGallery from "./StoryGallery";

export default function Story() {
  return (
    <section id="story" className="relative py-28 md:py-40 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20">
        {/* Titre sticky */}
        <div>
          <Reveal className="lg:sticky lg:top-32">
            <span className="text-[12px] uppercase tracking-[0.3em] text-gold">02 — Mon histoire</span>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] tracking-[-0.02em] mt-6">
              Un cœur
              <br />
              <span className="italic text-gradient-gold">pour servir.</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Pulse Mâcon", "Day and Night", "Louange en église"].map((t) => (
                <span key={t} className="rounded-full glass px-4 py-2 text-[13px] text-bone-muted">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Texte */}
        <div className="space-y-8 text-[17px] md:text-lg leading-[1.85] text-bone-muted font-light">
          <Reveal>
            <p className="text-2xl md:text-[1.7rem] leading-snug text-bone font-normal">
              La musique a toujours fait partie de ma vie. Depuis mon enfance, elle accompagne mes souvenirs
              les plus précieux, les moments de joie comme les temps plus difficiles.
            </p>
          </Reveal>
          <Reveal>
            <p>
              J&apos;ai grandi dans une famille où l&apos;on chantait naturellement, où la musique rassemblait les
              générations et occupait une place particulière dans notre foi. Voir mes parents chanter dans la chorale,
              mes frères et mes cousins jouer de leurs instruments à l&apos;église a nourri, sans que je m&apos;en rende
              compte, une passion qui n&apos;a jamais cessé de grandir.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Au fil des années, le chant est devenu bien plus qu&apos;une passion : c&apos;est un moyen d&apos;adorer Dieu,
              de le servir et de partager l&apos;espérance qu&apos;Il met dans mon cœur. J&apos;ai eu la grâce de servir
              dans différents projets de louange au sein de mon église locale, puis avec{" "}
              <span className="text-gold-light">Pulse Mâcon</span> ainsi qu&apos;avec le groupe{" "}
              <span className="text-gold-light">Day and Night</span>. Chacune de ces expériences a confirmé une
              conviction profonde :
            </p>
          </Reveal>
          <Reveal>
            <blockquote className="relative pl-6 border-l-2 border-gold font-display italic text-3xl md:text-4xl leading-tight text-bone">
              Dieu m&apos;a confié ce don, et je désire le cultiver avec fidélité et excellence.
            </blockquote>
          </Reveal>
          <Reveal>
            <p>
              Pendant longtemps, ce projet est resté dans un coin de mon cœur. J&apos;avais besoin de grandir, de me
              former, de gagner en expérience et en confiance avant d&apos;oser franchir cette étape. Aujourd&apos;hui, je
              ressens une réelle paix en prenant cette décision. C&apos;est avec beaucoup de joie, mais aussi de
              reconnaissance, que je choisis de répondre à cet appel et d&apos;investir pleinement dans ce que Dieu a
              déposé en moi.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Galerie horizontale en défilement automatique */}
      <Reveal className="mt-24 md:mt-32">
        <StoryGallery />
      </Reveal>
    </section>
  );
}
