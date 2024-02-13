import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    onwerId: v.string(),
    imageUrl: v.string(),
  }).searchIndex("search_by_name", {
    searchField: "name",
  }),
  userRooms: defineTable({
    userId: v.string(),
    roomId: v.id("rooms"),
    favorite: v.optional(v.boolean()),
  })
    .index("by_user", ["userId"])
    .index("by_room", ["roomId"])
    .index("by_user_and_room", ["userId", "roomId"])
    .index("by_user_and_favorite", ["userId", "favorite"])
    .searchIndex("search_by_room", {
      searchField: "roomId",
      filterFields: ["userId"],
    }),
});
