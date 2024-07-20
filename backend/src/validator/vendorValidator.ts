import { z } from "zod";

export const vRegisterValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  email: z
    .string()
    .toLowerCase()
    .trim()
    .email({ message: "Invalid email address" }),
  phone: z.string(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const vLoginValidator = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .email({ message: "Invalid email address" }),
  password: z.string(),
});
