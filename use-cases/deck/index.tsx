import {
  DECK_DELIMITER,
  DECK_NON_VALUE_CARDS,
  DefaultDecks,
} from "@/lib/consts";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";
import { Deck } from "@/lib/schemas/deck";
import { ChoiceOptions, ChoiceSelectOptions } from "@/types/choice-options";

export class DeckSevice {
  async getDefault() {
    return db.deck.findMany({
      where: {
        cutomRoomId: null,
      },
    });
  }

  parseToChoiceOptions(deck: Deck) {
    return deck.value.split(DECK_DELIMITER).map<ChoiceOptions>((choice, i) => {
      const weight = DECK_NON_VALUE_CARDS.includes(choice) ? 0 : i + 1;

      return {
        value: choice,
        weight,
      };
    });
  }

  async fromUser(userEmail: string) {
    const rooms = await db.room.findMany({
      select: {
        id: true,
      },
      where: {
        ownerEmail: userEmail,
      },
    });

    const customDesks = await db.deck.findMany({
      where: {
        cutomRoomId: {
          in: rooms.map((room) => room.id),
        },
      },
    });

    return customDesks;
  }

  async getFromRoom(roomId: string) {
    const room = await db.room.findFirst({
      select: {
        deckId: true,
      },
      where: {
        id: roomId,
      },
    });

    if (!room) {
      logger.error({
        message: "Error while retriving room on deck service",
        metadata: {
          roomId,
        },
      });
      throw new Error("Room not found");
    }

    const deck = await db.deck.findFirst({
      where: {
        id: room.deckId ?? DefaultDecks.FIBONACCI,
      },
    });

    if (!deck) {
      logger.error({
        message: "Error while retriving deck inside room",
        metadata: {
          roomId,
          deckId: room.deckId,
        },
      });

      throw new Error("Deck not found");
    }

    return deck;
  }
}

export async function getDecksSelection({ userEmail }: { userEmail: string }) {
  const service = new DeckSevice();

  const decks: Deck[] = [];

  const [userDecks, defaults] = await Promise.allSettled([
    service.fromUser(userEmail),
    service.getDefault(),
  ]);

  if (defaults.status === "fulfilled") {
    decks.push(...defaults.value);
  }

  if (userDecks.status === "fulfilled" && userDecks.value?.length) {
    decks.push(...userDecks.value);
  }

  const selections = decks.map<ChoiceSelectOptions>((deck) => {
    const title = `${deck.name} (${deck.value})`;

    return {
      title,
      value: deck.id,
    };
  });

  selections.push({
    title: "Criar deck customizado",
    value: DefaultDecks.CUSTOM,
  });

  return selections;
}

export async function getDefaultDecksSelection() {
  const service = new DeckSevice();

  const decks = await service.getDefault();

  const selections = decks.map<ChoiceSelectOptions>((deck) => {
    const title = `${deck.name} (${deck.value})`;
    return {
      title,
      value: deck.id,
    };
  });

  selections.push({
    title: "Criar deck customizado",
    value: DefaultDecks.CUSTOM,
  });

  return selections;
}

export async function getRoomChoiceOptions({ roomId }: { roomId: string }) {
  const service = new DeckSevice();

  const roomDeck = await service.getFromRoom(roomId);

  const choiceOptions = service.parseToChoiceOptions(roomDeck);

  return choiceOptions;
}
