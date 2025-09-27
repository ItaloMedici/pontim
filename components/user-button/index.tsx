"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/hooks/use-user";
import { Plans } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Crown, LogOutIcon, Shield, ShieldBan, Zap } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const plans: Record<Plans, object> = {
  [Plans.Free]: {
    name: Plans.Free,
    icon: Shield,
    color: "bg-gray-400",
    textColor: "text-gray-600",
    badgeColor: "bg-gray-100 text-gray-600",
  },
  [Plans.Pro]: {
    name: Plans.Pro,
    icon: Crown,
    color: "bg-yellow-400",
    textColor: "text-yellow-600",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
  [Plans.Master]: {
    name: Plans.Master,
    icon: Zap,
    color: "bg-indigo-600",
    textColor: "text-indigo-600",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  [Plans.AdFree]: {
    name: Plans.AdFree,
    icon: ShieldBan,
    color: "bg-pink-600",
    textColor: "text-pink-600",
    badgeColor: "bg-pink-100 text-pink-600",
  },
};

export const UserButton = () => {
  const t = useTranslations();
  const { user } = useUser();

  if (!user) return null;

  const fallback = () =>
    user.name
      .split(" ")
      .map((name) => name[0])
      .join("");

  const currentPlan = plans[user.planName ?? Plans.Free] ?? plans[Plans.Free];

  const PlanIcon = currentPlan.icon;

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
          <AvatarFallback>{fallback()}</AvatarFallback>
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
              <AvatarFallback>{fallback()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {user.name}
              </div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>

          <div className="p-4 pt-2 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">
                {t("dashboard.userButton.planSection.title")}
              </span>
              <Link
                href="/pricing"
                target="_blank"
                className="text-xs text-gray-600 hover:text-gray-900 font-medium"
              >
                {t("dashboard.userButton.planSection.changeLink")}
              </Link>
            </div>

            <div
              className={cn(
                "flex items-center p-2 rounded-lg border border-gray-200 bg-white",
                {
                  "border-yellow-200 bg-yellow-50": user.planName === Plans.Pro,
                  "border-indigo-200 bg-indigo-50":
                    user.planName === Plans.Master,
                },
              )}
            >
              <div className={cn(currentPlan.color, "rounded-full p-1.5 mr-3")}>
                <PlanIcon size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-800">
                    {t("dashboard.userButton.planSection.planLabel", {
                      planName: currentPlan.name,
                    })}
                  </span>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium",
                      currentPlan.badgeColor,
                    )}
                  >
                    {t("dashboard.userButton.planSection.activeStatus")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2">
            <Button
              variant="ghost"
              size={"sm"}
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              {t("dashboard.userButton.signOut")}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
