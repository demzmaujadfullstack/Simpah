import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Award,
  Package,
  TrendingUp,
  Save,
  Camera,
  Phone,
  MapPinned,
} from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";

// Tipe untuk Profile
interface ProfileType {
  id: string;
  userId: string;
  bio: string | null;
  phone: string | null;
  address: string | null;
  birthDate: Date | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      region: true,
      profile: true,
      submissions: {
        orderBy: { createdAt: "desc" },
        take: 10,
        include: {
          category: true,
          fotoSampah: true,
        },
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrator";
      case "PETUGAS":
        return "Petugas";
      case "WARGA":
        return "Warga";
      default:
        return "User";
    }
  };

  const getDashboardUrl = () => {
    switch (user.role) {
      case "ADMIN":
        return "/dashboard/admin";
      case "PETUGAS":
        return "/dashboard/petugas";
      case "WARGA":
        return "/dashboard/warga";
      default:
        return "/dashboard";
    }
  };

  // Profile data dengan type casting
  const profile = user.profile as ProfileType | null;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href={getDashboardUrl()}
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali ke Dashboard
      </Link>

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
              <span className="mt-2 rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
                {getRoleLabel(user.role)}
              </span>
              {user.region && (
                <span className="mt-1 text-sm text-slate-500">
                  <MapPin size={14} className="inline mr-1" />
                  {user.region.name}
                </span>
              )}
            </div>

            {/* Profile Info (ONE-TO-ONE) */}
            {profile && (
              <div className="mt-4 space-y-2 border-t pt-4 text-sm">
                {profile.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone size={14} className="text-slate-400" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.address && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPinned size={14} className="text-slate-400" />
                    <span>{profile.address}</span>
                  </div>
                )}
                {profile.bio && (
                  <p className="text-slate-500 italic">&quot;{profile.bio}&quot;</p>
                )}
              </div>
            )}

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
          {/* Stats */}
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