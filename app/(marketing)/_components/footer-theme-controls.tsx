"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

export function FooterThemeControls() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle
        variant="outline"
        size="sm"
        className="border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white"
      />
      <LanguageSwitcher variant="footer" />
    </div>
  );
}
