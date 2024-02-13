import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(4, "Nome da sala deve ter no mínimo 4 caracteres"),
  onwer: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type CreateRoom = z.infer<typeof createRoomSchema>;
