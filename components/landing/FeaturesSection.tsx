import { Recycle, Award, Clock, Users, MapPin, ArrowUpRight, Shield, BarChart3 } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Recycle className="h-6 w-6" />,
      title: "Setor Sampah Digital",
      description:
        "Masyarakat dapat menyetor sampah dengan mudah melalui aplikasi. Upload foto, pilih kategori, dan dapatkan poin instan.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Sistem Poin & Reward",
      description:
        "Setiap setoran sampah mendapatkan poin yang dapat dikumpulkan dan ditukarkan dengan berbagai hadiah menarik.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Verifikasi Real-time",
      description:
        "Petugas dapat memverifikasi setoran secara cepat. Status update langsung terlihat oleh masyarakat.",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Manajemen Masyarakat",
      description:
        "Kelola data masyarakat, riwayat setoran, dan poin dengan mudah melalui dashboard terintegrasi.",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Pelacakan Berbasis Wilayah",
      description:
        "Setoran terorganisir per wilayah. Memudahkan petugas dalam verifikasi dan monitoring.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Laporan & Statistik",
      description:
        "Pantau perkembangan dengan laporan lengkap. Data akurat untuk pengambilan keputusan.",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <section id="fitur" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            FITUR UNGGULAN
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
            Solusi Lengkap untuk
            <span className="text-emerald-600"> Pengelolaan Sampah</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            SIMPAH menyediakan berbagai fitur untuk memudahkan masyarakat, petugas, dan admin
            dalam mengelola sampah secara digital.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/20"
            >
              <div className={`rounded-xl ${feature.bg} ${feature.color} inline-flex p-3`}>
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}