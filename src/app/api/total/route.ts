import { NextResponse } from "next/server";

export async function GET() {
  const total = Number(process.env.TOTAL_DONATIONS_EUR ?? 0);
  return NextResponse.json(
    { total },
    { headers: { "Cache-Control": "no-store" } }
  );
}
