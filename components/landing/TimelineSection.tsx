import { UserPlus, Upload, CheckCircle, Award } from "lucide-react";

export default function TimelineSection() {
  const steps = [
    {
      number: "01",
      title: "Daftar Akun",
      description:
        "Registrasi sebagai warga, petugas, atau admin. Isi data diri dan pilih wilayah.",
      icon: <UserPlus className="h-6 w-6" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      number: "02",
      title: "Setor Sampah",
      description:
        "Warga upload foto sampah, pilih kategori, dan masukkan berat. Poin langsung dihitung.",
      icon: <Upload className="h-6 w-6" />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      number: "03",
      title: "Verifikasi Petugas",
      description:
        "Petugas memverifikasi setoran. Jika sesuai, poin ditambahkan ke akun warga.",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      number: "04",
      title: "Dapatkan Reward",
      description:
        "Kumpulkan poin dan tukarkan dengan berbagai hadiah menarik. Semakin banyak setor, semakin banyak poin!",
      icon: <Award className="h-6 w-6" />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <section id="cara-kerja" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            CARA KERJA
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
            Bagaimana Cara <span className="text-emerald-600">Menggunakan SIMPAH</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Ikuti 4 langkah mudah untuk mulai menggunakan SIMPAH dan kelola sampah dengan lebih baik.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200/50">
                <div className={`rounded-xl ${step.bg} ${step.color} p-3`}>
                  {step.icon}
                </div>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-800">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}