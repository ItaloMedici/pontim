"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getUserRoom } from "../room";
import { validator } from "../validator";

export const updateNickname = validator({
  input: z.object({
    nickname: z.string(),
    roomId: z.string(),
  }),
  async handler({ nickname, roomId }) {
    const session = await getServerSession();

    if (!session?.user) {
      throw new Error("Usuário não encontrado");
    }

    const user = await getUserRoom({ user: session?.user, roomId });

    if (!user) {
      throw new Error("Usuário não encontrado na sala");
    }

    const result = db.userRoom.update({
      where: { id: user?.id },
      data: { nickname },
    });

    revalidatePath(`/room/${roomId}`);

    return result;
  },
});
