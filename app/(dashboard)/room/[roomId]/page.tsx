import { Board } from "./_components/board";
import { Room } from "./_components/room";

interface RoomIdPageProps {
  params: {
    roomId: string;
  };
}

async function RoomPage({ params: { roomId } }: RoomIdPageProps) {
  return (
    <Room roomId={roomId}>
      <Board />
    </Room>
  );
}

export default RoomPage;
