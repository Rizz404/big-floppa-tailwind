import { z } from "zod";
import { registerSchema } from "./authSchema";

export const USER_ROLE_ZOD = ["USER", "ADMIN"] as const;

export const createUserSchema = registerSchema.extend({
  role: z.enum(USER_ROLE_ZOD).default("USER"),
  isVerified: z.boolean().default(false),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserProfile = z.object({
  username: z.string(),
  email: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
  age: z.number(),
  phoneNumber: z.string(),
  bio: z.string(),
  profilePicture: z.instanceof(File),
});

export type UpdateUserProfile = z.infer<typeof updateUserProfile>;
