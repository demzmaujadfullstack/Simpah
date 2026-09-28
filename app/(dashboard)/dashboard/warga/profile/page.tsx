import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Calendar,
  Award,
  Package,
  TrendingUp,
  Save,
  Camera,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";

export default async function WargaProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      region: true,
      submissions: {
        include: {
          category: true,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Statistik
  const totalSubmissions = user.submissions.length;
  const totalWeight = user.submissions.reduce(
    (acc, s) => acc + s.weight,
    0
  );

  const pendingSubmissions = user.submissions.filter(
    (s) => s.status === "PENDING"
  );
  const verifiedSubmissions = user.submissions.filter(
    (s) => s.status === "VERIFIED"
  );
  const rejectedSubmissions = user.submissions.filter(
    (s) => s.status === "REJECTED"
  );

  // Stats Cards
  const stats = [
    {
      label: "Total Poin",
      value: user.totalPoint,
      icon: Award,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Total Setoran",
      value: totalSubmissions,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Berat",
      value: `${totalWeight.toFixed(1)} Kg`,
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const statusStats = [
    {
      label: "Menunggu",
      value: pendingSubmissions.length,
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Diverifikasi",
      value: verifiedSubmissions.length,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Ditolak",
      value: rejectedSubmissions.length,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/warga"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali ke Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Profil Warga</h1>
        <p className="text-slate-500">Kelola data akun Anda</p>
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
              <span className="mt-2 rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
                Warga
              </span>
              {user.region && (
                <span className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={14} className="text-emerald-600" />
                  {user.region.name}
                </span>
              )}
            </div>

            <div className="mt-6 space-y-3 border-t pt-6">
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
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
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

          {/* Status Setoran */}
          <div className="grid gap-4 md:grid-cols-3">
            {statusStats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl border ${stat.bg} p-4 shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-xl bg-white p-2 ${stat.color}`}>
                    <stat.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                    <p className={`text-xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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

          {/* Riwayat Setoran Terakhir */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 border-b pb-4">
              Riwayat Setoran Terakhir
            </h2>
            <div className="mt-4 space-y-3">
              {user.submissions.length === 0 ? (
                <p className="text-center text-sm text-slate-500 py-4">
                  Belum ada riwayat setoran
                </p>
              ) : (
                user.submissions.slice(0, 5).map((submission) => (
                  <div
                    key={submission.id}
                    className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50"
                  >
                    <div>
                      <p className="font-medium text-slate-800">
                        {submission.category.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {submission.weight} Kg · {submission.createdAt.toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">
                        +{submission.point}
                      </p>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
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
            {user.submissions.length > 5 && (
              <div className="mt-4 text-center">
                <Link
                  href="/dashboard/warga/submissions"
                  className="text-sm text-emerald-600 hover:underline"
                >
                  Lihat semua riwayat →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}