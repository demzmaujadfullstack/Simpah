import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bell, Globe, Lock } from "lucide-react";
import ChangePassword from "@/components/profile/change-password";

export default async function PetugasSettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/petugas"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali ke Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Pengaturan</h1>
        <p className="text-slate-500">Kelola pengaturan akun Anda</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ganti Password */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Ganti Password</h2>
              <p className="text-sm text-slate-500">Perbarui password Anda</p>
            </div>
          </div>
          <div className="pt-4">
            <ChangePassword />
          </div>
        </div>

        {/* Notifikasi */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="rounded-xl bg-purple-100 p-2 text-purple-600">
              <Bell size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Notifikasi</h2>
              <p className="text-sm text-slate-500">Atur notifikasi Anda</p>
            </div>
          </div>
          <div className="pt-4 space-y-3">
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-slate-700">Notifikasi Email</span>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                defaultChecked
              />
            </label>
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-slate-700">Notifikasi Setoran</span>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                defaultChecked
              />
            </label>
          </div>
        </div>

        {/* Preferensi */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">Preferensi</h2>
              <p className="text-sm text-slate-500">Pengaturan tampilan</p>
            </div>
          </div>
          <div className="pt-4 space-y-3">
            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-slate-700">Dark Mode</span>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Bahasa</span>
              <select className="rounded-lg border px-3 py-1 text-sm">
                <option value="id">Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}