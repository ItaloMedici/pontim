import { Player } from "./player";

export type Board = {
  roomId: string;
  players: Array<Player>;
  totalPlayers: number;
  totalChoices: number;
  currentRound: number;
  reveal: boolean;
  average: number;
  agreementPercentage: number;
  availableRounds: number;
  closestStoryPoint: number;
  maxRounds: number;
};

export type BoardStatus = {
  boardId?: string;
  self?: Player;
  others?: Array<Player>;
  reveal?: boolean;

  totalPlayers?: number;
  totalChoices?: number;
  average?: number;
  agreementPercentage?: number;
  closestStoryPoint?: number;

  firstTime?: boolean;

  availableRounds?: number;
  currentRound?: number;
};

export type BoardStatusNotification = {
  id: string;
  sound: string;
  target: string;
  sender: string;
  isSelf: boolean;
};

export type BoardNotification = {
  senderId: string;
  targetId: string;
  sound: string;
};
