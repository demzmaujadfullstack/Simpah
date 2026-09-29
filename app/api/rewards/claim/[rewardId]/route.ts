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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      return NextResponse.json(
        { error: "Reward tidak ditemukan" },
        { status: 404 }
      );
    }

    if (reward.stock <= 0) {
      return NextResponse.json(
        { error: "Stok reward habis" },
        { status: 400 }
      );
    }

    if (user.totalPoint < reward.pointCost) {
      return NextResponse.json(
        { error: "Poin tidak cukup" },
        { status: 400 }
      );
    }

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

    // Proses klaim (transaction)
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          totalPoint: { decrement: reward.pointCost },
        },
      }),
      prisma.reward.update({
        where: { id: reward.id },
        data: {
          stock: { decrement: 1 },
        },
      }),
      prisma.userReward.create({
        data: {
          userId: user.id,
          rewardId: reward.id,
          quantity: 1,
        },
      }),
    ]);

    // Redirect ke halaman rewards setelah sukses
    return NextResponse.redirect(new URL("/dashboard/warga/rewards", request.url));
  } catch (error) {
    console.error("Error claiming reward:", error);
    return NextResponse.json(
      { error: "Gagal mengklaim reward" },
      { status: 500 }
    );
  }
}