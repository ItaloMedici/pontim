import { z } from "zod";

export const roomValidator = z.object({
  _id: z.string(),
  name: z.string().min(4, "Nome da sala deve ter no mínimo 4 caracteres"),
  onwerId: z.string(),
  imageUrl: z.string(),
  _creationTime: z.number(),
  favorite: z.boolean().optional(),
});

export type Room = z.infer<typeof roomValidator>;
