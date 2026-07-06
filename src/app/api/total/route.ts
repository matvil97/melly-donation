import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    let total = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const sessions = await stripe.checkout.sessions.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      for (const session of sessions.data) {
        if (
          session.payment_status === "paid" &&
          session.currency === "eur" &&
          session.amount_total !== null
        ) {
          total += session.amount_total;
        }
      }

      hasMore = sessions.has_more;
      if (hasMore && sessions.data.length > 0) {
        startingAfter = sessions.data[sessions.data.length - 1].id;
      }
    }

    const cash = Number(process.env.CASH_DONATIONS_EUR ?? 0);

    return NextResponse.json(
      { total: total / 100 + cash },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    console.error("[stripe/total]", err);
    return NextResponse.json({ total: 0 });
  }
}
