import { z } from "zod";
import { registerSchema } from "./authSchema";

export const USER_ROLE_ZOD = ["USER", "ADMIN"] as const;

export const createUserSchema = registerSchema.extend({
  role: z.enum(USER_ROLE_ZOD).default("USER"),
  isVerified: z.boolean().default(false),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserProfile = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  age: z.number().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().optional(),
  profilePicture: z.instanceof(File).optional(),
});

export type UpdateUserProfile = z.infer<typeof updateUserProfile>;
