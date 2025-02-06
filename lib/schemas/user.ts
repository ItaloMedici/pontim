import { User as PrismaUser } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string().url().optional(),
});

export const userSchemaWithId = z.object({
  email: z.string().email(),
  name: z.string(),
  image: z.string().url().optional(),
  id: z.string(),
});

export type User = PrismaUser;
