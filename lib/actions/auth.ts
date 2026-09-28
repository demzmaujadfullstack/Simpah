"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { registerSchema } from "@/lib/validations/auth";

export async function registerUser(formData: FormData) {
  try {
    // 1. Ambil data dari form
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 2. Validasi dengan Zod
    const validated = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors;
      return {
        error: Object.values(errors).flat()[0] || "Validasi gagal",
        fieldErrors: errors,
      };
    }

    // 3. Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: "Email sudah terdaftar. Silakan login.",
      };
    }

    // 4. Hash password
    const hashedPassword = await hash(password, 10);

    // 5. Buat user baru dengan role default WARGA
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "WARGA", // Default role
        totalPoint: 0,
        rememberMe: false,
      },
    });

    // 6. Buat audit log
    await prisma.auditLog.create({
      data: {
        action: "REGISTER",
        description: `${name} mendaftar sebagai Warga`,
        userId: user.id,
      },
    });

    // 7. Redirect ke halaman login
    redirect("/login?registered=true");
  } catch (error) {
    console.error("Register error:", error);
    return {
      error: "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
    };
  }
}