import { z } from "zod";
import { DefaultDecks } from "../consts";

export const createRoomSchema = z
  .object({
    name: z.string().min(4, "Nome da sala deve ter no mínimo 4 caracteres"),
    onwer: z.string().email().optional().nullish(),
    imageUrl: z.string().optional(),
    deckOption: z.string(),
    deckname: z
      .string()
      .max(50, "Nome do deck deve ter no máximo 50 caracteres")
      .optional(),
    values: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.deckOption !== DefaultDecks.CUSTOM) return;

    if (!data.values) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valores do deck são obrigatórios quando o deck é customizado",
        path: ["values"],
      });
    }

    if (!data.deckname) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nome do deck é obrigatório quando o deck é customizado",
        path: ["deckname"],
      });
    }
  });

export type CreateRoom = z.infer<typeof createRoomSchema>;
