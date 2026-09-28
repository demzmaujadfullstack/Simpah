"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  registerSchema,
  type RegisterSchema,
} from "@/validators/register-schema";

export async function registerAction(data: RegisterSchema) {
  try {
    // ==========================
    // VALIDASI
    // ==========================
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return {
        success: false,
        message: validated.error.issues[0].message,
      };
    }

    const { name, email, password } = validated.data;

    // ==========================
    // EMAIL SUDAH DIGUNAKAN?
    // ==========================
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email sudah digunakan.",
      };
    }

    // ==========================
    // HASH PASSWORD
    // ==========================
    const hashedPassword = await bcrypt.hash(password, 12);

    // ==========================
    // SIMPAN USER
    // ==========================
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        role: "WARGA",

        totalPoint: 0,
      },
    });

    return {
      success: true,
      message: "Registrasi berhasil.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Terjadi kesalahan server.",
    };
  }
}