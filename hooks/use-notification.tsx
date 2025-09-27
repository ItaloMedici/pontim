import { toast } from "@/components/toast";
import {
  getNotificationMessage,
  getNotificationMessageThirdPerson,
  notificationIcons,
} from "@/messages/notification";
import { BoardNotification } from "@/types/board-status";
import { EnumNotification } from "@/types/notifications";
import { Player } from "@/types/player";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useHttp } from "./use-http";
import { useUser } from "./use-user";

export function useNotification(roomId: string) {
  const t = useTranslations();
  const session = useUser();
  const http = useHttp({ baseUrl: `/api/${roomId}/board` });

  const playSound = useCallback(
    async (notification: BoardNotification) => {
      const audio = new Audio(
        `/sounds/${notification.sound.toLowerCase()}.mp3`,
      );

      audio.play();

      toast(getNotificationMessage(t, notification.sound as EnumNotification), {
        duration: 5000,
      });
    },
    [t],
  );

  const showNotificationToast = useCallback(
    (notification: BoardNotification, players?: Player[]) => {
      if (!players?.length) return;

      const sound = notification.sound as EnumNotification;
      const isSendedByMe = notification.senderId === session.user?.id;

      const senderNickname = isSendedByMe
        ? "Você"
        : players.find((player) => player.id === notification.senderId)
            ?.nickname || "Alguém";

      const targetNickname =
        players.find((player) => player.id === notification.targetId)
          ?.nickname || "alguém";

      const soundMessage = getNotificationMessageThirdPerson(t, sound);

      const message = `${senderNickname} ${soundMessage} ${targetNickname}`;

      toast(message, {
        duration: 5000,
        icon: notificationIcons[sound],
      });
    },
    [session.user?.id, t],
  );

  const play = useCallback(
    async (notification: BoardNotification, players?: Player[]) => {
      const isNotificationForMe = notification.targetId === session.user?.id;

      if (isNotificationForMe) {
        playSound(notification);

        return;
      }

      showNotificationToast(notification, players);
    },
    [playSound, session.user?.id, showNotificationToast],
  );

  const send = useCallback(
    async (playerId: string, notification?: EnumNotification) => {
      await http.post(`/notification`, {
        targetId: playerId,
        notification,
      });
    },
    [http],
  );

  return { play, send };
}
