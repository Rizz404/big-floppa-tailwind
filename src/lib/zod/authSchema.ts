import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email harus valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  username: z.string().min(2, "Username minimal 2 karakter"),
  email: z.string().email("Email harus valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
