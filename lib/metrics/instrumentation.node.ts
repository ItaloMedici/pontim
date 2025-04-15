import { collectDefaultMetrics, Gauge, Histogram, Registry } from "prom-client";

declare global {
  // eslint-disable-next-line no-var
  var instrumentationMetrics:
    | {
        register: Registry;
        httpRequestDurationMicroseconds: Histogram<string>;
        sseConnections: Gauge<string>;
      }
    | undefined;
}

const register = new Registry();

collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in milliseconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 300, 500, 1000, 3000, 5000],
});

register.registerMetric(httpRequestDurationMicroseconds);

const sseConnections = new Gauge({
  name: "pontim_sse_connections",
  help: "Number of SSE connections",
  labelNames: ["room_id"],
});

register.registerMetric(sseConnections);

globalThis.instrumentationMetrics = {
  register,
  httpRequestDurationMicroseconds,
  sseConnections,
};

console.log("Instrumentation metrics initialized", {
  register: globalThis.instrumentationMetrics,
});
