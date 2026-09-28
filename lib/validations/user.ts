import { Role } from "@prisma/client";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
  regionId: z.string().nullable().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  role: z.nativeEnum(Role),
  regionId: z.string().nullable().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;