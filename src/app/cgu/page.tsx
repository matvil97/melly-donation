import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { HELLOASSO_URL } from "@/lib/links";

export const metadata: Metadata = { title: "Conditions générales d'utilisation — Melly" };

export default function CGU() {
  return (
    <LegalPage eyebrow="Informations" title="Conditions générales d'utilisation" updated="30 octobre 2026">
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions encadrent l&apos;utilisation de ce site, qui présente le projet de Melly et
          permet de soutenir financièrement son année de formation à l&apos;École Pierre (Lyon, septembre 2026 –
          juin 2027). L&apos;utilisation du site vaut acceptation de ces conditions.
        </p>
      </section>

      <section>
        <h2>2. Nature des dons</h2>
        <ul>
          <li>Les dons sont libres, volontaires et sans contrepartie.</li>
          <li>Le montant minimum est de 1 €.</li>
          <li>
            Les fonds collectés sont destinés à financer la scolarité (environ 650 € par mois) et le logement
            (environ 450 € par mois) de Melly pendant sa formation. L&apos;objectif total est de 10 950 €.
          </li>
          <li>
            Les dons faits directement sur ce site sont des dons à une personne physique : ils n&apos;ouvrent
            pas droit à un reçu fiscal ni à une réduction d&apos;impôt.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Paiement</h2>
        <p>
          Le paiement est réalisé via la plateforme sécurisée Stripe. Le site ne collecte ni ne conserve aucune
          donnée bancaire. Le montant affiché sur la cagnotte est mis à jour manuellement et peut présenter un
          léger décalage avec les dons réellement reçus.
        </p>
      </section>

      <section>
        <h2>4. Remboursement</h2>
        <p>
          Un don étant un acte définitif, il n&apos;est en principe pas remboursable. En cas d&apos;erreur
          manifeste (montant erroné, double paiement), contactez l&apos;éditeur à l&apos;adresse indiquée dans
          les mentions légales dans un délai de 14 jours.
        </p>
      </section>

      <section>
        <h2>5. Collecte HelloAsso</h2>
        <p>
          La <a href={HELLOASSO_URL} target="_blank" rel="noopener noreferrer">collecte HelloAsso</a> est
          organisée par l&apos;Association Pierre. Les dons effectués sur HelloAsso sont soumis aux conditions de
          cette plateforme et de l&apos;association, notamment en matière de reçu fiscal.
        </p>
      </section>

      <section>
        <h2>6. Responsabilité</h2>
        <p>
          L&apos;éditeur s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées mais ne saurait
          être tenu responsable d&apos;une indisponibilité temporaire du site ou d&apos;un service tiers (Stripe,
          HelloAsso, Google Maps).
        </p>
      </section>

      <section>
        <h2>7. Droit applicable</h2>
        <p>Les présentes conditions sont soumises au droit français.</p>
      </section>
    </LegalPage>
  );
}
