import { NextRequest, NextResponse } from "next/server";

import { projectionSource } from "@/sdk/source";

export const dynamic = "force-dynamic";

/**
 * Search proxy — the browser asks the application server, the application
 * server asks Engine 11 through the SDK. The application never ranks,
 * filters or reconstructs search itself.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ available: true, query: q, results: [] });
  }
  const response = await projectionSource().search(q, { limit: 30 });
  if (!response) {
    return NextResponse.json(
      { available: false, query: q, results: [] },
      { status: 503 },
    );
  }
  return NextResponse.json({ available: true, ...response });
}
