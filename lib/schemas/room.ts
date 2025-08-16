import { Room as RoomClient } from "@prisma/client";

export type Room = RoomClient & { favorite?: boolean };
