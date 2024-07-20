import { z } from "zod";

enum Niche {
  fashion,
  electronics,
  home_garden,
  healthcare,
  pets,
  games_toys,
  baby_Kids,
  food_beverages,
  art_crafts,
}

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
  niche: z.enum([
    "fashion",
    "electronics",
    "home_garden",
    "healthcare",
    "pets",
    "games_toys",
    "baby_kids",
    "food_beverages",
    "art_crafts",
  ]),
  slug: z.string(),
  country: z.string(),
  missionStatement: z.string().optional(),
  slogan: z.string(),
  description: z.string(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

export const brandLoginValidator = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});
