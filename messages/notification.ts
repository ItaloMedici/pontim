import { EnumNotification } from "@/types/notifications";

export const notificationMessages: Record<EnumNotification, string> = {
  [EnumNotification.KNOCK]: "óh de casa, hora de jogar! 🚪✊",
  [EnumNotification.CAR_HORN]:
    "Ei! Você esta causando engarrafamento aqui! 📣🚗",
  [EnumNotification.POLICE]: "Escolha seu voto e siga seu caminho 🚨🚓",
};

export const notificationIcons: Record<EnumNotification, string> = {
  [EnumNotification.KNOCK]: "🚪",
  [EnumNotification.CAR_HORN]: "🚘",
  [EnumNotification.POLICE]: "🚓",
};

export const notificationMessageThirdPerson: Record<EnumNotification, string> =
  {
    [EnumNotification.KNOCK]: "bateu na porta de",
    [EnumNotification.CAR_HORN]: "tocou a buzina para",
    [EnumNotification.POLICE]: "chamou a polícia para",
  };
