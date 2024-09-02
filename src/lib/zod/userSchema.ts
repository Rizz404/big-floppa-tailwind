import { z } from "zod";
import { registerSchema } from "./authSchema";

export const USER_ROLE_ZOD = ["USER", "ADMIN"] as const;

export const createUserSchema = registerSchema.extend({
  role: z.enum(USER_ROLE_ZOD).default("USER"),
  isVerified: z.boolean().default(false),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
