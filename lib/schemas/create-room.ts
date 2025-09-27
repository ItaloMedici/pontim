import { z } from "zod";
import { DefaultDecks } from "../consts";

export const createRoomSchema = (t: (key: string) => string) =>
  z
    .object({
      name: z.string().min(4, t("schemas.createRoom.name.min")),
      onwer: z.string().email().optional().nullish(),
      imageUrl: z.string().optional(),
      deckOption: z.string(),
      deckname: z
        .string()
        .max(50, t("schemas.createRoom.deckname.max"))
        .optional(),
      values: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.deckOption !== DefaultDecks.CUSTOM) return;

      if (!data.values) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("schemas.createRoom.values.required"),
          path: ["values"],
        });
      }

      if (!data.deckname) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("schemas.createRoom.deckname.required"),
          path: ["deckname"],
        });
      }
    });

export type CreateRoom = z.infer<ReturnType<typeof createRoomSchema>>;
