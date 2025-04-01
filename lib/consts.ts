export enum SearchParams {
  FAVORITES = "favorites",
  SEARCH = "search",
  ERROR = "error",
  ORDER = "order",
  STATE = "state",
}

export const UNLIMITED_PLAN_VALUE = -1;

export enum Plans {
  Free = "Grátis",
  Pro = "Pro",
  Master = "Master",
}

export enum EventAction {
  BOARD_UPDATED = "BOARD_UPDATED",
  NOTIFICATION = "NOTIFICATION",
  HAND_SHAKE = "HAND_SHAKE",
  PLAYER_LEFT = "PLAYER_LEFT",
  PLAYER_JOINED = "PLAYER_JOINED",
  REVEAL = "REVEAL",
  NEXT_ROUND = "NEXT_ROUND",
}

export type EventEnvelope = {
  action: EventAction;
  data: string;
  from: string;
};
