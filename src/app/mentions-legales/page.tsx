import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/links";

export const metadata: Metadata = { title: "Mentions légales — Melly" };

export default function MentionsLegales() {
  return (
    <LegalPage eyebrow="Informations" title="Mentions légales" updated="30 octobre 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité à titre personnel et non professionnel par <strong>Melly</strong>, dans le cadre de
          sa collecte de fonds pour une année de formation à l&apos;École Pierre (Lyon).
        </p>
        <p>
          Conformément à l&apos;article 6-III-2 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
          l&apos;économie numérique (LCEN), l&apos;éditeur non professionnel a choisi de préserver son anonymat ;
          ses coordonnées complètes ont été communiquées à l&apos;hébergeur.
        </p>
        <p>
          Contact : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
        </p>
      </section>

      <section>
        <h2>Paiements</h2>
        <p>
          Les dons effectués sur ce site sont traités par Stripe Payments Europe Ltd. Aucune donnée bancaire
          n&apos;est stockée par le site. La collecte proposée sur HelloAsso est gérée par l&apos;Association
          Pierre, sous sa propre responsabilité et selon ses propres conditions.
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, photographies et vidéos présents sur ce site sont la propriété de leurs auteurs. Toute
          reproduction, même partielle, sans autorisation préalable est interdite.
        </p>
      </section>
    </LegalPage>
  );
}
