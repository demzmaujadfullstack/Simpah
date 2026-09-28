import { Leaf, Users, Award, BarChart3, Clock, Shield } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Lingkungan Bersih",
      description: "Mengurangi sampah dan menciptakan lingkungan yang lebih bersih dan sehat.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Dapatkan Reward",
      description: "Setiap setoran sampah mendapatkan poin yang bisa ditukarkan dengan hadiah.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Partisipasi Masyarakat",
      description: "Meningkatkan kesadaran dan partisipasi masyarakat dalam pengelolaan sampah.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data Akurat",
      description: "Menyediakan data dan statistik untuk mendukung pengambilan keputusan.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Efisien & Cepat",
      description: "Proses setoran dan verifikasi yang cepat dan efisien.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Transparan & Terpercaya",
      description: "Sistem yang transparan dengan data yang dapat dipertanggungjawabkan.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            MANFAAT
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
            Mengapa Harus <span className="text-emerald-600">SIMPAH</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            SIMPAH memberikan manfaat bagi semua pihak yang terlibat dalam pengelolaan sampah.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                {benefit.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">{benefit.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}