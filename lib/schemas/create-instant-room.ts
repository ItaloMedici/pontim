import { z } from "zod";

export const createInstantRoomSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(4, t("schemas.createInstantRoom.name.min")),
    ownername: z.string().max(25, t("schemas.createInstantRoom.ownername.max")),
    deckOption: z.string(),
  });

export type CreateInstantRoom = z.infer<
  ReturnType<typeof createInstantRoomSchema>
>;
