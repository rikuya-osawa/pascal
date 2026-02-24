import { defineCollection, z } from "astro:content";

const mentalModelSchema = z.object({
  type: z.string(),
  official_name: z.string(),
  en_name: z.string().optional(),
  abbreviation: z.string().optional(),
  viewpoints: z.array(z.string()).default([]),
  layer: z.string(),
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
  // 将来 "ja/articles" など増えたらここに追記
};