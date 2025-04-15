import { logger } from "@/lib/logger";
import { register } from "@/lib/metrics";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function GET() {
  logger.info("Metrics requested");

  const metrics = await register?.metrics();

  logger.info("Metrics response", { metrics });

  return new NextResponse(metrics, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
