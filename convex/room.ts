import { getAllOrThrow } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const UNSPLASH_RANDOM_IMAGE_API =
  "https://source.unsplash.com/random?nature" as const;

const fetchRandomImage = async () => {
  return fetch(UNSPLASH_RANDOM_IMAGE_API)
    .then((res) => res.url)
    .catch(() => UNSPLASH_RANDOM_IMAGE_API);
};

export const createRoom = mutation({
  args: { name: v.string(), imageUrl: v.optional(v.string()) },
  handler: async (ctx, { name, imageUrl }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const image = imageUrl ?? (await fetchRandomImage());

    const room = await ctx.db.insert("rooms", {
      name,
      imageUrl: image,
      onwerId: identity.subject,
    });

    await ctx.db.insert("userRooms", {
      userId: identity.subject,
      roomId: room,
    });

    return room;
  },
});

export const addRoomToUser = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    await ctx.db.insert("userRooms", {
      userId: identity.subject,
      roomId,
    });
  },
});

export const getRooms = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userRoom = await ctx.db
      .query("userRooms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    const roomsIds = userRoom.map((userRoom) => userRoom.roomId);

    const rooms = await getAllOrThrow(ctx.db, roomsIds);

    return rooms;
  },
});
