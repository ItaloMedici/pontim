import { Board } from "./_components/bord";
import { Room } from "./_components/room";

interface RoomIdPageProps {
  params: {
    roomId: string;
  };
}

function RoomIdPage({ params: { roomId } }: RoomIdPageProps) {
  return (
    <Room>
      <Board roomId={roomId} />
    </Room>
  );
}

export default RoomIdPage;
