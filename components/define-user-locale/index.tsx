"use client";

import { FALLBACK_LOCALE, mapLocaleToSupported } from "@/i18n/locales";
import { setLocaleCookieClient } from "@/i18n/utils-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const DefineUserLocale = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language;
      const mappedUserLang = mapLocaleToSupported(userLang);

      if (!mappedUserLang) {
        setLocaleCookieClient(FALLBACK_LOCALE);
        return;
      }

      setLocaleCookieClient(mappedUserLang);
      router.refresh();
    }
  }, [router]);

  return null;
};
