import { Award, Package, TrendingUp, Clock } from "lucide-react";

interface WargaStatsProps {
  totalPoints: number;
  totalSubmissions: number;
  totalWeight: number;
  pendingCount: number;
}

export default function WargaStats({
  totalPoints,
  totalSubmissions,
  totalWeight,
  pendingCount,
}: WargaStatsProps) {
  const stats = [
    {
      label: "Total Poin",
      value: totalPoints.toLocaleString("id-ID"),
      icon: Award,
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      label: "Total Setoran",
      value: totalSubmissions,
      icon: Package,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      label: "Total Berat",
      value: `${totalWeight.toFixed(1)} Kg`,
      icon: TrendingUp,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
    {
      label: "Menunggu Verifikasi",
      value: pendingCount,
      icon: Clock,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className={`rounded-xl ${stat.bgColor} p-3 ${stat.textColor}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h2 className="text-2xl font-bold text-slate-800">{stat.value}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}