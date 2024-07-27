import { z } from "zod";

export const productValidator = z.object({
  title: z.string().max(100),
  description: z.string().max(250),
  summary: z.string().max(250).optional(),
  image: z.string(),
  sku: z.string(),
  stock: z.number(),
  oldPrice: z.number(),
  newPrice: z.number(),
  warranty: z.number(),
  warrantyDescription: z.string().max(250).optional(),
  slug: z.string().max(100),
  status: z.enum(["published", "draft"]),
  metaDescription: z.string().max(250).optional(),
  keywords: z.string().max(250).optional(),
  minimumOrderQuantity: z.number(),
});

export const updateProductValidator = z.object({
  title: z.string().max(100).optional(),
  description: z.string().max(250).optional(),
  summary: z.string().max(250).optional(),
  sku: z.string().optional(),
  stock: z.number().optional(),
  oldPrice: z.number().optional(),
  newPrice: z.number().optional(),
  warranty: z.number().optional(),
  warrantyDescription: z.string().max(250).optional(),
  slug: z.string().max(100).optional(),
  status: z.enum(["published", "draft"]).optional(),
  metaDescription: z.string().max(250).optional(),
  keywords: z.string().max(250).optional(),
  minimumOrderQuantity: z.number().optional(),
});
