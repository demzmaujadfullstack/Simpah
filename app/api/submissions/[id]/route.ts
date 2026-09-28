import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET - Detail Submission
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
        region: true,
      },
    });

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}

// PUT - Update Submission (Verifikasi)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, userId, point } = body;

    // Validasi status
    if (!["VERIFIED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 }
      );
    }

    // Cek submission
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { region: true },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek apakah sudah diverifikasi
    if (submission.status !== "PENDING") {
      return NextResponse.json(
        { error: "Submission sudah diverifikasi" },
        { status: 400 }
      );
    }

    // Cek akses petugas
    const petugas = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (petugas?.role !== "ADMIN" && petugas?.role !== "PETUGAS") {
      return NextResponse.json(
        { error: "Anda tidak memiliki akses" },
        { status: 403 }
      );
    }

    if (petugas?.regionId && submission.regionId !== petugas.regionId) {
      return NextResponse.json(
        { error: "Anda tidak memiliki akses ke wilayah ini" },
        { status: 403 }
      );
    }

    // Update submission
    const updatedSubmission = await prisma.submission.update({
      where: { id },
      data: { status },
    });

    // Jika VERIFIED, tambahkan poin ke user
    if (status === "VERIFIED") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalPoint: {
            increment: point,
          },
        },
      });
    }

    // Catat audit log
    await prisma.auditLog.create({
      data: {
        action: `SUBMISSION_${status}`,
        description: `Setoran ${status === "VERIFIED" ? "diverifikasi" : "ditolak"} oleh ${petugas.name}`,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      message: `Submission ${status === "VERIFIED" ? "diverifikasi" : "ditolak"} berhasil`,
      submission: updatedSubmission,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui submission" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus Submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const submission = await prisma.submission.findUnique({
      where: { id },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission tidak ditemukan" },
        { status: 404 }
      );
    }

    // Hanya admin yang bisa hapus
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Hanya admin yang dapat menghapus" },
        { status: 403 }
      );
    }

    await prisma.submission.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Submission berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Gagal menghapus submission" },
      { status: 500 }
    );
  }
}