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
}

const chachedRoom = cache((roomId: string) => getRoom({ roomId }));

export const generateMetadata = async ({
  params: { roomId },
}: RoomIdPageProps): Promise<Metadata> => {
  const room = await chachedRoom(roomId);

  const roomName = room.name;

  return {
    title: roomName,
  };
};

async function RoomPage({ params: { roomId } }: RoomIdPageProps) {
  const room = await chachedRoom(roomId);
  const session = await getCombinedSession();

  if (!room || room.isExpired) {
    notFound();
  }

  if (room.isTemporary && !session) {
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
