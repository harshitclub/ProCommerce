import { z } from "zod";

export const addressValidator = z.object({
  addressType: z.enum(["businessAddress", "homeAddress"]),
  fullName: z.string(),
  companyName: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  note: z.string().optional(),
});
