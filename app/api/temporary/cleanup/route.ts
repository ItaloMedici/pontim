import { env } from "@/env";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "Missing Authorization header" },
      { status: 401 },
    );
  }

  const token = authHeader.replace("Bearer ", "");

  if (token !== env.CLEANUP_SECRET) {
    return NextResponse.json(
      { error: "Invalid authorization token" },
      { status: 403 },
    );
  }

  const today = new Date();

  const [roomsDeleted, usersDeleted] = await Promise.all([
    db.room.deleteMany({
      where: {
        expireAt: {
          lt: today,
        },
      },
    }),
    db.user.deleteMany({
      where: {
        expireAt: {
          lt: today,
        },
      },
    }),
  ]);

  return NextResponse.json({
    roomsDeleted: roomsDeleted.count,
    usersDeleted: usersDeleted.count,
  });
}
