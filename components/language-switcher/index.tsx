"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locales, languagesMap } from "@/i18n/locales";
import { setLocaleCookieClient } from "@/i18n/utils-client";
import { cn } from "@/lib/utils";
import { Check, Languages, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";

interface LanguageSwitcherProps {
  variant: "user" | "footer";
}

const buttonProps = {
  user: {
    variant: "ghost" as const,
    size: "sm" as const,
    className: "px-2 justify-start w-full",
  },
  footer: {
    className:
      "bg-gray-950 dark:bg-gray-950 border border-gray-600 hover:bg-gray-900 text-gray-300 hover:text-white",
  },
};

export const LanguageSwitcher = ({ variant }: LanguageSwitcherProps) => {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locales) => {
    startTransition(() => {
      setLocaleCookieClient(newLocale);
      router.refresh();
    });
  };

  const currentLanguage = languagesMap[locale as keyof typeof languagesMap];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Button {...buttonProps[variant]}>
          {isPending ? (
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
          ) : (
            <Languages className={"h-4 w-4 mr-2"} />
          )}
          <span className="text-sm">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={"start"}
        className={cn("z-[100]", {
          "bg-gray-900 text-white border-gray-800 w-42": variant === "footer",
          "w-56": variant === "user",
        })}
      >
        {Object.values(languagesMap).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLocaleChange(language.code)}
            className={cn("flex items-center gap-3 cursor-pointer", {
              "hover:bg-gray-800 text-gray-300 hover:text-white":
                variant === "footer",
            })}
          >
            <span className="text-base">{language.flag}</span>
            <span
              className={cn("text-sm font-medium", {
                "text-gray-300": variant === "footer",
              })}
            >
              {language.name}
            </span>
            {locale === language.code && (
              <Check
                className={cn("h-4 w-4 ml-auto", {
                  "text-white": variant === "footer",
                  "text-primary": variant === "user",
                })}
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
