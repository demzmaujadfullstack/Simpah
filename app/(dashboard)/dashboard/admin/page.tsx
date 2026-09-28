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
} from "lucide-react";

import DashboardCard from "@/components/dashboard/dashboard-card";
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
    prisma.user.count({
      where: {
        role: "WARGA",
      },
    }),
    prisma.user.count({
      where: {
        role: "PETUGAS",
      },
    }),
    prisma.region.count(),
    prisma.submission.count(),
    prisma.user.aggregate({
      _sum: {
        totalPoint: true,
      },
    }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    }),
    prisma.user.findMany({
      where: {
        role: "WARGA",
      },
      orderBy: {
        totalPoint: "desc",
      },
      take: 5,
    }),
    prisma.submission.findMany({
      select: {
        createdAt: true,
      },
    }),
    prisma.submission.count({
      where: {
        status: "PENDING",
      },
    }),
    prisma.submission.count({
      where: {
        status: "VERIFIED",
      },
    }),
    prisma.submission.count({
      where: {
        status: "REJECTED",
      },
    }),
    prisma.submission.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        category: true,
      },
    }),
  ]);

  // Data untuk chart
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const monthlyData = monthNames.map((month, index) => ({
    month,
    total: submissions.filter((item) => item.createdAt.getMonth() === index).length,
  }));

  const pieData = [
    { name: "Pending", value: pending },
    { name: "Verified", value: verified },
    { name: "Rejected", value: rejected },
  ].filter((item) => item.value > 0);

  // Total user
  const totalUser = totalWarga + totalPetugas;

  // Statistik utama
  const mainStats = [
    {
      title: "Total User",
      value: totalUser,
      icon: Users,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Total Setoran",
      value: totalSetoran,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      title: "Total Poin",
      value: totalPoin._sum.totalPoint?.toLocaleString() || 0,
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: "Total Wilayah",
      value: totalWilayah,
      icon: MapPinned,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
  ];

  // Statistik role
  const roleStats = [
    {
      label: "Admin",
      value: totalUser - totalPetugas - totalWarga,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    {
      label: "Petugas",
      value: totalPetugas,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      label: "Warga",
      value: totalWarga,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
  ];

  // Statistik status
  const statusStats = [
    {
      label: "Menunggu",
      value: pending,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Diverifikasi",
      value: verified,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Ditolak",
      value: rejected,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Admin</h1>
          <p className="mt-1 text-slate-500">
            Selamat datang, {session.user.name}! 
            <span className="ml-2 text-sm text-emerald-600">● Sistem Aktif</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {mainStats.map((stat) => (
          <div
            key={stat.title}
            className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`rounded-xl ${stat.bg} p-3 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 h-1 w-full rounded-full bg-slate-100">
              <div className="h-1 w-3/4 rounded-full bg-emerald-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Role Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {roleStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl ${stat.bg} p-6 shadow-sm ring-1 ${stat.border} transition hover:shadow-md`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`rounded-xl bg-white/80 p-3 ${stat.color}`}>
                {stat.label === "Admin" && <Users className="h-5 w-5" />}
                {stat.label === "Petugas" && <UserCog className="h-5 w-5" />}
                {stat.label === "Warga" && <Recycle className="h-5 w-5" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {statusStats.map((stat) => (
          <div
            key={stat.label}
            className={`rounded-2xl ${stat.bg} p-6 shadow-sm ring-1 ring-slate-200/50`}
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-xl bg-white p-2 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <MonthlyChart data={monthlyData} />
        {pieData.length > 0 && <StatusPie data={pieData} />}
      </div>

      {/* Recent Activity & Top Users */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Submissions */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Setoran Terbaru</h2>
            <Link
              href="/dashboard/admin/submissions"
              className="flex items-center gap-1 text-sm text-emerald-600 transition hover:text-emerald-700"
            >
              Lihat semua
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentSubmissions.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <Package className="mx-auto h-12 w-12 text-slate-300" />
                <p className="mt-2">Belum ada setoran</p>
              </div>
            ) : (
              recentSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                      {submission.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{submission.user.name}</p>
                      <p className="text-sm text-slate-500">
                        {submission.category.name} · {submission.weight} Kg
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">+{submission.point}</p>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
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
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Aktivitas Terbaru</h2>
            <span className="text-xs text-slate-400">Real-time</span>
          </div>
          <div className="mt-4 space-y-3">
            {auditLogs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                <Clock className="mx-auto h-12 w-12 text-slate-300" />
                <p className="mt-2">Belum ada aktivitas</p>
              </div>
            ) : (
              auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{log.user?.name || "System"}</p>
                    <p className="text-sm text-slate-500">{log.description}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(log.createdAt).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Users */}
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-semibold text-slate-800">🏆 Top 5 Warga Berprestasi</h2>
          <Link
            href="/dashboard/admin/users"
            className="flex items-center gap-1 text-sm text-emerald-600 transition hover:text-emerald-700"
          >
            Lihat semua
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {topUsers.length === 0 ? (
            <div className="col-span-full py-8 text-center text-slate-500">
              <Award className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-2">Belum ada data</p>
            </div>
          ) : (
            topUsers.map((user, index) => (
              <div
                key={user.id}
                className={`rounded-xl p-4 text-center transition hover:-translate-y-1 hover:shadow-md ${
                  index === 0
                    ? "bg-gradient-to-br from-yellow-50 to-yellow-100/50 ring-1 ring-yellow-200"
                    : index === 1
                    ? "bg-gradient-to-br from-slate-50 to-slate-100/50 ring-1 ring-slate-200"
                    : index === 2
                    ? "bg-gradient-to-br from-amber-50 to-amber-100/50 ring-1 ring-amber-200"
                    : "bg-white ring-1 ring-slate-100"
                }`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-slate-400"
                      : index === 2
                      ? "bg-amber-600"
                      : "bg-emerald-500"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="mt-2 font-semibold text-slate-800">{user.name}</p>
                <p className="text-sm text-slate-500">{user.email}</p>
                <p className="mt-1 text-lg font-bold text-emerald-600">{user.totalPoint} Poin</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}