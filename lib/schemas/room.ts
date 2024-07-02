import { Room as RoomClient } from "@prisma/client";
import { z } from "zod";

export const roomValidator = z.object({
  id: z.string(),
  name: z.string().min(4, "Nome da sala deve ter no mínimo 4 caracteres"),
  ownerEmail: z.string().email(),
  imageUrl: z.string(),
  favorite: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
} as Record<keyof RoomClient, z.ZodType<any>>);

export type Room = RoomClient & { favorite?: boolean };
