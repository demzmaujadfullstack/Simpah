import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const regionId = formData.get("regionId") as string;
    const categoryId = formData.get("categoryId") as string;
    const weight = parseFloat(formData.get("weight") as string);
    const file = formData.get("file") as File;

    if (!userId || !regionId || !categoryId || !weight || !file) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Anda tidak memiliki akses" }, { status: 403 });
    }

    const category = await prisma.wasteCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    }

    // ✅ Convert file ke base64 (untuk Vercel)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const photoPath = `data:${file.type};base64,${base64}`;

    const point = Math.round(weight * category.point);

    const submission = await prisma.submission.create({
      data: {
        userId,
        regionId,
        categoryId,
        weight,
        point,
        photo: photoPath,
        status: "PENDING",
      },
    });

    await prisma.fotoSampah.create({
      data: {
        submissionId: submission.id,
        url: photoPath,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoint: {
          increment: point,
        },
      },
    });

    return NextResponse.json(
      { message: "Setoran berhasil dikirim" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating submission:", error);
    return NextResponse.json(
      { error: "Gagal mengirim setoran" },
      { status: 500 }
    );
  }
}