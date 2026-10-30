import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Politique de confidentialité — Melly" };

export default function Confidentialite() {
  return (
    <LegalPage eyebrow="Informations" title="Politique de confidentialité" updated="30 octobre 2026">
      <section>
        <h2>Données collectées</h2>
        <p>
          Ce site ne crée aucun compte utilisateur et n&apos;utilise aucun outil de mesure d&apos;audience ni
          de publicité.
        </p>
        <ul>
          <li>
            <strong>Paiement :</strong> lors d&apos;un don, vos coordonnées de paiement et votre adresse e-mail
            sont saisies directement chez Stripe, qui agit en tant que responsable de traitement pour ces
            données. Le site ne les reçoit pas.
          </li>
          <li>
            <strong>Préférence d&apos;affichage :</strong> le choix du mode clair ou sombre est enregistré
            uniquement dans votre navigateur (stockage local) et n&apos;est jamais transmis.
          </li>
        </ul>
      </section>

      <section>
        <h2>Services tiers</h2>
        <ul>
          <li>
            <strong>Stripe</strong> (paiement) —{" "}
            <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>
          </li>
          <li>
            <strong>Google Maps</strong> (carte intégrée de la section « Projet »), susceptible de déposer ses
            propres cookies —{" "}
            <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>
          </li>
          <li>
            <strong>HelloAsso</strong> (collecte de l&apos;Association Pierre, sur un site externe) —{" "}
            <a href="https://www.helloasso.com/confidentialite" target="_blank" rel="noopener noreferrer">politique de confidentialité</a>
          </li>
          <li>
            <strong>Vercel</strong> (hébergement), qui peut journaliser techniquement les adresses IP des
            visiteurs pour assurer la sécurité du service.
          </li>
        </ul>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
          d&apos;effacement de vos données. Pour les données de paiement, adressez-vous à Stripe ; pour toute
          autre question, contactez l&apos;éditeur via l&apos;adresse indiquée dans les mentions légales. Vous
          pouvez également saisir la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>
      </section>
    </LegalPage>
  );
}
