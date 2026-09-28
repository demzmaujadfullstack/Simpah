import Link from "next/link";
import { Package } from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";
import { SubmissionStatus } from "@prisma/client";

// Definisikan tipe untuk submission
interface Submission {
  id: string;
  createdAt: Date;
  weight: number;
  point: number;
  status: SubmissionStatus; // Pakai enum dari Prisma
  category: {
    name: string;
  };
}

interface WargaRecentSubmissionsProps {
  submissions: Submission[];
}

export default function WargaRecentSubmissions({
  submissions,
}: WargaRecentSubmissionsProps) {
  const totalSubmissions = submissions.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Riwayat Setoran Terakhir
        </h2>
        {totalSubmissions > 0 && (
          <Link
            href="/dashboard/warga/submissions"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Lihat semua →
          </Link>
        )}
      </div>

      <div className="overflow-x-auto">
        {totalSubmissions === 0 ? (
          <div className="py-16 text-center">
            <Package className="mx-auto h-16 w-16 text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-slate-700">
              Belum Ada Setoran
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Yuk, mulai setor sampah dan dapatkan poin!
            </p>
            <Link
              href="/dashboard/warga/submissions/create"
              className="mt-4 inline-block rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Setor Sekarang
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-500">
                  Tanggal
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
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium uppercase text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {submission.createdAt.toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {submission.category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {submission.weight} Kg
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                    +{submission.point}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={submission.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/dashboard/warga/submissions/${submission.id}`}
                      className="inline-block rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      title="Lihat Detail"
                    >
                      <Package size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}