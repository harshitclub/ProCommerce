import { z } from "zod";

export const addCatValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

export const addSubCatValidator = z.object({
  title: z.string(),
  description: z.string().optional(),
  slug: z.string(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
  parentCategoryId: z.string(),
});
