import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// PUT - Update Profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan email wajib diisi" },
        { status: 400 }
      );
    }

    // Cek email tidak digunakan oleh user lain
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: session.user.id,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah digunakan oleh user lain" },
        { status: 400 }
      );
    }

    // Update user
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        email,
      },
    });

    // Catat audit log
    await prisma.auditLog.create({
      data: {
        action: "PROFILE_UPDATE",
        description: `${user.name} memperbarui profil`,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: "Profil berhasil diupdate",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate profil" },
      { status: 500 }
    );
  }
}