import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET - Ambil semua reward
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rewards = await prisma.reward.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rewards);
  } catch (error) {
    console.error("Error fetching rewards:", error);
    return NextResponse.json(
      { error: "Failed to fetch rewards" },
      { status: 500 }
    );
  }
}

// POST - Buat reward baru
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, pointCost, stock } = body;

    if (!name || !pointCost || stock === undefined) {
      return NextResponse.json(
        { error: "Nama, pointCost, dan stock wajib diisi" },
        { status: 400 }
      );
    }

    const reward = await prisma.reward.create({
      data: {
        name,
        description,
        pointCost: parseInt(pointCost),
        stock: parseInt(stock),
      },
    });

    return NextResponse.json(
      { message: "Reward berhasil dibuat", reward },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reward:", error);
    return NextResponse.json(
      { error: "Gagal membuat reward" },
      { status: 500 }
    );
  }
}

// DELETE - Hapus reward
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID reward tidak ditemukan" },
        { status: 400 }
      );
    }

    // Cek apakah reward sudah diklaim
    const userRewards = await prisma.userReward.count({
      where: { rewardId: id },
    });

    if (userRewards > 0) {
      return NextResponse.json(
        { error: "Reward sudah diklaim oleh warga, tidak bisa dihapus" },
        { status: 400 }
      );
    }

    await prisma.reward.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Reward berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting reward:", error);
    return NextResponse.json(
      { error: "Gagal menghapus reward" },
      { status: 500 }
    );
  }
}