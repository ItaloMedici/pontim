export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./lib/logger/instrumentation.node");
    await import("./lib/metrics/instrumentation.node");
  }
}
