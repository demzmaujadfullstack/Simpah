import { Building2, Users, Recycle, Award, CheckCircle } from "lucide-react";

interface AboutSectionProps {
  totalRegions?: number;
  totalUsers?: number;
  totalSubmissions?: number;
  totalPoints?: number;
}

export default function AboutSection({
  totalRegions = 0,
  totalUsers = 0,
  totalSubmissions = 0,
  totalPoints = 0,
}: AboutSectionProps) {
  const points = [
    "Mengintegrasikan teknologi digital dalam pengelolaan sampah",
    "Memberdayakan masyarakat untuk berpartisipasi aktif",
    "Menyediakan sistem reward untuk mendorong partisipasi",
    "Memudahkan petugas dalam memverifikasi setoran",
    "Menyediakan data akurat untuk pengambilan keputusan",
  ];

  const cards = [
    { label: "Wilayah Aktif", value: totalRegions.toLocaleString() + "+", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Masyarakat Terdaftar", value: totalUsers.toLocaleString() + "+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Setoran Sampah", value: totalSubmissions.toLocaleString() + "+", icon: Recycle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Poin Diberikan", value: totalPoints.toLocaleString() + "+", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <section id="tentang" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              TENTANG KAMI
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
              Apa Itu <span className="text-emerald-600">SIMPAH</span>?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              SIMPAH (Sistem Informasi Pengelolaan Sampah) adalah platform digital
              yang menghubungkan masyarakat, petugas, dan admin dalam satu ekosistem
              pengelolaan sampah yang terintegrasi.
            </p>
            <p className="mt-3 text-slate-600">
              Dikembangkan untuk mendukung program pemerintah dalam menciptakan
              lingkungan yang bersih, sehat, dan berkelanjutan melalui partisipasi
              aktif masyarakat.
            </p>

            <div className="mt-6 space-y-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card) => (
              <div key={card.label} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className={`rounded-xl ${card.bg} p-3 ${card.color} w-fit`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-800">{card.value}</p>
                <p className="text-sm text-slate-500">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}