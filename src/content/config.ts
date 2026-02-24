import { defineCollection, z } from "astro:content";

const mentalModelSchema = z.object({
  type: z.string(),
  正式名称: z.string(),
  英語名称: z.string().optional(),
  略称: z.string().optional(),
  観点: z.array(z.string()).default([]),
  階層: z.string(),
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