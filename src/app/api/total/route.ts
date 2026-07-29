import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    let total = 0;
    let hasMore = true;
    let startingAfter: string | undefined;

    while (hasMore) {
      const txns = await stripe.balanceTransactions.list({
        limit: 100,
        type: "payment",
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });

      for (const txn of txns.data) {
        if (txn.currency === "eur" && txn.amount > 0) {
          total += txn.amount;
        }
      }

      hasMore = txns.has_more;
      if (hasMore && txns.data.length > 0) {
        startingAfter = txns.data[txns.data.length - 1].id;
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
