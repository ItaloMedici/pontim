import { env } from "@/env";
import { Redis } from "ioredis";

const redis = env.CI ? {} : new Redis(env.REDIS_URL);

globalThis.redis = redis;
