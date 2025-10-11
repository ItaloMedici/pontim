import { useUser } from "@/hooks/use-user";
import { Plans } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Crown, Link, Shield, ShieldBan, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const plans: Record<Plans, object> = {
  [Plans.Free]: {
    name: Plans.Free,
    icon: Shield,
    color: "bg-gray-400 dark:bg-gray-500",
    textColor: "text-gray-600 dark:text-gray-400",
    badgeColor: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  },
  [Plans.Pro]: {
    name: Plans.Pro,
    icon: Crown,
    color: "bg-yellow-400 dark:bg-yellow-500",
    textColor: "text-yellow-600 dark:text-yellow-400",
    badgeColor:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  [Plans.Master]: {
    name: Plans.Master,
    icon: Zap,
    color: "bg-indigo-600 dark:bg-indigo-500",
    textColor: "text-indigo-600 dark:text-indigo-400",
    badgeColor:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  },
  [Plans.AdFree]: {
    name: Plans.AdFree,
    icon: ShieldBan,
    color: "bg-pink-600 dark:bg-pink-500",
    textColor: "text-pink-600 dark:text-pink-400",
    badgeColor:
      "bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300",
  },
};

export const UserButtonPlan = () => {
  const t = useTranslations();
  const { user } = useUser();

  if (!user) return null;

  const currentPlan = plans[user.planName ?? Plans.Free] ?? plans[Plans.Free];

  const PlanIcon = currentPlan.icon;

  return (
    <div className="p-4 pt-2 border-b border-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">
          {t("dashboard.userButton.planSection.title")}
        </span>
        <Link
          href="/pricing"
          target="_blank"
          className="text-xs text-muted-foreground hover:text-foreground font-medium"
        >
          {t("dashboard.userButton.planSection.changeLink")}
        </Link>
      </div>

      <div
        className={cn("flex items-center p-2 rounded-lg border bg-card", {
          "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30":
            user.planName === Plans.Pro,
          "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/30":
            user.planName === Plans.Master,
        })}
      >
        <div className={cn(currentPlan.color, "rounded-full p-1.5 mr-3")}>
          <PlanIcon size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-card-foreground">
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
  );
};
