import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ rewardId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { rewardId } = await params;

    // Cek user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek reward
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      return NextResponse.json(
        { error: "Reward tidak ditemukan" },
        { status: 404 }
      );
    }

    // Cek stock
    if (reward.stock <= 0) {
      return NextResponse.json(
        { error: "Stok reward habis" },
        { status: 400 }
      );
    }

    // Cek poin
    if (user.totalPoint < reward.pointCost) {
      return NextResponse.json(
        { error: "Poin tidak cukup" },
        { status: 400 }
      );
    }

    // Cek apakah sudah pernah klaim
    const existingClaim = await prisma.userReward.findUnique({
      where: {
        userId_rewardId: {
          userId: user.id,
          rewardId: reward.id,
        },
      },
    });

    if (existingClaim) {
      return NextResponse.json(
        { error: "Anda sudah mengklaim reward ini" },
        { status: 400 }
      );
    }

    // Proses klaim (pakai transaction)
    await prisma.$transaction([
      // Kurangi poin user
      prisma.user.update({
        where: { id: user.id },
        data: {
          totalPoint: {
            decrement: reward.pointCost,
          },
        },
      }),
      // Kurangi stock reward
      prisma.reward.update({
        where: { id: reward.id },
        data: {
          stock: {
            decrement: 1,
          },
        },
      }),
      // Buat record klaim
      prisma.userReward.create({
        data: {
          userId: user.id,
          rewardId: reward.id,
          quantity: 1,
        },
      }),
    ]);

    return NextResponse.json({
      message: "Reward berhasil diklaim!",
    });
  } catch (error) {
    console.error("Error claiming reward:", error);
    return NextResponse.json(
      { error: "Gagal mengklaim reward" },
      { status: 500 }
    );
  }
}