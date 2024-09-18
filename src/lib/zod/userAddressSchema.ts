import { z } from "zod";

export const userAddressSchema = z.object({
  isPrimaryAddress: z.boolean().default(false),
  country: z.string(),
  province: z.string(),
  city: z.string(),
  district: z.string(),
  village: z.string(),
  fullAddress: z.string(),
});

export type UserAddressSchema = z.infer<typeof userAddressSchema>;
