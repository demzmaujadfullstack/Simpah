import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { getWasteCategories } from "@/actions/waste-category.action";

type Props = {
  searchParams?: Promise<{
    search?: string;
  }>;
};

export default async function WasteCategoryPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const search = params?.search ?? "";

  const categories = await getWasteCategories(search);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Master Jenis Sampah
          </h1>

          <p className="text-gray-500">
            Kelola seluruh jenis sampah beserta poinnya.
          </p>
        </div>

        <Link
          href="/dashboard/admin/sampah/create"
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          Tambah Jenis Sampah
        </Link>
      </div>

      {/* Search */}
      <form>
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Cari jenis sampah..."
          className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-500"
        />
      </form>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Nama Sampah</th>
              <th className="px-6 py-4">Point / Kg</th>
              <th className="px-6 py-4">Tanggal Dibuat</th>
              <th className="px-6 py-4 text-center">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  Belum ada data.
                </td>
              </tr>
            ) : (
              categories.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-6 py-4">
                    {item.point}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/dashboard/admin/sampah/edit/${item.id}`}
                        className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}