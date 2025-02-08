"use server";

import { getPlayersByBoardId } from "../player/get-players-by-board-id";
import { getRoom } from "../room";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { getUserByEmail } from "../user/get-user-by-email";

type Input = {
  roomId: string;
};

export async function canJoinBoard({ roomId }: Input) {
  const room = await getRoom({ roomId });

  if (!room) {
    throw new Error("Room not found");
  }

  const user = await getUserByEmail(room.ownerEmail);

  if (!user) {
    throw new Error("User not found");
  }

  const subscription = await getSubscriptionByUser({ userId: user.id });

  if (!subscription) {
    throw new Error("User plan not found");
  }

  const playersOnBoard = await getPlayersByBoardId({ boardId: roomId });

  return playersOnBoard.length < subscription.plan.maxPlayers;
}
