import { v } from "convex/values";
import { query, mutation, action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { getAuthUserId } from "@convex-dev/auth/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.CONVEX_OPENAI_BASE_URL,
  apiKey: process.env.CONVEX_OPENAI_API_KEY,
});

export const generateAdScenes = action({
  args: {
    productName: v.string(),
    productDescription: v.string(),
    referenceUrl: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<any> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated");
    }

    const prompt = `Create 5 vivid, concise ad scene descriptions for a product called "${args.productName}". 

Product description: ${args.productDescription}
${args.referenceUrl ? `Reference/inspiration: ${args.referenceUrl}` : ''}

For each scene, provide:
1. A brief title (3-5 words)
2. A detailed visual description (1-2 sentences)
3. Camera angle/shot type
4. Duration (1-8 seconds)
5. 2-3 key beats/moments within the scene

The 5 scenes should flow together to create a cohesive 60-second ad concept. Focus on:
- Visual storytelling that highlights the product's key benefits
- Varied camera angles and compositions
- Smooth transitions between scenes
- Emotional connection with the target audience

Format your response as JSON with this structure (no markdown formatting):
{
  "scenes": [
    {
      "id": "scene1",
      "title": "Scene Title",
      "description": "Detailed visual description",
      "cameraAngle": "Camera angle/shot type",
      "duration": "X seconds",
      "beats": ["Beat 1", "Beat 2", "Beat 3"]
    }
  ],
  "totalDuration": "60 seconds"
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated");
    }

    let parsedContent;
    try {
      // Try to extract JSON from the response if it's wrapped in markdown
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      parsedContent = JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse AI response:", content);
      throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Save to database
    const conceptId: any = await ctx.runMutation(internal.adScenes.saveAdConcept, {
      userId,
      productName: args.productName,
      productDescription: args.productDescription,
      referenceUrl: args.referenceUrl,
      scenes: parsedContent.scenes,
      totalDuration: parsedContent.totalDuration,
    });

    return { conceptId, ...parsedContent };
  },
});

export const saveAdConcept = internalMutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("adConcepts", args);
  },
});

export const getUserAdConcepts = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("adConcepts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(10);
  },
});

export const getAdConcept = query({
  args: { conceptId: v.id("adConcepts") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User must be authenticated");
    }

    const concept = await ctx.db.get(args.conceptId);
    if (!concept || concept.userId !== userId) {
      throw new Error("Concept not found or access denied");
    }

    return concept;
  },
});
