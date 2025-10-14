import { PlayerGuestLogin } from "@/components/player-guest-login";
import { ReportButton } from "@/components/report-button";
import { SupportButton } from "@/components/support-button";
import { BoardProvider } from "@/context/board";
import { getCombinedSession } from "@/lib/auth/universal-auth";
import { getRoom } from "@/use-cases/room";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { Board } from "./_components/board";
import { BoardAds } from "./_components/board-ads";

interface RoomIdPageProps {
  params: {
    roomId: string;
  };
  searchParams?: {
    as: "guest";
  };
}

const chachedRoom = cache(async (roomId: string) => {
  try {
    return await getRoom({ roomId });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (errorMessage === "Room not found") {
      notFound();
    }

    logger.error({
      error,
      message: "Error while fetching room",
      metadata: {
        roomId,
        error: errorMessage,
      },
    });

    throw error;
  }
});

export const generateMetadata = async ({
  params: { roomId },
}: RoomIdPageProps): Promise<Metadata> => {
  const room = await chachedRoom(roomId);

  const roomName = room.name;

  return {
    title: roomName,
  };
};

async function RoomPage({ params: { roomId }, searchParams }: RoomIdPageProps) {
  const room = await chachedRoom(roomId);
  const session = await getCombinedSession();

  if (!room || room.isExpired) {
    notFound();
  }

  const joiningAsGuest = Boolean(searchParams?.as === "guest");

  if (!session && (room.isTemporary || joiningAsGuest)) {
    return <PlayerGuestLogin roomName={room.name} />;
  }

  if (!session) {
    redirect(`/login?callbackUrl=/room/${roomId}`);
  }

  return (
    <BoardProvider roomId={roomId}>
      <ReportButton />
      <SupportButton />
      <BoardAds />
      <Board />
    </BoardProvider>
  );
}

export default RoomPage;
