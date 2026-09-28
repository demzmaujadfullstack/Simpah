import Image from "next/image";
import { Monitor, Smartphone, Tablet } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            PREVIEW
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-800 md:text-4xl">
            Lihat Tampilan <span className="text-emerald-600">Dashboard</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Dashboard SIMPAH dirancang untuk memudahkan pengelolaan data dengan tampilan
            yang bersih dan informatif.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Desktop
          </div>
          <div className="flex items-center gap-2">
            <Tablet className="h-4 w-4" />
            Tablet
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200/50">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 p-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-slate-400">dashboard.simpah.com</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Total Setoran</p>
                <p className="text-xl font-bold text-emerald-400">1.234</p>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Total Poin</p>
                <p className="text-xl font-bold text-emerald-400">45.678</p>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Warga Aktif</p>
                <p className="text-xl font-bold text-emerald-400">567</p>
              </div>
              <div className="rounded-lg bg-slate-800 p-4">
                <p className="text-xs text-slate-400">Wilayah</p>
                <p className="text-xl font-bold text-emerald-400">50+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}