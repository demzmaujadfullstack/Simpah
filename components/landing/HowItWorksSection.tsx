import { ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Daftar Akun",
      description:
        "Registrasi sebagai warga, petugas, atau admin. Isi data diri dan pilih wilayah.",
    },
    {
      number: "02",
      title: "Setor Sampah",
      description:
        "Warga upload foto sampah, pilih kategori, dan masukkan berat. Poin langsung dihitung.",
    },
    {
      number: "03",
      title: "Verifikasi Petugas",
      description:
        "Petugas memverifikasi setoran. Jika sesuai, poin ditambahkan ke akun warga.",
    },
    {
      number: "04",
      title: "Dapatkan Reward",
      description:
        "Kumpulkan poin dan tukarkan dengan berbagai hadiah menarik. Semakin banyak setor, semakin banyak poin!",
    },
  ];

  return (
    <section id="cara-kerja" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800 md:text-4xl">
            Cara Kerja <span className="text-emerald-600">SIMPAH</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Mulai dalam 4 langkah mudah. Dari warga hingga petugas, semua
            terintegrasi.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <span className="text-5xl font-bold text-emerald-100">
                  {step.number}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-slate-800">
                  {step.title}
                </h3>
                <p className="mt-2 text-slate-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 lg:block">
                  <ArrowRight className="h-6 w-6 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}