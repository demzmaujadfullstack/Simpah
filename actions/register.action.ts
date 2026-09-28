"use server";

import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import {
  registerSchema,
  type RegisterSchema,
} from "@/validators/register-schema";

export async function registerAction(data: RegisterSchema) {
  const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: "Data tidak valid",
    };
  }

  const { name, email, password } = validated.data;

  const existing = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Email sudah digunakan",
    };
  }

  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: Role.WARGA,
    },
  });

  return {
    success: true,
    message: "Registrasi berhasil",
  };
}