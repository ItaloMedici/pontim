import { redis } from "../redis";
import { getUserIp } from "./get-user-ip";

export const RATE_LIMIT_WINDOW_SEC = 60 * 60; // 1 hour

export const MAX_REQUESTS_PER_WINDOW = 100; // Max 100 requests per window per IP

export async function getRateLimiter() {
  const ip = getUserIp();

  if (!ip) {
    throw new Error("Cannot get your IP address");
  }

  const key = `rate_limiter:${ip}`;
  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  }

  return {
    current,
    limit: MAX_REQUESTS_PER_WINDOW,
    remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - current),
    reset: Date.now() + RATE_LIMIT_WINDOW_SEC,
  };
}

export async function isRateLimited(customLimit?: number) {
  const { current } = await getRateLimiter();
  return current > (customLimit ?? MAX_REQUESTS_PER_WINDOW);
}
