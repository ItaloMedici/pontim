import { Player } from "@/lib/schemas/player";

export type BoardStatus = {
  boardId?: string;
  self?: Player;
  others?: Array<Player>;
  reveal?: boolean;

  totalPlayers?: number;
  totalChoices?: number;
  average?: number;
  agreementPercentage?: number;

  firstTime?: boolean;

  notifications: Array<BoardStatusNotification>;
};

export type BoardStatusNotification = {
  id: string;
  sound: string;
  target: string;
  sender: string;
  isSelf: boolean;
};
