import { ChoiceOptions } from "./choice-options";
import { Player } from "./player";

export type Board = {
  roomId: string;
  players: Array<Player>;
  totalPlayers: number;
  totalChoices: number;
  currentRound: number;
  reveal: boolean;
  average?: number;
  agreementPercentage: number;
  availableRounds: number;
  majorityChoice?: string;
  maxRounds: number;
  choiceOptions: Array<ChoiceOptions>;
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
  majorityChoice?: string;

  firstTime?: boolean;

  availableRounds?: number;
  currentRound?: number;

  choiceOptions?: Array<ChoiceOptions>;
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
