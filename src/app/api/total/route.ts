import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    let total = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const charges = await stripe.charges.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      for (const charge of charges.data) {
        if (charge.paid && !charge.refunded && charge.currency === "eur") {
          total += charge.amount;
        }
      }

      hasMore = charges.has_more;
      if (hasMore && charges.data.length > 0) {
        startingAfter = charges.data[charges.data.length - 1].id;
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
