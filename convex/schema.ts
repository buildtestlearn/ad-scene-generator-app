import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  adConcepts: defineTable({
    userId: v.id("users"),
    productName: v.string(),
    productDescription: v.string(),
    referenceUrl: v.optional(v.string()),
    scenes: v.array(v.object({
      id: v.string(),
      title: v.string(),
      description: v.string(),
      cameraAngle: v.string(),
      duration: v.string(),
      beats: v.array(v.string())
    })),
    totalDuration: v.string(),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
