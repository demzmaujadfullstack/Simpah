import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Gift } from "lucide-react";

export default async function AdminRewardsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const rewards = await prisma.reward.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">🎁 Kelola Reward</h1>
          <p className="text-slate-500">Tambah, edit, atau hapus reward yang tersedia</p>
        </div>
        <Link
          href="/dashboard/admin/rewards/create"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <Plus size={20} />
          Tambah Reward
        </Link>
      </div>

      {/* List Reward */}
      {rewards.length === 0 ? (
        <div className="rounded-2xl border bg-white p-12 text-center">
          <Gift className="mx-auto h-16 w-16 text-slate-300" />
          <p className="mt-4 text-lg font-medium text-slate-700">Belum ada reward</p>
          <p className="text-sm text-slate-500">Klik &quot;Tambah Reward&quot; untuk menambahkan</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
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
                <div className="flex gap-1">
                  <Link
                    href={`/dashboard/admin/rewards/${reward.id}/edit`}
                    className="rounded-lg p-2 text-yellow-600 transition hover:bg-yellow-50"
                  >
                    <Pencil size={18} />
                  </Link>
                  <form action={`/api/rewards/${reward.id}`} method="POST">
                    <input type="hidden" name="_method" value="DELETE" />
                    <button
                      type="submit"
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      onClick={(e) => {
                        if (!confirm(`Hapus reward "${reward.name}"?`)) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">Poin yang dibutuhkan</span>
                <span className="font-semibold text-emerald-600">{reward.pointCost} Poin</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Stok tersedia</span>
                <span className="font-medium text-slate-700">{reward.stock}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}