import Link from "next/link";
import { ArrowRight, CheckCircle, Shield, Users, Building2, Recycle } from "lucide-react";

interface HeroSectionProps {
  totalSubmissions?: number;
  totalPoints?: number;
  totalUsers?: number;
  totalRegions?: number;
}

export default function HeroSection({
  totalSubmissions = 0,
  totalPoints = 0,
  totalUsers = 0,
  totalRegions = 0,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="relative">
            {/* Badge Pemerintah */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 backdrop-blur-sm">
              <Building2 className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Sistem Informasi Pengelolaan Sampah
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold text-slate-800 md:text-5xl lg:text-6xl">
              <span className="text-emerald-600">Digitalisasi</span>
              <br />
              Pengelolaan Sampah
              <span className="block mt-2 text-2xl font-medium text-slate-500 md:text-3xl">
                Berbasis Masyarakat
              </span>
            </h1>

            <p className="mt-4 text-lg text-slate-600 md:text-xl">
              SIMPAH hadir untuk mempermudah masyarakat dalam mengelola sampah,
              mendapatkan poin reward, dan menciptakan lingkungan yang lebih
              bersih dan sehat.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 hover:shadow-xl"
              >
                Mulai Sekarang
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#tentang"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span>Terpercaya</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-500" />
                <span>{totalUsers.toLocaleString()}+ Pengguna</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span>100% Gratis</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview dengan Data Real */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-emerald-100/20 blur-2xl" />
              <div className="relative rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-slate-200/50">
                <div className="overflow-hidden rounded-xl bg-slate-900 p-5">
                  {/* Mini Dashboard Preview */}
                  <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                      <Recycle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">SIMPAH</p>
                      <p className="text-xs text-slate-400">Smart Waste System</p>
                    </div>
                    <span className="ml-auto rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                      LIVE
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-800 p-3">
                      <p className="text-xs text-slate-400">Total Setoran</p>
                      <p className="text-lg font-bold text-emerald-400">
                        {totalSubmissions.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-800 p-3">
                      <p className="text-xs text-slate-400">Total Poin</p>
                      <p className="text-lg font-bold text-emerald-400">
                        {totalPoints.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-800 p-3">
                      <p className="text-xs text-slate-400">Warga Aktif</p>
                      <p className="text-lg font-bold text-emerald-400">
                        {totalUsers.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-800 p-3">
                      <p className="text-xs text-slate-400">Wilayah</p>
                      <p className="text-lg font-bold text-emerald-400">
                        {totalRegions.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}