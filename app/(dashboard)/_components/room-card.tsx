import { Room } from "@/lib/schemas/room";
import Image from "next/image";

export function RoomCard({ room }: { room: Room }) {
  return (
    <div className="relative flex flex-col bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Image src={room.imageUrl} alt={room.name} width={150} height={100} />
      <span className="py-2 px-4">
        <h2 className="font-normal">{room.name}</h2>
      </span>
    </div>
  );
}
