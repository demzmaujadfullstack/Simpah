import RegisterForm from "@/components/auth/RegisterForm";
import { prisma } from "@/lib/prisma";

export default async function RegisterPage() {
  // Ambil data wilayah untuk dropdown
  const regions = await prisma.region.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      district: true,
    },
  });

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <RegisterForm regions={regions} />
    </main>
  );
}