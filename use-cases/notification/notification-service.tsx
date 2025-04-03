import { EventAction, EventEnvelope } from "@/lib/consts";
import { redis } from "@/lib/redis";
import { BoardNotification } from "@/types/board-status";
import { Session } from "next-auth";

export class NotificationService {
  constructor(
    readonly roomId: string,
    readonly session: Session,
  ) {}

  get key() {
    return `room:${this.roomId}:notification` as const;
  }

  async sendNotification(sound: string, targetId: string) {
    const notification: BoardNotification = {
      senderId: this.session.user.id,
      targetId,
      sound,
    };

    const event: EventEnvelope = {
      action: EventAction.NOTIFICATION,
      data: JSON.stringify(notification),
      from: this.session.user.id,
    };

    await redis.publish(this.key, JSON.stringify(event));
  }

  async deleteNotifications() {
    await redis.del(this.key);
  }
}
