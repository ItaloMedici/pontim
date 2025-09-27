export const SupportedLocales = {
  ptBR: "pt-BR",
  // en: "en",
} as const;

type SupportedLocale = (typeof SupportedLocales)[keyof typeof SupportedLocales];

export const mapLocaleToSupported = (locale: string) => {
  const map = {
    "pt-BR": SupportedLocales.ptBR,
    ptBR: SupportedLocales.ptBR,
    pt: SupportedLocales.ptBR,
    "pt-br": SupportedLocales.ptBR,
    // "en-US": SupportedLocales.en,
    // en: SupportedLocales.en,
    // "en-us": SupportedLocales.en,
  };

  return map[locale] as SupportedLocale | undefined;
};

export const FALLBACK_LOCALE = SupportedLocales.ptBR;
