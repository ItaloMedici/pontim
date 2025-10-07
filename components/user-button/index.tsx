"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { UserButtonPlan } from "./plan";

export const UserButton = () => {
  const t = useTranslations();
  const { user } = useUser();

  if (!user) return null;

  const fallback = () =>
    user.name
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();

  return (
    <Popover>
      <PopoverTrigger aria-label={t("dashboard.userButton.profileAlt")}>
        <Avatar>
          <AvatarImage
            src={user.image}
            width={32}
            height={32}
            aria-label={t("dashboard.userButton.avatarAlt")}
          />
          <AvatarFallback>
            <span className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-sky-300 to-pink-200 font-semibold text-sky-  00">
              {fallback()}
            </span>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={10} className="p-0">
        <div>
          <div className="p-4 flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={user.image}
                width={32}
                height={32}
                aria-label={t("dashboard.userButton.avatarAlt")}
              />
              <AvatarFallback>
                <span className="flex items-center justify-center h-full w-full bg-gradient-to-tr from-sky-300 to-pink-200 font-semibold text-sky-  00">
                  {fallback()}
                </span>
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">
                {user.isGuest
                  ? t("dashboard.userButton.guestUser")
                  : user.email}
              </div>
            </div>
          </div>

          {user.isGuest ? null : <UserButtonPlan />}

          <div className="p-2 border-t border-gray-100">
            <div className="mb-2">
              <LanguageSwitcher variant="user" />
            </div>
            {user.isGuest ? (
              <Link
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "w-full justify-start",
                )}
                href="/login"
                target="_blank"
              >
                <LogInIcon className="w-4 h-4 mr-2" />
                {t("dashboard.userButton.createAccount")}
              </Link>
            ) : (
              <Button
                variant="ghost"
                size={"sm"}
                className="w-full justify-start"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOutIcon className="w-4 h-4 mr-2" />
                {t("dashboard.userButton.signOut")}
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
