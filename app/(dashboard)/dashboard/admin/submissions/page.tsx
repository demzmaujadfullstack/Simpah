import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Search,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";
import { SubmissionStatus } from "@prisma/client";

type Props = {
  searchParams?: Promise<{
    status?: string;
    page?: string;
    q?: string;
    region?: string;
  }>;
};

export default async function AdminSubmissionsPage({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const statusFilter = params?.status || "";
  const keyword = params?.q || "";
  const regionFilter = params?.region || "";
  const page = Number(params?.page || "1");
  const take = 10;
  const skip = (page - 1) * take;

  // Build where condition dengan tipe yang benar
  const whereCondition: {
    status?: SubmissionStatus;
    regionId?: string;
    OR?: Array<{
      user?: { name: { contains: string; mode: "insensitive" } };
      category?: { name: { contains: string; mode: "insensitive" } };
    }>;
  } = {};

  if (statusFilter) {
    whereCondition.status = statusFilter as SubmissionStatus;
  }

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

  if (regionFilter) {
    whereCondition.regionId = regionFilter;
  }

  // Get data
  const [submissions, total, regions, statusCounts] = await Promise.all([
    prisma.submission.findMany({
      where: whereCondition,
      include: {
        user: true,
        category: true,
        region: true,
        fotoSampah: true, // ✅ TAMBAHKAN INI
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.submission.count({ where: whereCondition }),
    prisma.region.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.submission.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const totalPage = Math.ceil(total / take);

  // Status counts
  const statusMap: Record<string, number> = {
    PENDING: 0,
    VERIFIED: 0,
    REJECTED: 0,
  };
  statusCounts.forEach((item) => {
    if (item.status in statusMap) {
      statusMap[item.status] = item._count;
    }
  });

  const totalSubmissions = total;
  const pendingCount = statusMap.PENDING;
  const verifiedCount = statusMap.VERIFIED;
  const rejectedCount = statusMap.REJECTED;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Manajemen Setoran
          </h1>
          <p className="text-slate-500">
            Kelola semua setoran sampah dari seluruh wilayah
          </p>
        </div>
      </div>

      {/* Status Filter Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Link
          href="/dashboard/admin/submissions"
          className={`rounded-2xl border p-4 transition hover:shadow-md ${
            !statusFilter ? "bg-emerald-50 border-emerald-200" : "bg-white"
          }`}
        >
          <p className="text-sm text-slate-500">Total Setoran</p>
          <p className="text-2xl font-bold text-slate-800">{totalSubmissions}</p>
        </Link>

        <Link
          href="/dashboard/admin/submissions?status=PENDING"
          className={`rounded-2xl border p-4 transition hover:shadow-md ${
            statusFilter === "PENDING" ? "bg-yellow-50 border-yellow-200" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-yellow-600" />
            <p className="text-sm text-slate-500">Menunggu</p>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </Link>

        <Link
          href="/dashboard/admin/submissions?status=VERIFIED"
          className={`rounded-2xl border p-4 transition hover:shadow-md ${
            statusFilter === "VERIFIED" ? "bg-green-50 border-green-200" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <p className="text-sm text-slate-500">Diverifikasi</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
        </Link>

        <Link
          href="/dashboard/admin/submissions?status=REJECTED"
          className={`rounded-2xl border p-4 transition hover:shadow-md ${
            statusFilter === "REJECTED" ? "bg-red-50 border-red-200" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-600" />
            <p className="text-sm text-slate-500">Ditolak</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4">
        <form className="flex flex-1 flex-wrap gap-4">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="q"
              defaultValue={keyword}
              placeholder="Cari nama warga atau kategori..."
              className="w-full rounded-xl border pl-11 pr-4 py-3"
            />
          </div>
          <select
            name="status"
            defaultValue={statusFilter}
            className="rounded-xl border px-4 py-3"
          >
            <option value="">Semua Status</option>
            <option value="PENDING">Menunggu</option>
            <option value="VERIFIED">Diverifikasi</option>
            <option value="REJECTED">Ditolak</option>
          </select>
          <select
            name="region"
            defaultValue={regionFilter}
            className="rounded-xl border px-4 py-3"
          >
            <option value="">Semua Wilayah</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          <button className="rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700">
            Cari
          </button>
        </form>
      </div>

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
                  Wilayah
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
                  <td colSpan={8} className="py-12 text-center text-slate-500">
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
                      {submission.region.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {submission.createdAt.toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/dashboard/admin/submissions/${submission.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
                      >
                        <Eye size={16} />
                        Detail
                      </Link>
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
                href={`?page=${i + 1}&status=${statusFilter}&q=${keyword}&region=${regionFilter}`}
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