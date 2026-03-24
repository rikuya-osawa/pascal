import { defineCollection, z } from "astro:content";

const mentalModelSchema = z.object({
  type: z.literal("mental-model"),
  name: z.string(),
  abbreviation: z.string().optional(),
  description: z.string(),
  nature: z.enum(["FRAMEWORK", "COGNITION", "PRINCIPLE"]),
  methodology: z.array(
    z.enum(["generative", "structural", "critical", "decisive", "interactive"])
  ).default([]),
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
  format_version: z.number().default(1).optional(),
  last_updated: z.string().default(() => new Date().toISOString()).optional(),
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