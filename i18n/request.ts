"use server";

import { getRequestConfig } from "next-intl/server";
import { getLocaleOrDefault } from "./utils";

export default getRequestConfig(async () => {
  const locale = getLocaleOrDefault();

  return {
    locale,
    messages: (await import(`../messages/i18n/${locale}.json`)).default,
    timeZone: "America/Sao_Paulo",
  };
});
