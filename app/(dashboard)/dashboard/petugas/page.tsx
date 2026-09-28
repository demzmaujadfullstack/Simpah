import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle, Users, Eye } from "lucide-react";
import StatCard from "@/components/dashboard/stat-card";
import StatusPie from "@/components/dashboard/status-pie";

export default async function PetugasDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Ambil data petugas
  const petugas = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { region: true },
  });

  if (!petugas) {
    redirect("/login");
  }

  // Query submissions di wilayah petugas
  const whereCondition = petugas.regionId ? { regionId: petugas.regionId } : {};

  const [
    totalSubmissions,
    pendingCount,
    verifiedCount,
    rejectedCount,
    totalWarga,
    pendingSubmissions,
  ] = await Promise.all([
    prisma.submission.count({ where: whereCondition }),
    prisma.submission.count({ where: { ...whereCondition, status: "PENDING" } }),
    prisma.submission.count({ where: { ...whereCondition, status: "VERIFIED" } }),
    prisma.submission.count({ where: { ...whereCondition, status: "REJECTED" } }),
    prisma.user.count({
      where: {
        regionId: petugas.regionId || undefined,
        role: "WARGA",
      },
    }),
    prisma.submission.findMany({
      where: { ...whereCondition, status: "PENDING" },
      include: {
        user: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  // Data untuk pie chart
  const chartData = [
    { name: "Diverifikasi", value: verifiedCount },
    { name: "Menunggu", value: pendingCount },
    { name: "Ditolak", value: rejectedCount },
  ].filter((item) => item.value > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard Petugas
          </h1>
          <p className="text-slate-500">
            Selamat datang, {petugas.name}!
            {petugas.region && (
              <span className="ml-1 text-emerald-600">
                (Wilayah: {petugas.region.name})
              </span>
            )}
          </p>
        </div>
        <Link
          href="/dashboard/petugas/submissions?status=PENDING"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Eye size={20} />
          Lihat Verifikasi
        </Link>
      </div>

      {/* Statistik Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Setoran"
          value={String(totalSubmissions)}
          icon={Package}
          description="Semua setoran di wilayah"
        />
        <StatCard
          title="Menunggu Verifikasi"
          value={String(pendingCount)}
          icon={Clock}
          description="Perlu segera diverifikasi"
        />
        <StatCard
          title="Diverifikasi"
          value={String(verifiedCount)}
          icon={CheckCircle}
          description="Sudah diverifikasi"
        />
        <StatCard
          title="Total Warga"
          value={String(totalWarga)}
          icon={Users}
          description="Warga di wilayah"
        />
      </div>

      {/* Status Ringkasan */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm font-medium text-green-700">Diverifikasi</p>
          <h3 className="mt-1 text-2xl font-bold text-green-700">
            {verifiedCount}
          </h3>
          <p className="text-sm text-green-600">
            {totalSubmissions > 0 
              ? `${Math.round((verifiedCount / totalSubmissions) * 100)}%` 
              : "0%"} dari total
          </p>
        </div>

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <p className="text-sm font-medium text-yellow-700">Menunggu</p>
          <h3 className="mt-1 text-2xl font-bold text-yellow-700">
            {pendingCount}
          </h3>
          <p className="text-sm text-yellow-600">
            {totalSubmissions > 0 
              ? `${Math.round((pendingCount / totalSubmissions) * 100)}%` 
              : "0%"} dari total
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-700">Ditolak</p>
          <h3 className="mt-1 text-2xl font-bold text-red-700">
            {rejectedCount}
          </h3>
          <p className="text-sm text-red-600">
            {totalSubmissions > 0 
              ? `${Math.round((rejectedCount / totalSubmissions) * 100)}%` 
              : "0%"} dari total
          </p>
        </div>
      </div>

      {/* Chart & Tabel */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        {chartData.length > 0 && (
          <StatusPie data={chartData} />
        )}

        {/* Submission Menunggu Verifikasi */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Menunggu Verifikasi
          </h2>
          {pendingSubmissions.length === 0 ? (
            <div className="py-8 text-center">
              <Clock className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-2 text-slate-500">
                Tidak ada setoran yang menunggu verifikasi
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {pendingSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {submission.user.name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {submission.category.name} - {submission.weight} Kg
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/petugas/submissions/${submission.id}`}
                    className="rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
                  >
                    Verifikasi
                  </Link>
                </div>
              ))}
            </div>
          )}
          {pendingCount > 5 && (
            <div className="mt-4 text-center">
              <Link
                href="/dashboard/petugas/submissions?status=PENDING"
                className="text-sm text-blue-600 hover:underline"
              >
                Lihat semua ({pendingCount}) →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}