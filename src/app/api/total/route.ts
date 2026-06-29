import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    let total = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      for (const pi of paymentIntents.data) {
        if (pi.status === "succeeded" && pi.currency === "eur") {
          total += pi.amount;
        }
      }

      hasMore = paymentIntents.has_more;
      if (hasMore && paymentIntents.data.length > 0) {
        startingAfter = paymentIntents.data[paymentIntents.data.length - 1].id;
      }
    }

    return NextResponse.json(
      { total: total / 100 },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[stripe/total]", err);
    return NextResponse.json({ total: 0 });
  }
}
