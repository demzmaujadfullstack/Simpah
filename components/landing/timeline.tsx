import {
  User,
  Package,
  ShieldCheck,
  Trophy,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    title: "Warga Mendaftar",
    desc: "Warga membuat akun dan memilih wilayah tempat tinggal.",
    icon: User,
    color: "bg-blue-500",
  },
  {
    title: "Setor Sampah",
    desc: "Sampah dipilah lalu disetor ke petugas bank sampah.",
    icon: Package,
    color: "bg-emerald-500",
  },
  {
    title: "Verifikasi Petugas",
    desc: "Petugas memeriksa berat dan jenis sampah yang disetor.",
    icon: ShieldCheck,
    color: "bg-orange-500",
  },
  {
    title: "Poin Masuk",
    desc: "Sistem otomatis menambahkan poin ke akun warga.",
    icon: Trophy,
    color: "bg-yellow-500",
  },
  {
    title: "Dashboard & Laporan",
    desc: "Admin memonitor seluruh aktivitas melalui dashboard.",
    icon: BarChart3,
    color: "bg-purple-500",
  },
];

export default function Timeline() {
  return (
    <section className="bg-muted/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            CARA KERJA
          </span>

          <h2 className="mt-6 text-4xl font-black md:text-5xl">
            Alur Pengelolaan Sampah
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Seluruh proses dilakukan secara digital sehingga
            lebih cepat, transparan, dan mudah dipantau.
          </p>
        </div>

        <div className="relative mt-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-border lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const reverse = index % 2 === 1;

              return (
                <div
                  key={step.title}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div
                    className={`${
                      reverse ? "lg:text-right" : ""
                    }`}
                  >
                    <div className="rounded-3xl border bg-background p-8 shadow-sm transition hover:shadow-xl">
                      <span className="text-sm font-semibold text-primary">
                        Step {index + 1}
                      </span>

                      <h3 className="mt-3 text-2xl font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-7 text-muted-foreground">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex justify-center">
                    <div
                      className={`flex h-20 w-20 items-center justify-center rounded-full ${step.color} text-white shadow-2xl`}
                    >
                      <Icon size={34} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}