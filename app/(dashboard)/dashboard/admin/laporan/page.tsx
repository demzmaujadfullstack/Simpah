import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

export default async function LaporanPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [totalUsers, totalSubmissions, totalPoints, totalWeight] = await Promise.all([
    prisma.user.count(),
    prisma.submission.count(),
    prisma.user.aggregate({ _sum: { totalPoint: true } }),
    prisma.submission.aggregate({ _sum: { weight: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laporan</h1>
        <p className="text-slate-500">Ekspor data dan lihat ringkasan statistik</p>
      </div>

      {/* Statistik Ringkasan */}
      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total User</p>
          <h2 className="text-2xl font-bold">{totalUsers}</h2>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Setoran</p>
          <h2 className="text-2xl font-bold">{totalSubmissions}</h2>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Poin</p>
          <h2 className="text-2xl font-bold">{totalPoints._sum.totalPoint || 0}</h2>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Berat</p>
          <h2 className="text-2xl font-bold">{totalWeight._sum.weight?.toFixed(1) || 0} Kg</h2>
        </div>
      </div>

      {/* Tombol Export */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700">
          <FileSpreadsheet size={20} />
          Export Excel
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          <FileText size={20} />
          Export PDF
        </button>
      </div>
    </div>
  );
}