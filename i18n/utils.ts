"server only";

import { cookies } from "next/headers";
import { FALLBACK_LOCALE } from "./locales";

export const getCookieLocale = (): string | undefined => {
  const cookieStore = cookies();

  const locale = cookieStore.get("locale")?.value;

  return locale;
};

export const getLocaleOrDefault = (): string => {
  return getCookieLocale() || FALLBACK_LOCALE;
};

export const htmlLang = () => {
  const locale = getLocaleOrDefault();

  const map = {
    pt: "pt-BR",
    en: "en",
  };

  return map[locale] || map.pt;
};
