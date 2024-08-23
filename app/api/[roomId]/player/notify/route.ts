import { notifyPlayer } from "@/use-cases/player/notify";

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } },
) {
  try {
    const { roomId } = params;
    const { playerId, notification } = await request.json();

    if (!playerId || !roomId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    await notifyPlayer({ playerId, notification });

    return Response.json({ message: "Succefully send notification to user" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
