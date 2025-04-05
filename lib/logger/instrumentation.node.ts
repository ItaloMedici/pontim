import { env } from "@/env";
import pino from "pino";
import pinoLoki from "pino-loki";

const lokiTransport = pinoLoki({
  host: env.LOKI_URL,
  batching: true,
  interval: 5,
  labels: {
    app: "pontim-app",
  },
});

const logger = pino(lokiTransport);

globalThis.logger = logger;
