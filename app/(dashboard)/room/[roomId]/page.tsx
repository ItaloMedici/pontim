import { ReportButton } from "@/components/report-button";
import { getRoom } from "@/use-cases/room";
import { Metadata } from "next";
import { Board } from "./_components/board";
import { BoardAds } from "./_components/board-ads";
import { Room } from "./_components/room";
import { SupportButton } from "@/components/support-button";

interface RoomIdPageProps {
  params: {
    roomId: string;
  };
}

export const generateMetadata = async ({
  params: { roomId },
}: RoomIdPageProps): Promise<Metadata> => {
  const room = await getRoom({ roomId });

  const roomName = room.name;

  return {
    title: roomName,
  };
};

async function RoomPage({ params: { roomId } }: RoomIdPageProps) {
  return (
    <Room roomId={roomId}>
      <ReportButton />
      <SupportButton />
      <BoardAds />
      <Board />
    </Room>
  );
}

export default RoomPage;
