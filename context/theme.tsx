"use client";

import { FEATURE_FLAGS } from "@/lib/consts";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={FEATURE_FLAGS.ENABLE_THEME_SWITCHER}
      disableTransitionOnChange
      forcedTheme={FEATURE_FLAGS.ENABLE_THEME_SWITCHER ? undefined : "light"}
    >
      {children}
    </NextThemesProvider>
  );
}
