import { Locales } from "./locales";

export const setLocaleCookieClient = (locale: Locales) => {
  document.cookie = `locale=${locale}; path=/; max-age=31536000`;
};
