"use server";

import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { FALLBACK_LOCALE } from "./locales";

export default getRequestConfig(async () => {
  const store = cookies();
  const localeFromCookie = store.get("locale")?.value;

  const locale = localeFromCookie ?? FALLBACK_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/i18n/${locale}.json`)).default,
    timeZone: "America/Sao_Paulo",
  };
});
