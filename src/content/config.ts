import { defineCollection, z } from "astro:content";

const mentalModelSchema = z.object({
  type: z.literal("mental-model"),
  name: z.string(),
  abbreviation: z.string().optional(),
  description: z.string(),
  application: z.array(
    z.enum(["LIFE", "LT", "DM", "NB", "PS"])
  ).default([]),
  nature: z.enum(["FRAMEWORK", "COGNITION", "PRINCIPLE"]),
  related_models: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  sources: z.array(
    z.object({
      title: z.string(),
      author: z.string().optional(),
      url: z.string().url().optional().or(z.literal("")), // 空文字も許容
      sourceType: z.enum(["primary", "reference", "inspiration"]),
      sourceLanguage: z.enum(["ja", "en", ""]), // 空文字も許容（のちに必須にする）
      description: z.string().optional(),
    })
  ).optional(), // 既存ファイルのエラー防止のため optional
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