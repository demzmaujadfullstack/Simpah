import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nama minimal 3 karakter")
      .max(100, "Nama terlalu panjang"),

    email: z
      .email("Format email tidak valid")
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .max(100, "Password terlalu panjang"),

    confirmPassword: z
      .string()
      .min(8, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;