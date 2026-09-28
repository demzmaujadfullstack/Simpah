import { Users, Recycle, Award, MapPin, Building2, TrendingUp } from "lucide-react";

interface StatsSectionProps {
  totalUsers?: number;
  totalSubmissions?: number;
  totalPoints?: number;
  totalRegions?: number;
  totalPetugas?: number;
}

export default function StatsSection({
  totalUsers = 0,
  totalSubmissions = 0,
  totalPoints = 0,
  totalRegions = 0,
  totalPetugas = 0,
}: StatsSectionProps) {
  const stats = [
    { label: "Warga Terdaftar", value: totalUsers.toLocaleString() + "+", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Setoran Sampah", value: totalSubmissions.toLocaleString() + "+", icon: Recycle, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Poin Diberikan", value: totalPoints.toLocaleString() + "+", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Wilayah Aktif", value: totalRegions.toLocaleString() + "+", icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Petugas", value: totalPetugas.toLocaleString() + "+", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <section className="border-y border-slate-100 bg-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}