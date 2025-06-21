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
  KEEP_ALIVE = "KEEP_ALIVE",
}

export type EventEnvelope = {
  action: EventAction;
  data: string;
  from: string;
};

export const DECK_DELIMITER = ",";
export const DECK_MAX_CARD_LENGTH = 3;
export const DECK_MAX_CARDS = 10;
export const DECK_NON_VALUE_CARDS = ["?", "🃏", "❓", "☕"];

export enum DefaultDecks {
  FIBONACCI = "deck_fibonacci",
  T_SHIRT = "deck_t_shirt",
  PONTIM = "deck_pontim",
  CUSTOM = "deck_custom",
}
