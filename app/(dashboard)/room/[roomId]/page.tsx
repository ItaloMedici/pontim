import { ReportButton } from "@/components/report-button";
import { Board } from "./_components/board";
import { Room } from "./_components/room";
import { BoardAds } from "./_components/board-ads";

interface RoomIdPageProps {
  params: {
    roomId: string;
  };
}

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
