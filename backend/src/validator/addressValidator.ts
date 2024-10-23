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

export const updateAddressValidator = z.object({
  addressType: z.enum(["businessAddress", "homeAddress"]).optional(),
  fullName: z.string().optional(),
  companyName: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  note: z.string().optional(),
});
