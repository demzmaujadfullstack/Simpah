import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Users,
  UserCog,
  MapPinned,
  Recycle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  Award,
  Package,
  Activity,
  Sparkles,
} from "lucide-react";

import MonthlyChart from "@/components/dashboard/monthly-chart";
import StatusPie from "@/components/dashboard/status-pie";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [
    totalWarga,
    totalPetugas,
    totalWilayah,
    totalSetoran,
    totalPoin,
    auditLogs,
    topUsers,
    submissions,
    pending,
    verified,
    rejected,
    recentSubmissions,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "WARGA" } }),
    prisma.user.count({ where: { role: "PETUGAS" } }),
    prisma.region.count(),
    prisma.submission.count(),
    prisma.user.aggregate({ _sum: { totalPoint: true } }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),
    prisma.user.findMany({
      where: { role: "WARGA" },
      orderBy: { totalPoint: "desc" },
      take: 5,
    }),
    prisma.submission.findMany({
      select: { createdAt: true },
    }),
    prisma.submission.count({ where: { status: "PENDING" } }),
    prisma.submission.count({ where: { status: "VERIFIED" } }),
    prisma.submission.count({ where: { status: "REJECTED" } }),
    prisma.submission.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        category: true,
      },
    }),
  ]);

  // Monthly data
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const monthlyData = monthNames.map((month, index) => ({
    month,
    total: submissions.filter((item) => item.createdAt.getMonth() === index).length,
  }));

  const pieData = [
    { name: "PENDING", value: pending },
    { name: "VERIFIED", value: verified },
    { name: "REJECTED", value: rejected },
  ].filter((item) => item.value > 0);

  // Stats
  const mainStats = [
    {
      title: "Total Warga",
      value: totalWarga,
      icon: Users,
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "Total Petugas",
      value: totalPetugas,
      icon: UserCog,
      gradient: "from-blue-500 to-cyan-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Wilayah",
      value: totalWilayah,
      icon: MapPinned,
      gradient: "from-purple-500 to-pink-600",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Total Setoran",
      value: totalSetoran,
      icon: Recycle,
      gradient: "from-amber-500 to-orange-600",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  const statusStats = [
    {
      label: "Menunggu",
      value: pending,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      label: "Diverifikasi",
      value: verified,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      label: "Ditolak",
      value: rejected,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  ];

  return (
    <div className="space-y-6">
      {/* ============ HEADER ============ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 p-8 text-white shadow-xl shadow-emerald-500/20">
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              <Sparkles size={14} />
              Dashboard Admin
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">
              Selamat Datang, {session.user.name?.split(" ")[0]}! 👋
            </h1>
            <p className="mt-2 max-w-2xl text-emerald-50">
              Kelola seluruh data SIMPAH dari satu dashboard. Pantau statistik,
              setoran, dan aktivitas user secara real-time.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-medium text-emerald-100">Total Poin Sistem</p>
            <div className="flex items-center gap-2">
              <Award className="text-yellow-300" size={24} />
              <span className="text-2xl font-bold">
                {(totalPoin._sum.totalPoint || 0).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ MAIN STATS ============ */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}
              >
                <stat.icon size={22} />
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp size={14} />
              <span>Data Real-time</span>
            </div>
          </div>
        ))}
      </div>

      {/* ============ STATUS CARDS ============ */}
      <div className="grid gap-4 md:grid-cols-3">
        {statusStats.map((stat) => (
          <div
            key={stat.label}
            className={`group rounded-2xl border ${stat.border} ${stat.bg} p-5 transition-all hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <stat.icon size={20} className={stat.color} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              </div>
              <ArrowUpRight
                size={18}
                className={`${stat.color} opacity-0 transition-opacity group-hover:opacity-100`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ============ CHARTS ============ */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyChart data={monthlyData} />
        {pieData.length > 0 && <StatusPie data={pieData} />}
      </div>

      {/* ============ RECENT SUBMISSIONS + AUDIT LOG ============ */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Submissions */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Package size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">Setoran Terbaru</h2>
                <p className="text-xs text-slate-500">5 setoran terakhir</p>
              </div>
            </div>
            <Link
              href="/dashboard/admin/submissions"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50"
            >
              Lihat semua
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentSubmissions.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="mx-auto h-10 w-10 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">Belum ada setoran</p>
              </div>
            ) : (
              recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-sm font-bold text-white">
                      {submission.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {submission.user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {submission.category.name} · {submission.weight} Kg
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-600">
                      +{submission.point}
                    </p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        submission.status === "VERIFIED"
                          ? "bg-green-100 text-green-700"
                          : submission.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {submission.status === "VERIFIED"
                        ? "Diverifikasi"
                        : submission.status === "REJECTED"
                        ? "Ditolak"
                        : "Menunggu"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Activity size={20} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-800">Aktivitas Terbaru</h2>
                <p className="text-xs text-slate-500">Real-time</p>
              </div>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-green-500">
              <span className="h-2 w-2 animate-ping rounded-full bg-green-500" />
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {auditLogs.length === 0 ? (
              <div className="py-12 text-center">
                <Activity className="mx-auto h-10 w-10 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">Belum ada aktivitas</p>
              </div>
            ) : (
              auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 p-4 transition hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 text-white">
                    <Activity size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">
                      {log.user?.name || "System"}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {log.description}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {new Date(log.createdAt).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ============ TOP USERS ============ */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
              <Award size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">
                🏆 Top 5 Warga Berprestasi
              </h2>
              <p className="text-xs text-slate-500">Berdasarkan total poin</p>
            </div>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-50"
          >
            Lihat semua
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-5">
          {topUsers.length === 0 ? (
            <div className="col-span-full py-8 text-center">
              <Award className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">Belum ada data</p>
            </div>
          ) : (
            topUsers.map((user, index) => {
              const rankStyles = [
                { bg: "from-yellow-400 to-orange-500", medal: "🥇" },
                { bg: "from-slate-300 to-slate-500", medal: "🥈" },
                { bg: "from-amber-600 to-orange-700", medal: "🥉" },
                { bg: "from-emerald-400 to-green-600", medal: "" },
                { bg: "from-emerald-400 to-green-600", medal: "" },
              ];
              const style = rankStyles[index] || rankStyles[4];

              return (
                <div
                  key={user.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${style.bg} text-xl font-bold text-white shadow-lg`}
                  >
                    {style.medal || index + 1}
                  </div>
                  <p className="mt-3 truncate font-semibold text-slate-800">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">{user.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <Award size={12} />
                    {user.totalPoint.toLocaleString("id-ID")}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}