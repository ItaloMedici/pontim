import { PrismaClient } from "@prisma/client";
import { gl } from "date-fns/locale";

const prisma =
  ((globalThis as any).prisma as PrismaClient) ?? new PrismaClient();

if (!(globalThis as any).prisma) (globalThis as any).prisma = prisma;

export { prisma as db };
