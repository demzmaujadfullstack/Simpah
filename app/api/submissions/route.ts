import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const userId = formData.get("userId") as string;
    const regionId = formData.get("regionId") as string;
    const categoryId = formData.get("categoryId") as string;
    const weight = parseFloat(formData.get("weight") as string);
    const file = formData.get("file") as File;

    if (!userId || !regionId || !categoryId || !weight || !file) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Validasi user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Validasi kategori
    const category = await prisma.wasteCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Kategori tidak ditemukan" },
        { status: 404 }
      );
    }

    // Simpan file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Buat folder jika belum ada
    const uploadDir = join(process.cwd(), "public/uploads/submissions");
    await mkdir(uploadDir, { recursive: true });

    const fileName = `${randomUUID()}-${file.name}`;
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const photoPath = `/uploads/submissions/${fileName}`;

    // Hitung poin
    const point = Math.round(weight * category.point);

    // Buat submission
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

    // Update total point user
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalPoint: {
          increment: point,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Setoran berhasil dikirim",
        submission: {
          id: submission.id,
          weight: submission.weight,
          point: submission.point,
          status: submission.status,
        },
      },
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