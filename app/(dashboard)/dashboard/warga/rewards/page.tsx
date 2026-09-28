import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Gift, Coins, ShoppingBag } from "lucide-react";

export default async function RewardsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Ambil data user
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      totalPoint: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Ambil semua reward yang tersedia
  const rewards = await prisma.reward.findMany({
    where: {
      stock: {
        gt: 0,
      },
    },
    orderBy: {
      pointCost: "asc",
    },
  });

  // Ambil reward yang sudah diklaim user
  const userRewards = await prisma.userReward.findMany({
    where: {
      userId: user.id,
    },
    include: {
      reward: true,
    },
  });

  const claimedRewardIds = userRewards.map((ur: { rewardId: string }) => ur.rewardId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tukar Poin</h1>
          <p className="text-slate-500">
            Tukarkan poin Anda dengan hadiah menarik
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-6 py-3">
          <Coins className="h-6 w-6 text-emerald-600" />
          <span className="text-2xl font-bold text-emerald-700">
            {user.totalPoint}
          </span>
          <span className="text-sm text-emerald-600">Poin</span>
        </div>
      </div>

      {/* Daftar Reward */}
      {rewards.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center">
          <Gift className="mx-auto h-16 w-16 text-slate-300" />
          <p className="mt-4 text-lg font-medium text-slate-700">
            Belum ada reward tersedia
          </p>
          <p className="text-sm text-slate-500">
            Silakan cek kembali nanti
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward: {
            id: string;
            name: string;
            description: string | null;
            pointCost: number;
            stock: number;
          }) => {
            const isClaimed = claimedRewardIds.includes(reward.id);
            const canClaim = user.totalPoint >= reward.pointCost && reward.stock > 0;

            return (
              <div
                key={reward.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                  isClaimed ? "border-green-200 bg-green-50/50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
                    <Gift size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{reward.name}</h3>
                    {reward.description && (
                      <p className="text-sm text-slate-500">{reward.description}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Poin yang dibutuhkan</span>
                    <span className="font-semibold text-emerald-600">
                      {reward.pointCost} Poin
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Stok tersedia</span>
                    <span className="font-medium text-slate-700">{reward.stock}</span>
                  </div>
                </div>

                {isClaimed ? (
                  <div className="mt-4 rounded-xl bg-green-100 py-2 text-center text-sm font-medium text-green-700">
                    ✓ Sudah Diklaim
                  </div>
                ) : canClaim ? (
                  <form action={`/api/rewards/claim/${reward.id}`} method="POST">
                    <button
                      type="submit"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <ShoppingBag size={18} />
                      Tukar Sekarang
                    </button>
                  </form>
                ) : (
                  <div className="mt-4 rounded-xl bg-red-50 py-2 text-center text-sm font-medium text-red-600">
                    Poin Tidak Cukup
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Riwayat Klaim */}
      {userRewards.length > 0 && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Riwayat Klaim</h2>
          <div className="mt-4 space-y-2">
            {userRewards.map((ur: {
              id: string;
              reward: { name: string; pointCost: number };
              quantity: number;
              claimedAt: Date;
            }) => (
              <div
                key={ur.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium text-slate-800">{ur.reward.name}</p>
                  <p className="text-sm text-slate-500">
                    {ur.quantity} x {ur.reward.pointCost} Poin
                  </p>
                </div>
                <span className="text-sm text-slate-500">
                  {new Date(ur.claimedAt).toLocaleDateString("id-ID")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}