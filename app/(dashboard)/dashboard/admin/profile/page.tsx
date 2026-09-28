import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Shield,
  Calendar,
  Award,
  Package,
  TrendingUp,
  Save,
  Camera,
  Users,
  MapPin,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";

export default async function AdminProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      region: true,
      submissions: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Statistik Pribadi
  const totalSubmissions = user.submissions.length;
  const totalWeight = user.submissions.reduce(
    (acc, s) => acc + s.weight,
    0
  );

  // Statistik Global untuk Admin
  const [
    totalUsers,
    totalSubmissionsAll,
    totalRegions,
    totalWasteCategories,
    pendingSubmissionsAll,
    verifiedSubmissionsAll,
    rejectedSubmissionsAll,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.submission.count(),
    prisma.region.count(),
    prisma.wasteCategory.count(),
    prisma.submission.count({ where: { status: "PENDING" } }),
    prisma.submission.count({ where: { status: "VERIFIED" } }),
    prisma.submission.count({ where: { status: "REJECTED" } }),
  ]);

  // Stats Pribadi
  const personalStats = [
    {
      label: "Total Poin Saya",
      value: user.totalPoint,
      icon: Award,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Total Setoran Saya",
      value: totalSubmissions,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Berat Saya",
      value: `${totalWeight.toFixed(1)} Kg`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  // Stats Global
  const globalStats = [
    {
      label: "Total User",
      value: totalUsers,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      label: "Total Setoran",
      value: totalSubmissionsAll,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Wilayah",
      value: totalRegions,
      icon: MapPin,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Jenis Sampah",
      value: totalWasteCategories,
      icon: Trash2,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  // Status Setoran Global
  const statusStats = [
    {
      label: "Menunggu Verifikasi",
      value: pendingSubmissionsAll,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Diverifikasi",
      value: verifiedSubmissionsAll,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Ditolak",
      value: rejectedSubmissionsAll,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/admin"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali ke Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Profil Admin</h1>
        <p className="text-slate-500">Kelola data akun administrator</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-700">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 rounded-full bg-emerald-600 p-2 text-white shadow-lg transition hover:bg-emerald-700">
                  <Camera size={16} />
                </button>
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-800">
                {user.name}
              </h1>
              <p className="text-sm text-slate-500">{user.email}</p>
              <span className="mt-2 rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-700">
                Administrator
              </span>
            </div>

            <div className="mt-6 space-y-3 border-t pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Shield size={16} className="text-slate-400" />
                <span className="text-slate-500">Role:</span>
                <span className="font-medium text-slate-700">Admin</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-slate-400" />
                <span className="text-slate-500">Bergabung:</span>
                <span className="font-medium text-slate-700">
                  {user.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              {user.lastLoginAt && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-slate-500">Terakhir login:</span>
                  <span className="font-medium text-slate-700">
                    {user.lastLoginAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats & Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            {personalStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl ${stat.bg} p-3 ${stat.color}`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Global Stats */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-4">
              Statistik Sistem
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {globalStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border p-4 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl ${stat.bg} p-2 ${stat.color}`}>
                      <stat.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                      <p className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Setoran Global */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-4">
              Status Setoran Global
            </h2>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {statusStats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border ${stat.bg} p-4`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl bg-white p-2 ${stat.color}`}>
                      <stat.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">{stat.label}</p>
                      <p className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Profile Form */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Edit Profil
              </h2>
              <button
                type="submit"
                form="profile-form"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Save size={16} />
                Simpan
              </button>
            </div>
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}