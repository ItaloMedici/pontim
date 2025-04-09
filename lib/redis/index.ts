import { Redis } from "ioredis";

export const redis = globalThis.redis as Redis;
