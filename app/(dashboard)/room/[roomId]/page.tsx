import { ReportButton } from "@/components/report-button";
import { Board } from "./_components/board";
import { Room } from "./_components/room";
import { BoardAds } from "./_components/board-ads";

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
      <BoardAds />
      <Board />
    </Room>
  );
}

export default RoomPage;
