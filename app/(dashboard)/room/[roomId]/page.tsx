import { Board } from "./_components/board";
import { Room } from "./_components/room";

interface RoomIdPageProps {
  params: {
    roomId: string;
  };
}

function RoomIdPage({ params: { roomId } }: RoomIdPageProps) {
  return (
    <Room roomId={roomId}>
      <Board />
    </Room>
  );
}

export default RoomIdPage;
