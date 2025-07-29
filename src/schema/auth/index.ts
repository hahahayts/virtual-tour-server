import { z } from "@hono/zod-openapi";

export const RegisterSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  email: z.email(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  role: z.string(),
});

export const UserDataSchema = z.object({
  user: UserSchema,
  message: z.string(),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum of 8 characters long"),
});

export const LoginDataSchema = z.object({
  accessToken: z.string(),
});
