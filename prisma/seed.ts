import { PrismaClient } from "@prisma/client";
import { DECK_DELIMITER, DefaultDecks } from "../lib/consts";

const prisma = new PrismaClient();

async function main() {
  console.log("🏁 Seeding default decks...");

  await prisma.deck.upsert({
    create: {
      id: DefaultDecks.FIBONACCI,
      name: "Fibonacci",
      value: ["1", "2", "3", "5", "8", "13", "21", "☕", "?"].join(
        DECK_DELIMITER,
      ),
    },
    where: {
      id: DefaultDecks.FIBONACCI,
    },
    update: {},
  });

  await prisma.deck.upsert({
    create: {
      id: DefaultDecks.T_SHIRT,
      name: "T-Shirt",
      value: ["XS", "S", "M", "L", "XL", "XXL", "☕", "?"].join(DECK_DELIMITER),
    },
    where: {
      id: DefaultDecks.T_SHIRT,
    },
    update: {},
  });

  await prisma.deck.upsert({
    create: {
      id: DefaultDecks.PONTIM,
      name: "Pontim",
      value: ["😴", "🤠", "🫡", "🥵", "💀", "☕", "?"].join(DECK_DELIMITER),
    },
    where: {
      id: DefaultDecks.PONTIM,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✅ Default decks seeded successfully!");
  })
  .catch(async (e) => {
    console.error(e);
    console.error(
      "❌ Error seeding default decks. Please check the logs above.",
    );
    await prisma.$disconnect();
    process.exit(1);
  });
