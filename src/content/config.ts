import { defineCollection, z } from "astro:content";

const mentalModelSchema = z.object({
  type: z.literal("mental-model"),
  official_name: z.string(),
  en_name: z.string().optional(),
  abbreviation: z.string().optional(),
  description: z.string(),
  viewpoints: z.array(
    z.enum(["LIFE", "LT", "DM", "NB", "PS"])
  ).default([]),
  layer: z.enum(["META", "CORE", "TOOL"]),
  tags: z.array(z.string()).default([]),
});

const jaModels = defineCollection({
  type: "content",
  schema: mentalModelSchema,
});

const enModels = defineCollection({
  type: "content",
  schema: mentalModelSchema,
});

export const collections = {
  "ja/models": jaModels,
  "en/models": enModels,
};