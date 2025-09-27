import { EnumNotification } from "@/types/notifications";

export const notificationIcons: Record<EnumNotification, string> = {
  [EnumNotification.KNOCK]: "🚪",
  [EnumNotification.CAR_HORN]: "🚘",
  [EnumNotification.POLICE]: "🚓",
};

// Helper functions to get notification messages with translations
export const getNotificationMessage = (
  t: (key: string) => string,
  type: EnumNotification,
): string => {
  const keyMap = {
    [EnumNotification.KNOCK]: "knock",
    [EnumNotification.CAR_HORN]: "carHorn",
    [EnumNotification.POLICE]: "police",
  };

  return t(`dashboard.shared.notifications.${keyMap[type]}.message`);
};

export const getNotificationMessageThirdPerson = (
  t: (key: string) => string,
  type: EnumNotification,
): string => {
  const keyMap = {
    [EnumNotification.KNOCK]: "knock",
    [EnumNotification.CAR_HORN]: "carHorn",
    [EnumNotification.POLICE]: "police",
  };

  return t(`dashboard.shared.notifications.${keyMap[type]}.action`);
};
