import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SubmissionForm from "@/components/submission/submission-form";

export default async function CreateSubmissionPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Ambil data user untuk cek region
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { region: true },
  });

  if (!user) {
    redirect("/login");
  }

  // Warga harus punya region
  if (!user.regionId) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Setor Sampah</h1>
          <p className="text-slate-500">Silakan setor sampah Anda</p>
        </div>
        <div className="rounded-2xl border bg-yellow-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-yellow-700">
            Belum Punya Wilayah
          </h2>
          <p className="mt-2 text-yellow-600">
            Anda belum memiliki wilayah. Silakan hubungi admin untuk mendaftarkan wilayah Anda.
          </p>
        </div>
      </div>
    );
  }

  // Ambil data kategori sampah
  const categories = await prisma.wasteCategory.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Setor Sampah</h1>
        <p className="text-slate-500">
          Setor sampah Anda dan dapatkan poin! 
          {user.region && ` (Wilayah: ${user.region.name})`}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <SubmissionForm 
          userId={user.id} 
          regionId={user.regionId}
          categories={categories}
        />
      </div>
    </div>
  );
}