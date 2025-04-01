import { UNLIMITED_PLAN_VALUE } from "@/lib/consts";
import { BoardService } from "../board/board-service";
import { getRoom } from "../room";
import { getSubscriptionByUser } from "../subscription/get-subscription-by-user";
import { getUserByEmail } from "../user/get-user-by-email";
import { getRoomOwnerPlan } from "./get-room-owner-plan";

export class PlanService {
  constructor(
    private readonly roomId: string,
    private readonly boardService: BoardService,
  ) {}

  async canPlayMoreRound() {
    const board = await this.boardService.getBoard();

    if (!board) return false;

    const ownerPlan = await getRoomOwnerPlan({ roomId: this.roomId });

    if (!ownerPlan) return false;

    if (ownerPlan.plan.maxRounds === UNLIMITED_PLAN_VALUE) return true;

    return ownerPlan.plan.maxRounds > board.currentRound;
  }

  async canJoinBoard(totalPlayers: number) {
    const room = await getRoom({ roomId: this.roomId });

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

    if (subscription.plan.maxPlayers === UNLIMITED_PLAN_VALUE) return true;

    return totalPlayers < subscription.plan.maxPlayers;
  }
}
