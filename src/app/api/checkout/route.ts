import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || typeof amount !== "number" || amount < 1) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    // Détecte automatiquement l'origine (localhost en dev, domaine réel en prod)
    const origin =
      req.headers.get("origin") ??
      req.headers.get("referer")?.replace(/\/$/, "") ??
      "https://melly-donation.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Don pour Melly Malonga",
              description:
                "Soutenez le rêve de Melly : intégrer l'École Pierre à Lyon — Formation vocale et louange",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/#donation`,
      locale: "fr",
      custom_text: {
        submit: {
          message:
            "Votre don aidera Melly à réaliser son rêve à l'École Pierre de Lyon.",
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe]", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
