import { env } from "@/env";
import { Redis } from "ioredis";

export const redis: Redis = globalThis.redis ?? new Redis(env.REDIS_URL);

if (!globalThis.redis) {
  globalThis.redis = redis;
}
