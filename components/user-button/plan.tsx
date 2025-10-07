import { useUser } from "@/hooks/use-user";
import { Plans } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Crown, Link, Shield, ShieldBan, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

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

export const UserButtonPlan = () => {
  const t = useTranslations();
  const { user } = useUser();

  if (!user) return null;

  const currentPlan = plans[user.planName ?? Plans.Free] ?? plans[Plans.Free];

  const PlanIcon = currentPlan.icon;

  return (
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
            "border-indigo-200 bg-indigo-50": user.planName === Plans.Master,
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
  );
};
