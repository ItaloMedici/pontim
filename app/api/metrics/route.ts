import { register } from "@/lib/metrics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function GET() {
  const metrics = await register?.metrics();

  return new NextResponse(metrics, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
