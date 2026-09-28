import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import CreateUserForm from "@/components/user/create-user-form";

export default async function CreateUserPage() {
  // Ambil data region untuk dropdown
  const regions = await prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tambah User Baru</h1>
        <p className="text-slate-500">
          Buat akun baru untuk Admin, Petugas, atau Warga
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <CreateUserForm regions={regions} />
      </div>
    </div>
  );
}