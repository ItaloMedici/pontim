import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  rooms: defineTable({
    name: v.string(),
    onwerId: v.string(),
    imageUrl: v.string(),
  }),
  userRooms: defineTable({
    userId: v.string(),
    roomId: v.id("rooms"),
  })
    .index("by_user", ["userId"])
    .searchIndex("search_by_room", {
      searchField: "roomId",
      filterFields: ["userId"],
    }),
});
