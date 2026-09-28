import { prisma } from "@/lib/prisma";

import UserForm from "@/components/user/user-form";

export default async function NewUserPage() {
  const regions = await prisma.region.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Tambah User
        </h1>

        <p className="text-muted-foreground">
          Tambahkan akun Admin, Petugas atau Warga.
        </p>
      </div>

      <UserForm
        regions={regions}
      />
    </div>
  );
}