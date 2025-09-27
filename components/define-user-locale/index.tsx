"use client";

import { FALLBACK_LOCALE, mapLocaleToSupported } from "@/i18n/locales";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const DefineUserLocale = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userLang = navigator.language;
      const mappedUserLang = mapLocaleToSupported(userLang);

      if (!mappedUserLang) {
        document.cookie = `locale=${FALLBACK_LOCALE}; path=/; max-age=31536000`;
        return;
      }

      document.cookie = `locale=${mappedUserLang}; path=/; max-age=31536000`;
      router.refresh();
    }
  }, [router]);

  return null;
};
