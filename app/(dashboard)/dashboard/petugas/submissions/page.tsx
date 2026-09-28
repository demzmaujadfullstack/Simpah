import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle, Eye, Search } from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";
import { SubmissionStatus } from "@prisma/client";

type Props = {
  searchParams?: Promise<{
    status?: string;
    page?: string;
    q?: string;
  }>;
};

export default async function PetugasSubmissionsPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const statusFilter = params?.status || "";
  const keyword = params?.q || "";
  const page = Number(params?.page || "1");
  const take = 10;
  const skip = (page - 1) * take;

  // Ambil data petugas
  const petugas = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { region: true },
  });

  if (!petugas) {
    redirect("/login");
  }

  // Build where condition dengan tipe yang jelas
  const whereCondition: {
    regionId?: string;
    status?: SubmissionStatus;
    OR?: Array<{
      user?: { name: { contains: string; mode: "insensitive" } };
      category?: { name: { contains: string; mode: "insensitive" } };
    }>;
  } = {};

  // Tambahkan regionId jika petugas memiliki wilayah
  if (petugas.regionId) {
    whereCondition.regionId = petugas.regionId;
  }

  // Tambahkan filter status
  if (statusFilter) {
    whereCondition.status = statusFilter as SubmissionStatus;
  }

  // Tambahkan search keyword
  if (keyword) {
    whereCondition.OR = [
      {
        user: {
          name: {
            contains: keyword,
            mode: "insensitive" as const,
          },
        },
      },
      {
        category: {
          name: {
            contains: keyword,
            mode: "insensitive" as const,
          },
        },
      },
    ];
  }

  // Get submissions
  const [submissions, total, pendingCount, verifiedCount, rejectedCount] = await Promise.all([
    prisma.submission.findMany({
      where: whereCondition,
      include: {
        user: true,
        category: true,
        region: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.submission.count({ where: whereCondition }),
    prisma.submission.count({
      where: {
        regionId: petugas.regionId || undefined,
        status: "PENDING",
      },
    }),
    prisma.submission.count({
      where: {
        regionId: petugas.regionId || undefined,
        status: "VERIFIED",
      },
    }),
    prisma.submission.count({
      where: {
        regionId: petugas.regionId || undefined,
        status: "REJECTED",
      },
    }),
  ]);

  const totalPage = Math.ceil(total / take);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Manajemen Setoran
          </h1>
          <p className="text-slate-500">
            Kelola setoran sampah di wilayah {petugas.region?.name || "Anda"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/petugas/submissions?status=PENDING"
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              statusFilter === "PENDING"
                ? "bg-yellow-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Clock size={16} className="inline mr-1" />
            Menunggu ({pendingCount})
          </Link>
          <Link
            href="/dashboard/petugas/submissions?status=VERIFIED"
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              statusFilter === "VERIFIED"
                ? "bg-green-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <CheckCircle size={16} className="inline mr-1" />
            Diverifikasi ({verifiedCount})
          </Link>
          <Link
            href="/dashboard/petugas/submissions?status=REJECTED"
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              statusFilter === "REJECTED"
                ? "bg-red-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <XCircle size={16} className="inline mr-1" />
            Ditolak ({rejectedCount})
          </Link>
        </div>
      </div>

      {/* Search */}
      <form className="flex gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={keyword}
            placeholder="Cari nama warga atau kategori..."
            className="w-full rounded-xl border pl-11 pr-4 py-3"
          />
        </div>
        <input type="hidden" name="status" value={statusFilter} />
        <button className="rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700">
          Cari
        </button>
      </form>

      {/* Table */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Warga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Berat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Poin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Package className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2">Tidak ada setoran ditemukan</p>
                  </td>
                </tr>
              ) : (
                submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {submission.user.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {submission.category.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {submission.weight} Kg
                    </td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">
                      +{submission.point}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {submission.createdAt.toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/dashboard/petugas/submissions/${submission.id}`}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                          title="Detail & Verifikasi"
                        >
                          <Eye size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-end gap-2 border-t p-4">
            {Array.from({ length: totalPage }).map((_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}&status=${statusFilter}&q=${keyword}`}
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