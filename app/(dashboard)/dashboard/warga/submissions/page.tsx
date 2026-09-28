import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, ArrowUpRight } from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function WargaSubmissionsPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const page = Number(params?.page ?? "1");
  const take = 10;
  const skip = (page - 1) * take;

  const [submissions, total] = await Promise.all([
    prisma.submission.findMany({
      where: { userId: session.user.id },
      include: {
        category: true,
        region: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.submission.count({
      where: { userId: session.user.id },
    }),
  ]);

  const totalPage = Math.ceil(total / take);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Riwayat Setoran</h1>
          <p className="text-slate-500">Lihat semua riwayat setoran sampah Anda</p>
        </div>
        <Link
          href="/dashboard/warga/submissions/create"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          <Package size={20} />
          Setor Sampah
        </Link>
      </div>

      <div className="rounded-2xl border bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Tanggal</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Kategori</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Berat</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Poin</th>
                <th className="p-4 text-left text-sm font-semibold text-slate-600">Status</th>
                <th className="p-4 text-center text-sm font-semibold text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <Package className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2">Belum ada riwayat setoran</p>
                    <Link
                      href="/dashboard/warga/submissions/create"
                      className="mt-2 inline-block text-emerald-600 hover:underline"
                    >
                      Setor sampah sekarang →
                    </Link>
                  </td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission.id} className="border-t hover:bg-slate-50">
                    <td className="p-4">
                      {submission.createdAt.toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-4">{submission.category.name}</td>
                    <td className="p-4">{submission.weight} Kg</td>
                    <td className="p-4 font-semibold text-emerald-600">
                      +{submission.point}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <Link
                          href={`/dashboard/warga/submissions/${submission.id}`}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPage > 1 && (
          <div className="flex justify-end gap-2 border-t p-4">
            {Array.from({ length: totalPage }).map((_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}`}
                className={`rounded-lg border px-4 py-2 ${
                  page === i + 1 ? "bg-emerald-600 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}