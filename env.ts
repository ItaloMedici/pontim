import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_GOOGLE_ADSENSE_ID: z.string(),
    NEXT_PUBLIC_STRIPE_PAYMENT_LINK: z.string().url(),
  },
  server: {
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    FREE_PLAN_PRICE_ID: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    SITE_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    GA_ID: z.string(),
    REDIS_URL: z.string(),
    LOKI_URL: z.string(),
    CI: z.boolean().optional().default(false),
    AD_FREE_PLAN_PRICE_ID: z.string(),
    CLEANUP_SECRET: z.string(),
  },
  shared: {
    IS_DEV: z.boolean(),
  },
  runtimeEnvStrict: {
    NEXT_PUBLIC_GOOGLE_ADSENSE_ID: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SITE_URL: process.env.SITE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    FREE_PLAN_PRICE_ID: process.env.FREE_PLAN_PRICE_ID,
    AD_FREE_PLAN_PRICE_ID: process.env.AD_FREE_PLAN_PRICE_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PAYMENT_LINK:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    GA_ID: process.env.GA_ID,
    REDIS_URL: process.env.REDIS_URL,
    LOKI_URL: process.env.LOKI_URL,
    CI: !!process.env.CI,
    CLEANUP_SECRET: process.env.CLEANUP_SECRET,
    IS_DEV: process.env.NODE_ENV !== "production",
  },
});
