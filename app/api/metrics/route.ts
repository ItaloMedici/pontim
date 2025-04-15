import { register } from "@/lib/metrics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const metrics = await register?.metrics();

  console.log("Metrics", metrics);

  return new NextResponse(metrics, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
