import { z } from "zod";

export const brandRegisterValidator = z.object({
  brandName: z.string(),
  email: z
    .string()
    .toLowerCase()
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phone: z.string(),
  country: z.string(),
  missionStatement: z.string().optional(),
  slogan: z.string(),
  description: z.string(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});
