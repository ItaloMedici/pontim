import { makeChoice } from "@/use-cases/player/make-choice";

export async function POST(request: Request) {
  try {
    const { choice, playerId } = await request.json();

    if (!choice) {
      return Response.json({ message: "Choice is required" }, { status: 400 });
    }

    if (!playerId) {
      return Response.json(
        { message: "Player ID is required" },
        { status: 400 }
      );
    }

    await makeChoice({ playerId, choice });

    return Response.json({ message: "Choice made" });
  } catch (error: any) {
    console.error(error);
    return Response.json({ message: error?.message }, { status: 500 });
  }
}
