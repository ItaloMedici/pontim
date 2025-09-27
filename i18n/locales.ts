export const SupportedLocales = {
  ptBR: "pt-BR",
  en: "en",
} as const;

export type Locales = (typeof SupportedLocales)[keyof typeof SupportedLocales];

export const mapLocaleToSupported = (locale: string) => {
  const map = {
    "pt-BR": SupportedLocales.ptBR,
    ptBR: SupportedLocales.ptBR,
    pt: SupportedLocales.ptBR,
    "pt-br": SupportedLocales.ptBR,
    "en-US": SupportedLocales.en,
    en: SupportedLocales.en,
    "en-us": SupportedLocales.en,
  };

  return map[locale] as Locales | undefined;
};

interface Language {
  code: Locales;
  name: string;
  flag: string;
}

export const languagesMap: Record<Locales, Language> = {
  [SupportedLocales.ptBR]: {
    code: SupportedLocales.ptBR,
    name: "Português",
    flag: "🇧🇷",
  },
  [SupportedLocales.en]: {
    code: SupportedLocales.en,
    name: "English",
    flag: "🇺🇸",
  },
};

export const FALLBACK_LOCALE = SupportedLocales.ptBR;
