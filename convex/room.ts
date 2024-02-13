import { getAllOrThrow } from "convex-helpers/server/relationships";
import { v } from "convex/values";
import { roomValidator } from "../lib/schemas/room";
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
  args: {
    favorite: v.optional(v.boolean()),
    search: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (args.favorite) {
      const userRoom = await ctx.db
        .query("userRooms")
        .withIndex("by_user_and_favorite", (q) =>
          q.eq("userId", identity.subject).eq("favorite", true)
        )
        .order("desc")
        .collect();

      const roomsIds = userRoom.map((userRoom) => userRoom.roomId);

      const rooms = await getAllOrThrow(ctx.db, roomsIds);

      return rooms.map((room) => ({ ...room, favorite: true }));
    }

    const userRoom = await ctx.db
      .query("userRooms")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();

    const roomsIds = userRoom.map((userRoom) => userRoom.roomId);

    let rooms = await getAllOrThrow(ctx.db, roomsIds);

    if (typeof args.search === "string") {
      rooms = rooms.filter((room) => room.name.includes(args.search!));
    }

    const roomsWithFavoriteRelation = rooms.map((room) => ({
      ...room,
      favorite: userRoom.find((userRoom) => userRoom.roomId === room._id)
        ?.favorite,
    }));

    return roomsWithFavoriteRelation;
  },
});

export const remove = mutation({
  args: { roomId: v.id("rooms") },
  handler: async (ctx, { roomId }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const room = await ctx.db.get(roomId);

    if (identity.subject !== room?.onwerId) {
      throw new Error("Unauthorized");
    }

    const userRoomIds = await ctx.db
      .query("userRooms")
      .withIndex("by_room", (q) => q.eq("roomId", roomId))
      .collect();

    await Promise.all(
      userRoomIds.map((userRoom) => ctx.db.delete(userRoom._id))
    );

    await ctx.db.delete(roomId);
  },
});

export const updateRoom = mutation({
  args: { roomId: v.id("rooms"), name: v.string() },
  handler: async (ctx, { roomId, name }) => {
    if (!name) {
      throw new Error("Nome é obrigatório");
    }

    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const room = await ctx.db.get(roomId);

    if (identity.subject !== room?.onwerId) {
      throw new Error("Unauthorized");
    }

    const validInput = roomValidator.pick({ name: true }).safeParse({ name });

    if (!validInput.success) {
      throw new Error(validInput.error.message);
    }

    await ctx.db.patch(roomId, { name });
  },
});

export const favoriteRoom = mutation({
  args: { roomId: v.id("rooms"), favorite: v.boolean() },
  handler: async (ctx, { roomId, favorite }) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userRoom = await ctx.db
      .query("userRooms")
      .withIndex("by_user_and_room", (q) =>
        q.eq("userId", identity.subject).eq("roomId", roomId)
      )
      .unique();

    if (!userRoom) {
      throw new Error("Sala não encontrada");
    }

    await ctx.db.patch(userRoom._id, { favorite });
  },
});
