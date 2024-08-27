import { toggleRevealBoard } from "@/use-cases/board/revel-board";
import { revalidatePath } from "next/cache";

export async function POST(
  _: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { roomId } = params;

    if (!roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    await toggleRevealBoard({ roomId });

    revalidatePath(`/room/${roomId}`);

    return Response.json({ message: "Board updated" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
