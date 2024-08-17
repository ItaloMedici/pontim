import { resetBoard } from "@/use-cases/board/reset-board";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const { boardId } = await request.json();

    const session = await getServerSession();

    if (!session?.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!boardId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const result = await resetBoard({ boardId });

    if (!result.count)
      return Response.json(
        { message: "Error while reseting board" },
        { status: 404 }
      );

    return Response.json({ message: "Succefully reset the board" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
