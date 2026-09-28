import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-700/20 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Siap Berkontribusi untuk Lingkungan yang Lebih Baik?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            Bergabunglah dengan ribuan masyarakat yang sudah menggunakan SIMPAH
            untuk mengelola sampah dengan lebih baik.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-emerald-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Gratis Selamanya
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Mudah Digunakan
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Dapatkan Poin
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 font-semibold text-emerald-600 transition hover:bg-emerald-50 hover:shadow-xl"
            >
              Daftar Sekarang
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="#tentang"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}