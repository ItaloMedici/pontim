import { Player } from "@/lib/schemas/player";

export type BoardStatus = {
  boardId: string;
  self: Player;
  others: Array<Player>;
  reveal: boolean;
};
