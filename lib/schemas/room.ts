import { z } from "zod";

export const roomValidator = z.object({
  _id: z.string(),
  name: z.string(),
  onwerId: z.string(),
  imageUrl: z.string(),
});

export type Room = z.infer<typeof roomValidator>;
